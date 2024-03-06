const { getconnection } = require("./config.js");
const deleteEmployeeFromDatabase = async (employeeId) => {
    try {
      const con = await getconnection();
      const result = await con.query("DELETE FROM register WHERE id = ?", [
        employeeId,
      ]);
      return result;
    } catch (err) {
      console.log(err);
    }
  };
  module.exports={
    deleteEmployeeFromDatabase
  }