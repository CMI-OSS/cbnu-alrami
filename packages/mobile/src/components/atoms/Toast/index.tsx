import { Toaster } from "react-hot-toast";

function Toast() {
  return (
    <Toaster
      position="bottom-center"
      reverseOrder={false}
      containerStyle={{
        bottom: 72,
      }}
    />
  );
}

export default Toast;
