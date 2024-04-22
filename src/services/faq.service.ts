import http from "@/http";

export class FAQRest {
  async getAll(): Promise<any> {
    const result = await http.get(`v1/faq/list`);
    return result.data;
  }
}
