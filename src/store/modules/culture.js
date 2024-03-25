import http from "@/http";
import { toast } from "vue3-toastify";

export default {
  state: () => ({
    list: {
      data: [],
      apiPagination: {
        pages: 1,
        total: 0,
      },
    },
    update: {},
  }),
  mutations: {
    ["SET_LIST_CULTURE"](state, list) {
      state.list = list;
    },
    ["SET_CURRENT_CULTURE"](state, culture) {
      state.update = culture;
    },
  },
  actions: {
    GET_CULTURES: {
      async handler({ commit }, filters) {
        try {
          if (!filters || filters.length === 0 || filters.length >= 3) {
            const {
              data: { data },
            } = await http.get(
              `v2/management/crop?name=${filters ? filters : ""}`
            );

            data.map((item) => (item.Basin = item.locationName));
            commit("SET_LIST_CULTURE", {
              data,
            });
          }
        } catch (e) {
          console.error(e);
          toast.error("Cultura não encontrada");
        }
      },
    },
    CREATE_CULTURE: {
      async handler(_, form) {
        try {
          const { name, data } = form;

          const farm = {
            Name: name,
          };
          const res = await http.post(`v2/management/crop`, farm);
          await http.post(`v2/management/crop/cycles/${res.data.data}`, {
            data: data,
          });
          toast.success("Cultura criada com sucesso!");
        } catch (e) {
          toast.error("Falha ao criar rotina");
          throw Error(e?.response?.data?.error);
        }
      },
    },
    UPDATE_CULTURE: {
      async handler(_, form) {
        try {
          const { name, id } = form;

          const data = {
            name,
            id,
          };

          await http.put(`v2/management/crop/${id}`, data);
          toast.success("Cultura atualizada com sucesso");
        } catch (e) {
          console.error(e);
          toast.error("Falha ao atualizar rotina");
          throw Error(e?.response?.data?.error);
        }
      },
    },
    GET_CURRENT_CULTURE: {
      async handler({ commit, dispatch, state }, id) {
        try {
          const culture = await http.get(`v2/management/crop/${id}`);
          const cycle = await http.get(`v2/management/crop/cycles/${id}`);
          const data = {
            culture: culture.data,
            cycle: cycle.data,
          };
          commit("SET_CURRENT_CULTURE", data);
        } catch (e) {
          commit("SET_CURRENT_CULTURE", {});
          console.log("errou aqui");
          toast.error(e);
        }
      },
    },
    DELETE_CULTURES: {
      async handler(_, id) {
        try {
          await http.delete(`v1/management/crop/${id}`);
          toast.success(`Cultura  deletado`);
        } catch (e) {
          console.error(e);
          toast.error("Falha ao deletar cultura");
          throw Error(e?.response?.data?.error);
        }
      },
    },
  },
};
