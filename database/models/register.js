const { getconnection } = require("./config.js");
const{ Notification } = require("electron");
const registerUser = async (user) => {
    try {
      const con = await getconnection();
      const result = await con.query("INSERT INTO register SET ?", user);
      user.id = await result.insertId;
      new Notification({
        title: "registered",
        body: `Welcome to MyTeam, ${user.name}`,
      }).show();
      return user;
    } catch (err) {
      console.log(err);
    }
  };

  module.exports={
    registerUser
  }