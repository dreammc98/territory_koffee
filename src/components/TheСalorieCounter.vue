<template>
  <section v-for="product in selectedProduct" :key="product.id">
    <div
      v-if="
        product.energyAmount !== 'NaN' &&
        product.proteinsAmount !== 'NaN' &&
        product.fatAmount !== 'NaN' &&
        product.carbohydratesAmount !== 'NaN'
      "
      class="mt-3 leading-4 whitespace-nowrap"
    >
      <span class="font-medium text-lg whitespace-normal"
        >Калорийность "{{ product.product_name }}"</span
      >
      <div class="flex space-x-5">
        <div>
          <div class="text-lg font-semibold">
            {{ product.energyAmount && product.energyAmount !== "NaN" ? product.energyAmount : 0 }}
          </div>
          <div class="text-gray-800">Ккал</div>
        </div>
        <div>
          <div class="text-lg font-semibold">
            {{
              product.proteinsAmount && product.proteinsAmount !== "NaN"
                ? product.proteinsAmount
                : 0
            }}
          </div>
          <div class="text-gray-800">Белки, г</div>
        </div>
        <div>
          <div class="text-lg font-semibold">
            {{ product.fatAmount && product.fatAmount !== "NaN" ? product.fatAmount : 0 }}
          </div>
          <div class="text-gray-800">Жиры, г</div>
        </div>
        <div>
          <div class="text-lg font-semibold">
            {{
              product.carbohydratesAmount && product.carbohydratesAmount !== "NaN"
                ? product.carbohydratesAmount
                : 0
            }}
          </div>
          <div class="text-gray-800">Углеводы, г</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => {
    return {};
  },
  computed: {
    ...mapState({
      selectedProduct: (state) => state.product.selectedProduct,
    }),
  },
};
</script>

<style scoped></style>
;
