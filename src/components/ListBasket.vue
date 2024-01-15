<template>
  <div
    class="bg-white fixed sm:absolute text-base sm:rounded-md whitespace-nowrap sm:shadow-xl sm:border sm:w-[400px] sm:max-h-[500px] inset-0 sm:inset-auto sm:right-20 sm:pt-3 sm:top-[68px]"
  >
    <div class="bg-[#ffd09a] sm:hidden h-16 flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-white pl-2">Корзина</h1>
      <div @click="switchBasket">
        <img
          class="w-10 rotate-45 active:scale-75 duration-500"
          src="../assets/images/Plus.svg"
          alt="close"
        />
      </div>
    </div>

    <section
      v-if="cart.length > 0"
      class="max-h-[480px] overflow-auto sm:max-h-96 pr-2 pl-3 m:pr-4 m:pl-5 mt-5 sm:mt-0 cursor-default space-y-1"
    >
      <div
        v-for="cartItem in cart"
        :key="cartItem.line_id"
        :amount="cartItem.amount"
        class="flex justify-between border-b-2"
      >
        <div class="flex space-x-3">
          <div class="mb-2">
            <img
              class="rounded-md h-[110px] w-[75px] mn:h-[110px] mn:w-[90px]"
              :src="cartItem.image"
              alt=""
            />
            <div class="flex items-center justify-center mt-1">
              <span
                @click="removeCartItemBtn(cartItem.line_id)"
                class="text-sm font-medium cursor-pointer"
                >Удалить</span
              >
            </div>
          </div>

          <div class="max-w-[190px] space-y-3 whitespace-normal">
            <h2 class="font-bold mb-2">{{ cartItem.name }}</h2>
            <div
              v-if="cartItem.modifiers && cartItem.modifiers.length > 0"
              class="text-xs leading-4 mb-2"
            >
              <h3 class="font-semibold">Добавки:</h3>
              <div
                v-for="modifier in cartItem.modifiers"
                :key="modifier.id"
                class="flex flex-wrap whitespace-nowrap"
              >
                {{ modifier.name }}
              </div>
            </div>

            <div class="flex items-center w-6">
              <img
                @click="changeAmountBut(cartItem.line_id, 'decrease')"
                @touchstart.stop
                class="cursor-pointer"
                src="../assets/images/Minus.svg"
                alt="Minus"
              />
              <span class="mx-1 text-2xl">
                {{ cartItem.amount }}
              </span>
              <img
                @click="changeAmountBut(cartItem.line_id, 'increase')"
                @touchstart.stop
                class="cursor-pointer"
                src="../assets/images/Plus.svg"
                alt="Plus"
              />
            </div>
          </div>
        </div>
        <div class="flex items-end text-lg font-medium text-orange-900">
          {{ cartItem.price * cartItem.amount }} ₽
        </div>
      </div>
    </section>

    <div v-if="cart.length > 0" class="text-center mb-2 pt-2">
      <button
        @click="order"
        class="text-center bg-[#FFD4A3] px-16 py-2 shadow-sm rounded-md mb-1 sm:mb-0 hover:bg-opacity-90 active:scale-90 duration-300"
      >
        Заказать <span class="text-base font-semibold ml-6">{{ cartTotal }} ₽</span>
      </button>
    </div>
    <transition name="check">
      <checkout-modal v-if="checkoutState" />
    </transition>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import CheckoutModal from "@/components/CheckoutModal.vue";

export default {
  components: {
    CheckoutModal,
  },

  methods: {
    order() {
      this.changeCheckout();
    },

    changeAmountBut(lineId, action) {
      this.changeAmount({ line_id: lineId, action: action });
      this.calculateCartTotal();
      this.cartCount();
    },

    removeCartItemBtn(lineId) {
      this.removeCartItem({ line_id: lineId });
      this.calculateCartTotal();
      this.cartCount();

      if (this.cart.length === 0) {
        this.switchBasket();
      }
    },

    ...mapMutations({
      switchBasket: "tracking/switchBasket",
      changeAmount: "product/changeAmount",
      calculateCartTotal: "product/calculateCartTotal",
      cartCount: "product/cartCount",
      removeCartItem: "product/removeCartItem",
      changeCheckout: "checkout/changeCheckout",
    }),
  },

  computed: {
    ...mapState({
      cart: (state) => state.product.cart,
      cartTotal: (state) => state.product.cartTotal,
      checkoutState: (state) => state.checkout.checkoutState,
    }),
  },
  created() {
    console.log(this.checkoutState);
  },
};
</script>

<style scoped>
::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}

::-webkit-scrollbar-thumb {
  background: gray;
  border-radius: 5px;
}

.check-enter-active {
  transition: all 0.3s ease-out;
}

.check-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.check-enter-from,
.check-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
