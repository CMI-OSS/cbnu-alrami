import MapHeader from "@components/molecules/MapHeader";

import $ from "./style.module.scss";

function Call() {
  return (
    <>
      <MapHeader title="제보하기" />
      <textarea
        placeholder="내용을 입력해주세요"
        className={$.textarea}
      ></textarea>
    </>
  );
}

export default Call;
