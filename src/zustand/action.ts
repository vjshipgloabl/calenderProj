export const addEvent = (data: Event) => {
  return {
    type: "ADD_EVENT",
    payload: data,
  };
};
