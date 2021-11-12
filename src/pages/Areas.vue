<template>
  <q-page padding>
    <q-btn @click="isEditMode = !isEditMode" label="Edit" />
    <transition-group tag="q-list" name="listReorder">
      <q-item
        v-for="area in areas"
        :key="area.id"
        class="no-padding q-mb-md area__light"
      >
        <div class="col">
          <div class="row">
            <q-item-section class="area__dark col-2 area__left-block">
              <q-btn
                v-show="isEditMode"
                :icon="'arrow_upward'"
                class="area__light q-ma-sm area__form-control"
                :class="area.index <= 1 ? 'visibility-hidden' : ''"
                style="margin-bottom: 40px"
              ></q-btn>
              <p class="area__order-number">
                {{ area.index }}
              </p>
              <q-btn
                v-if="isEditMode"
                @click="moveDown(area.id)"
                :icon="'arrow_downward'"
                class="area__light q-ma-sm"
                :class="area.index >= areas.length ? 'visibility-hidden' : ''"
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
    </transition-group>
  </q-page>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import AreaName from "components/Areas/AreaName";
import AreaDescription from "components/Areas/AreaDescription";

export default {
  name: "Areas",
  components: { AreaDescription, AreaName },
  setup() {
    const store = useStore();

    const isEditMode = ref(true);

    store.dispatch("areas/load");
    const areas = computed(() => store.getters["areas/get"]);

    const moveDown = (id) => {
      store.dispatch("areas/increaseIndex", { id });
    };

    return {
      areas,
      isEditMode,
      moveDown,
    };
  },
  // created() {
  //   this.$store.dispatch("areas/load");
  // },
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
  //position: absolute
  width: 90px

.listReorder-move
  transition: all 0.3s

.visibility-hidden
  visibility: hidden
</style>
