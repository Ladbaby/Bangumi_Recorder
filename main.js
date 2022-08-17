const { app, BrowserWindow, nativeTheme, ipcMain } = require("electron");

const url = require("url");
const path = require("path");

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
    title: "Anime Recorder",
    backgroundColor: nativeTheme.shouldUseDarkColors
    ? "#282828"
    : "#faf9f8",
		width: 800,
		height: 600,
    minWidth: 800,
    minHeight: 600,
    frame: false,
		webPreferences: {
      webviewTag: true,
      spellcheck: false,
			nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
		},
	});
  
	mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `./dist/index.html`),
			protocol: "file:",
			slashes: true,
		})
    );
    mainWindow.on("closed", function () {
      mainWindow = null;
    });
}
console.log(app);
app.on("ready", function () {
  createWindow();
  ipcMain.on('close-app', () => {
    if (mainWindow) {
      mainWindow.close()
    }
  })
  ipcMain.on('min-app', () => {
    mainWindow.minimize()
  })
  ipcMain.on('max-app', () => {
    mainWindow.maximize()
  })
  ipcMain.on('restore-app', () => {
    mainWindow.unmaximize()
  })
  if (!app.isPackaged) mainWindow.webContents.openDevTools();
});

app.on("window-all-closed", function () {
	if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
	if (mainWindow === null) createWindow();
});