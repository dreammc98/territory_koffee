<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center">
    <number-confirmation v-if="numConState"></number-confirmation>
    <div
      class="relative w-[375px] h-[600px] flex item-center justify-center rounded-lg text-white"
      v-click-outside="changeAccountStatus"
    >
      <div
        v-if="!backArrow"
        class="flex flex-col item-center justify-center px-5 bg-img rounded-lg"
      >
        <h1 class="text-4xl font-semibold">Привет! ✌</h1>
        <p class="leading-5 my-4">
          Войдите, чтобы заказывать кофе заранее и пользоваться нашими акциями!
        </p>
        <form @submit="requestConfirmationCode" class="mb-5">
          <section>
            <label class="flex flex-col space-y-1 mb-4"
              ><span class="text-lg font-medium">Введите свой номер телефона</span>
              <input
                type="tel"
                :value="userData.phone"
                v-maska
                data-maska="+7 (###) ###-##-##"
                placeholder="+7 ( ___ ) ___-__-__"
                name="phone"
                required="true"
                class="px-2 py-2 rounded-lg text-black"
                autocomplete="tel"
              />
            </label>
          </section>

          <section>
            <label class="flex flex-col space-y-1 mb-3">
              <span class="text-lg font-medium">Как Вас зовут?</span>
              <input
                type="text"
                :value="userData.name"
                name="name"
                required="true"
                class="px-2 py-2 rounded-lg text-black"
              />
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
          <a
            expand="block"
            class="underline font-medium mb-6 cursor-pointer"
            @click="changeAccountStatus"
            c
            >Пропустить и указать позже</a
          >
          <a @click="termsOfUse('policy')" class="text-xs underline font-bold cursor-pointer"
            >Условия использования и персональные данные</a
          >
        </div>
      </div>

      <info-reg v-if="backArrow" />
      <div class="absolute bottom-[10%] whitespace-nowrap">
        <transition name="popUp">
          <pop-up v-if="popUpState">{{ textPopUp }}</pop-up>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { vMaska } from "maska";
import InfoReg from "@/components/InfoReg";
import { mapMutations, mapActions, mapState } from "vuex";
import NumberConfirmation from "./NumberConfirmation.vue";
import PopUp from "./UI/PopUp.vue";

export default {
  data: () => {
    return {
      confirmation: false,
      message: "",
      params: {},
      textPopUp: "",
    };
  },
  components: {
    InfoReg,
    NumberConfirmation,
    PopUp,
  },

  methods: {
    ...mapMutations({
      changeAccountStatus: "account/changeAccountStatus",
      setBackArrow: "tracking/setBackArrow",
      changeNumConState: "account/changeNumConState",
      setParamsLog: "account/setParamsLog",
      PopUp: "account/changePopUp",
    }),
    ...mapActions({
      getInfoPage: "tracking/getInfoPage",
      requestConfirmationCodeAc: "account/requestConfirmationCode",
    }),

    termsOfUse(params) {
      this.getInfoPage(params);
      this.setBackArrow();
    },

    changePopUp(message) {
      this.PopUp();
      this.textPopUp = message;
      setTimeout(() => {
        this.PopUp();
        this.textPopUp = "";
      }, 1500);
    },

    async requestConfirmationCode(e) {
      e.preventDefault();
      const params = {};
      const formData = new FormData(e.target);
      for (let key of formData.keys()) {
        params[key] = formData.get(key);
      }
      params.phone = params.phone.replace(/[\D]+/g, "");

      const response = await this.requestConfirmationCodeAc({ params: { phone: params.phone } });
      if (response) {
        if (response.status === "OK") {
          setTimeout(() => {
            this.changeNumConState();
          }, 300);
          this.setParamsLog(params);
        } else {
          this.changePopUp("Проверьте введённые данные");
        }
      }
    },
  },

  computed: {
    ...mapState({
      backArrow: (state) => state.tracking.backArrow,
      userData: (state) => state.account.userData,
      numConState: (state) => state.account.numConState,
      popUpState: (state) => state.account.popUpState,
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
