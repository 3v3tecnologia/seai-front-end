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
    ["SET_LIST_STUDY"](state, list) {
      state.list = list;
    },
    ["SET_CURRENT_STUDY"](state, culture) {
      state.update = culture;
    },
  },
  actions: {
    GET_STUDYS: {
      async handler({ commit }, basin) {
        console.log(basin);
        try {
          const { data } = await http.get(
            `v2/management/studies/${basin.value}`
          );
          console.log(data);
          // const apiPagination = {
          //   pages,
          //   total,
          //   pageLimit,
          // };

          commit("SET_LIST_STUDY", {
            data,
            // apiPagination,
          });
        } catch (e) {
          console.error(e);
          toast.error("Erro ao buscar culturas");
        }
      },
    },
    UPDATE_STUDY: {
      async handler(_, form) {
        try {
          const {
            name,
            cron_text_formatted,
            priority,
            retryLimit,
            retryDelay,
          } = form;

          const data = {
            name,
            cron: cron_text_formatted.value,
            data: null,
            options: {
              priority,
              retryLimit,
              retryDelay,
            },
          };

          await http.put(`v1/jobs/schedule/`, data);
          toast.success("Pesos atualizados com sucesso");
        } catch (e) {
          console.error(e);
          toast.error("Falha ao atualizar rotina");
          throw Error(e?.response?.data?.error);
        }
      },
    },
    GET_CURRENT_STUDY: {
      async handler({ commit, dispatch, state }, basin) {
        try {
          console.log("pediu os dados de estudo viu ", basin);
          await dispatch("GET_STUDYS", basin);

          const culture = state.list.data;
          console.log(culture);

          commit("SET_CURRENT_STUDY", {
            currentBasin: basin,
            studys: culture.data,
          });
        } catch (e) {
          console.error("Falhou ao pegar dados de peso");
          commit("SET_CURRENT_STUDY", {});
          console.error(e);
          toast.error(e);
        }
      },
    },
  },
};
