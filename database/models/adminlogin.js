const { getconnection } = require("./config.js");
const{ Notification } = require("electron");

const adminlogin = async (loginUser) => {
    console.log("loginUser",loginUser)
    try {
      const con = await getconnection();
      const result = await con.query("SELECT * FROM admin WHERE email = ?", [
        loginUser.email,
      ]);
      if (result.length > 0) {
        const user = result[0];
        if (user.PASSWORD === loginUser.password) {
          new Notification({
            title: "admin Logged in",
            body: `Welcome to MyTeam, ${user.name}`,
          }).show();
          return user;
        }
      }
      console.log("Invalid admin credentials");
      return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  };
  module.exports={
    adminlogin
  }