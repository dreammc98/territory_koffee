<template>
  <my-modal>
    <div class="wrapper" v-click-outside="deactivationModal">
      <div class="wrapper-form">
        <h1>Привет! ✌</h1>
        <p>Войдите, чтобы заказывать кофе заранее и пользоваться нашими акциями</p>
        <form>
          <label for="phone"><b>Введите свой номер телефона</b></label>
          <input
            type="tel"
            v-maska
            data-maska="+7(###)###-##-##"
            name="phone"
            placeholder="+7( ___ )___-__-__"
            required
          />
          <label for="name"><b>Как Вас зовут</b></label>
          <input type="text" name="name" required />
          <button type="submit" class="registerbtn">Войдите по номеру телефона</button>
        </form>

        <div class="links">
          <p class="link" @click="deactivationModal">Пропустить и указать позже</p>
          <p class="link link__info">Условия использования и персональные данные</p>
        </div>
      </div>
    </div>
  </my-modal>
</template>

<script>
import { vMaska } from "maska";
import MyModal from "@/components/MyModal.vue";
import { mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations({
      storeRegChange: "regWindow/storeRegChange",
    }),
    deactivationModal() {
      this.storeRegChange();
    },
  },

  directives: { maska: vMaska },
  components: {
    MyModal,
  },
};
</script>

<style scoped>
.wrapper {
  z-index: 1000;
  background-image: url(../assets/images/background.png);
  background-repeat: no-repeat;
  width: 355px;
  height: 550px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
}
.wrapper-form {
  width: 300px;
  color: white;
}

.wrapper-form h1 {
  margin-bottom: 20px;
}

.wrapper-form p {
  margin-bottom: 15px;
}

input[type="tel"],
input[type="text"] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  border-radius: 8px;
  background: #f1f1f1;
}

input[type="tel"]:focus,
input[type="text"]:focus {
  background-color: #ddd;
  outline: none;
}

.registerbtn {
  background-color: #efc14d;
  color: black;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.registerbtn:hover {
  opacity: 1;
}

a {
  color: dodgerblue;
}

.signin {
  background-color: #f1f1f1;
  text-align: center;
}
.links {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.link {
  text-decoration: underline;
  cursor: pointer;
}

.link__info {
  font-size: 14px;
}
</style>
;
