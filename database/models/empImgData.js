const { getconnection } = require("./config.js");
const imgData = async (employeeId) => {
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

module.exports={
    imgData
}