import http from "@/http";

export class NewsRest {
  async getAll(params: any): Promise<any> {
    const result = await http.get(`v1/news`, { params });
    return result.data;
  }
  async getById(id: number): Promise<any> {
    const result = await http.get(`v1/news/${id}`);
    return result.data;
  }
  async deleteById(id: number): Promise<any> {
    const result = await http.delete(`v1/news/${id}`);
    return result.data;
  }
  async create(data: any): Promise<any> {
    const result = await http.post(`v1/news`, data);
    return result.data;
  }
  async update(id: number, data: any): Promise<any> {
    const result = await http.put(`v1/news/${id}`, data);
    return result.data;
  }
}
