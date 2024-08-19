import http from "@/http";

export class CultureRest {
  async getAll(params: any): Promise<any> {
    return await http.get(`v2/management/crops`, { params });
  }
  async getById(id: number): Promise<any> {
    return await http.get(`v2/management/crop/${id}`);
  }
  async create(data: any): Promise<any> {
    return await http.post(`v2/management/crop`, data);
  }
  async update(id: number, data: any): Promise<any> {
    return await http.put(`v2/management/crop/${id}`, data);
  }
  async delete(id: number, Operation: string): Promise<any> {
    return await http.delete(`v2/management/crop/${id}`, {
      data: { Operation },
    });
  }
  async getStudiesByBasin(basinId: number): Promise<any> {
    return await http.get(`v2/management/studies/${basinId}`);
  }
  async createStudiesByBasin(basinId: number, studies: any): Promise<any> {
    return await http.post(`v2/management/studies/${basinId}`, {
      data: studies,
    });
  }
  async getWeightByBasin(basinIds: string, year: number): Promise<any> {
    const result = await http.get(
      `v2/census/weights/basin/${year}/${basinIds}`
    );
    return result.data;
  }
  async getGraphs(basinIds: number[], year: number): Promise<any> {
    const result = await http.post(`v2/census/water-cut`, {
      basin_ids: basinIds,
      year: year,
    });
    return result.data;
  }
  async calculate(basinIds: number[]): Promise<any> {
    const result = await http.post(`v2/census/weights/basin/calculate`, {
      basin_ids: basinIds,
    });
    return result.data;
  }
  async createWeightsByBasin(weights: any): Promise<any> {
    return await http.post(`v2/census/weights/basin`, weights);
  }
}
