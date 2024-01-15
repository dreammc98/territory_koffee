<template>
  <div>
    <div class="pt-5" v-if="specials.length > 0">
      <specials-item v-for="special in specials" :key="special.key" :special="special" />
    </div>
    <div class="w-full flex items-center justify-center mt-10 text-2xl" v-else>
      <h2 class="">Активные акции отсутствуют</h2>
    </div>
  </div>
</template>

<script>
import SpecialsItem from "@/components/SpecialsItem.vue";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    SpecialsItem,
  },

  methods: {
    ...mapActions({
      getSpecials: "specials/getSpecials",
    }),
  },
  computed: {
    ...mapState({
      specials: (state) => state.specials.specials,
    }),
  },

  async mounted() {
    await this.getSpecials();
  },
};
</script>

<style scoped></style>
;
