import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { CreatePlaceDto } from "@shared/swagger-api/generated/models/CreatePlaceDto";
import { PlaceSchoolDto } from "@shared/swagger-api/generated/models/PlaceSchoolDto";
import { SchoolDto } from "@shared/swagger-api/generated/models/SchoolDto";
import { PlaceApiService } from "@shared/swagger-api/generated/services/PlaceApiService";
import { Button, Form, Input, InputNumber, message, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { initImgList } from "src/pages/ArticlePage/ArticleWrite/ArticleWrite.store";
import UploadImage from "src/pages/ArticlePage/ArticleWrite/UploadImage/UploadImage";
import { useAppDispatch, useAppSelector } from "src/store";

import styles from "./Place.module.scss";

type PlaceForm = {
  name: string;
  longtitude: number;
  latitude: number;
  address: string;
  buildingNumber: string;
  oldBuildingNumber: string;
  area: SchoolDto.area;
  contact?: string;
  description?: string;
};

const Place = () => {
  const [ form ] = Form.useForm();
  const { placeId } = useParams();
  const { images } = useAppSelector((state) => state.ArticelWriteReducer);
  const isEdit = !!placeId;
  const [ messageApi, contextHolder ] = message.useMessage();

  const dispatch = useAppDispatch();

  useQuery(
    [ "place", placeId || "" ],
    () => PlaceApiService.placeControllerFindOneSchool({ id: Number(placeId) }),
    {
      enabled: isEdit,
      refetchOnWindowFocus: false,
      onSuccess: (place) => {
        form.setFieldsValue(placeDtoToForm(place));
        if (place.images) dispatch(initImgList(place.images));
      },
    },
  );

  const formToPlaceDto = (v: PlaceForm) => {
    const createPlaceDto: CreatePlaceDto = {
      name: v.name,
      address: v.address,
      latitude: v.latitude,
      longtitude: v.longtitude,
      contact: v.contact,
      description: v.description,
      school: {
        area: v.area,
        buildingNumber: v.buildingNumber,
        oldBuildingNumber: v.oldBuildingNumber,
      },
      imageIds: images ? images.map(({ id }) => id) : [],
    };
    return createPlaceDto;
  };

  const placeDtoToForm = (place: PlaceSchoolDto): PlaceForm => {
    const form: PlaceForm = {
      name: place.name,
      latitude: place.latitude,
      longtitude: place.longtitude,
      address: place.address,
      area: place.school.area,
      buildingNumber: place.school.buildingNumber,
      oldBuildingNumber: place.school.oldBuildingNumber,
      contact: place.contact,
      description: place.description,
    };
    return form;
  };

  const onSubmit = async (v: PlaceForm) => {
    try {
      if (isEdit) {
        await PlaceApiService.placeControllerUpdate({
          id: Number(placeId),
          requestBody: formToPlaceDto(v),
        });
      } else {
        await PlaceApiService.placeControllerCreate({
          requestBody: formToPlaceDto(v),
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
      <h1 className={styles.title}>학교 건물 {isEdit ? "수정" : "등록"}</h1>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={onSubmit}
      >
        <Form.Item label="건물이름" name="name" required>
          <Input />
        </Form.Item>
        <Form.Item label="위도" name="latitude" required>
          <InputNumber style={{ width: 300 }} />
        </Form.Item>
        <Form.Item label="경도" name="longtitude" required>
          <InputNumber style={{ width: 300 }} />
        </Form.Item>
        <Form.Item label="주소" name="address" required>
          <Input />
        </Form.Item>
        <Form.Item label="건물번호" name="buildingNumber" required>
          <Input />
        </Form.Item>
        <Form.Item label="(구)건물번호" name="oldBuildingNumber">
          <Input />
        </Form.Item>
        <Form.Item label="구역" name="area" initialValue="E" required>
          <Select
            options={[
              {
                label: "E",
                value: "E",
              },
              {
                label: "N",
                value: "N",
              },
              {
                label: "S",
                value: "S",
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="연락처" name="contact">
          <Input />
        </Form.Item>
        <Form.Item label="설명" name="description">
          <TextArea autoSize={{ minRows: 3, maxRows: 10 }} />
        </Form.Item>
        <Form.Item label="이미지">
          <UploadImage />
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

export default Place;
