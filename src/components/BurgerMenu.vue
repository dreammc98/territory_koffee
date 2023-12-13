<template>
  <div class="bg-[#ffd4a3] absolute top-[68px] right-3 text-base px-4 rounded-md whitespace-nowrap">
    <ul class="text-center py-1">
      <li
        class="align-middle py-2 border-b-[1px] border-black border-opacity-10 rounded-lg hover:text-white hover:bg-black hover:bg-opacity-10"
      >
        <div @click="switchBurger">Регистрация</div>
        <div v-show="false" class="text-center">Аккаунт <span>+7 999 99 99</span></div>
      </li>

      <li
        @click="activeLink(itemMenu)"
        v-for="itemMenu in menu"
        :key="itemMenu.id"
        class="align-center py-2 border-b-[1px] border-black border-opacity-10 rounded-lg hover:bg-black hover:bg-opacity-10 hover:text-white"
        :class="pathLink === itemMenu.path ? 'text-white' : ''"
      >
        {{ itemMenu.name }}
      </li>

      <li
        @click="logout"
        class="align-center py-2 rounded-lg hover:bg-black hover:bg-opacity-10 hover:text-white"
      >
        Выход
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { useWindowSize } from "@vueuse/core";
import LS from "@/localStorage/localStorage";

export default {
  data() {
    return {
      menu: [
        { name: "Каталог", id: 2, path: "/" },
        { name: "Акции", id: 3, path: "/promotions" },
        { name: "Истории заказов", id: 4, path: "/stories" },
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
    }),
    activeLink(item) {
      this.$router.push(item.path);
      this.setPathLink(item.path);
      LS.setStorage("activeLink", item.path);
      this.switchBurger();
    },

    widthFuse() {
      const { width } = useWindowSize();
      if (width.value > 767) {
        this.menu = this.menu.filter((e) => e.id > 3);
      }
    },

    logout() {
      this.switchBurger();
    },
  },

  computed: {
    ...mapState({
      burgerState: (state) => state.tracking.burgerState,
      pathLink: (state) => state.tracking.pathLink,
    }),
  },

  created() {
    this.widthFuse();
    this.setPathLink(location.pathname);
  },
};
</script>

<style scoped></style>
;
