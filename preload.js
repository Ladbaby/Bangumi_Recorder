const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  closeApp: () => ipcRenderer.send('close-app'),
  minApp: () => ipcRenderer.send('min-app'),
  maxApp: () => ipcRenderer.send('max-app'),
  restoreApp: () => ipcRenderer.send('restore-app')
})