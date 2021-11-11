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
    @keydown.enter="updateName(textBoxValue)"
    v-model="textBoxValue"
    input-style="font-size: larger"
  >
  </q-input>
</template>

<script>
import { watch, computed, ref, toRefs } from "vue";
import vClickOutside from "click-outside-vue3";
import { useStore } from "vuex";
import { onClickOutside } from "@vueuse/core";

function textBox() {}

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
    const store = useStore();

    const { areaId } = toRefs(props);
    const area = computed({
      get: () => store.getters["areas/getById"](areaId.value),
    });

    const isEditing = ref(false);
    const textBoxValue = ref(area.value.name);
    function onClick() {
      isEditing.value = true;
    }

    const textBox = ref(null);
    watch(
      () => textBox.value,
      (value) => {
        if (value != null) {
          value.focus();
        }
      }
    );

    function updateName(name) {
      store.dispatch("areas/setName", { id: areaId.value, name });
      isEditing.value = false;
    }

    onClickOutside(textBox, () => {
      updateName(textBoxValue.value);
    });

    return { textBox, isEditing, area, textBoxValue, onClick, updateName };
  },
};
</script>
