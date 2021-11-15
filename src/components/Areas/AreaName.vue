<template>
  <h4
    v-if="!isEditing"
    @click="onClick"
    class="q-mt-sm q-mb-sm non-selectable cursor-pointer"
  >
    {{ area.name }}
  </h4>
  <q-input
    v-else
    ref="textBox"
    filled
    @keydown.enter="updateField(textBoxValue)"
    v-model="textBoxValue"
    input-style="font-size: larger"
  />
</template>

<script>
import vClickOutside from "click-outside-vue3";
export default {
  name: "AreaName",
  props: {
    areaId: {
      type: Number,
      required: true,
    },
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
};
</script>

<script setup>
import { toRefs } from "vue";
import useAreaTextBox from "components/Areas/useAreaTextBox";

const props = defineProps({
  areaId: {
    type: Number,
    required: true,
  },
});

const { areaId } = toRefs(props);
const { textBox, isEditing, area, textBoxValue, onClick, updateField } =
  useAreaTextBox(areaId, "areas/setName", "name");
</script>
