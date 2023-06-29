const THBToken = artifacts.require("THBToken");

module.exports = function(deployer) {
  deployer.deploy(THBToken);
};
