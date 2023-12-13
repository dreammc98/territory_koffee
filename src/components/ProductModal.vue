<template>
  <the-modal>
    <section
      v-for="product in selectedProduct"
      :key="product.id"
      v-click-outside="switchProdModal"
      class="fixed inset-0 md:inset-auto md:w-[710px] md:h-[600px] bg-white md:rounded-xl"
    >
      <the-loader
        v-if="loader"
        class="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]"
      />

      <div class="bg-[#ffd09a] md:hidden h-16 flex justify-between items-center">
        <h1 class="text-2xl font-semibold text-white pl-2">
          {{ content ? product.product_name : "" }}
        </h1>
        <div @click="switchProdModal" class="">
          <img
            class="w-10 rotate-45 active:scale-75 duration-500"
            src="../assets/images/Plus.svg"
            alt="close"
          />
        </div>
      </div>

      <div
        v-if="content"
        class="flex flex-col md:items-center md:justify-between max-h-[520px] md:max-h-full overflow-auto md:overflow-hidden"
      >
        <div class="md:flex md:pt-6 md:px-2 md:mb-4 leading-6">
          <div class="flex flex-col md:pl-7 md:mr-8">
            <div class="mx-auto mt-2 md:m-0">
              <img class="rounded-lg md:w-full h-[400px]" :src="product.image" alt="Image" />
            </div>

            <div
              v-if="
                product.energyAmount !== 'NaN' &&
                product.proteinsAmount !== 'NaN' &&
                product.fatAmount !== 'NaN' &&
                product.carbohydratesAmount !== 'NaN'
              "
              class="hidden md:block mt-3 leading-4 whitespace-nowrap"
            >
              <span class="font-medium text-lg whitespace-normal"
                >Калорийность "{{ product.product_name }}"</span
              >
              <div class="flex space-x-5">
                <div>
                  <div class="text-lg font-semibold">
                    {{
                      product.energyAmount && product.energyAmount !== "NaN"
                        ? product.energyAmount
                        : 0
                    }}
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
          </div>

          <div class="px-4 md:px-0 md:pr-4">
            <div class="md:h-[495px] md:w-[329px] md:overflow-auto py-1">
              <h1 class="hidden md:block text-2xl font-semibold">{{ product.product_name }}</h1>
              <div>
                <p v-if="product.product_description" class="">{{ product.product_description }}</p>
                <p v-else class=""><i>Описание отсутствует</i></p>
              </div>

              <form v-for="groups in product.options" :key="groups.id" class="mt-4 pr-1">
                <section v-if="groups.max_amount === 1" class="space-y-2">
                  <h3 class="text-lg font-semibold">{{ groups.name }}</h3>
                  <label
                    v-for="option in groups.values"
                    :key="option.id"
                    class="flex items-center justify-between whitespace-nowrap cursor-pointer"
                    @change="calcRadioPrice(option)"
                  >
                    <section class="flex">
                      <input type="radio" name="option" class="w-4" />
                      <p class="ml-2 text-base font-normal md:font-medium">
                        {{ option.name }}
                      </p>
                    </section>

                    <section class="mr-0">
                      <p v-if="option.price > 0">{{ option.price }} руб.</p>
                      <p v-else>&nbsp;</p>
                    </section>
                  </label>
                </section>

                <section v-else-if="groups.max_amount > 1" class="space-y-2">
                  <h3 class="text-lg font-semibold">{{ groups.name }}</h3>
                  <label
                    v-for="option in groups.values"
                    :key="option.id"
                    class="flex items-center justify-between whitespace-nowrap cursor-pointer"
                    @change="calculatePrice(option)"
                  >
                    <section class="flex">
                      <input type="checkbox" class="w-4" />
                      <p class="ml-2 text-base font-normal md:font-medium">
                        {{ option.name }}
                      </p>
                    </section>
                    <section class="mr-0">
                      <p v-if="option.price > 0">{{ option.price }} руб.</p>
                      <p v-else>&nbsp;</p>
                    </section>
                  </label>
                </section>
              </form>
            </div>

            <div class="self-end whitespace-nowrap">
              <p class="flex justify-end font-semibold text-lg">{{ calcPrice }} ₽</p>

              <div class="flex justify-end">
                <the-counter class="w-6 mr-16"><span class="mx-2 text-xl">2</span></the-counter>
                <button
                  @click="switchProdModal"
                  class="whitespace-nowrap px-16 py-2 shadow-[0_4px_4px_rgba(0,0,0,0.05)] bg-[#edc69a] text-white rounded-full text-lg cursor-pointer"
                >
                  ДОБАВИТЬ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </the-modal>
</template>

<script>
import TheModal from "./TheModal.vue";
import { mapState, mapMutations } from "vuex";
import TheLoader from "./UI/TheLoader.vue";
import TheCounter from "./UI/TheCounter.vue";

export default {
  data: () => {
    return {
      selectedOptions: [],
      calcPrice: 0,
      priceRadio: 0,
    };
  },
  components: { TheModal, TheLoader, TheCounter },
  methods: {
    ...mapMutations({
      switchProdModal: "product/switchProdModal",
    }),

    calculatePrice(option) {
      let idPrice = { id: option.id, price: option.price };
      let pricePlus = { price: idPrice.price, symbol: "plus" };
      let priceMinus = { price: idPrice.price, symbol: "minus" };

      if (this.selectedOptions.length === 0) {
        this.selectedOptions.push(idPrice);
        this.changeCalcPrice(pricePlus);
      } else {
        console.log(this.selectedOptions.find((category) => category.id === 8));
        if (this.selectedOptions.find((category) => category.id === idPrice.id)) {
          this.selectedOptions = this.selectedOptions.filter((filt) => filt.id !== idPrice.id);
          this.changeCalcPrice(priceMinus);
        } else {
          this.selectedOptions.push(idPrice);
          this.changeCalcPrice(pricePlus);
        }
      }
    },

    changeCalcPrice(value) {
      if (value.symbol === "plus") {
        this.calcPrice += value.price;
      } else if (value.symbol === "minus") {
        this.calcPrice -= value.price;
      }
    },
    calcRadioPrice(option) {
      if (option.parent_id === 1) {
        return;
      }
      if (this.priceRadio === 0) {
        this.calcPrice += option.price;
        this.priceRadio = option.price;
        console.log("первый ");
      } else {
        this.calcPrice -= this.priceRadio;
        this.calcPrice += option.price;
        this.priceRadio = option.price;
        console.log("второй");
      }
    },
  },
  computed: {
    ...mapState({
      selectedProduct: (state) => state.product.selectedProduct,
      loader: (state) => state.product.loader,
      content: (state) => state.product.content,
      priceFood: (state) => state.product.priceFood,
    }),
  },
  watch: {
    loader() {
      this.calcPrice = this.priceFood;
    },
  },
};
</script>

<style scoped>
::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}

:hover::-webkit-scrollbar-thumb {
  background: gray;
  border-radius: 5px;
}
</style>
;
