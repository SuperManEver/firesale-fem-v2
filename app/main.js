const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");
const _ = require("lodash");

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile(`${__dirname}/index.html`);

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  getFileFromUser();
};

async function getFileFromUser() {
  const loadFilesPromise = dialog.showOpenDialog({
    properties: ["openFile"],
  });

  const file = await loadFilesPromise;

  if (!file) {
    return;
  }

  const { canceled, filePaths } = file;

  if (canceled || _.isEmpty(filePaths)) return;

  const content = fs.readFileSync(filePaths[0]).toString();

  console.log(content);
}

app.whenReady().then(createWindow);

console.log("Starting up...");
