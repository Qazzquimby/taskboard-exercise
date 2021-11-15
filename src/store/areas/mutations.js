export function setAreas(state, areas) {
  state.areas = areas;
}

export function setArea(state, area) {
  const indexWithId = state.areas.findIndex(
    (existingArea) => existingArea.id === area.id
  );
  state.areas[indexWithId] = area;
}

export function save(state, { id, patch }) {
  const indexWithId = state.areas.findIndex(
    (existingArea) => existingArea.id === id
  );
  Object.assign(state.areas[indexWithId], patch);
}
