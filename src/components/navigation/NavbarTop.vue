<template>
  <div class="flex flex-col items-start mb-5">
    <div
      class="p-3 w-full bg-white flex flex-row align-items-center justify-between w-100"
    >
      <LogoProject title-size="md" />
      <div class="align-items-center d-flex font-weight-bold pl-3">
        <div class="flex items-center justify-center gap-4" v-if="auth?.login">
          <div class="wrapper-sign-out relative">
            <i
              @click="toggleMenu()"
              title="configurações"
              class="pi pi-cog cursor-pointer text-[22px]"
            ></i>
            <div
              v-if="showMenu"
              ref="menuRef"
              class="absolute right-[0px] top-0 bg-white p-2 w-[150px] shadow-lg"
            >
              <router-link
                to=""
                class="d-flex align-items-center justify-content-center"
              >
                <Button
                  class="btn-simple w-full p-2 mt-2 hover:!text-black"
                  icon="pi pi-sign-out"
                  label="Sair"
                  @click="signOut"
                ></Button>
              </router-link>
            </div>
          </div>
        </div>
        <router-link v-else to="/login"> Login </router-link>
      </div>
    </div>

    <div v-if="auth?.login" class="w-full">
      <TabMenu v-model:activeIndex="active" :model="itemsRoutes" class="mb-2">
        <template #item="{ label, item, props }">
          <router-link
            v-if="item.route"
            v-slot="routerProps"
            :to="item.route"
            class="h-100"
          >
            <a
              :href="routerProps.href"
              v-bind="props.action"
              @click="($event) => routerProps.navigate($event)"
              @keydown.enter.space="($event) => routerProps.navigate($event)"
            >
              <span v-bind="props.label">{{ label }}</span>
            </a>
          </router-link>
        </template>
      </TabMenu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TabMenu from "primevue/tabmenu";
import LogoProject from "@/components/videntity/LogoProject.vue";
import { modulesSystem } from "@/constants";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import routes from "@/router/routes";

const router = useRouter();
const route = useRoute();

const currentRouteName = route.name;

const store = useStore();

const auth = computed(() => store.state.auth);
const authUser = computed(() => store.state.profile);

const signOut = () => store.dispatch("SIGN_OUT");
const showMenu = ref(false);
const menuRef = ref<HTMLElement | null>(null);

const active = computed({
  set(val) {
    // store.commit("SET_CURRENT_TAB", val);
  },
  get() {
    return store.state.currentTab;
  },
});

const itemsRoutesRaw = routes
  .filter((f: any) => f.meta?.ShowNav)
  .map((f) => {
    return {
      label: f.meta?.title,
      route: f.path,
      navBarTab: f?.meta?.navBarTab,
      modulesNeeded: f?.meta?.modulesNeeded?.[0] ?? null,
    };
  })
  .sort((a, b) => a.navBarTab - b.navBarTab);

const itemsRoutes = computed(() =>
  itemsRoutesRaw.map((v: any) => {
    if (v.modulesNeeded && !authUser.value?.modules[v?.modulesNeeded]?.read) {
      v.disabled = true;
    } else {
      v.disabled = false;
    }
    return v;
  })
);

const handleClickOutside = (event: MouseEvent) => {
  console.log(event.target, menuRef.value);
  if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
    showMenu.value = false;
    removeClick();
  }
};

function toggleMenu() {
  showMenu.value = !showMenu.value;
  setTimeout(() => addClick(), 200);
}

onBeforeUnmount(() => {
  removeClick();
});
function addClick() {
  document.addEventListener("click", handleClickOutside);
}
function removeClick() {
  document.removeEventListener("click", handleClickOutside);
}
</script>

<style lang="scss" scoped>
.nav-item {
  &,
  & > * {
    transition: all 0.3;
    color: black !important;
  }

  &:hover {
    text-decoration: underline !important;
  }

  &.router-link-exact-active {
    .chip-route {
      background-color: hsl(205deg 83% 20% / 60%);
      color: white !important;
    }
  }
}

.p-menuitem-link {
  height: 100%;
}

// .disabled-tab {
//   opacity: 0.5;
//   pointer-events: none;
// }
</style>
