import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { CreateAdminDto } from "@shared/swagger-api/generated/models/CreateAdminDto";
import { ResponseBoardDto } from "@shared/swagger-api/generated/models/ResponseBoardDto";
import { AdminApiService } from "@shared/swagger-api/generated/services/AdminApiService";
import { BoardApiService } from "@shared/swagger-api/generated/services/BoardApiService";
import { Button, Form, Input, message, Popconfirm, Select } from "antd";

import styles from "./Admin.module.scss";

type SelectItem = { label: string; value: number };

type AdminForm = CreateAdminDto;

const Admin = () => {
  const [ form ] = Form.useForm();
  const { adminId } = useParams();
  const isEdit = !!adminId;
  const [ messageApi, contextHolder ] = message.useMessage();

  useQuery(
    [ "admin", adminId || "" ],
    () => AdminApiService.adminControllerFindOne({ id: Number(adminId) }),
    {
      enabled: isEdit,
      refetchOnWindowFocus: false,
      onSuccess: (admin) => {
        form.setFieldsValue({
          ...admin,
          boardIds: admin.boards.map((board) => board.id),
        });
      },
    },
  );

  const { data } = useQuery([ "boards" ], () =>
    BoardApiService.boardControllerFind({ uuid: undefined }),
  );

  const getLeafBoardItems = (
    boards: ResponseBoardDto[],
    parentLable?: string,
  ): SelectItem[] => {
    return boards.reduce((prev, board) => {
      const label = parentLable ? `${parentLable} > ${board.name}` : board.name;

      if (board.children?.length) {
        return [ ...prev, ...getLeafBoardItems(board.children, label) ];
      }

      return [ ...prev, { label, value: board.id } ];
    }, [] as SelectItem[]);
  };

  const onSubmit = async (admin: AdminForm) => {
    try {
      if (isEdit) {
        const { loginId, ...updateAdminDto } = admin;

        await AdminApiService.adminControllerUpdate({
          id: Number(adminId),
          requestBody: {
            ...updateAdminDto,
          },
        });
      } else {
        await AdminApiService.adminControllerCreate({
          requestBody: {
            ...admin,
          },
        });
      }

      messageApi.open({
        type: "success",
        content: "정상적으로 완료됨",
      });
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "실패 (콘솔창 확인)",
      });
      console.error(error);
    }
  };

  const handleClickRemove = async () => {
    await AdminApiService.adminControllerRemove({
      id: Number(adminId),
    });

    window.history.back();
  };

  return (
    <div className={styles.wrapper}>
      {contextHolder}
      <h1 className={styles.title}>관리자 {isEdit ? "수정" : "등록"}</h1>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={onSubmit}
      >
        <Form.Item label="아이디" name="loginId" required>
          <Input />
        </Form.Item>
        <Form.Item label="권한" name="authoirty" required>
          <Select
            options={[
              {
                label: "게스트",
                value: "Guest",
              },
              {
                label: "학생회",
                value: "StudentCouncil",
              },
              {
                label: "슈퍼",
                value: "Super",
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="비밀번호" name="password" required>
          <Input.Password />
        </Form.Item>
        <Form.Item label="닉네임" name="nickname" required>
          <Input />
        </Form.Item>
        <Form.Item label="관리할 게시판" name="boardIds">
          <Select
            showSearch
            mode="multiple"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            options={getLeafBoardItems(data ?? [])}
          />
        </Form.Item>
        <Form.Item className={styles.submit}>
          <Button type="primary" htmlType="submit" size="large">
            완료
          </Button>

          {isEdit && (
            <Popconfirm
              title="정말 삭제하시겠습니까?"
              description="삭제하면 되돌릴 수 없습니다."
              okText="네"
              cancelText="아니오"
              onConfirm={handleClickRemove}
            >
              <Button type="primary" size="large" danger>
                삭제
              </Button>
            </Popconfirm>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default Admin;
