const db = require(".");
const data = require("./TechTestJson.json");
const format = require("pg-format");

exports.seed_locations = () => {
  return db
    .query("DROP TABLE IF EXISTS locations")
    .then(() => {
      return db.query(
        "CREATE TABLE locations (location_name VARCHAR(20),latitude FLOAT, longitude FLOAT)"
      );
    })
    .then(() => {
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

      const query = format(
        "INSERT INTO locations (Location_name, Latitude, Longitude) VALUES%L",
        input
      );

      return db.query(query);
    })
    .catch((err) => {
      console.log(err);
    });
};
