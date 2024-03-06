const { BrowserWindow, ipcMain, Notification } = require("electron");
const path = require("path");
const { getconnection } = require("./database/models/config.js");
let window;
const createWindow = () => {
  window = new BrowserWindow({
    width: 1000,
    height: 1000,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "./Preloads/preload.js"),
    },
  });
  window.loadFile("./view/loginuser.html");
};

const viewEmployeeLog = async (employeeId) => {
  try {
    const con = await getconnection();
    console.log("employeeId", employeeId);
    const result = await con.query("SELECT * FROM images WHERE user_id = ?", [
      employeeId,
    ]);
    return result;
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  createWindow,
  viewEmployeeLog,
};
