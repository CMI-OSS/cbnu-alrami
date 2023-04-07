import { Toaster } from "react-hot-toast";

import { useAppSelector } from "src/store";

function Toast() {
  const { hasFooter } = useAppSelector((state) => {
    return state.toastReducer;
  });

  return (
    <Toaster
      position="bottom-center"
      reverseOrder={false}
      containerStyle={{
        bottom: hasFooter ? 72 : 20,
      }}
    />
  );
}

export default Toast;
