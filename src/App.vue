<template>
  <the-navbar />
  <main class="max-w-screen-xl m-auto">
    <router-view></router-view>
  </main>
</template>

<script>
import TheNavbar from "@/components/TheNavbar";
import { mapActions, mapState } from "vuex";

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
};
</script>

<style>
* {
  font-family: "Graphik", sans-serif;
  -webkit-tap-highlight-color: transparent;
}
</style>
