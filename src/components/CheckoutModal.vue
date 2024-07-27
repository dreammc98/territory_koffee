<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-200 flex items-center justify-center">
    <div
      class="relative bg-white w-[400px] h-[640px] rounded-xl whitespace-normal"
      v-click-outside="changeCheckout"
    >
      <number-confirmation v-if="numConState"></number-confirmation>

      <div class="bg-[#ffd09a] h-16 flex items-center justify-between sm:rounded-t-xl">
        <h1 class="text-2xl font-semibold text-white px-4">Оформить заказ</h1>
        <div class="pl-4">
          <img
            @click="changeCheckout"
            class="w-10 rotate-45 active:scale-75 duration-500 cursor-pointer"
            src="../assets/images/Plus.svg"
            alt="close"
          />
        </div>
      </div>

      <form class="px-2 pt-2 overflow-auto h-[570px]" @submit="submitOrder">
        <div class="space-y-6 px-2 mb-5">
          <div>
            <label class="group">
              <p class="group-focus-within:text-[#ffd09a]">Имя*</p>
              <input
                name="name"
                v-model="name"
                autocomplete="off"
                required="true"
                class="outline-none bg-orange-50 p-2 rounded-lg w-[250px]"
              />
            </label>
          </div>

          <div>
            <label class="group">
              <p class="group-focus-within:text-[#ffd09a]">Телефон*</p>
              <input
                :disabled="isAuthorized && user && Object.keys(user).length !== 0 ? true : false"
                name="phone"
                autocomplete="off"
                type="tel"
                required
                v-model="phone"
                class="outline-none bg-orange-50 p-2 rounded-lg w-[250px]"
                v-maska
                data-maska="7##########"
                placeholder="79998887766"
              />
            </label>

            <div>
              <div v-if="isAuthorized">
                <!-- @click="changePhoneNumber" -->
                <button disabled class="text-[#ffd09a]">Изменить номер</button>
                <div v-if="false" class="border border-[#ffd09a] rounded-xl mt-4 p-2">
                  <p>
                    Обратите внимание: если вы измените номер телефона, то корзина будет очищена и
                    баланс баллов изменится
                  </p>
                  <div class="flex justify-center space-x-8">
                    <div>
                      <button
                        class="whitespace-nowrap px-1 py-1 shadow-[0_4px_4px_rgba(0,0,0,0.05)] bg-[#edc69a] text-white rounded-xl cursor-pointer hover:bg-[#d5b28b]"
                      >
                        OK
                      </button>
                    </div>
                    <div>
                      <button
                        class="whitespace-nowrap px-1 py-1 shadow-[0_4px_4px_rgba(0,0,0,0.05)] bg-[#edc69a] text-white rounded-xl cursor-pointer hover:bg-[#d5b28b]"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="!isAuthorized" class="mt-4">
                <!-- @click="requestConfirmationCode" -->
                <button
                  color=""
                  class="whitespace-nowrap px-1 py-2 shadow-[0_4px_4px_rgba(0,0,0,0.05)] bg-[#edc69a] text-white rounded-full cursor-pointer hover:bg-[#d5b28b]"
                >
                  Подтвердить номер
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-2 px-2">
          <label class="text-gray-400">
            <p class="text-xs">Выбранный адрес</p>
            <input disabled="true" :value="store" class="text-lg font-medium" />
          </label>
        </div>

        <div class="px-2 mb-2 hidden">
          <label>
            <b v-if="bonus && bonus !== '' && bonus !== false"
              >Мои баллы: <span class="ml-1">{{ bonus }}</span></b
            >
            <b v-else class="whitespace-normal">Мои баллы: Необходимо подтвердить номер</b>
            <div v-if="bonus && bonus !== '' && bonus !== false">
              <p>Списать баллов</p>
              <input
                name="bonus"
                type="number"
                @ionChange="validateBonusField"
                v-model="bonusPoints"
                class="outline-none bg-orange-50 p-2 rounded-lg"
              />
            </div>
          </label>
        </div>

        <div class="px-2 mb-6">
          Выберете время доставки

          <label>
            <div class="space-x-3">
              <input type="radio" name="time" value="fast" v-model="checkedTime" />
              <span>Как можно скорее</span>
            </div>
          </label>
          <label>
            <div class="space-x-3">
              <input type="radio" name="time" value="time" v-model="checkedTime" />
              <span>К определенному времени</span>
            </div>
          </label>
          <div class="px-2">
            <label v-if="checkedTime === 'time'" class="space-x-2">
              <span>Укажите время доставки</span>
              <input
                type="time"
                name="time-full"
                v-model="dataTime"
                placeholder="--:--"
                class="focus:outline-[#ffd09a] w-20 text-center"
              />
            </label>
          </div>
        </div>
        <div class="mt-12">
          <div class="px-2 flex justify-end mr-2">
            <b>Итого: {{ cartTotal ? cartTotal + "  руб." : "0 руб." }}</b>
          </div>
          <div v-if="bonusPoints > 0" class="order-total-wrap">
            <b>К оплате: {{ cartTotal - bonusPoints }} руб.</b>
          </div>
          <div class="flex justify-center mb-8">
            <button
              class="whitespace-nowrap px-16 py-2 shadow-[0_4px_4px_rgba(0,0,0,0.05)] bg-[#edc69a] text-white rounded-full text-lg cursor-pointer"
              type="submit"
              :class="isAuthorized ? 'hover:bg-[#d5b28b]' : 'bg-[#d5b28b] opacity-80'"
              :disabled="isAuthorized ? false : true"
            >
              Оформить заказ
            </button>
          </div>
        </div>
        <div class="flex justify-center">
          <a @click="termsOfUse('policy')" class="underline text-sm font-semibold"
            >Условия использования и персональные данные</a
          >
        </div>
      </form>
      <transition name="info">
        <div
          v-if="backArrow"
          class="absolute inset-0 bg-black bg-opacity-50 z-20 flex top-[0px] justify-center"
        >
          <info-reg />
        </div>
      </transition>

      <div class="absolute bottom-[10%] whitespace-normal text-white">
        <transition name="info">
          <pop-up v-if="popUpState">{{ textPopUp }}</pop-up>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import { vMaska } from "maska";
