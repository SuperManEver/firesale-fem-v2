const { app, BrowserWindow, dialog, ipcMain } = require("electron");
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
};

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog();
  if (canceled) {
    return void 0;
  } else {
    return filePaths[0];
  }
}

async function getFileFromUser() {
  const filePath = await handleFileOpen();

  if (!filePath) {
    return;
  }

  return fs.readFileSync(filePath).toString();
}

ipcMain.on("get-file", async (event, arg) => {
  const content = await getFileFromUser();

  console.log("event hander: ", content);
});

app.whenReady().then(() => {
  ipcMain.on("dialog:openFile", getFileFromUser);

  createWindow();
});

console.log("Starting up...");
