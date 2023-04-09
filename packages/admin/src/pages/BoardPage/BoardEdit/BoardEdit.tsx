import { useMemo } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { ChildBoard } from "@shared/swagger-api/generated/models/ChildBoard";
import { CreateBoardDto } from "@shared/swagger-api/generated/models/CreateBoardDto";
import { ResponseBoardDto } from "@shared/swagger-api/generated/models/ResponseBoardDto";
import { BoardApiService } from "@shared/swagger-api/generated/services/BoardApiService";
import { Button, Form, Input, message, Popconfirm, Select } from "antd";

import styles from "./BoardEdit.module.scss";

type BoardForm = {
  id: number;
  name: string;
  url?: string;
  parentBoardId?: number | null;
};

const BoardEdit = () => {
  const [ form ] = Form.useForm();
  const { boardId } = useParams();
  const isEdit = !!boardId;
  const [ messageApi, contextHolder ] = message.useMessage();

  const { data: boardTree } = useQuery([ "boards" ], () =>
    BoardApiService.boardControllerFind({ uuid: undefined }),
  );

  useQuery(
    [ "board", boardId || "" ],
    () => BoardApiService.boardControllerFindOne({ id: Number(boardId) }),
    {
      enabled: isEdit,
      refetchOnWindowFocus: false,
      onSuccess: (board) => {
        form.setFieldsValue(boardDtoToForm(board));
      },
    },
  );

  const allBoards = useMemo(() => {
    const concatBoard = (children: ChildBoard[] | undefined): ChildBoard[] => {
      if (!children) return [];

      return [
        ...children,
        ...children.map((board) => concatBoard(board.children)).flat(),
      ];
    };

    return concatBoard(boardTree);
  }, [ boardTree ]);

  const formToBoardDto = (v: BoardForm) => {
    const createBoardDto: CreateBoardDto = {
      id: Number(v.id),
      name: v.name,
      parentBoardId: v.parentBoardId ?? null,
      url: v.url,
    };
    return createBoardDto;
  };

  const boardDtoToForm = (board: ResponseBoardDto): BoardForm => {
    const form: BoardForm = {
      id: board.id,
      name: board.name,
      url: board.url,
      parentBoardId: board.parent?.id,
    };
    return form;
  };

  const onSubmit = async (v: BoardForm) => {
    try {
      if (isEdit) {
        const { id, ...requestBody } = formToBoardDto(v);

        await BoardApiService.boardControllerUpdate({
          id: Number(boardId),
          requestBody,
        });
      } else {
        await BoardApiService.boardControllerCreate({
          requestBody: formToBoardDto(v),
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
    await BoardApiService.boardControllerRemove({
      id: Number(boardId),
    });

    window.history.back();
  };

  return (
    <div className={styles.wrapper}>
      {contextHolder}
      <h1 className={styles.title}>게시판 {isEdit ? "수정" : "등록"}</h1>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={onSubmit}
      >
        <Form.Item label="id" name="id" required>
          <Input type="number" />
        </Form.Item>
        <Form.Item label="게시판명" name="name" required>
          <Input />
        </Form.Item>
        <Form.Item label="부모 게시판" name="parentBoardId" required>
          <Select
            options={allBoards.map((board) => {
              return {
                value: board.id,
                label: `${board.id} - ${board.name}`,
              };
            })}
          />
        </Form.Item>
        <Form.Item label="URL" name="url">
          <Input />
        </Form.Item>
        <Form.Item>
          <div className={styles.submit}>
            <Button type="primary" htmlType="submit" size="large">
              완료
            </Button>
            {isEdit && (
              <Popconfirm
                title="정말 삭제하시겠습니까?"
                description="삭제하면 되돌릴 수 없습니다."
                onConfirm={handleClickRemove}
                okText="네"
                cancelText="아니오"
              >
                <Button type="primary" size="large" danger>
                  삭제
                </Button>
              </Popconfirm>
            )}
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BoardEdit;