import LS from "@/localStorage/localStorage";
import { mapState } from "vuex";
import InfoReg from "@/components/InfoReg.vue";
import PopUp from "./UI/PopUp.vue";
import NumberConfirmation from "./NumberConfirmation.vue";

export default {
  data: () => {
    return {
      user: {},
      checkedTime: "fast",
      dataTime: "--:--",
      cartTotal: "",
      cart: "",
      name: "",
      phone: Number,
      terminalGroupId: Number,
      textPopUp: "",
    };
  },

  components: {
    InfoReg,
    PopUp,
    NumberConfirmation,
  },

  methods: {
    ...mapMutations({
      changeCheckout: "checkout/changeCheckout",
      setBackArrow: "tracking/setBackArrow",
      PopUp: "account/changePopUp",
      changeNumConState: "account/changeNumConState",
      setParamsLog: "account/setParamsLog",
    }),

    ...mapActions({
      getInfoPage: "tracking/getInfoPage",
      sendOrder: "checkout/sendOrder",
      requestConfirmationCodeAc: "account/requestConfirmationCode",
      getBonuses: "checkout/getBonuses",
    }),

    changePopUp(message) {
      this.PopUp();
      this.textPopUp = message;
      setTimeout(() => {
        this.PopUp();
        this.textPopUp = "";
      }, 1500);
    },

    termsOfUse(params) {
      this.getInfoPage(params);
      setTimeout(() => {
        this.setBackArrow();
      }, 500);
    },

    async requestConfirmationCode(e) {
      e.preventDefault();
      const params = { name: this.name, phone: this.phone, terminalGroupId: this.terminalGroupId };

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

    async submitOrder(e) {
      e.preventDefault();
      let items = JSON.parse(JSON.stringify(this.cart));
      console.log("197", items);
      let orderFields = {};
      let formFields = {
        name: this.name,
        phone: this.phone,
        terminalGroupId: this.terminalGroupId,
        "time-full": this.dataTime,
      };
      console.log("205", formFields);

      // Filter item fields
      let itemsFilter = ["type", "productId", "amount", "modifiers", "name", "price"];
      let modifiersFilter = ["productId", "amount", "productGroupId", "name"];
      items.forEach(function (item, index) {
        this[index] = Object.keys(item)
          .filter((key) => itemsFilter.includes(key))
          .reduce((obj, key) => {
            obj[key] = item[key];
            return obj;
          }, {});

        if (item.modifiers !== undefined && item.modifiers.length > 0)
          item.modifiers.forEach(function (modifier, index) {
            this[index] = Object.keys(modifier)
              .filter((key) => modifiersFilter.includes(key))
              .reduce((obj, key) => {
                obj[key] = modifier[key];
                return obj;
              }, {});
          }, item.modifiers);
      }, items);

      let timeDelivery = null;
      if (this.dataTime) {
        timeDelivery = this.dataTime;
      }

      orderFields = {
        terminalGroupId: formFields.terminalGroupId,
        phone: formFields.phone,
        items: items,
        customer: {
          name: formFields.name,
        },
        time_delivery: timeDelivery,
        cash: this.cartTotal - (parseFloat(formFields.bonus) || 0),
        bonus: parseFloat(formFields.bonus) || 0,
      };
      console.log("251", orderFields);
      let today = new Date();
      let hour = today.getHours();
      today.setHours(hour + 1);
      let later = today.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      let time_from = LS.getStorage("shop").time_from;
      let time_to = LS.getStorage("shop").time_to;

      if (this.checkedTime === "time") {
        if (this.dataTime + ":00" < time_from) {
          this.changePopUp("Время заказ из данной точки начинается с " + time_from);
          return;
        }
        if (later > this.dataTime) {
          this.changePopUp("Время заказ должно быть выбрано минимум за час с начала заказа.");
          return;
        }
        if (this.dataTime + ":00" > time_to) {
          this.changePopUp("Время заказ из данной точки доступно до " + time_to);
          return;
        }
      }

      const response = await this.sendOrder({ order: orderFields });
      // let orderId = 0;
      console.log(response.errorMessage);
      if (!response) {
        this.changePopUp("Возникла непредвиденная ошибка");
      } else if (response.status == "Error") {
        this.changePopUp("Ошибка: " + response.message + response.errorMessage);
      } else if (response.errorMessage == "Доступ запрещён") {
        this.changePopUp("Ошибка: " + response.errorMessage);
      }
      //   else {
      //     if (response.data.link !== undefined) {
      //       orderId = response.data.orderId;
      //       const modal = await modalController.create({
      //         component: CheckoutModal,
      //         componentProps: {
      //           title: "Оплата",
      //           src: response.data.link, // Ссылка на платёжный шлюз
      //         },
      //       });

      //       await modal.present();

      //       modal.onDidDismiss().then((data) => {
      //         // data - объект данных, переданных методом dismiss() из компонента CheckoutModal.vue
      //         if (data.data.isPaymentSuccessful !== undefined) {
      //           // TODO: переадресовать пользователя на результирующую страницу с сообщением, соответствующим статусу проведения платежа
      //           this.router.push({
      //             name: "Result",
      //             query: data.data.isPaymentSuccessful
      //               ? { response, orderId: orderId }
      //               : { orderId: orderId },
      //           });
      //         }
      //       });
      //     }
      //     await this.router.push({ name: "Result", query: { response, orderId: orderId } });
      //   }
    },

    getBonus() {
      let bonus = this.bonusState;

      if (this.isAuthorized && bonus !== "") return bonus;
      else if (this.isAuthorized && !bonus !== "") {
        this.getBonuses(this.phone);
        return bonus;
      }

      return false;
    },

    validateBonusField(e) {
      const bonus = parseInt(this.getBonus);
      const sum = this.cartTotal - 1; // Preventing customer from paying full sum with bonus points
      if (e.target.value > bonus || e.target.value > sum) {
        if (e.target.value > sum) {
          e.target.value = sum;
        } else if (e.target.value > bonus) {
          e.target.value = bonus;
        }
        // e.target.value = (e.target.value > sum ? sum : (e.target.value > bonus ? bonus : e.target.value));
      }
    },
  },

  computed: {
    ...mapState({
      isAuthorized: (state) => state.account.isAuthorized,
      store: (state) => state.stores.store,
      backArrow: (state) => state.tracking.backArrow,
      popUpState: (state) => state.account.popUpState,
      numConState: (state) => state.account.numConState,
      bonusState: (state) => state.checkout.bonus,
    }),
  },

  mounted() {
    this.user = LS.getStorage("userData");
    this.cartTotal = LS.getStorage("cartTotal");
    this.cart = LS.getStorage("cartProduct");
    this.name = this.user && Object.keys(this.user).length !== 0 ? this.user.name : "";
    this.phone =
      this.isAuthorized && this.user && Object.keys(this.user).length !== 0 ? this.user.phone : ``;
    this.terminalGroupId = LS.getStorage("shop").guid;
  },

  directives: { maska: vMaska },
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.info-enter-active {
  transition: all 0.3s ease-out;
}

.info-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.info-enter-from,
.info-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
