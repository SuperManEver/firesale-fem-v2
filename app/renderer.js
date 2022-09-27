const markdownView = document.querySelector("#markdown");
const htmlView = document.querySelector("#html");
const newFileButton = document.querySelector("#new-file");
const openFileButton = document.querySelector("#open-file");
const saveMarkdownButton = document.querySelector("#save-markdown");
const revertButton = document.querySelector("#revert");
const saveHtmlButton = document.querySelector("#save-html");
const showFileButton = document.querySelector("#show-file");
const openInDefaultButton = document.querySelector("#open-in-default");

newFileButton.addEventListener("click", (evt) => {
  window.electron.ipcRenderer.sendMessage("get-file");
});

markdownView.addEventListener("keyup", (event) => {
  const currentContent = event.target.value;
});
