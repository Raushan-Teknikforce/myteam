const { BrowserWindow, ipcMain } = require("electron");
const screenshot = require("screenshot-desktop");
const { getconnection } = require("../database/models/config.js");
const {empdailyData} = require("../database/models/empDayData.js")
const path = require("path");
const Store = require("electron-store");
const store = new Store();
let Userwindow;
let timeData;
const UserWindow = () => {
  Userwindow = new BrowserWindow({
    width: 1000,
    height: 1000,
    autoHideMenuBar:true,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "../Preloads/UserPreload.js"),
    },
  });
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  let tempTime = 0;
  let isPaused = false;
  setInterval(() => {
    if (!isPaused) {
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
        tempTime++;
        if (minutes === 60) {
          minutes = 0;
          hours++;
        }
      }
      timeData = [hours, minutes, seconds];
      store.set("timeData", timeData);
    }
  }, 1000);

  let tempX = 0;
  let tempY = 0;
  setInterval(() => {
    const { screen } = require("electron");
    const cursorScreenPoint = screen.getCursorScreenPoint();
    // console.log("cursor", cursorScreenPoint.x, cursorScreenPoint.y);
    if (tempX !== cursorScreenPoint.x || tempY !== cursorScreenPoint.y) {
      tempTime = 0;
      tempX = cursorScreenPoint.x;
      tempY = cursorScreenPoint.y;
    } else if (tempTime >= 5) {
      tempTime = 0;
      isPaused = true;
      shouldContinue = false; // Set the flag to stop the timer
      Userwindow.webContents.send("timeout");
      flag = false;
    }
  }, 10);

  setInterval(() => {
    Userwindow.webContents.send("get-time", store.get("timeData"));
  }, 1000);
  ipcMain.on("pause", () => {
    isPaused = true;
    console.log("Timer paused");
  });
  ipcMain.on("restart", () => {
    isPaused = false;
    console.log("Timer resumed");
  });

  setInterval(screenshotDesk, 10000000);
  function screenshotDesk() {
    screenshot().then((img) => {
      if (typeof img === "string") {
        saveImageToDatabase(img);
      } else if (img instanceof Buffer) {
        const base64Image = `data:image/png;base64,${img.toString("base64")}`;
        saveImageToDatabase(base64Image);
      } else {
        console.error("Unsupported image format");
      }
    });
  }

  const saveImageToDatabase = async (base64Image) => {
    try {
      const con = await getconnection();
      const sql = "INSERT INTO images (image_data, user_id) VALUES (?, ?)";
      const imageData = base64Image.split(",")[1]; // Remove the data URL prefix
      const id = store.get("loggedUser").id;
      const values = [imageData, id];
      con.query(sql, values, (err, result) => {
        if (err) {
          console.error("Error saving image to database:", err);
        } else {
          console.log("Image saved to database");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  Userwindow.loadFile("./view/User.html");

  ipcMain.on("logout", () => {
    const currentTime = new Date()
    store.set("logOutTime", currentTime);
    console.log("logOutTime", store.get("logOutTime"));
     empdailyData(store.get("loggedUser").id, store.get("logInTime"), currentTime, store.get("logDate"));
    Userwindow.close();
    // store.delete("loggedUser");
  });
};
module.exports = {
  UserWindow,
};