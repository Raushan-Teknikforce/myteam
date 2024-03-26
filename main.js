const { createWindow } = require("./index.js");
const { registerUser } = require("./database/models/register.js");
const { login }        = require("./database/models/login.js");
const { adminlogin }        = require("./database/models/adminlogin.js");
const { deleteEmployeeFromDatabase } = require("./database/models/deleteEmp.js");
const { getEmployee } = require("./database/models/getEmp.js"); 
const { AdminWindow } = require("./Windows/AdminWindow.js");
const { UserWindow } = require("./Windows/Userwindow.js");
const { app, ipcMain } = require("electron");
const Store = require("electron-store");
const store = new Store();
store.delete("loggedUser");
app.allowRendererProcessReuse = true;
if (store.size != 0 && store.get("loggedUser") != null) {
    app.whenReady().then(UserWindow);
    store.set("logInTime", new Date());
    store.set("logDate", new Date());
} else {
    app.whenReady().then(createWindow);
}
ipcMain.on("register", async (event, user) => {
  const registeredUser = await registerUser(user);
});

ipcMain.on("get-employee", async (event, arg) => {
  const employee = await getEmployee();
  event.reply("employee-data", employee);
});

ipcMain.on("login-data", async (event, loginUser) => {
  const Admin = await adminlogin(loginUser);
  const loggedUser = await login(loginUser);
  store.set("loggedUser", loggedUser);
  if (loggedUser) {
    app.whenReady().then(UserWindow);
    const loginTime = new Date()
    store.set("logInTime",loginTime);
    store.set("logDate",new Date());
    app.quit();
  }
  if(Admin){
    app.whenReady().then(AdminWindow);
    app.quit();
  }
});

ipcMain.on("delete-employee", async (event, employeeId) => {
  const deleteEmployee = await deleteEmployeeFromDatabase(employeeId);
  if(deleteEmployee>0){
     app.whenReady().then(AdminWindow);
  }
});
