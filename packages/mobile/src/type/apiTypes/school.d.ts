declare namespace res {
  type School = {
    id: number;
    name: string;
    latitude: number;
    longtitude: number;
    address: string;
    // TODO: "S" | "N" | "E";
    school: string;
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
      // TODO: "S" | "N" | "E";
      area: string;
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
