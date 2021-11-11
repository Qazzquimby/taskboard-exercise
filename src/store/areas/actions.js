import axios from "axios";
import { get } from "src/store/areas/getters";

export async function increaseIndex(context, { id }) {
  const areas = get(context.state);
  const indexWithId = areas.findIndex((area) => area.id === id);
  if (indexWithId + 1 >= areas.length) {
    console.log("ERROR: Called increase index on the last area.");
  }

  const currentIndex = areas[indexWithId];
  await saveArea(context, { id: currentIndex.id, index: currentIndex + 1 });

  const nextIndex = areas[indexWithId + 1];
  await saveArea(context, {
    id: nextIndex.id,
    patch: { index: nextIndex + 1 },
  });
}

export async function setName(context, { id, name }) {
  const areas = get(context.state);
  const indexWithId = areas.findIndex((area) => area.id === id);
  const currentIndex = areas[indexWithId];
  await saveArea(context, { id: currentIndex.id, patch: { name } });
}

export async function load(context) {
  try {
    const response = await axios.get("http://localhost:3007/areas");
    context.commit("setAreas", response.data);
  } catch (e) {
    console.log(e);
  }
}

export async function saveArea(context, { id, patch }) {
  context.commit("save", { id, patch });
  try {
    const response = await axios.patch(
      `http://localhost:3007/areas/${id}`,
      patch
    );
    console.log("Response", response.data);
  } catch (e) {
    console.log(e);
  }
}
