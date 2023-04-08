import { PlaceSchoolDto } from "@shared/swagger-api/generated";
import { useSchoolQuery } from "src/hooks/api/school";
import DetailGroup from "src/page/Place/DetailGroup";

type Props = {position: string;}

function PlaceDetailBody({ position }: Props) {
  const currentPosition =
    position === "all" ? undefined : position.split("")[0].toUpperCase();
  
  const {
    data: schoolData,
  } = useSchoolQuery({
    area: currentPosition as PlaceSchoolDto["school"]["area"],
  });

  if (!schoolData) return null;

  const schoolDatas = schoolData.filter((item: PlaceSchoolDto) => {
    return (
      item?.school.area === currentPosition || currentPosition === undefined
    );
  });

  return (
    <DetailGroup schoolDatas={schoolDatas} />
  )
}

export default PlaceDetailBody;