<template>
  <p
    v-if="!isEditing"
    @click="onClick"
    class="text-italic text-subtitle1 non-selectable cursor-pointer"
  >
    {{ area.description }}
  </p>

  <q-input
    v-else
    ref="textBox"
    filled
    autogrow
    @keydown.enter="updateField(textBoxValue)"
    v-model="textBoxValue"
    input-style="font-size: larger"
  >
  </q-input>
</template>

<script>
import vClickOutside from "click-outside-vue3";

export default {
  name: "AreaDescription",
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
  useAreaTextBox(areaId, "areas/setDescription", "description");
</script>
