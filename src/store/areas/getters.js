export const get = (state) => {
  return [...state.areas].sort((a, b) => a.index - b.index);
};

export const getById = (state) => (id) => {
  return state.areas.find((area) => area.id === id);
};
