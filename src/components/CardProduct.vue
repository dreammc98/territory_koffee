<template>
  <the-loader v-if="loader" />

  <section v-if="!loader">
    <div
      v-if="stateContent"
      class="grid grid-cols-2 gap-4 px-2 m:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5"
    >
      <div
        class="text-lg text-center leading-6 cursor-pointer"
        @click="getProd(product.id), switchProdModal()"
        v-for="product in products"
        :key="product.id"
      >
        <img class="rounded-xl w-full" :src="product.image" alt="Product" />
        <h3 class="text-[#2d2d2d] font-medium">{{ product.product_name }}</h3>
        <span class="text-[#7A7A7A] text-base">от {{ product.price }}₽</span>
      </div>
    </div>

    <div v-if="!stateContent" class="text-center text-2xl"><p>Раздел пуст</p></div>
  </section>
  <transition name="product" class="duration-75">
    <product-modal v-if="prodModal" />
  </transition>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import ProductModal from "@/components/ProductModal.vue";
import TheLoader from "@/components/UI/TheLoader.vue";

export default {
  data() {
    return {
      stateContent: true,
    };
  },

  components: { ProductModal, TheLoader },
  methods: {
    getProd(id) {
      this.getProduct({ params: { id: id } });
    },

    ...mapActions({
      getProducts: "products/getProducts",
      getProduct: "product/getProduct",
    }),
    ...mapMutations({
      setIdProduct: "product/setId",
      switchProdModal: "product/switchProdModal",
    }),

    showProducts() {
      if (this.products.length === 0) {
        this.stateContent = false;
      } else {
        this.stateContent = true;
      }
    },
  },

  computed: {
    ...mapState({
      idFood: (state) => state.category.id,
      idStore: (state) => state.stores.id,
      products: (state) => state.products.products,
      prodModal: (state) => state.product.prodModal,
      loader: (state) => state.category.loader,
      productId: (state) => state.products.productId,
      finishLoad: (state) => state.products.finishLoad,
    }),

    paramsForProducts() {
      return { params: { id: this.idFood, shop_id: this.idStore } };
    },
  },

  watch: {
    idFood() {
      this.getProducts(this.paramsForProducts);
    },

    idStore() {
      setTimeout(() => {
        this.getProducts(this.paramsForProducts);
      }, 100);
    },
    products() {
      setTimeout(() => {
        this.showProducts();
      }, 500);
    },
    finishLoad() {
      if (window.location.pathname.split("/")[2]) {
        this.getProd(this.productId);
        this.switchProdModal();
      }
    },
  },
};
</script>

<style scoped>
.product-enter-active {
  transition: all 0.3s ease-out;
}

.product-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.product-enter-from,
.product-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
