import http from "@/http";
import QueryParams from "@/interfaces/queryParams.interface";

export class UsersRest {
  async getAll(params: QueryParams): Promise<any> {
    const result = await http.get(`v1/user`, { params });
    return result.data;
  }
  async create(data: any): Promise<any> {
    return await http.post(`v1/user/register`, data);
  }
  async update(id: number, data: any): Promise<any> {
    return await http.put(`v1/user/${id}`, data);
  }
  async getById(id: number): Promise<any> {
    const result = await http.get(`v1/user/list`, { params: { userId: id } });
    return result.data;
  }
  async deleteById(id: number): Promise<any> {
    const result = await http.delete(`v1/user/delete`, { params: { id } });
    return result.data;
  }
}
