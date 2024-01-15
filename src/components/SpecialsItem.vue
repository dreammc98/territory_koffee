<template>
  <div
    v-if="special !== false"
    class="md:flex whitespace-normal border-b-2 border-[#5B5B5B] border-opacity-20 py-5"
  >
    <div class="flex justify-center md:block min-w-fit max-w-[331px] max-h-[147px]">
      <div class="relative px-2">
        <img src="../assets/images/IMG.png" alt="" />
        <div class="absolute top-0 left-2 pl-3 pt-4 text-white font-medium">
          <h1 class="text-3xl">{{ special.title }}</h1>
          <span class="text-lg">{{ special.subtitle }}</span>
        </div>
      </div>
    </div>
    <div class="mx-3 mt-6 md:mt-0 md:ml-4 md:mx-0">
      <p class="text-lg font-medium" v-html="special.content"></p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["special"],
};
</script>

<style scoped></style>
;
