<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center">
    <section
      v-for="product in selectedProduct"
      :key="product.id"
      v-click-outside="outsideExit"
      class="fixed md:w-[710px] md:h-[600px] bg-white md:rounded-xl"
    >
      <span class="hidden md:block">
        <the-loader
          v-if="loader"
          class="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]"
        />
      </span>
      <div v-if="content" class="bg-[#ffd09a] md:hidden h-16 flex justify-between items-center">
        <h1 class="text-2xl font-semibold text-white pl-2">
          {{ content ? product.product_name : "" }}
        </h1>
        <div @click="outsideExit">
          <img
            class="w-10 rotate-45 active:scale-75 duration-500"
            src="../assets/images/Plus.svg"
            alt="close"
          />
        </div>
      </div>

      <div
        v-if="content"
        class="flex flex-col md:items-center md:justify-between max-h-[500px] md:max-h-full overflow-auto md:overflow-hidden"
      >
        <div class="md:flex md:pt-6 md:px-2 md:mb-4 leading-6">
          <div class="flex flex-col md:pl-7 md:mr-8">
            <div class="mx-auto mt-2 md:m-0">
              <img class="rounded-lg md:w-full h-[400px]" :src="product.image" alt="Image" />
            </div>
            <span class="hidden md:block">
              <TheСalorieCounter />
            </span>
          </div>

          <div class="px-4 md:px-0 md:pr-4">
            <div class="md:h-[495px] md:w-[329px] md:overflow-auto py-1">
              <h1 class="hidden md:block text-2xl font-semibold">{{ product.product_name }}</h1>
              <div>
                <p v-if="product.product_description" class="">{{ product.product_description }}</p>
                <p v-else class=""><i>Описание отсутствует</i></p>
              </div>

              <form
                id="coffee-detail"
                v-for="groups in product.options"
                :key="groups.id"
                class="mt-4 pr-1"
              >
                <section
                  @change="setRadioOption"
                  v-if="groups.max_amount === 1"
                  :value="groups.min_amount === 1 || groups.required ? groups.values[0].id : ``"
                  class="space-y-2"
                >
                  <h3 class="text-lg font-semibold">{{ groups.name }}</h3>
                  <label
                    v-for="option in groups.values"
                    :id="option.id"
                    :key="option.id"
                    @click="calcRadioPrice(option)"
                    class="flex items-center justify-between whitespace-nowrap cursor-pointer"
                  >
                    <section
                      class="flex"
                      :allow-empty-selection="
                        groups.min_amount === 1 || groups.required ? `false` : `true`
                      "
                      :value="groups.min_amount === 1 || groups.required ? groups.values[0].id : ``"
                    >
                      <input
                        type="radio"
                        name="option"
                        :id="'input' + option.id"
                        class="w-4 cursor-pointer"
                        :value="
                          groups.min_amount === 1 || groups.required ? groups.values[0].id : ``
                        "
                      />
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
                    :value="option.id"
                    class="flex items-center justify-between whitespace-nowrap cursor-pointer"
                    @change="calculatePrice(option)"
                    :checked="
                      (groups.min_amount === 1 || groups.required) && groups.values[0] === option
                        ? `true`
                        : `false`
                    "
                  >
                    <section class="flex">
                      <input type="checkbox" class="w-4 cursor-pointer" />
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
            <span class="md:hidden">
              <TheСalorieCounter />
            </span>

            <div class="hidden md:block self-end whitespace-nowrap">
              <p class="flex justify-end font-semibold text-lg">{{ calcPrice }} ₽</p>

              <div class="flex justify-end">
                <button
                  @click.once="sendForProcessing"
                  class="whitespace-nowrap px-16 py-2 shadow-[0_4px_4px_rgba(0,0,0,0.05)] bg-[#edc69a] text-white rounded-full text-lg cursor-pointer hover:bg-[#d5b28b]"
                >
                  ДОБАВИТЬ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="content" class="md:hidden self-end whitespace-nowrap">
        <div class="flex justify-center">
          <button
            @click="sendForProcessing"
            class="my-1 space-x-10 whitespace-nowrap px-16 py-2 shadow-[0_4px_4px_rgba(0,0,0,0.05)] bg-[#edc69a] text-white rounded-full text-lg cursor-pointer hover:bg-[#d5b28b]"
          >
            <span>ДОБАВИТЬ</span> <span>{{ calcPrice + " ₽" }}</span>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import TheLoader from "./UI/TheLoader.vue";
