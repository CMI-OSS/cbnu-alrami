import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { CreateAdminDto } from "@shared/swagger-api/generated/models/CreateAdminDto";
import { AdminApiService } from "@shared/swagger-api/generated/services/AdminApiService";
import { Button, Form, Input, message, Select } from "antd";

import styles from "./Admin.module.scss";

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
        form.setFieldsValue(admin);
      },
    },
  );

  const onSubmit = async (admin: AdminForm) => {
    try {
      if (isEdit) {
        const { loginId, ...updateAdminDto } = admin;

        await AdminApiService.adminControllerUpdate({
          id: Number(adminId),
          requestBody: updateAdminDto,
        });
      } else {
        await AdminApiService.adminControllerCreate({
          requestBody: admin,
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
                label: "루트",
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
        <Form.Item className={styles.submit}>
          <Button type="primary" htmlType="submit" size="large">
            완료
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Admin;
