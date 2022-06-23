import $ from "./style.module.scss";

type mapImageListType = {
  id: number;
  src: string;
  alt: string;
};

type Props = {
  mapImageList: mapImageListType[];
};

function MapImageList({ mapImageList }: Props) {
  return (
    <ul className={$.list}>
      {mapImageList.map((item) => (
        <li key={item.id} className={$.item}>
          <img className={$.image} src={item.src} alt={item.alt} />
        </li>
      ))}
    </ul>
  );
}

export default MapImageList;
