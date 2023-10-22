<template>
  <div class="map" @click="openStoreList">
    <img class="img__map" src="../assets/images/map.png" alt="" />
    <span class="map__text"> Меню {{ store }} </span>
  </div>
  <div class="modal" v-if="storesLoading">
    <div class="store__list" v-click-outside="closeStoreList" @click.stop>
      <h2>Выберите место, где вы хотите создать заказ</h2>
      <div class="store__menu">
        <div
          v-for="itemStore in stores"
          :key="itemStore.id"
          @click="getProductsList(itemStore.store_name)"
          class="store__items"
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
    <div class="overlay"></div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  mounted() {
    this.fetchStores();
  },
  data() {
    return {};
  },

  methods: {
    ...mapActions({
      fetchStores: "stores/fetchStores",
    }),
    ...mapMutations({
      openStoreList: "stores/openStoreList",
      closeStoreList: "stores/closeStoreList",
      setStore: "stores/setStore",
    }),
    getProductsList(store) {
      this.setStore(store);
      this.closeStoreList();
    },
  },
  computed: {
    ...mapState({
      store: (state) => state.stores.store,
      stores: (state) => state.stores.stores,
      storesLoading: (state) => state.stores.storesLoading,
    }),
  },
};
</script>

<style scoped>
.map {
  display: flex;
  cursor: pointer;
}
.map__text {
  display: flex;
  align-items: center;
  margin: 0 20px 0 5px;
}
.modal .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.6;
  z-index: 0;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.store__list {
  position: relative;
  z-index: 2;
  background: #f8dfa0;
  border-radius: 5px;
  opacity: 1;
}

.store__list h2 {
  margin: 20px;
}

.img__map {
  width: 28px;
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
