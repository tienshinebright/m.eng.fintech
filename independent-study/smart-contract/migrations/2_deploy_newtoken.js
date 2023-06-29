const NewToken = artifacts.require("NewToken");

module.exports = function(deployer) {
  deployer.deploy(NewToken, "NewToken", "NTT", 10000);
};
