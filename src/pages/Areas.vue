<template>
  <q-page padding>
    <transition-group tag="q-list" name="listReorder">
      <Area
        v-for="area in areas"
        :key="area.id"
        :area="area"
        :isLast="area.index >= areas.length"
      />
    </transition-group>
  </q-page>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import Area from "components/Areas/Area";

export default {
  name: "Areas",
  components: { Area },
  setup() {
    const store = useStore();

    store.dispatch("areas/load");
    const areas = computed(() => store.getters["areas/get"]);

    return {
      areas,
    };
  },
};
</script>

<style lang="sass">

.area__left-block
  width: 100px !important
  overflow: hidden

.area__order-number
  text-align: center
  font-size: 130px
  margin-top: -80px
  margin-bottom: -80px
  width: 90px

.listReorder-move
  transition: all 0.3s

.visibility-hidden
  visibility: hidden
</style>
