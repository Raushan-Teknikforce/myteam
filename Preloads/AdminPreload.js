const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("electronAPI", {
  getVideo: (callback) => {
    ipcRenderer.on("get-Video", callback);
  },
  sendLoginData: (data) => {
    ipcRenderer.send("loginData", data);
  },
  UpdateMsg: (callback) => {
    ipcRenderer.on("messages", callback);
  },
  getEmployeeRequest: () => {
    ipcRenderer.send("get-employee");
  },
  getEmployee: (callback) => {
    ipcRenderer.on("employee-data", callback);
  },
  viewEmployeeLog:(employeeId)=>{
    ipcRenderer.send("view-employee-img", employeeId)
  },
  getLogImage: (callback) => {  
    ipcRenderer.on("get-image", callback);
  },
  DeletEmployee: (employeeId) => { 
    ipcRenderer.send("delete-employee", employeeId);
  },
});
