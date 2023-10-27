<template>
  <my-modal>
    <div class="wrapper" v-click-outside="closeModal">
      <div class="store__list">
        <h2>Выберите место, где вы хотите создать заказ</h2>
        <div class="store__menu">
          <div
            v-for="itemStore in stores"
            :key="itemStore.id"
            @click="getProductsList(itemStore.store_name)"
            class="store__items"
            :class="store === itemStore.store_name ? 'store__items_selected' : ''"
          >
            <div class="store__item store__item-left">
              {{ itemStore.store_name }}
            </div>
            <div class="store__item store__item-right">
              <span>{{ itemStore.time_from }} - {{ itemStore.time_to }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </my-modal>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import MyModal from "@/components/MyModal.vue";

export default {
  components: {
    MyModal,
  },

  methods: {
    ...mapActions({
      fetchStores: "stores/fetchStores",
    }),
    ...mapMutations({
      storeListStateChange: "stores/storeListStateChange",
      setStore: "stores/setStore",
    }),
    getProductsList(store) {
      this.setStore(store);
      this.storeListStateChange(false);
      this.$router.push("/catalog");
    },
    closeModal() {
      this.storeListStateChange(false);
    },
  },
  computed: {
    ...mapState({
      store: (state) => state.stores.store,
      stores: (state) => state.stores.stores,
      storesLoading: (state) => state.stores.storesLoading,
    }),
  },
  mounted() {
    this.fetchStores();
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
}

.store__list {
  z-index: 2;
  background: #f8dfa0;
  border-radius: 5px;
  opacity: 1;
}

.store__list h2 {
  margin: 20px;
}

.store__items {
  display: flex;
  justify-content: center;
  cursor: pointer;
  transition: all 0.5s ease;
  padding-left: 6px;
  padding-right: 6px;
}

.store__items:hover {
  background: rgba(221, 210, 14, 0);
  color: #787419;
  box-shadow: inset 0 0 0 3px #997c3a;
}
.store__items_selected {
  display: none;
}

.store__item {
  width: 100%;
  display: flex;
  font-size: 16px;
  padding-bottom: 20px;
  padding-top: 15px;
  border-bottom: solid rgb(100, 98, 98) 1px;
}

.store__item-left {
  justify-content: start;
  padding-left: 130px;
}
</style>
;
