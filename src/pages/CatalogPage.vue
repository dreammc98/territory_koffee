<template>
  <div class="sm:hidden mx-2 mt-2 p-4 rounded-2xl border flex justify-between">
    <the-location />
    <span @click="storeListStateChange" class="">Изменить</span>
  </div>

  <food-categories />
  <card-product />
</template>

<script>
import FoodCategories from "@/components/FoodCategories.vue";
import CardProduct from "@/components/CardProduct.vue";
import TheLocation from "@/components/TheLocation.vue";
import { mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {};
  },

  components: {
    FoodCategories,
    CardProduct,
    TheLocation,
  },

  methods: {
    ...mapMutations({
      storeListStateChange: "stores/storeListStateChange",
    }),
    ...mapActions({
      fetchCategoryFood: "category/fetchCategoryFood",
    }),
  },

  mounted() {
    this.fetchCategoryFood();
  },
};
</script>

<style scoped></style>
;
