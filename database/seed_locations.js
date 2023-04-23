const con = require(".");
const data = require("./TechTestJson.json");

con.connect(function (err) {
  if (err) throw err;
});
con.query(
  "CREATE TABLE locations (location_name VARCHAR(20),latitude FLOAT(10,6), longitude FLOAT(10,6) )",
  function (err, res) {
    if (err) throw err;
  }
);
const inputCheck = [];
const input = [];
data.forEach((location) => {
  inputCheck.includes(location.LocationName)
    ? null
    : input.push([
        location.LocationName,
        location.Latitude,
        location.Longitude,
      ]);
  inputCheck.push(location.LocationName);
});

con.query("INSERT INTO locations VALUES ?", [input], function (err, res) {
  if (err) throw err;
});

con.end();
