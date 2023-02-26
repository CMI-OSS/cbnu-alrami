import React from "react";

import { Close, Download } from "@components/atoms/icon";
import Slider from "@components/molecules/Slider";
import { Image as ImageType } from "@shared/swagger-api/generated";
import classnames from "classnames";
import { DefaultProps } from "src/type/props";

import $ from "./style.module.scss";

type Props = {
  images: ImageType[];
  order: number;
  setOrder: (prev: number) => void;
  onClose: (value: boolean) => void;
} & DefaultProps;

function ImageModal({ order, setOrder, onClose, images }: Props) {
  console.log({ order });

  return (
    <div className={classnames($["image-modal"], $.dimmed)}>
      <div className={$.header}>
        <div className={$.buttons}>
          <button type="button" className={$.download}>
            <Download size={16} stroke="#fff" />
          </button>
          <button
            type="button"
            className={$.close}
            onClick={() => {
              return onClose(false);
            }}
          >
            <Close size={16} stroke="#fff" />
          </button>
        </div>
      </div>
      <div className={$.body}>
        <Slider total={images.length} {...{ order, setOrder }}>
          <div>tmffkfd</div>
          {/* {images.map((image) => { */}
          {/*  const { url } = image; */}
          {/*  return <Image key={url} src={url} alt="공지사항 이미지" />; */}
          {/* })} */}
        </Slider>
      </div>
    </div>
  );
}

export default ImageModal;
