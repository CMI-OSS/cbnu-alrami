import { PlaceSchoolDto } from "@shared/swagger-api/generated";
import { useSchoolsQuery } from "src/hooks/api/school";
import DetailGroup from "src/page/Place/DetailGroup";

import getUpperCasePosition from "./getUpperCasePosition";

type Props = { position: string };

function PlaceDetailBody({ position }: Props) {
  const currentPosition = getUpperCasePosition(position);

  const { data: schoolsData } = useSchoolsQuery(
    { area: currentPosition },
    { suspense: true },
  );

  if (!schoolsData) return null;

  const schoolDatas = schoolsData.filter((item: PlaceSchoolDto) => {
    return (
      item?.school.area === currentPosition || currentPosition === undefined
    );
  });

  return <DetailGroup schoolDatas={schoolDatas} />;
}

export default PlaceDetailBody;
