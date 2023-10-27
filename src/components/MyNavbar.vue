<template>
  <div class="navbar">
    <div style="display: flex">
      <div>
        <img src="http://placehold.it/45x45" alt="logo" class="logo" />
      </div>
      <ul class="links">
        <li @click="$router.push('/catalog')">Каталог</li>
        <li @click="$router.push('/promotions')">Акции</li>
        <li class="map" @click="storeListStateChange(true)">
          <img class="img__map" src="../assets/images/map.png" alt="" />
          <span class="map__text"> Меню {{ store }} </span>
        </li>
        <!-- <li @click="$router.push('/stories')">Истории заказов</li>
        <li @click="$router.push('/review')">Оставить отзывы</li>
        <li @click="$router.push('/support')">Техподдержка</li> -->
      </ul>
      <store-list-modal v-if="storesLoading" />
    </div>
    <div class="icons">
      <div @click="switchBasket" class="icon">
        <img src="../assets/images/basket.png" alt="" />
      </div>
      <list-basket
        v-if="basketState"
        v-click-outside="switchBasket"
        class="position-list__basket"
      />

      <div @click="storeRegChange" class="icon">
        <img style="width: 25px" src="../assets/images/account.png" alt="" />
      </div>
      <registration-modal v-if="regModal" />
    </div>
  </div>
</template>

<script>
import StoreListModal from "@/components/StoreListModal.vue";
import ListBasket from "@/components/ListBasket.vue";
import RegistrationModal from "@/components/RegistrationModal.vue";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  components: {
    StoreListModal,
    ListBasket,
    RegistrationModal,
  },

  methods: {
    ...mapActions({
      fetchStores: "stores/fetchStores",
    }),

    ...mapMutations({
      storeListStateChange: "stores/storeListStateChange",
      storeRegChange: "regWindow/storeRegChange",
      switchBasket: "basket/switchBasket",
    }),
  },

  computed: {
    ...mapState({
      store: (state) => state.stores.store,
      storesLoading: (state) => state.stores.storesLoading,
      regModal: (state) => state.regWindow.regModal,
      basketState: (state) => state.basket.basketState,
    }),
  },

  mounted() {
    this.fetchStores();
    //   setTimeout(() => {
    //     if (this.openModal === true) {
    //       return;
    //     }
    //     this.switchModal();
    //   }, 5000);
    // },
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
  margin-left: 5px;
}

.img__map {
  width: 28px;
}

.navbar {
  display: flex;
  justify-content: space-between;
  background: #f8dfa0;
  padding: 10px 60px;
}

.logo {
  border-radius: 100%;
  margin-right: 10px;
}
.links {
  list-style-type: none;
  display: flex;
  align-items: center;
  padding: 4px;
}

.links li {
  margin-left: 15px;
  font-size: 16px;
  cursor: pointer;
}

.icons {
  display: flex;
  align-items: center;
  margin-right: 0;
}

.icon {
  margin-left: 30px;
}
.icon img {
  width: 30px;
  cursor: pointer;
}

.position-list__basket {
  position: absolute;
  right: 60px;
  top: 55px;
}
</style>
;
