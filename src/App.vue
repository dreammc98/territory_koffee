<template>
  <the-navbar />

  <main class="max-w-screen-xl m-auto">
    <router-view></router-view>
  </main>
</template>

<script>
import TheNavbar from "@/components/TheNavbar";
import { mapActions, mapState, mapMutations } from "vuex";
import LS from "@/localStorage/localStorage";

export default {
  name: "App",
  data() {
    return {
      locPath: location.pathname,
    };
  },
  components: {
    TheNavbar,
  },
  methods: {
    loadCart() {
      if (
        LS.getStorage("cartProduct") &&
        LS.getStorage("lineIdCount") &&
        LS.getStorage("cartTotal")
      ) {
        this.setCart(LS.getStorage("cartProduct"));
        this.setLineIdCount(LS.getStorage("lineIdCount"));
        this.setCartTotal(LS.getStorage("cartTotal"));
        this.cartCount();
      }
    },
    ...mapMutations({
      setCart: "product/setCart",
      setLineIdCount: "product/setLineIdCount",
      setCartTotal: "product/setCartTotal",
      cartCount: "product/cartCount",
    }),
    ...mapActions({
      fetchCategoryFood: "category/fetchCategoryFood",
    }),
  },

  computed: {
    ...mapState({
      idFood: (state) => state.category.id,
      startingPath: (state) => state.category.startingPath,
    }),
  },

  created() {
    this.loadCart();
  },
};
</script>

<style>
* {
  font-family: "Graphik", sans-serif;
  -webkit-tap-highlight-color: transparent;
}
</style>
