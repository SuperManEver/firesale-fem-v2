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

  // getFileFromUser();
};

async function getFileFromUser() {
  const loadFilesPromise = dialog.showOpenDialog({
    properties: ["openFile"],
    buttonLabel: "Unveil",
    title: "Open Fire Sale Document",
    // filters: [
    //   { name: "Markdown Files", extensions: ["md", "mdown", "markdown"] },
    //   { name: "Text Files", extensions: ["txt", "text", "md", "json"] },
    // ],
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

ipcMain.on("get-file", async (event, arg) => {
  console.log(arg);
});

app.whenReady().then(createWindow);

console.log("Starting up...");
