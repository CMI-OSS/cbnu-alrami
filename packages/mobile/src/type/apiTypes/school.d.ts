declare namespace res {
  type School = {
    id: number;
    createAt: string;
    updateAt: string;
    name: string;
    latitude: number;
    longtitude: number;
    address: string;
    school: SchoolDetail;
    images: Image[];
  };

  type SchoolDetail = {
    id: number;
    type: "school" | "restaurant";
    createAt: string;
    updateAt: string;
    buildingNumber: string;
    oldBuildingNumber: string;
    area: string;
  };

  type Image = {
    id: number;
    createdAt: string;
    url: string;
  };
}

declare namespace req {
  type School = {
    placeId: number;
  };
}
