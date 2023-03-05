import { useAppDispatch, useAppSelector } from "src/store";

import { setTitle } from "../ArticleWrite.store";
import TitleView, { Props as ViewProps } from "./WriteTitle.view";

export default function Title() {
  const dispatch = useAppDispatch();
  const { title } = useAppSelector((state) => state.ArticelWriteReducer);

  const viewProps: ViewProps = {
    text: title,
    onChangeText: (e) => {
      dispatch(setTitle({ title: e.target.value }));
    },
    placeholder: "제목을 입력하세요.",
  };

  return <TitleView {...viewProps} />;
}
