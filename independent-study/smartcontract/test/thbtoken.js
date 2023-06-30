const THBToken = artifacts.require("THBToken");

contract("THBToken", (accounts) => {
  let tokenInstance;

  before(async () => {
    tokenInstance = await THBToken.deployed();
  });

  it("initializes the contract with correct values", async () => {
    const name = await tokenInstance.name();
    assert.equal(name, "THB Token", "has the correct name");

    const symbol = await tokenInstance.symbol();
    assert.equal(symbol, "THB", "has the correct symbol");

    const totalSupply = await tokenInstance.totalSupply();
    assert.equal(totalSupply, 1000000 * 10**18, "has the correct total supply");

    const balance = await tokenInstance.balanceOf(accounts[0]);
    assert.equal(balance.toString(), (1000000 * 10**18).toString(), 
    "allocates the initial supply to the deployer's account");
  });

  it("transfers token ownership", async () => {
    const transfer = await tokenInstance.transfer(accounts[1], 100 * 10**18);

    const balanceSender = await tokenInstance.balanceOf(accounts[0]);
    assert.equal(balanceSender.toString(), (999900 * 10**18).toString(), 
    "deducts the amount from the sender's account");

    const balanceReceiver = await tokenInstance.balanceOf(accounts[1]);
    assert.equal(balanceReceiver.toString(), (100 * 10**18).toString(), 
    "adds the amount to the receiver's account");
  });
});