const { imgData } = require("../database/models/empImgData.js");
const { BrowserWindow, ipcMain } = require("electron");
const path = require("path");
let Adminwindow;
const AdminWindow = () => {
  Adminwindow = new BrowserWindow({
    width: 1000,
    height: 1000,
    autoHideMenuBar:true,
    webPreferences: {
      preload: path.join(__dirname, "../Preloads/AdminPreload.js"),
    },
  });

  ipcMain.on("Video-data", (event, Videodata) => {
    Adminwindow.webContents.send("get-Video", Videodata);
  });

  Adminwindow.loadFile("./view/Admin.html");
  ipcMain.on("view-employee-img", async (event, employeeId) => {
    try { let imageBase64 = [];
      const employeeImg = await imgData(employeeId);
      employeeImg.forEach((element) => {
        imageBase64.push(element.image_data);
      });
      if (imageBase64) {
        Adminwindow.webContents.send("get-image", imageBase64);
      }
    } catch (err) {
      console.log(err);
    }
  });

  //Adminwindow.webContents.openDevTools();
};

module.exports = {
  AdminWindow
};
