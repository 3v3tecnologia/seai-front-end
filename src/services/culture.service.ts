import http from "@/http";

export class CultureRest {
  async getById(id: number): Promise<any> {
    return await http.get(`v2/management/crop/${id}`);
  }
  async create(data: any): Promise<any> {
    return await http.post(`v2/management/crop`, data);
  }
  async update(id: number, data: any): Promise<any> {
    return await http.put(`v2/management/crop/${id}`, data);
  }
  async getStudiesByBasin(basinId: number): Promise<any> {
    return await http.get(`v2/management/studies/${basinId}`);
  }
  async createStudiesByBasin(basinId: number, studies: any): Promise<any> {
    return await http.post(`v2/management/studies/${basinId}`, {
      data: studies,
    });
  }
}
