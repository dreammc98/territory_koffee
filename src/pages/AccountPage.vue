<template>
  <div class="wrapper-account">
    <div class="wrapper-form">
      <h1>Привет! ✌</h1>
      <p>Войдите, чтобы заказывать кофе заранее и пользоваться нашими акциями</p>
      <form>
        <label for="phone"><b>Введите свой номер телефона</b></label>
        <input
          type="tel"
          v-maska
          data-maska="+7(###)###-##-##"
          v-model="test"
          name="phone"
          placeholder="+7( ___ )___-__-__"
          required
        />
        <label for="name"><b>Как Вас зовут</b></label>
        <input type="text" name="name" required />
        <button type="submit" class="registerbtn">Войдите по номеру телефона</button>
      </form>

      <div class="links">
        <p class="link" @click="$router.push('/')">Пропустить и указать позже</p>
        <p class="link link__info">Условия использования и персональные данные</p>
      </div>
    </div>
  </div>
</template>

<script>
import { vMaska } from "maska";

export default {
  directives: { maska: vMaska },
};
</script>

<style scoped>
.wrapper-account {
  display: flex;
  height: calc(100vh - 55px);
  justify-content: center;
  align-items: center;
}

.wrapper-form {
  width: 300px;
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
