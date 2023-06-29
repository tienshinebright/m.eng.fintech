const CreateYourToken = artifacts.require("CreateYourToken");

contract("CreateYourToken", (accounts) => {
  let tokenInstance;
  const adminAddress = "0x569B22EbEA8c97a13350BDB3EDDb2105D93A8beC";

  before(async () => {
    tokenInstance = await CreateYourToken.deployed();
  });

  it("initializes the contract with correct values", async () => {
    const name = await tokenInstance.name();
    assert.equal(name, "TienYongToken", "has the correct name");
  
    const symbol = await tokenInstance.symbol();
    assert.equal(symbol, "TYT", "has the correct symbol");
  
    const totalSupply = await tokenInstance.totalSupply();
    assert.equal(totalSupply, 10000, "has the correct total supply");
  
    const balance = await tokenInstance.balances(adminAddress);
    assert.equal(balance.toNumber(), 10000, "allocates the initial supply to the admin account");
  });

  it("transfers token ownership", async () => {
    const sender = accounts[0];
    const receiver = accounts[1];
    const amount = 1000;
  
    const initialBalanceSender = await tokenInstance.balances(sender);
    const initialBalanceReceiver = await tokenInstance.balances(receiver);
  
    await tokenInstance.transfer(receiver, amount);
  
    const finalBalanceSender = await tokenInstance.balances(sender);
    const finalBalanceReceiver = await tokenInstance.balances(receiver);
  
    assert.equal(
      finalBalanceSender.toNumber(),
      initialBalanceSender.toNumber() - amount,
      "deducts the amount from the sender's account"
    );
  
    assert.equal(
      finalBalanceReceiver.toNumber(),
      initialBalanceReceiver.toNumber() + amount,
      "adds the amount to the receiver's account"
    );
  });
});
