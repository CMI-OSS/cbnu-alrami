import { Close, Download } from "@components/atoms/icon";
import SwiperImage from "@components/molecules/SwiperImage";
import { Image as ImageType } from "@shared/swagger-api/generated";
import classnames from "classnames";
import { DefaultProps } from "src/type/props";
import { isFromApp } from "src/utils/webview";

import $ from "./style.module.scss";

type Props = {
  images: ImageType[];
  order: number;
  setOrder: (prev: number) => void;
  onClose: () => void;
} & DefaultProps;

function ImageModal({ order, setOrder, onClose, images }: Props) {
  // TODO: 백엔드 수정 후 확인필요
  const handleDownloadClick = async () => {
    const { id, url } = images[order - 1];

    if (isFromApp) {
      baseApp.postMessage(
        JSON.stringify({
          action: "image",
          url,
          preview: false,
        }),
      );
    } else {
      const response = await fetch(url);
      const file = await response.blob();
      const downloadUrl = window.URL.createObjectURL(file);
      const link = document.createElement("a");
      document.body.appendChild(link);
      link.download = `충림이이미지${id}`;
      link.href = downloadUrl;

      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    }
  };

  return (
    <div className={classnames($["image-modal"], $.dimmed)}>
      <div className={$.header}>
        <div className={$.buttons}>
          <button
            type="button"
            className={$.download}
            onClick={handleDownloadClick}
          >
            <Download size={16} stroke="#fff" />
          </button>
          <button type="button" className={$.close} onClick={onClose}>
            <Close size={16} stroke="#fff" />
          </button>
        </div>
      </div>
      <div className={$.body}>
        <SwiperImage
          className={$["modal-slider"]}
          imageDatas={images.map((image) => {
            return image.url;
          })}
          {...{ order, setOrder }}
        />
      </div>
    </div>
  );
}

export default ImageModal;
