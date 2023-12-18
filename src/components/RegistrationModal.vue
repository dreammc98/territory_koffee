<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center">
    <div
      class="bg-img max-w-[375px] max-h-[600px] flex item-center justify-center rounded-lg text-white py-36 px-4"
      v-click-outside="storeRegChange"
    >
      <!-- width: 355px;
      height: 550px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 7px; -->

      <!-- .wrapper-form {
          width: 300px;
          color: white;
        } -->
      <div>
        <h1 class="text-4xl font-semibold">Привет! ✌</h1>
        <p class="leading-5 my-4">
          Войдите, чтобы заказывать кофе заранее и пользоваться нашими акциями!
        </p>
        <form>
          <section>
            <label class="flex flex-col space-y-1 mb-4"
              ><span class="text-lg font-medium">Введите свой номер телефона</span>
              <input
                type="tel"
                v-maska
                data-maska="+7 (###) ###-##-##"
                placeholder="+7 ( ___ ) ___-__-__"
                required
                class="px-2 py-2 rounded-lg text-black"
              />
            </label>
          </section>

          <section>
            <label class="flex flex-col space-y-1 mb-3">
              <span class="text-lg font-medium">Как Вас зовут?</span>
              <input type="text" name="name" required class="px-2 py-2 rounded-lg text-black" />
            </label>
          </section>
          <button
            type="submit"
            class="w-full py-2 shadow-[0_4px_4px_rgba(0,0,0,0.05)] bg-[#edc69a] text-black font-medium rounded-md text-lg cursor-pointer hover:bg-[#d5b28b]"
          >
            Войдите по номеру телефона
          </button>
        </form>

        <div class="flex flex-col text-center">
          <a class="w-full" @click="deactivationModal">Пропустить и указать позже</a>
          <a class="">Условия использования и персональные данные</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { vMaska } from "maska";

import { mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations({
      storeRegChange: "account/changeAccountStatus",
    }),
  },

  directives: { maska: vMaska },
};
</script>

<style scoped>
.bg-img {
  background-image: url(../assets/images/background.png);
  background-repeat: no-repeat;
}
</style>
