import http from "@/http";

export class LogsRest {
  async getAll(params: any): Promise<any> {
    const result = await http.get(`v1/logs`, { params });
    return result.data;
  }
}
