const THBToken = artifacts.require("THBToken");

module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(THBToken);
};
