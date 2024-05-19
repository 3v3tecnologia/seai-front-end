import http from "@/http";

export class FAQRest {
  async getAll(params: any): Promise<any> {
    const result = await http.get(`v1/faq/`, { params });
    return result.data;
  }
  async getById(id: number): Promise<any> {
    const result = await http.get(`v1/faq/${id}`);
    return result.data;
  }
  async create(data: any): Promise<any> {
    const result = await http.post(`v1/faq`, data);
    return result.data;
  }
  async update(id: number, data: any): Promise<any> {
    const result = await http.put(`v1/faq/${id}`, data);
    return result.data;
  }
  async deleteById(id: number): Promise<any> {
    const result = await http.delete(`v1/faq/${id}`);
    return result.data;
  }

  async getAllCategories(): Promise<any> {
    const result = await http.get(`v1/faq/categories`);
    return result.data;
  }
  async createCategories(data: any): Promise<any> {
    const result = await http.post(`v1/faq/categories`, data);
    return result.data;
  }
}
