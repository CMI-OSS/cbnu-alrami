import { colors } from "@shared/styles/color";
import { hot } from "react-hot-loader";

function App() {
  console.log('테스트입니다')
  return <div>black: {colors.$black}</div>;
}

export default hot(module)(App);
