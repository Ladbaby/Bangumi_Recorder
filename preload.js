const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  closeApp: () => ipcRenderer.send('close-app'),
  minApp: () => ipcRenderer.send('min-app'),
  maxApp: () => ipcRenderer.send('max-app'),
  restoreApp: () => ipcRenderer.send('restore-app'),
  showData: () => ipcRenderer.invoke('show-data'),
  writeCoverImage: (fileName, url) => ipcRenderer.invoke('write-cover-image', fileName, url),
  updateDateBase: (animeList) => ipcRenderer.invoke('update-database', animeList)
})