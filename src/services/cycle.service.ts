import http from "@/http";

export class CycleRest {
  async getByCultureId(cultureId: number): Promise<any> {
    return await http.get(`v2/management/crop/cycles/${cultureId}`);
  }
  async createByCultureId(id: number, data: any): Promise<any> {
    return await http.post(`v2/management/crop/cycles/${id}`, { data });
  }
}
