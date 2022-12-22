var DataTypes = require("sequelize").DataTypes;
var _admin = require("./admin");
var _produit = require("./produit");

function initModels(sequelize) {
  var admin = _admin(sequelize, DataTypes);
  var produit = _produit(sequelize, DataTypes);


  return {
    admin,
    produit,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
