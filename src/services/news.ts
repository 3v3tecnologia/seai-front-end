import http from "@/http";

export class NewsRest {
  async getAll(): Promise<any> {
    const result = await http.get(`v1/news`);
    return result.data;
  }
  async create(data: any): Promise<any> {
    const result = await http.post(`v1/news`, data);
    return result.data;
  }
  async update(id: number, data: any): Promise<any> {
    const result = await http.put(`v1/news?id=${id}`, data);
    return result.data;
  }
}
