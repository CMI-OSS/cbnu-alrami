import { useState } from 'react';

import { Image as ImageType } from "@shared/swagger-api/generated";
import ImageModal from "src/components/shared/ImageModal";

import $ from "./style.module.scss";

type Props = {
  images: ImageType[]
}

function MapImageList({ images }: Props) {
  const [ order, setOrder ] = useState(0);
  const [ enlargeModal, setEnlargeModal ] = useState(false);
  const handleOpenModal = () => {
    setEnlargeModal(true);
  }

  return (
    <ul className={$.list}>
      {images.map((image) => {
        const { url } = image;
        return (
          <li key={url} className={$.item}>
            <button type="button" className={$.button} onClick={handleOpenModal}>
              <img className={$.image} src={url} alt="상세 이미지" />
            </button>
            {enlargeModal && (
                <ImageModal
                  {...{ order, setOrder, images }}
                  onClose={() => {
                    return setEnlargeModal(false);
                  }}
                />
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default MapImageList;
