import { useLocation } from "react-router-dom";

type Props = {
  target: string;
};

function useSearch({ target }: Props) {
  return new URLSearchParams(useLocation().search).get(target);
}

export default useSearch;
