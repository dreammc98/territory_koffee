<template>
  <div v-for="order in orders" :key="order.id" class="leading-5">
    <section class="rounded-lg p-3 border border-black my-2 mx-1 whitespace-normal">
      <div class="flex justify-between mb-2">
        <span>№{{ order.id }}</span>
        <span>{{ order.time }} {{ order.date }}</span>
      </div>
      <div v-for="product in order.items" :key="product.id">
        <div v-if="product !== false" class="mb-2">
          <div class="flex justify-between">
            <b v-if="product.name_product">{{ product.name_product }}</b>
            <span v-if="product.price_product"
              ><small v-if="product.amount > 1">{{ product.amount }}x</small>
              {{ product.price_product }} руб.</span
            >
          </div>
        </div>

        <div
          v-if="product.modifiers"
          class="flex flex-col"
          :class="order.items.length === 1 ? 'mb-2' : 'mb-6'"
        >
          <b>Добавки:</b>
          <span v-for="modifier in product.modifiers" :key="modifier.id">{{
            modifier.name_options
          }}</span>
        </div>
      </div>

      <div class="flex justify-between">
        <span>Статус заказа</span>
        <span>{{ order.status_order }}</span>
      </div>

      <div class="flex justify-between mb-2 text-[#61473B] font-semibold text-lg">
        <span>Итого</span>
        <span>{{ order.total_sum }} руб.</span>
      </div>

      <div v-if="order.bonuses > 0" class="flex justify-between">
        <span>Оплачено бонусами</span>
        <span>{{ order.bonuses }} руб.</span>
      </div>

      <div v-if="order.store && order.store.store_name" class="">{{ order.store.store_name }}</div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import LS from "@/localStorage/localStorage";

export default {
  data: () => {
    return {
      user: {},
    };
  },
  methods: {
    ...mapActions({
      getOrderHistory: "history/getOrderHistory",
    }),
  },

  computed: {
    ...mapState({
      orders: (state) => state.history.orders,
    }),
  },

  mounted() {
    this.user = LS.getStorage("userData");
    this.getOrderHistory(this.user.phone);
  },
};
</script>

<style scoped></style>
;
