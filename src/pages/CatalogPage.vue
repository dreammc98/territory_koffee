<template>
  <food-categories />
  <card-product />
</template>

<script>
import FoodCategories from "@/components/FoodCategories.vue";
import CardProduct from "@/components/CardProduct.vue";

export default {
  components: {
    FoodCategories,
    CardProduct,
  },
  data() {
    return {};
  },
};
</script>

<style scoped></style>
;
