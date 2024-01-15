<template>
  <div class="bg-white w-[320px] mn:w-[375px] h-[588px]" v-click-outside="setBackArrow">
    <div class="w-full h-full overflow-auto max-h-[636px]">
      <div class="bg-[#ffd09a] h-16 flex items-center">
        <div class="pl-4 mr-6">
          <img
            @click="setBackArrow"
            class="cursor-pointer"
            src="../assets/images/back_arrow.png"
            alt="back"
          />
        </div>
        <h1 class="text-2xl font-semibold text-white pl-2">
          {{ title ? title : "undefined" }}
        </h1>
      </div>

      <section class="text-black mt-4">
        <div class="px-6">{{ content ? content : "undefined" }}</div>
      </section>
    </div>
    <div class="bg-white flex justify-center py-2">
      <button
        @click="setBackArrow"
        type="submit"
        class="px-28 py-1 font-medium shadow-xl bg-[#edc69a] text-black rounded-md text-lg cursor-pointer hover:bg-[#d5b28b]"
      >
        Закрыть
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data: () => {
    return {
      title: "",
      content: "",
    };
  },
  methods: {
    ...mapMutations({
      setBackArrow: "tracking/setBackArrow",
    }),
  },

  computed: {
    ...mapState({
      termsOfUseData: (state) => state.tracking.termsOfUseData,
    }),
  },
  async mounted() {
    this.title = this.termsOfUseData.data.title;
    this.content = this.termsOfUseData.data.content;
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
</style>
;
