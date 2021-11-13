<template>
  <q-item
    :key="area.id"
    class="no-padding q-mb-md area__light"
    :class="'area__' + area.color"
  >
    <div class="col">
      <div class="row">
        <q-item-section
          class="area__dark col-2 area__left-block"
          :class="'area__' + area.color"
        >
          <q-btn
            @click="moveUp(area.id)"
            :icon="'arrow_upward'"
            class="area__light q-ma-sm"
            :class="[
              area.index <= 1 ? 'visibility-hidden' : '',
              'area__' + area.color,
            ]"
            style="margin-bottom: 40px"
          ></q-btn>
          <p class="area__order-number non-selectable">
            {{ area.index }}
          </p>
          <q-btn
            @click="moveDown(area.id)"
            :icon="'arrow_downward'"
            class="area__light q-ma-sm"
            :class="[isLast ? 'visibility-hidden' : '', 'area__' + area.color]"
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
        <q-bar class="no-padding area__dark" :class="'area__' + area.color">
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
@use "sass:map"
@use "sass:list"

.area__left-block
  width: 100px !important
  overflow: hidden

.area__order-number
  text-align: center
  font-size: 130px
  margin-top: -80px
  margin-bottom: -80px
  width: 90px


$color-dark-light-map: ("red": (rgb(76, 0, 10), rgb(244, 67, 54)), "blue": (rgb(0, 22, 76), rgb(53, 154, 252)))

.area__dark
  @each $name, $color in $color-dark-light-map
    &.area__#{$name}
      background: nth($color, 1)
      color: nth($color, 2)

.area__light
  color: black

  @each $name, $color in $color-dark-light-map
    &.area__#{$name}
      background: nth($color, 2)
</style>
