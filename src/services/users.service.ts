import http from "@/http";
import QueryParams from "@/interfaces/queryParams.interface";

export class UsersRest {
  async getAll(params: QueryParams): Promise<any> {
    const result = await http.get(`v1/user`, { params });
    return result.data;
  }
  async create(data: any): Promise<any> {
    return await http.post(`v1/user`, data);
  }
  async completeRegister(data: any, code: string): Promise<any> {
    return await http.patch(`v1/user/complete-registration/${code}`, data);
  }
  async changePassword(data: any, code: string): Promise<any> {
    return await http.post(`v1/user/password/reset/${code}`, data);
  }
  async update(id: number, data: any): Promise<any> {
    return await http.patch(`v1/user/${id}`, data);
  }
  async getById(id: number): Promise<any> {
    const result = await http.get(`v1/user/${id}`);
    return result.data;
  }
  async deleteById(id: number, Operation: string): Promise<any> {
    const result = await http.delete(`v1/user/${id}`, {
      data: { Operation },
    });
    return result.data;
  }
}
