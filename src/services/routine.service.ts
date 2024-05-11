import http from "@/http";

export class RoutineRest {
  async getAll(params: any): Promise<any> {
    const result = await http.get(`v1/jobs`, { params });
    return result.data;
  }
  async getById(id: number): Promise<any> {
    const result = await http.get(`v1/jobs`, {
      params: { id: id },
    });
    return result.data;
  }
  async deleteById(id: number): Promise<any> {
    const result = await http.delete(`v1/jobs/${id}`);
    return result.data;
  }
  async create(data: any): Promise<any> {
    const result = await http.post(`v1/jobs`, data);
    return result.data;
  }
  async update(id: number, data: any): Promise<any> {
    const result = await http.put(`v1/jobs/${id}`, data);
    return result.data;
  }
  async getAllSchedule(params: any): Promise<any> {
    const result = await http.get(`v1/jobs/schedule`, { params });
    return result.data;
  }
  async getScheduleById(id: number): Promise<any> {
    const result = await http.get(`v1/jobs/schedule`, {
      params: { id: id },
    });
    return result.data;
  }
  async deleteScheduleById(id: number): Promise<any> {
    const result = await http.delete(`v1/jobs/schedule/${id}`);
    return result.data;
  }
  async createSchedule(data: any): Promise<any> {
    const result = await http.post(`v1/jobs/schedule`, data);
    return result.data;
  }
  async updateSchedule(id: number, data: any): Promise<any> {
    const result = await http.put(`v1/jobs/schedule/${id}`, data);
    return result.data;
  }
}
