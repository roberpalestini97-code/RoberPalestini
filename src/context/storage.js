// localStorage can throw (private mode, blocked storage); never let it break the app.
export const readPref = (key) => {
  try {
    return window.localStorage.getItem(key);
  } catch (e) {
    return null;
  }
};

export const writePref = (key, value) => {
  try {
    window.localStorage.setItem(key, value);
  } catch (e) {
    /* ignore */
  }
};
