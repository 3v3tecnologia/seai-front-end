export default interface Equipments {
  Id: number;
  Code: string;
  Name: string;
  Type: {
    Id: number;
    Name: string;
  };
  Organ: {
    Id: number;
    Name: string;
  };
  Altitude: number;
  Location: {
    Coordinates: null | number[]; // You can replace 'null' with the actual type for coordinates
  };
  CreatedAt: string;
  UpdatedAt: string;
  Enable: boolean;
}

export default interface EquipmentsWithPagination {
  Data: {
    Equipments: Equipments;
    PageLimitRows: number;
    PageNumber: number;
    QtdPages: number;
    QtdRows: number;
  }

}
