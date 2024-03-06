const { getconnection } = require("./config.js");
const{ Notification } = require("electron");

const login = async (loginUser) => {
    try {
      const con = await getconnection();
      const result = await con.query("SELECT * FROM register WHERE email = ?", [
        loginUser.email,
      ]);
      if (result.length > 0) {
        const user = result[0];
        if (user.password === loginUser.password) {
          new Notification({
            title: "Logged in",
            body: `Welcome to MyTeam, ${user.name}`,
          }).show();
          return user;
        }
      }
      console.log("Invalid credentials");
      return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  };
  module.exports={
    login
  }