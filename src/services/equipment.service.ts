import http from "@/http";
import QueryParams from "@/interfaces/queryParams.interface";
import EquipmentsWithPagination from "@/interfaces/equipaments.interface";

export class EquipmentRest {
  async getAll(params: QueryParams): Promise<EquipmentsWithPagination> {
    return await http.get(`v1/equipments`, { params });
  }
  async enableEquipment(
    id: number,
    enable: boolean
  ): Promise<EquipmentsWithPagination> {
    return await http.put(`v1/equipments/${id}`, { Enable: enable });
  }
  async getAllOrgans(): Promise<EquipmentsWithPagination> {
    return await http.get(`v1/equipments/organ`);
  }
}
