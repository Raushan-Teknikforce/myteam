const { getconnection } = require("./config.js");
const empdailyData = async (user_id, logintime, logouttime, date) => {
const con = await getconnection();
 
const sql = "INSERT INTO empData (user_id, logintime, logouttime, date) VALUES (?,?,?,?)";
const values = [user_id, logintime, logouttime, date];  
con.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error saving image to database:", err);
    } else {
      console.log("Image saved to database");
    }
  });
}

module.exports = {
 empdailyData
}