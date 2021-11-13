<template>
  <q-item :key="area.id" class="no-padding q-mb-md area__light">
    <div class="col">
      <div class="row">
        <q-item-section class="area__dark col-2 area__left-block">
          <q-btn
            @click="moveUp(area.id)"
            :icon="'arrow_upward'"
            class="area__light q-ma-sm"
            :class="area.index <= 1 ? 'visibility-hidden' : ''"
            style="margin-bottom: 40px"
          ></q-btn>
          <p class="area__order-number">
            {{ area.index }}
          </p>
          <q-btn
            @click="moveDown(area.id)"
            :icon="'arrow_downward'"
            class="area__light q-ma-sm"
            :class="isLast ? 'visibility-hidden' : ''"
            style="margin-top: 40px"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            <AreaName :areaId="area.id" />
          </q-item-label>
          <q-item-label>
            <AreaDescription :areaId="area.id" />
          </q-item-label>
        </q-item-section>
      </div>

      <q-item-section>
        <q-bar class="no-padding area__dark">
          <div class="area__left-block"></div>
          <div class="col">Put current goal here</div>
        </q-bar>
      </q-item-section>
    </div>
  </q-item>
</template>
<script>
import AreaDescription from "components/Areas/AreaDescription";
import AreaName from "components/Areas/AreaName";
import { useStore } from "vuex";

export default {
  name: "Area",
  components: { AreaDescription, AreaName },
  props: {
    area: { required: true },
    isLast: { default: false },
  },
  setup() {
    const store = useStore();

    const moveUp = (id) => store.dispatch("areas/decreaseIndex", { id });
    const moveDown = (id) => store.dispatch("areas/increaseIndex", { id });
    return {
      moveUp,
      moveDown,
    };
  },
};
</script>
<style lang="sass">
$dark_area_color: rgb(76, 0, 10)
$light_area_color: #f44336

.area__dark
  background: $dark_area_color
  color: $light_area_color

.area__light
  background: $light_area_color
  color: black

.area__left-block
  width: 100px !important
  overflow: hidden

.area__order-number
  text-align: center
  font-size: 130px
  margin-top: -80px
  margin-bottom: -80px
  width: 90px
</style>