import TheСalorieCounter from "./TheСalorieCounter";
// import LS from "@/localStorage/localStorage";

export default {
  data: () => {
    return {
      selectedOptions: [],
      calcPrice: 0,
      priceRadio: 0,
      arrProductsBasket: [],
      radioId1: null,
      radioId2: null,
      checkboxOptions: null,
      productData: {},
      boolRadio: false,
    };
  },
  components: { TheLoader, TheСalorieCounter },
  methods: {
    ...mapMutations({
      switchProdModal: "product/switchProdModal",
    }),
    ...mapActions({
      addToCart: "product/addToCart",
    }),

    setRadioOption(e) {
      const hiddenInput = e.target;

      if ("createEvent" in document) {
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("change", false, true);
        hiddenInput.dispatchEvent(evt);
      } else {
        hiddenInput.fireEvent("onchange");
      }
    },

    outsideExit() {
      this.switchProdModal();
      this.$router.go(-1);
    },

    async sendForProcessing() {
      const params = {};
      const wholeList = this.selectedProduct.product;
      const arrOption_2 = [];

      params.id = [`${wholeList.id}`];

      const form = document.getElementById("coffee-detail"); //Вся карточка
      const formData = new FormData(form);
      const options = [];

      for (let option_1 of formData.entries()) {
        if (option_1 !== null) {
          this.radioId1 = option_1[1];
          options.push(option_1[1]);
        }
      }

      for (let option_2 of this.selectedOptions) {
        if (option_2 !== null) {
          arrOption_2.push(JSON.stringify(option_2.id));
          options.push(JSON.stringify(option_2.id));
        }
      }

      if (arrOption_2.length > 0) {
        this.checkboxOptions = arrOption_2.join();
      }
      if (this.radioId2) {
        options.push(this.radioId2);
      }

      if (this.radioId1 || this.checkboxOptions || this.radioId2) {
        options.filter((item) => typeof item === "string");

        params.options = [...new Set(options)];
      }
      params.price = [JSON.stringify(wholeList.price)];

      this.addToCart(params);
      setTimeout(() => {
        this.outsideExit();
      }, 300);
    },

    calculatePrice(option) {
      let productData = { id: option.id, price: option.price, name: option.name };
      let pricePlus = { price: productData.price, symbol: "plus" };
      let priceMinus = { price: productData.price, symbol: "minus" };

      if (this.selectedOptions.length === 0) {
        this.selectedOptions.push(productData);
        this.changeCalcPrice(pricePlus);
      } else {
        if (this.selectedOptions.find((category) => category.id === productData.id)) {
          this.selectedOptions = this.selectedOptions.filter((filt) => filt.id !== productData.id);
          this.changeCalcPrice(priceMinus);
        } else {
          this.selectedOptions.push(productData);
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
      // let input = document.getElementById(`${option.id}`);
      // let child = input.querySelector(`#input${option.id}`);

      // if (this.productData.id === option.id) {
      //   child.disabled = true;
      //   this.productData = {};
      //   if (option.parent_id !== 1) {
      //     this.calcPrice -= this.priceRadio;
      //     this.priceRadio = 0;
      //   }
      //   return;
      // }

      this.productData = { id: option.id, price: option.price, name: option.name };
      if (option.parent_id === 1) {
        return;
      }
      if (this.priceRadio === 0) {
        this.calcPrice += option.price;
        this.priceRadio = option.price;
      } else {
        this.calcPrice -= this.priceRadio;
        this.calcPrice += option.price;
        this.priceRadio = option.price;
      }

      this.radioId2 = JSON.stringify(this.productData.id);
    },

    setPathUrl() {
      const pathName = window.location.pathname.split("/").length;
      if (pathName === 2) {
        let translitFood = this.translitFood;
        this.$router.push({ path: `${window.location.pathname}/${translitFood}` });
      }
    },
  },
  computed: {
    ...mapState({
      selectedProduct: (state) => state.product.selectedProduct,
      loader: (state) => state.product.loader,
      content: (state) => state.product.content,
      priceFood: (state) => state.product.priceFood,
      translitFood: (state) => state.product.translitFood,
    }),
  },
  watch: {
    loader() {
      this.calcPrice = this.priceFood;
      this.setPathUrl();
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
