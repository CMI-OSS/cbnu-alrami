declare namespace res {
  type School = {
    id: number;
    name: string;
    latitude: number;
    longtitude: number;
    address: string;
    school: {
      id: number;
      createdAt: string;
      buildingNumber: string;
      oldBuildingNumber: string;
      area: string;
    };
    image: SchoolImage;
  };
  type SchoolById = {
    id: number;
    createdAt: string;
    type: string;
    name: string;
    latitude: number;
    longtitude: number;
    address: string;
    contact: string;
    description: string;
    tags: string;
    school: {
      id: number;
      createdAt: string;
      buildingNumber: string;
      oldBuildingNumber: string;
      area: string;
    };
    images: SchoolImage[];
  };
  type SchoolImage = {
    id: number;
    createdAt: string;
    url: string;
  };
}
