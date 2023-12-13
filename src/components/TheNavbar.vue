<template>
  <header class="bg-[#ffd09a] h-20">
    <div
      class="text-lg flex items-center justify-between px-2 md:px-9 py-1 max-w-screen-2xl m-auto max-w"
    >
      <div class="flex item-center">
        <div class="mr-6 pl-2">
          <img
            @click="$router.push(startingPath), setPathLink('/'), selectCategory({ id: 1 })"
            class="w-16 cursor-pointer"
            src="../assets/images/logo.svg"
            alt=""
          />
        </div>
        <ul class="flex items-center">
          <li
            class="hidden md:list-item hover:text-white active:scale-x-95"
            @click="$router.push(startingPath), setPathLink('/'), selectCategory({ id: 1 })"
          >
            <a href="#">Каталог</a>
          </li>
          <li
            class="hidden md:list-item mx-4 hover:text-white active:scale-x-95"
            @click="$router.push('/promotions'), setPathLink('/promotions')"
          >
            <a href="#">Акции</a>
          </li>
          <li class="hidden sm:block">
            <the-location />
          </li>
        </ul>
      </div>

      <div class="flex items-center justify-end">
        <div class="flex items-center space-x-3">
          <div @click="switchBasket" @touchstart.stop class="w-9 relative">
            <img class="cursor-pointer" src="../assets/images/basket.png" alt="basket" />
            <div
              class="cursor-pointer select-none absolute px-[4px] py-[2px] top-0 -right-1 text-xs bg-[#ffd4a3] font-medium text-white rounded-full align-middle drop-shadow-2xl border-[1px] border-black border-opacity-10 leading-none"
            >
              2
            </div>
          </div>

          <div class="hidden md:flex items-center w-8 cursor-pointer">
            <svg
              @click="switchBurger"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              ></path>
            </svg>
          </div>

          <div @click.stop class="md:hidden select-none">
            <svg
              @touchstart="switchBurger"
              class="w-12 text-white"
              :class="burgerState ? 'rotate-90 duration-500' : 'duration-200'"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              ></path>
            </svg>
          </div>

          <transition name="bur-men">
            <burger-menu v-if="burgerState" v-click-outside="switchBurger" />
          </transition>
        </div>
      </div>
    </div>
    <transition name="basket">
      <list-basket v-if="basketState" v-click-outside="switchBasket" />
    </transition>
    <registration-modal v-if="regModal" />
  </header>
</template>

<script>
import ListBasket from "@/components/ListBasket.vue";
import RegistrationModal from "@/components/RegistrationModal.vue";
import TheLocation from "@/components/TheLocation.vue";
import { mapState, mapMutations } from "vuex";
import BurgerMenu from "./BurgerMenu.vue";
import LS from "@/localStorage/localStorage";

export default {
  components: {
    ListBasket,
    RegistrationModal,
    TheLocation,
    BurgerMenu,
  },

  methods: {
    ...mapMutations({
      switchBurger: "tracking/switchBurger",
      switchForReg: "tracking/switchForReg",
      switchBasket: "tracking/switchBasket",
      setPathLink: "tracking/setPathLink",
      selectCategory: "category/selectCategory",
    }),

    getPathUrl() {
      LS.setStorage("activeLink", location.pathname);
    },
  },

  computed: {
    ...mapState({
      regModal: (state) => state.account.regModal,
      basketState: (state) => state.tracking.basketState,
      burgerState: (state) => state.tracking.burgerState,
      pathLink: (state) => state.tracking.pathLink,
      IdFood: (state) => state.category.id,
      startingPath: (state) => state.category.startingPath,
    }),
  },

  watch: {
    pathLink() {
      setTimeout(this.getPathUrl, 500);
    },
  },

  mounted() {
    //   setTimeout(() => {
    //     if (this.openModal === true) {
    //       return;
    //     }
    //     this.switchModal();
    //   }, 5000);
    // },
  },
};
</script>

<style scoped>
.bur-men-enter-active {
  transition: all 0.3s ease-out;
}

.bur-men-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.bur-men-enter-from,
.bur-men-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.basket-enter-active {
  transition: all 0.3s ease-out;
}

.basket-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.basket-enter-from,
.basket-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
