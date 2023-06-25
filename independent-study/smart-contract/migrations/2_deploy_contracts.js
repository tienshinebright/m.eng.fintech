const CreateYourToken = artifacts.require("CreateYourToken");

module.exports = function(deployer) {
  deployer.deploy(CreateYourToken, "TienYongToken", "TYT", 10000);
};
