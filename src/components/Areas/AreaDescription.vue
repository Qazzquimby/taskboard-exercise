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
    @keydown.enter="updateName(textBoxValue)"
    v-model="textBoxValue"
    input-style="font-size: larger"
  >
  </q-input>
</template>

<script>
import { toRefs } from "vue";
import vClickOutside from "click-outside-vue3";
import useAreaTextBos from "components/Areas/useAreaTextBox";

export default {
  name: "AreaDescription",
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

    return { ...useAreaTextBos(areaId, "areas/setDescription", "description") };
  },
};
</script>
