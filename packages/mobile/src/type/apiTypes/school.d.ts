declare namespace res {
  type School = {
    id: number;
    name: string;
    latitude: number;
    longtitude: number;
    address: string;
    school: "S" | "N" | "E";
    image: Image;
  };

  type SchoolDetail = {
    id: number;
    createdAt: string;
    type: "school" | "restaurant";
    name: string;
    latitude: number;
    longtitude: number;
    address: string;
    contact?: string;
    description?: string;
    tags?: string;
    school: {
      id: number;
      createdAt: string;
      buildingNumber: string;
      oldBuildingNumber: string;
      area: "S" | "N" | "E";
    };
    images: Image[];
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
