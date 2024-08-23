import http from "@/http";
import { Locations } from "@/interfaces/Locations.interface";

export class CensusRest {
  async getLocations(): Promise<Locations> {
    const result = await http.get(`v2/census/basin`);
    return result.data;
  }
  async getRegistered(): Promise<any> {
    const result = await http.get(`v1/census/census-takers/basin`);
    return result.data;
  }
  async getWorkers(): Promise<any> {
    const result = await http.get(`v1/census/workers/basin`);
    return result.data;
  }
  async getCaptationMonthly(): Promise<any> {
    const result = await http.get(`v1/census/captation/basin`);
    return result.data;
  }
}
