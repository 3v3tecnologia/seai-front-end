<template>
  <div class="w-full flex flex-col justify-center items-center">
    <div
      v-if="!loading"
      class="w-full max-w-[1600px] px-4 flex justify-start mt-4"
    >
      <HeaderTable
        @onSearchItem="searchUsers"
        :selectItems="usersSelects"
        @onSelectItem="selectUsers"
      >
        <div>
          <Button
            icon="pi pi-plus"
            label="Criar"
            class="btn-primary"
            @click="goTo()"
          ></Button>
        </div>
      </HeaderTable>
    </div>
    <ProgressSpinner v-if="loading" />
    <div v-else class="w-full max-w-[1600px] px-4 min-w-[350px]">
      <div class="mt-6">
        <Dtable
          :infoTable="usersTable"
          :dataValue="users"
          :loadingTable="loadingTable"
          @onEditItem="goTo"
          @onDeleteItem="deleteUser"
        />
        <!-- <Pagination
          :rows="equipments?.PageLimitRows"
          :totalRecords="equipments?.QtdRows"
          @onHandlePageChange="handlePageChange"
        /> -->
      </div>
    </div>
  </div>
</template>
<script setup>
import Dtable from "@/components/tables/Dtable";
import HeaderTable from "@/components/tables/HeaderTable";
import Pagination from "@/components/pagination/pagination.vue";
import { ref, onMounted } from "vue";
import { usersTable } from "@/utils/tables/users";
import { UsersRest } from "@/services/users.service";
import moment from "moment";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const router = useRouter();

const limit = ref(7);
const users = ref({});
const usersSelects = ref([]);
const loading = ref(false);
const loadingTable = ref(false);
const usersTypes = ref({
  placeholder: "Filtrar por tipo",
  optionLabel: "Name",
  paramsName: "idType",
  items: [
    { Name: "Todos", Id: 0 },
    { Name: "Básico", Id: 1 },
    { Name: "Admin", Id: 2 },
  ],
});
const usersRest = new UsersRest();
const params = ref({
  pageNumber: 0,
  limit: limit.value,
  name: null,
});

onMounted(() => {
  loading.value = true;
  getAllUsers();
  usersSelects.value.push(usersTypes.value);
});

function getAllUsers() {
  usersRest.getAll(params.value).then((res) => {
    users.value = res.data.data;
    loading.value = false;
    loadingTable.value = false;
    adjustmentUsersValue();
  });
}

function adjustmentUsersValue() {
  users.value.forEach((element) => {
    element.type = tradutionType(element.type);
    element.createdAt = convertDate(element.createdAt);
    element.actions = ["edit", "delete"];
  });
  users.value[0].actions = ["edit"];
}

function tradutionType(type) {
  return type === "standard" ? "Básico" : "Admin";
}

function convertDate(date) {
  return moment(date).format("DD/MM/YYYY");
}

function searchUsers(searchTerm) {
  if (searchTerm.length >= 3 || searchTerm.length === 0) {
    params.value.name = searchTerm.length >= 3 ? searchTerm : null;
    params.value.limit = limit.value;
    params.value.pageNumber = 0;
    loadingTable.value = true;
    getAllUsers();
  }
}

function handlePageChange(page) {
  params.value.pageNumber = page;
  loadingTable.value = true;
  getAllUsers();
}
function selectUsers(paramsName, paramsValue) {
  params.value.limit = limit.value;
  params.value.pageNumber = 0;
  params.value[paramsName] = paramsValue > 0 ? paramsValue : null;
  getAllUsers();
}
function updateEquipment(equipment) {
  //   enableEquipment(equipment.Id, equipment.Enable);
}
function goTo(id = 0) {
  router.push({ name: "create-user", params: { id: id === 0 ? null : id } });
}
function deleteUser(id) {
  usersRest
    .deleteById(id)
    .then(() => {
      toast.success("Usuário deletado");
      getAllUsers();
    })
    .catch(() => {
      toast.error("Não foi possível deletar o usuário");
    });
}
</script>
