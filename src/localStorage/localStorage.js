export default {
  setStorage: (name, val) => {
    localStorage.setItem(`${name}`, JSON.stringify(val));
  },

  getStorage: (name) => {
    return JSON.parse(localStorage.getItem(`${name}`));
  },
};
