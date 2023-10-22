<template>
  <div class="wrapper">
    <div class="card__item">
      <router-link to="/product" class="icon"
        ><img click="getInfoProduct" src="http://placehold.it/200x250" alt="Post"
      /></router-link>

      <span class="food__name">Название </span>
      <span class="food__price">Цена</span>
    </div>
    <div class="card__item">
      <img src="http://placehold.it/200x250" alt="Post" />
      <span class="food__name">Название </span>
      <span class="food__price">Цена</span>
    </div>
    <div class="card__item">
      <img src="http://placehold.it/200x250" alt="Post" />
      <span class="food__name">Название </span>
      <span class="food__price">Цена</span>
    </div>
    <div class="card__item">
      <img src="http://placehold.it/200x250" alt="Post" />
      <span class="food__name">Название </span>
      <span class="food__price">Цена</span>
    </div>
    <div class="card__item">
      <img src="http://placehold.it/200x250" alt="Post" />
      <span class="food__name">Название </span>
      <span class="food__price">Цена</span>
    </div>
    <div class="card__item">
      <img src="http://placehold.it/200x250" alt="Post" />
      <span class="food__name">Название </span>
      <span class="food__price">Цена</span>
    </div>
    <div class="card__item">
      <img src="http://placehold.it/200x250" alt="Post" />
      <span class="food__name">Название </span>
      <span class="food__price">Цена</span>
    </div>
    <div class="card__item">
      <img src="http://placehold.it/200x250" alt="Post" />
      <span class="food__name">Название </span>
      <span class="food__price">Цена</span>
    </div>
    <div class="card__item">
      <img src="http://placehold.it/200x250" alt="Post" />
      <span class="food__name">Название </span>
      <span class="food__price">Цена</span>
    </div>
    <div class="card__item">
      <img src="http://placehold.it/200x250" alt="Post" />
      <span class="food__name">Название </span>
      <span class="food__price">Цена</span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getInfoProduct() {
      this.$router.push("/product");
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;
  padding-left: 20px;
}
.card__item {
  display: flex;
  flex-direction: column;
  max-width: 200px;
  align-items: center;
  line-height: 1;
  margin-right: 8px;
  margin-bottom: 8px;
}

img {
  border-radius: 10px;
}

.food__name {
  margin: 5px 0;
  padding: 0 8px;
  text-align: center;
}

.food__price {
  color: #7a7a7a;
}
</style>
;
