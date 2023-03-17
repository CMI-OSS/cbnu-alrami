import { useState } from 'react';
import { NavLink } from "react-router-dom";

import { Plus } from "@components/atoms/icon";
import ImageModal from "@components/shared/ImageModal";
import { Image as ImageType } from "@shared/swagger-api/generated";

import $ from "./style.module.scss";

type Props = {
  images: ImageType[];
  name: string;
};

function ImageList({ images, name }: Props) {
  const [ order, setOrder ] = useState(0);
  const [ enlargeModal, setEnlargeModal ] = useState(false);
  const handleOpenModal = () => {
    setEnlargeModal(true);
  }
  return (
    <ul className={$["menu-list"]}>
      {images.map((item, index) => {
        return (
          <li key={item.id} className={$["menu-item"]}>
            <button type="button" className={$.button} onClick={handleOpenModal}>
              <img className={$["menu-image"]} src={item.url} alt={name} />
            </button>
            {enlargeModal && (
                <ImageModal
                  {...{ order, setOrder, images }}
                  onClose={() => {
                    return setEnlargeModal(false);
                  }}
                />
            )}
            {images.length >= 3 && index === images.length - 1 && (
              <NavLink to="/place/more" className={$["more-status"]} state={images} >
                <div className={$["more-plus"]}>
                  <Plus stroke="#fff" size={35} />
                  {/* <ImagePlus className={$["more-plus"]} /> */}
                  <span className={$["more-text"]}>더보기</span>
                </div>
              </NavLink>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default ImageList;
