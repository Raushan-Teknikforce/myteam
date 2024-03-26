const {contextBridge, ipcRenderer} = require('electron')


contextBridge.exposeInMainWorld('electronAPI',{
    registerUser: (user)=>{
    ipcRenderer.send('register',user)
   },
   login:(loginUser)=>{
    ipcRenderer.send('login-data',loginUser)
   },
  
})