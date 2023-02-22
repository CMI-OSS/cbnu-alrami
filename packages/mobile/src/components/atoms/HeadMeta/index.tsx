import { Helmet } from "react-helmet";

const BASE_HEAD_META = {
  description: "빠르고 정확한 충북대학교 공지사항 알림이",
  keywords: "충북대학교, 충림이, 공지사항, 어플",
  url: "https://dev-mobile.cmi.kro.kr",
  title: "충북대학교 공지사항 알림이",
  siteName: "충림이",
  href: "/src/assets/favicon/favicon-16x16.png",
  type: "website",
  image: "/src/assets/favicon/favicon-16x16.png",
};

type Props = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
};

function HeadMeta({ title, description, image, url }: Props) {
  return (
    <Helmet>
      <title>{title ?? BASE_HEAD_META.title}</title>
      <meta
        content="width=device-width, initial-scale=1.0, maximum-scale=1"
        name="viewport"
      />
      <meta
        name="description"
        content={description ?? BASE_HEAD_META.description}
      />
      <link rel="icon" href={BASE_HEAD_META.href} />
      <meta name="keywords" content={BASE_HEAD_META.keywords} />
      <meta property="og:type" content={BASE_HEAD_META.type} />
      <meta property="og:title" content={title ?? BASE_HEAD_META.title} />
      <meta property="og:site_name" content={title ?? BASE_HEAD_META.title} />
      <meta property="og:image" content={image ?? BASE_HEAD_META.image} />
      <meta
        property="og:description"
        content={description ?? BASE_HEAD_META.description}
      />
      <meta property="og:url" content={url ?? BASE_HEAD_META.url} />
      <meta name="twitter:title" content={title ?? BASE_HEAD_META.title} />
      <meta
        name="twitter:description"
        content={description ?? BASE_HEAD_META.description}
      />
      <meta property="twitter:image" content={image ?? BASE_HEAD_META.image} />
    </Helmet>
  );
}

export default HeadMeta;
