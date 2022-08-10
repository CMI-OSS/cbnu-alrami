import { useEffect, useState } from "react";
import { isAndroid, isIOS } from "react-device-detect";
import { Link } from "react-router-dom";

import Footer from "@components/molecules/Footer";
import { useSchedule } from "src/api/schedule";
import BorderBox from "src/components/atoms/BorderBox";
import { LeftArrow, Setting } from "src/components/atoms/icon";
import Weather from "src/page/Home/Weather";

import Notice from "./Notice";
import Restaurant from "./Restaurant";
import $ from "./style.module.scss";

function Home() {
  const { data } = useSchedule();
  const [ uuid, setUuid ] = useState("");
  const onMessageHandler = (e: any) => {
    const event = JSON.parse(e.data);
    setUuid(e.data); // Todo: uuid 보내는 api 연결
    localStorage.setItem("item", JSON.stringify(event));
  };

  useEffect(() => {
    if (window.ReactNativeWebView) {
      if (isAndroid) {
        document.addEventListener("message", onMessageHandler);
      }
      if (isIOS) {
        window.addEventListener("message", onMessageHandler);
      }
    }
  }, [ uuid ]);

  return (
    <section className={$.home}>
      <header className={$.header}>
        <div className={$["header-content"]}>
          <h1 className={$.title}>충림이</h1>
          <p>오늘은 총 6개의 일정이 있어요</p>
        </div>
        <Link to="/setting">
          <Setting size={24} stroke="#aaa" />
        </Link>
      </header>
      <div className={$.schedule}>
        {data?.data.map((schedule) => {
          return (
            <BorderBox key={schedule.id} width={271} height={101}>
              <p>{schedule.content}</p>
              <LeftArrow size={7} stroke="#aaa" />
            </BorderBox>
          );
        })}
      </div>
      <Weather />
      <Restaurant />
      <Notice />
      <Footer />
    </section>
  );
}

export default Home;
