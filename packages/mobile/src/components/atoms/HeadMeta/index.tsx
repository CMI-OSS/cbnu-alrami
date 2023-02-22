import { Helmet } from "react-helmet";

import { BASE_HEAD_META } from "src/constants";

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
