<template>
  <div class="bg-[#ffd4a3] absolute top-[68px] right-3 text-base px-4 rounded-md whitespace-nowrap">
    <ul class="text-center py-1">
      <li
        class="align-middle py-2 border-b-[1px] border-black border-opacity-10 rounded-lg"
        :class="
          isAuthorized ? '' : 'hover:text-white hover:bg-black hover:bg-opacity-10 cursor-pointer'
        "
      >
        <div v-if="!isAuthorized" @click="changeAccountStatus(), switchBurger()">Аккаунт</div>
        <div v-else class="text-center cursor-default">{{ nameAc }}</div>
      </li>

      <li
        @click="activeLink(itemMenu)"
        v-for="itemMenu in menu"
        :key="itemMenu.id"
        class="cursor-pointer align-center py-2 border-b-[1px] border-black border-opacity-10 rounded-lg hover:bg-black hover:bg-opacity-10 hover:text-white"
        :class="pathLink === itemMenu.path ? 'text-white' : ''"
      >
        {{ itemMenu.name }}
      </li>
      <li
        v-if="isAuthorized"
        @click="changeDeleteState()"
        class="cursor-pointer align-center py-2 border-b-[1px] border-black border-opacity-10 rounded-lg hover:bg-black hover:bg-opacity-10 hover:text-white"
      >
        Удалить аккаунт
      </li>

      <li
        v-if="isAuthorized"
        @click="logout"
        class="cursor-pointer align-center py-2 rounded-lg hover:bg-black hover:bg-opacity-10 hover:text-white"
      >
        Выход
      </li>
    </ul>
    <transition name="delete">
      <delete-modal v-if="deleteState" />
    </transition>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { useWindowSize } from "@vueuse/core";
import LS from "@/localStorage/localStorage";
import DeleteModal from "./DeleteModal.vue";

export default {
  components: { DeleteModal },
  data() {
    return {
      menu: [
        { name: "Каталог", id: 2, path: "/" },
        { name: "Акции", id: 3, path: "/promotions" },
        { name: "Истории заказов", id: 4, path: "/stories", reg: "reg" },
        { name: "Оставить отзыв", id: 5, path: "/review" },
        { name: "Сообщить о технической проблеме", id: 6, path: "/support" },
      ],
      locURL: "",
    };
  },

  methods: {
    ...mapMutations({
      switchBurger: "tracking/switchBurger",
      setPathLink: "tracking/setPathLink",
      changeAccountStatus: "account/changeAccountStatus",
      exitAccount: "account/exitAccount",
      storageAccount: "account/storageAccount",
      changeDeleteState: "account/changeDeleteState",
    }),
    activeLink(item) {
      this.$router.push(item.path);
      this.setPathLink(item.path);
      LS.setStorage("activeLink", item.path);
      this.switchBurger();
    },

    widthFuse() {
      const { width } = useWindowSize();
      if (!this.isAuthorized) {
        this.menu = this.menu.filter((item) => item.reg !== "reg");
      }
      if (width.value > 767) {
        this.menu = this.menu.filter((e) => e.id > 3);
      }
    },

    logout() {
      this.switchBurger();
      this.exitAccount();
    },
  },

  computed: {
    ...mapState({
      burgerState: (state) => state.tracking.burgerState,
      pathLink: (state) => state.tracking.pathLink,
      nameAc: (state) => state.account.name,
      isAuthorized: (state) => state.account.isAuthorized,
      deleteState: (state) => state.account.deleteState,
    }),
  },

  created() {
    this.widthFuse();
    this.setPathLink(location.pathname);
    console.log(this.menu);
  },
};
</script>

<style scoped>
.delete-enter-active {
  transition: all 0.3s ease-out;
}

.delete-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.delete-enter-from,
.delete-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
;
