import { Helmet } from "react-helmet";

import { HEAD_META_INFOMATION } from "src/constants";

type Props = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
};

function HeadMeta({
  title = "충북대학교 공지사항 알림이",
  description,
  image,
  url,
}: Props) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta
        content="width=device-width, initial-scale=1.0, maximum-scale=1"
        name="viewport"
      />
      <meta
        name="description"
        content={description ?? HEAD_META_INFOMATION.description}
      />
      <link rel="icon" href={HEAD_META_INFOMATION.href} />
      <meta name="keywords" content={HEAD_META_INFOMATION.keywords} />
      <meta property="og:type" content={HEAD_META_INFOMATION.type} />
      <meta property="og:title" content={title ?? HEAD_META_INFOMATION.title} />
      <meta
        property="og:site_name"
        content={title ?? HEAD_META_INFOMATION.title}
      />
      <meta property="og:image" content={image ?? HEAD_META_INFOMATION.image} />
      <meta
        property="og:description"
        content={description ?? HEAD_META_INFOMATION.description}
      />
      <meta property="og:url" content={url ?? HEAD_META_INFOMATION.url} />
      <meta
        name="twitter:title"
        content={title ?? HEAD_META_INFOMATION.title}
      />
      <meta
        name="twitter:description"
        content={description ?? HEAD_META_INFOMATION.description}
      />
      <meta
        property="twitter:image"
        content={image ?? HEAD_META_INFOMATION.image}
      />
    </Helmet>
  );
}

export default HeadMeta;
