<template>
  <div
    class="bg-white fixed sm:absolute text-base sm:rounded-md whitespace-nowrap sm:shadow-xl sm:border sm:w-[400px] sm:max-h-[500px] inset-0 sm:inset-auto sm:right-20 sm:pt-3 sm:top-[68px]"
  >
    <div class="bg-[#ffd09a] sm:hidden h-20 flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-white pl-2">Корзина</h1>
      <div @click="switchBasket" class="">
        <img
          class="w-10 rotate-45 active:scale-75 duration-500"
          src="../assets/images/Plus.svg"
          alt="close"
        />
      </div>
    </div>

    <section class="max-h-[480px] overflow-auto sm:max-h-96 pr-4 pl-5 mt-5 sm:mt-0 cursor-default">
      <div class="flex justify-between border-b-2">
        <div class="flex space-x-3">
          <div class="mb-2">
            <img class="rounded-md" src="http://placehold.it/90x90" alt="" />
            <div class="flex items-center justify-center mt-1">
              <button class="text-xs">Удалить</button>
            </div>
          </div>

          <div class="last:">
            <h2 class="font-bold mb-2">Овсяная каша</h2>
            <div class="text-xs leading-4 mb-2">
              <h3 class="font-semibold">Добавки:</h3>
              <div class="flex flex-wrap">
                <p>Банан 20г,</p>
                <p>Банан 20г,</p>
                <p>Банан 20г,</p>
                <p>Банан 20г,</p>
                <p>Банан 20г,</p>
              </div>
            </div>
            <the-counter>1</the-counter>
          </div>
        </div>
        <div class="flex items-end text-lg font-medium text-orange-900">110 ₽</div>
      </div>

      <div class="flex justify-between border-b-2 mb-2">
        <div class="flex space-x-3">
          <div class="mb-2">
            <img class="rounded-md" src="http://placehold.it/90x90" alt="" />
            <div class="flex items-center justify-center mt-1">
              <button class="text-xs">Удалить</button>
            </div>
          </div>

          <div>
            <h2 class="font-bold mb-2">Овсяная каша</h2>
            <div class="text-xs leading-4 mb-2">
              <h3 class="font-semibold">Добавки:</h3>
              <div class="flex flex-wrap">
                <p>Банан 20г,</p>
                <p>Банан 20г,</p>
                <p>Банан 20г,</p>
                <p>Банан 20г,</p>
                <p>Банан 20г,</p>
              </div>
            </div>
            <div class="flex items-center">
              <img class="w-5" src="../assets/images/Minus.svg" alt="Minus" />
              <span class="mx-2 font-medium text-lg">1</span>
              <img class="w-5" src="../assets/images/Plus.svg" alt="Plus" />
            </div>
          </div>
        </div>
        <div class="flex items-end text-lg font-medium text-orange-900">110 ₽</div>
      </div>

      <div class="flex justify-between border-b-2 mb-2">
        <div class="flex space-x-3">
          <div class="mb-2">
            <img class="rounded-md" src="http://placehold.it/90x90" alt="" />
            <div class="flex items-center justify-center mt-1">
              <button class="text-xs">Удалить</button>
            </div>
          </div>

          <div class="last:">
            <h2 class="font-bold mb-2">Овсяная каша</h2>
            <div class="text-xs leading-4 mb-2">
              <h3 class="font-semibold">Добавки:</h3>
              <div class="flex flex-wrap">
                <p>Банан 20г,</p>
                <p>Банан 20г,</p>
                <p>Банан 20г,</p>
                <p>Банан 20г,</p>
                <p>Банан 20г,</p>
              </div>
            </div>
            <div class="flex items-center">
              <img class="w-5" src="../assets/images/Minus.svg" alt="Minus" />
              <span class="mx-2 font-medium text-lg">1</span>
              <img class="w-5" src="../assets/images/Plus.svg" alt="Plus" />
            </div>
          </div>
        </div>
        <div class="flex items-end text-lg font-medium text-orange-900">110 ₽</div>
      </div>

      <div class="flex justify-between border-b-2 mb-2">
        <div class="flex space-x-3">
          <div class="mb-2">
            <img class="rounded-md" src="http://placehold.it/90x90" alt="" />
            <div class="flex items-center justify-center mt-1">
              <button class="text-xs">Удалить</button>
            </div>
          </div>

          <div class="last:">
            <h2 class="font-bold mb-2">Овсяная каша</h2>
            <div class="text-xs leading-4 mb-2">
              <h3 class="font-semibold">Добавки:</h3>
              <div class="flex flex-wrap">
                <p>Банан 20г,</p>
                <p>Банан 20г,</p>
                <p>Банан 20г,</p>
                <p>Банан 20г,</p>
                <p>Банан 20г,</p>
              </div>
            </div>
            <div class="flex items-center">
              <img class="w-5" src="../assets/images/Minus.svg" alt="Minus" />
              <span class="mx-2 font-medium text-lg">1</span>
              <img class="w-5" src="../assets/images/Plus.svg" alt="Plus" />
            </div>
          </div>
        </div>
        <div class="flex items-end text-lg font-medium text-orange-900">110 ₽</div>
      </div>
      <div class="flex justify-between border-b-2 mb-2">
        <div class="flex space-x-3">
          <div class="mb-2">
            <img class="rounded-md" src="http://placehold.it/90x90" alt="" />
            <div class="flex items-center justify-center mt-1">
              <button class="text-xs">Удалить</button>
            </div>
          </div>

          <div class="last:">
            <h2 class="font-bold mb-2">Овсяная каша</h2>
            <div class="text-xs leading-4 mb-2">
              <h3 class="font-semibold">Добавки:</h3>
              <div class="flex flex-wrap">
                <p>Банан 20г,</p>
                <p>Банан 20г,</p>
                <p>Банан 20г,</p>
                <p>Банан 20г,</p>
                <p>Банан 20г,</p>
              </div>
            </div>
            <div class="flex items-center">
              <img class="w-5" src="../assets/images/Minus.svg" alt="Minus" />
              <span class="mx-2 font-medium text-lg">1</span>
              <img class="w-5" src="../assets/images/Plus.svg" alt="Plus" />
            </div>
          </div>
        </div>
        <div class="flex items-end text-lg font-medium text-orange-900">110 ₽</div>
      </div>
      <div class="flex justify-between border-b-2 mb-2">
        <div class="flex space-x-3">
          <div class="mb-2">
            <img class="rounded-md" src="http://placehold.it/90x90" alt="" />
            <div class="flex items-center justify-center mt-1">
              <button class="text-xs">Удалить</button>
            </div>
          </div>

          <div class="last:">
            <h2 class="font-bold mb-2">Овсяная каша</h2>
            <div class="text-xs leading-4 mb-2">
              <h3 class="font-semibold">Добавки:</h3>
              <div class="flex flex-wrap">
                <p>Банан 20г,</p>
                <p>Банан 20г,</p>
                <p>Банан 20г,</p>
                <p>Банан 20г,</p>
                <p>Банан 20г,</p>
              </div>
            </div>
            <div class="flex items-center">
              <img class="w-5" src="../assets/images/Minus.svg" alt="Minus" />
              <span class="mx-2 font-medium text-lg">1</span>
              <img class="w-5" src="../assets/images/Plus.svg" alt="Plus" />
            </div>
          </div>
        </div>
        <div class="flex items-end text-lg font-medium text-orange-900">110 ₽</div>
      </div>
    </section>

    <div class="text-center mb-2 pt-2">
      <button
        @click="order"
        class="text-center bg-[#FFD4A3] px-16 py-2 shadow-sm rounded-md mb-1 sm:mb-0 hover:bg-opacity-90 active:scale-90 duration-300"
      >
        Заказать <span class="text-base font-semibold ml-6">380 ₽</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import TheCounter from "./UI/TheCounter.vue";

export default {
  components: { TheCounter },
  methods: {
    order() {
      this.switchBasket();
    },

    ...mapMutations({
      switchBasket: "tracking/switchBasket",
    }),
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
</style>
