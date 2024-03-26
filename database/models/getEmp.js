const { getconnection } = require("./config.js");

const getEmployee = async () => {
    try {
      const con = await getconnection();
      const result = await con.query("SELECT * FROM register");
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  module.exports={
    getEmployee
  }