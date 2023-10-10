<template>
  <div class="navbar">
    <div style="display: flex">
      <div>
        <h1 @click="$router.push('/')" class="logo">Каталог</h1>
      </div>
      <ul class="links">
        <li @click="$router.push('/promotions')">Акции</li>
        <li @click="$router.push('/stories')">Истории заказов</li>
        <li @click="$router.push('/review')">Оставить отзывы</li>
        <li @click="$router.push('/support')">Техподдержка</li>
      </ul>
    </div>

    <div class="icons">
      <router-link to="/basket" class="icon"
        ><img src="../assets/images/basket.png" alt=""
      /></router-link>

      <router-link to="/account" class="icon"
        ><img src="../assets/images/account.png" alt=""
      /></router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  background: #f8dfa0;
  padding: 10px 60px;
}

.logo {
  color: white;
  font-weight: 700;
  font-size: 30px;
  cursor: pointer;
  padding-right: 10px;
}
.links {
  list-style-type: none;
  display: flex;
  align-items: end;
  padding: 4px;
}

.links li {
  margin-left: 15px;
  font-size: 16px;
  cursor: pointer;
}

.icons {
  display: flex;
  align-items: center;
}
.icon img {
  width: 30px;
  margin-left: 30px;
  cursor: pointer;
}
</style>
;
