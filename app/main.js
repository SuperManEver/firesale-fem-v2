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
    return;
  } else {
    return filePaths[0];
  }
}

async function getFileFromUser() {
  const file = await handleFileOpen();

  if (!file) {
    return;
  }

  const { canceled, filePaths } = file;

  if (canceled || _.isEmpty(filePaths)) return;

  const content = fs.readFileSync(filePaths[0]).toString();

  console.log(content);
}

ipcMain.on("get-file", async (event, arg) => {
  const content = await getFileFromUser();

  event.reply("get-file", content);
});

app.whenReady().then(() => {
  ipcMain.handle("dialog:openFile", getFileFromUser);

  createWindow();
});

console.log("Starting up...");
