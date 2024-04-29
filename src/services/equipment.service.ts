import http from "@/http";
import QueryParams from "@/interfaces/queryParams.interface";
import EquipmentsWithPagination from "@/interfaces/equipaments.interface";

export class EquipmentRest {
  async getAll(params: QueryParams): Promise<EquipmentsWithPagination> {
    const result = await http.get(`v1/equipments`, { params });
    return result.data;
  }
  async enableEquipment(
    id: number,
    enable: boolean
  ): Promise<EquipmentsWithPagination> {
    return await http.put(`v1/equipments/${id}`, { Enable: enable });
  }
  async getLatestEquipmentMeasurements(
    equipmentId: number,
    equipmentsType: string
  ): Promise<any> {
    const result = await http.get(`v1/equipments/measurements/${equipmentId}`, {
      params: { type: equipmentsType },
    });
    return result.data;
  }
  async updatePluvRead(id: number, data: any): Promise<any> {
    const result = await http.put(
      `v1/equipments/measurements/pluviometer/${id}`,
      data
    );
    return result.data;
  }
  async updateStationRead(id: number, data: any): Promise<any> {
    const result = await http.put(
      `v1/equipments/measurements/station/${id}`,
      data
    );
    return result.data;
  }

  async getAllOrgans(): Promise<EquipmentsWithPagination> {
    const result = await http.get(`v1/equipments/organ`);
    return result.data;
  }
  async createOrgan(data: any): Promise<any> {
    const result = await http.post(`v1/equipments/organ`, data);
    return result.data;
  }
  async deleteOrganById(id: any): Promise<any> {
    const result = await http.delete(`v1/equipments/organ`, { params: { id } });
    return result.data;
  }
}
