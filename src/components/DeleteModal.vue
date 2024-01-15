<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center">
    <div
      class="relative w-[280px] h-[240px] bg-white rounded-xl whitespace-normal flex justify-center py-6"
      v-click-outside="changeDeleteState"
    >
      <form @submit="submitForm">
        <p class="text-center font-semibold mb-6">Подтвердите удаление аккаунта</p>
        <label>
          <div class="flex flex-col justify-center">
            <p>Телефон*</p>
            <input
              name="phone"
              placeholder="79998887766"
              autocomplete="tel"
              type="tel"
              required="true"
              class="px-2 py-2 rounded-lg outline outline-1 outline-slate-400 text-gray-500"
              :value="'+' + phone"
              disabled
            />
          </div>
        </label>
        <div class="flex justify-center mt-10">
          <button
            type="submit"
            expand="block"
            class="py-2 px-12 shadow-[0_4px_4px_rgba(0,0,0,0.05)] bg-[#edc69a] text-black font-medium rounded-md text-lg cursor-pointer hover:bg-[#d5b28b]"
          >
            Подтверждаю
          </button>
        </div>
      </form>
      <div class="absolute bottom-[10%] whitespace-nowrap text-white">
        <transition name="popUp">
          <pop-up v-if="popUpState">{{ textPopUp }}</pop-up>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import LS from "@/localStorage/localStorage";
import PopUp from "./UI/PopUp.vue";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  data: () => {
    return {
      phone: "",
      textPopUp: "",
    };
  },

  components: {
    PopUp,
  },

  methods: {
    ...mapActions({
      sendReview: "account/sendReview",
    }),

    ...mapMutations({
      PopUp: "account/changePopUp",
      changeDeleteState: "account/changeDeleteState",
      switchBurger: "tracking/switchBurger",
    }),

    changePopUp(message) {
      this.PopUp();
      this.textPopUp = message;
      setTimeout(() => {
        this.PopUp();
        this.textPopUp = "";
        this.changeDeleteState();
      }, 1500);
      setTimeout(() => {
        this.switchBurger();
      }, 2000);
    },

    async submitForm(e) {
      e.preventDefault();
      const response = await this.sendReview({ message: "Прошу удалить аккаунт под номером " });
      if (response) {
        this.changePopUp("Ваш запрос на удаление отправлен. Спасибо!");
      } else {
        this.changePopUp("Непредвиденная ошибка, повторите попытку позже");
      }
    },

    locPhone() {
      const dataUser = LS.getStorage("userData");
      this.phone = dataUser.phone;
    },
  },
  computed: {
    ...mapState({
      popUpState: (state) => state.account.popUpState,
    }),
  },

  created() {
    this.locPhone();
  },
};
</script>

<style scoped>
.popUp-enter-active {
  transition: all 0.3s ease-out;
}

.popUp-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.popUp-enter-from,
.popUp-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
;
