import { useStore } from "vuex";
import { computed, ref, watch } from "vue";
import { onClickOutside } from "@vueuse/core";

export default function useAreaTextBos(areaId, setter, areaField) {
  const store = useStore();

  const area = computed(() => store.getters["areas/getById"](areaId.value));

  const isEditing = ref(false);
  const textBoxValue = ref(area.value[areaField]);
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

  function updateField(newValue) {
    store.dispatch(setter, { id: areaId.value, newValue });
    isEditing.value = false;
  }

  onClickOutside(textBox, () => {
    updateField(textBoxValue.value);
  });

  return {
    textBox,
    isEditing,
    area,
    textBoxValue,
    onClick,
    updateField,
  };
}
