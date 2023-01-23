import { useEffect, useMemo, useState } from "react";

import { useDebounceInput } from "src/hooks";
import { useAppDispatch, useAppSelector } from "src/store";

import { setContent } from "../ArticleWrite.store";
import WriteContentView, { Props as ViewProps } from "./WriteContent.view";

export default function WriteContent() {
  const { content } = useAppSelector((state) => state.ArticelWriteReducer);
  const [ text, setText ] = useState<string>(content);

  const debounceSetText = useDebounceInput<string>(setText);
  const dispatch = useAppDispatch();

  const viewProps: ViewProps = useMemo(
    () => ({
      content,
      onChangeContent: (newContent) => {
        debounceSetText(newContent);
      },
    }),
    [ content ],
  );

  useEffect(() => {
    dispatch(setContent({ content: text }));
  }, [ text ]);

  return <WriteContentView {...viewProps} />;
}
