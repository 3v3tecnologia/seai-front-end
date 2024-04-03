interface City {
  Id: number;
  Local: string;
  IdBacia: number;
}
interface Basin {
  Id: number;
  Local: string;
}
interface Locations {
  data: {
    Bacia: Basin[];
    Municipios: City[];
  };
}

export { City, Basin, Locations };
