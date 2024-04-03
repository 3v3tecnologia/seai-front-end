import http from "@/http";
import { Locations } from "@/interfaces/Locations.interface";

export class CensusRest {
  async getLocations(id: number): Promise<Locations> {
    return await http.get(`v1/census/locations`);
  }
}
