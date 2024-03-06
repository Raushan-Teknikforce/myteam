const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  getScreenshot: (callback) => {
    ipcRenderer.on("get-screenshot", callback);
  },
  sendVideo: (Videodata) => {
    ipcRenderer.send("Video-data", Videodata);
  },

  pause: () => {
    ipcRenderer.send("pause");
  },
  restart: () => {
    ipcRenderer.send("restart");
  },

  getTime: (callback) => {
    ipcRenderer.on("get-time", callback);
  },
  getTimeout: (callback) => {
    ipcRenderer.on("timeout", callback);
  },
  logout: () => {
    ipcRenderer.send("logout");
  },
  loggedIn: (callback) => {
    ipcRenderer.on("login-reply", callback);
  },
});
