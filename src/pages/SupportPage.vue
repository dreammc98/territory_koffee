<template>
  <div class="flex justify-center py-6">
    <section class="w-full md:max-w-[1000px] border-2 border-[#ffd4a3] rounded-xl">
      <div class="hidden bg-[#ffd09a] h-16 md:flex items-center rounded-t-lg">
        <h1 class="text-2xl font-semibold text-white pl-2">Сообщить о технической проблеме</h1>
      </div>

      <form @submit="submitForm" class="p-3">
        <p class="mb-2">
          Если вы нашли техническую проблему, сообщите нам подробности и мы примем меры. Спасибо!
        </p>

        <div class="flex justify-center my-6">
          <textarea
            name="message"
            id="message"
            required
            placeholder="Описание проблемы*"
            class="resize-none bg-gray-100 outline-[#ffd4a3] w-[500px] h-36 p-2 rounded-lg"
          ></textarea>
        </div>

        <div class="flex justify-center">
          <button
            type="submit"
            expand="block"
            class="whitespace-nowrap px-28 md:px-36 py-3 shadow-[0_4px_4px_rgba(0,0,0,0.05)] bg-[#edc69a] text-white rounded-xl cursor-pointer hover:bg-[#d5b28b]"
          >
            Отправить
          </button>
        </div>
      </form>
    </section>
    <div class="absolute bottom-[10%] whitespace-nowrap text-white">
      <transition name="popUp">
        <pop-up v-if="popUpState">{{ textPopUp }}</pop-up>
      </transition>
    </div>
  </div>
</template>

<script>
import PopUp from "@/components/UI/PopUp.vue";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  data: () => {
    return {
      textPopUp: "",
    };
  },

  components: {
    PopUp,
  },

  methods: {
    ...mapActions({
      sendFeedback: "tracking/sendFeedback",
    }),
    ...mapMutations({
      PopUp: "account/changePopUp",
    }),

    changePopUp(message) {
      this.PopUp();
      this.textPopUp = message;
      setTimeout(() => {
        this.PopUp();
        this.textPopUp = "";
      }, 1500);
    },

    async submitForm(e) {
      e.preventDefault();
      const textarea = document.getElementById("message");
      if (textarea.value.trim().length > 0) {
        const response = await this.sendFeedback({ message: textarea.value });
        if (response) {
          textarea.value = "";

          this.changePopUp("Ваше сообщение отправлено. Спасибо!");
        } else {
          this.changePopUp("Непредвиденная ошибка, повторите попытку позже");
        }
      }
    },
  },

  computed: {
    ...mapState({
      popUpState: (state) => state.account.popUpState,
    }),
  },
};
</script>

<style scoped></style>
;
