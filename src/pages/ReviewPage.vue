<template>
  <div class="flex justify-center py-6">
    <section class="w-full md:max-w-[1000px] border-2 border-[#ffd4a3] rounded-xl">
      <div class="hidden bg-[#ffd09a] h-16 md:flex items-center rounded-t-lg">
        <h1 class="text-2xl font-semibold text-white pl-2">Оставить отзыв</h1>
      </div>

      <form @submit="placeholder" class="p-3">
        <p class="mb-2">
          Оцените, пожалуйста, наш сервис и качество продуктов. Напишите сюда замечания, пожелания,
          так же мы будем рады предложениям.
        </p>

        <p>Можете упоминать сотрудников, их имена есть на бэйджах.</p>
        <div class="flex justify-center mt-8">
          <!-- Документация по компоненту vue-star-rating (в том числе стилизация) описана по ссылке ниже -->
          <!-- https://www.npmjs.com/package/vue-star-rating -->
          <star-rating
            @update:rating="setRating"
            :show-rating="false"
            :star-size="30"
            :padding="22"
          ></star-rating>
          <input type="hidden" id="review-rating-input" name="rating" />
        </div>
        <div class="flex justify-center mt-6">
          <textarea
            name="message"
            id="message"
            required
            placeholder="Текст отзыва*"
            class="resize-none bg-gray-100 outline-none w-[500px] h-36 p-2 rounded-lg"
          ></textarea>
        </div>
        <p class="text-center"><small>Отзыв будет отправлен анонимно руководству.</small></p>
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
import StarRating from "vue-star-rating";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  data: () => {
    return {
      textPopUp: "",
    };
  },

  components: {
    StarRating,
    PopUp,
  },

  methods: {
    ...mapActions({
      sendReview: "account/sendReview",
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

    async placeholder(e) {
      e.preventDefault();

      const formData = new FormData(e.target);
      let data = {};
      const textarea = document.getElementById("message");

      if (textarea.value.trim().length > 0) {
        textarea.value = "";

        for (let key of formData.keys()) {
          data[key] = formData.get(key);
        }

        const response = await this.sendReview(data);

        if (response) {
          for (let key of formData.keys()) {
            formData.set(key, "");
          }
          this.changePopUp("Ваш отзыв отправлен. Спасибо!");
        } else {
          this.changePopUp("Непредвиденная ошибка, повторите попытку позже");
        }
      }
    },

    setRating(rating) {
      const ratingInput = document.getElementById("review-rating-input");
      ratingInput.value = rating;
    },
  },

  computed: {
    ...mapState({
      popUpState: (state) => state.account.popUpState,
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
