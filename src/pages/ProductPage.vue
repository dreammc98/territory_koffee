<template>
  <div>
    <div class="wrapper-card">
      <div><img src="http://placehold.it/450x450" alt="Card" /></div>
      <div class="components">
        <h1>Овсяная каша</h1>
        <div style="max-width: 300px">
          <p>Описание отсутствует отсутствует отсутствует отсутствует отсутствует</p>
        </div>

        <div class="val">
          <span>Калорийность "Овсяная каша"</span>
          <div class="val__list">
            <div class="val__item"><span>1110.0 </span>Ккал</div>
            <div class="val__item"><span>10.0 </span>Белки, г</div>
            <div class="val__item"><span>440.0 </span>Жиры, г</div>
            <div class="val__item"><span>420.0 </span>Углеводы, г</div>
          </div>
        </div>

        <button class="btn__order">Заказать <span>100 руб.</span></button>
      </div>
    </div>

    <div class="wrapper-options">
      <h2>Добавки к каше</h2>

      <label>
        <input type="checkbox" />
        <span></span>
        Checkbox label text
      </label>

      <label>
        <input type="checkbox" />
        <span></span>
        Checkbox label text
      </label>

      <label>
        <input type="checkbox" />
        <span></span>
        Checkbox label text
      </label>

      <label>
        <input type="checkbox" />
        <span></span>
        Checkbox label text
      </label>

      <label>
        <input type="checkbox" />
        <span></span>
        Checkbox label text
      </label>

      <label>
        <input type="checkbox" />
        <span></span>
        Checkbox label text
      </label>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.wrapper-card {
  display: flex;
  margin-top: 20px;
  align-items: center;
}
img {
  border-radius: 10px;
}
.components {
  margin-left: 60px;
}

.components p {
  margin-top: 10px;
}

.val {
  margin: 20px 0;
  max-width: 300px;
}

.val__list {
  display: flex;
}
.val__item {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  margin-right: 20px;
}

.val__item span {
  font-size: 20px;
  font-weight: 700;
}

.btn__order {
  padding: 10px 70px;
  background-color: #f8dfa0;
  font-size: 17px;
  border: none;
  border-radius: 2px;
  font-weight: 600;
  cursor: pointer;
}

.btn__order span {
  margin-left: 20px;
  font-weight: 900;
}

.btn__order:hover {
  box-shadow: 3px 3px 0px rgba(0, 0, 0, 0.1);
}
.btn__order:active {
  transform: scale(0.99);
}

.wrapper-options {
  display: flex;
  flex-direction: column;
}

.wrapper-options h2 {
  margin: 40px 0 10px 0;
}

.wrapper-options label {
  margin-bottom: 20px;
  max-width: 200px;
}

label input {
  display: none;
}
label span {
  height: 14px;
  width: 14px;
  border: 1px solid gray;
  display: inline-block;
  position: relative;
  border-radius: 2px;
  padding: 3px;
}
label input[type="checkbox"]:checked + span:before {
  content: "\2714";
  position: absolute;
  top: -10px;
  left: 0;
  font-size: 20px;
  color: #f8dfa0;
}
</style>
;
