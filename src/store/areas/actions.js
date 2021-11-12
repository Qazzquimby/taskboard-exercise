import axios from "axios";
import { get } from "src/store/areas/getters";

export async function increaseIndex(context, { id }) {
  const areas = get(context.state);
  const indexWithId = areas.findIndex((area) => area.id === id);
  if (indexWithId + 1 >= areas.length) {
    console.log("ERROR: Called increase index on the last area.");
  }

  const currentArea = areas[indexWithId];
  await saveArea(context, {
    id: currentArea.id,
    patch: { index: currentArea.index + 1 },
  });

  const nextArea = areas[indexWithId + 1];
  await saveArea(context, {
    id: nextArea.id,
    patch: { index: nextArea.index - 1 },
  });
}

function getArea(context, id) {
  const areas = get(context.state);
  const indexWithId = areas.findIndex((area) => area.id === id);
  const currentIndex = areas[indexWithId];
  return currentIndex;
}

export async function setName(context, { id, newValue }) {
  const area = getArea(context, id);
  await saveArea(context, {
    id: area.id,
    patch: { name: newValue },
  });
}

export async function setDescription(context, { id, newValue }) {
  const area = getArea(context, id);
  await saveArea(context, {
    id: area.id,
    patch: { description: newValue },
  });
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
    await axios.patch(`http://localhost:3007/areas/${id}`, patch);
  } catch (e) {
    console.log(e);
  }
}
