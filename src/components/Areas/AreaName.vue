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
    @keydown.enter="updateName(textBoxValue)"
    v-model="textBoxValue"
    input-style="font-size: larger"
  />
</template>

<script>
import { toRefs } from "vue";
import vClickOutside from "click-outside-vue3";
import useAreaTextBos from "components/Areas/useAreaTextBox";

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

  setup(props) {
    const { areaId } = toRefs(props);

    return { ...useAreaTextBos(areaId, "areas/setName", "name") };
  },
};
</script>
