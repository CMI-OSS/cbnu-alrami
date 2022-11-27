import { Helmet } from "react-helmet-async";

type Props = {
  title: string;
};

function HeadMeta({ title }: Props) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta
        content="width=device-width, initial-scale=1.0, maximum-scale=1"
        name="viewport"
      />
      <meta
        name="description"
        content="빠르고 정확한 충북대학교 공지사항 알림이"
      />
      <link rel="icon" href="/src/assets/favicon/favicon-16x16.png" />
      <meta name="keywords" content="충북대학교, 충림이, 공지사항, 어플" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="충북대학교 공지사항 알림이" />
      <meta property="og:site_name" content="충림이" />
      <meta
        property="og:description"
        content="빠르고 정확한 충북대학교 공지사항 알림이"
      />
      <meta property="og:url" content="https://dev-mobile.cmi.kro.kr" />
      <meta name="twitter:title" content="충북대학교 공지사항 알림이" />
      <meta
        name="twitter:description"
        content="빠르고 정확한 충북대학교 공지사항 알림이"
      />
    </Helmet>
  );
}

export default HeadMeta;
