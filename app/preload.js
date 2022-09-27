const { contextBridge, ipcRenderer, IpcRendererEvent } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    sendMessage(channel, args) {
      ipcRenderer.send(channel, args);
    },
    on(channel, func) {
      const subscription = (_event, ...args) => func(...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel, func) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
});
