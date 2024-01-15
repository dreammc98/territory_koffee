<template>
  <div
    class="fixed inset-0 select-none bg-black bg-opacity-50 z-[1000] flex items-center justify-center"
  >
    <div
      class="min-h-screen w-96 sm:min-h-fit bg-white px-2 py-16 rounded-md"
      v-click-outside="closeModal"
      @touchstart.stop
      @click.stop
    >
      <h2 class="text-lg font-bold leading-none px-10 mb-5 text-center">
        Выберите место, где вы хотите забрать заказ
      </h2>
      <div class="mb-2" v-for="itemStore in stores" :key="itemStore.id">
        <div
          @click="selectStore(itemStore)"
          class="flex items-center justify-between py-5 border-solid w-full rounded-lg"
          :class="
            itemStore.id === selectedStore
              ? 'border-2 border-[#ffd4a3] duration-0'
              : 'border-b-[1px] border-black border-opacity-20  duration-75 last:border-none'
          "
        >
          <div class="flex items-center space-x-2">
            <span class="pl-3"> {{ itemStore.store_name }}</span>
            <span v-if="itemStore.id === selectedStore"
              ><svg
                class="w-6 h-6 text-[#ffd4a3] text-2xl"
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
                  d="M4.5 12.75l6 6 9-13.5"
                ></path></svg
            ></span>
          </div>

          <span class="pr-2 text-[#e0ac08]"
            >{{ itemStore.time_from }} - {{ itemStore.time_to }}</span
          >
        </div>
      </div>

      <div class="text-center mt-6">
        <button
          @click="getProductsList()"
          class="bg-[#FFD4A3] py-3 px-24 rounded-lg hover:bg-[#f0b878] active:scale-95"
        >
          Выбрать
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      selectedStore: Number,
      fullStore: null,
    };
  },
  created() {
    this.getReactData();
  },

  methods: {
    getReactData() {
      if (this.getStorage()) {
        let storedShop = this.getStorage();
        this.setId(storedShop.id);
        this.selectedStore = storedShop.id;
        this.fullStore = storedShop;
      }
    },
    getProductsList() {
      this.setStore(this.fullStore.store_name);
      this.storeListStateChange();
      this.setId(this.fullStore.id);
      this.setStorage(this.fullStore);
    },

    getStorage() {
      return JSON.parse(localStorage.getItem("shop"));
    },

    setStorage(val) {
      localStorage.setItem("shop", JSON.stringify(val));
    },

    selectStore(item) {
      this.selectedStore = item.id;
      this.fullStore = item;
    },
    ...mapActions({
      fetchStores: "stores/fetchStores",
    }),
    ...mapMutations({
      storeListStateChange: "stores/storeListStateChange",
      setStore: "stores/setStore",
      setId: "stores/setId",
    }),

    closeModal() {
      this.storeListStateChange();
    },
  },
  computed: {
    ...mapState({
      store: (state) => state.stores.store,
      stores: (state) => state.stores.stores,
      storesLoading: (state) => state.stores.storesLoading,
      storeId: (state) => state.stores.id,
    }),
  },
  mounted() {
    // this.fetchStores();
  },
};
</script>

<style scoped></style>
;
