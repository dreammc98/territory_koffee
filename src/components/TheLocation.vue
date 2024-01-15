<template>
  <div class="flex justify-between" @click="storeListStateChange()" @touchstart.stop>
    <div class="flex items-center space-x-1">
      <img src="../assets/images/location.png" alt="location" class="h-6" />
      <span class="cursor-pointer whitespace-nowrap"> Меню {{ store }} </span>
    </div>
  </div>
  <transition name="store">
    <store-list-modal v-if="storesState" class="z-50" />
  </transition>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import StoreListModal from "@/components/StoreListModal.vue";

export default {
  components: {
    StoreListModal,
  },

  methods: {
    ...mapActions({
      fetchStores: "stores/fetchStores",
    }),

    ...mapMutations({
      storeListStateChange: "stores/storeListStateChange",
    }),
  },

  computed: {
    ...mapState({
      store: (state) => state.stores.store,
      storesState: (state) => state.stores.storesState,
    }),
  },
  beforeMount() {
    this.fetchStores();
  },
};
</script>

<style scoped>
.store-enter-active {
  transition: all 0.3s ease-out;
}

.store-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.store-enter-from,
.store-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
;
