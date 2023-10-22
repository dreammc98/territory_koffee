<template>
  <div class="arrow-5 arrow-5-top">
    <div class="wrapper">
      <div class="scroll">
        <div class="wrapper__basket">
          <div class="product product-left">
            <img src="http://placehold.it/60x60" alt="" /> <button>Удалить</button>
          </div>
          <div class="product product-right">
            <h3>Овсяная каша</h3>
            <div class="product__supp">
              <strong>Добавки:</strong>
              <span>Без добавок</span>
              <span>Кедровые орешки 10г</span>
            </div>
            <h2>1</h2>
            <span class="product__price">100 рублей</span>
          </div>
        </div>

        <div class="wrapper__basket">
          <div class="product product-left">
            <img src="http://placehold.it/60x60" alt="" /> <button>Удалить</button>
          </div>
          <div class="product product-right">
            <h3>Овсяная каша</h3>
            <div class="product__supp">
              <strong>Добавки:</strong>
              <span>Без добавок</span>
              <span>Кедровые орешки 10г</span>
            </div>
            <h2>1</h2>
            <span class="product__price">100 рублей</span>
          </div>
        </div>
        <div class="wrapper__basket">
          <div class="product product-left">
            <img src="http://placehold.it/60x60" alt="" /> <button>Удалить</button>
          </div>
          <div class="product product-right">
            <h3>Овсяная каша</h3>
            <div class="product__supp">
              <strong>Добавки:</strong>
              <span>Без добавок</span>
              <span>Кедровые орешки 10г</span>
            </div>
            <h2>1</h2>
            <span class="product__price">100 рублей</span>
          </div>
        </div>
        <div class="wrapper__basket">
          <div class="product product-left">
            <img src="http://placehold.it/60x60" alt="" /> <button>Удалить</button>
          </div>
          <div class="product product-right">
            <h3>Овсяная каша</h3>
            <div class="product__supp">
              <strong>Добавки:</strong>
              <span>Без добавок</span>
              <span>Кедровые орешки 10г</span>
            </div>
            <h2>1</h2>
            <span class="product__price">100 рублей</span>
          </div>
        </div>
      </div>

      <div class="btn-center">
        <button class="btn">Заказать <span>100 руб.</span></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.scroll {
  max-height: 400px;
  overflow-x: hidden;
  overflow-y: auto;
}

.scroll::-webkit-scrollbar {
  width: 6px;
}

.scroll::-webkit-scrollbar-track {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 40%,
    rgba(154, 154, 154, 1) 40%,
    rgba(154, 154, 154, 1) 50%,
    rgba(154, 154, 154, 1) 60%,
    rgba(255, 255, 255, 1) 60%,
    rgba(255, 255, 255, 1) 100%
  );
}

.scroll::-webkit-scrollbar-thumb {
  background: #ccc;
}

.product__supp {
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  font-size: 14px;
}
.product {
  display: flex;
  flex-direction: column;
}
.product-left {
  justify-content: center;
  align-items: center;
  width: 60px;
  max-height: 90px;
}

.product-left button {
  margin-top: 6px;
  border: none;
  background-color: white;
  cursor: pointer;
}

.product-right {
  padding-left: 10px;
}
.product-right h2 {
  padding-left: 25px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.product__price {
  color: #61473b;
  font-size: 22px;
  font-weight: 600;
}
.wrapper {
  width: 300px;
  background-color: white;
  box-shadow: 0 6px 19px 8px rgba(0, 0, 0, 0.15);
  line-height: 1;
  margin: auto;
  padding-left: 5px;
  padding-top: 12px;
}

.wrapper__basket {
  display: flex;
  padding-left: 13px;
  padding-bottom: 10px;
  margin-bottom: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  width: 290px;
}
.arrow-5-top {
  z-index: 10;
}
.arrow-5-top::after {
  content: "";
  width: 0;
  height: 0;
  display: block;
  position: absolute;
  z-index: 10;
  border: 0;
}
.arrow-5-top::after {
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  margin-left: -10px;
  right: 19%;
  border-bottom: 10px solid white;
  top: -10px;
}

.btn-center {
  text-align: center;
  padding-right: 5px;
}
.btn {
  padding: 8px 50px;
  margin: 10px 0;
  background-color: #f8dfa0;
  font-size: 14px;
  border: none;
  border-radius: 2px;
  font-weight: 600;
  cursor: pointer;
}

.btn span {
  margin-left: 20px;
  font-weight: 900;
}

.btn:hover {
  box-shadow: 3px 3px 0px rgba(0, 0, 0, 0.1);
}
.btn:active {
  transform: scale(0.99);
}
</style>
