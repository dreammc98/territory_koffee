<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center"
    @click.stop
  >
    <div
      class="relative flex flex-col justify-between h-[265px] w-[250px] bg-gray-50 p-6 rounded-lg"
    >
      <section class="">
        <div class="mb-3">
          <h1 class="text-xl font-semibold">Подтверждение</h1>
          <p>{{ textErr }}</p>
        </div>
        <p class="text-gray-500 mb-6">Введите код из SMS</p>
        <input
          class="py-2 focus:outline-none focus:border-[#FFD4A3] border-b-2 border-gray-200"
          type="code"
          placeholder="1234"
          v-maska
          data-maska="####"
          v-model="code"
        />
      </section>
      <div
        class="absolute bottom-[10%] top-[50%} left-[50%] text-white whitespace-nowrap"
        style="transform: translate(-50%, -50%)"
      >
        <transition name="popUp">
          <pop-up v-if="popUpStateLog">{{ textPopUp }}</pop-up>
        </transition>
      </div>
      <div class="text-end text-sm space-x-6 text-[#FFD4A3]">
        <button @click="changeNumConState">ОТМЕНА</button>
        <button @click="sendConfirmationCode">ОТПРАВИТЬ</button>
      </div>
    </div>
  </div>
</template>

<script>
import { vMaska } from "maska";
import { mapActions, mapMutations, mapState } from "vuex";
import PopUp from "./UI/PopUp.vue";

export default {
  data: () => {
    return {
      code: "",
      textErr: "",
      textPopUp: "",
    };
  },

  components: {
    PopUp,
  },

  methods: {
    ...mapMutations({
      changeNumConState: "account/changeNumConState",
      changeAccountStatus: "account/changeAccountStatus",
      PopUp: "account/changePopUp",
    }),

    ...mapActions({
      sendConfirmationCodeAc: "account/sendConfirmationCode",
      login: "account/login",
    }),
    changePopUp(message) {
      console.log(message);
      this.PopUp("log");
      this.textPopUp = message;
      setTimeout(() => {
        this.PopUp("log");
        this.textPopUp = "";
      }, 1500);
    },

    async authorize(params) {
      console.log("третий", params);
      const response = await this.login({ params: params });
      console.log(response);
      if (response) {
        this.changePopUp(
          response.message === "Sign-up" ? "Регистрация выполнена успешно" : "С возвращением!"
        );

        setTimeout(() => {
          if (this.regModal) {
            this.changeAccountStatus();
          } else {
            this.changeNumConState();
          }
        }, 1500);
      } else {
        this.changePopUp("Ошибка авторизации");
      }
    },

    async sendConfirmationCode() {
      const params = { name: this.paramsLog.name, phone: this.paramsLog.phone, code: this.code };
      console.log("второй", params);
      const response = await this.sendConfirmationCodeAc({
        params: { phone: this.paramsLog.phone, code: this.code },
      });
      if (response) {
        if (response.status === "OK") {
          this.authorize(params);
        } else {
          this.textErr = "Код неверен";
        }
      }
    },
  },
  computed: {
    ...mapState({
      paramsLog: (state) => state.account.paramsLog,
      popUpStateLog: (state) => state.account.popUpStateLog,
      regModal: (state) => state.account.regModal,
    }),
  },

  // mounted() {
  //   console.log(this.paramsLog.phone);
  // },
  directives: { maska: vMaska },
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
