const MyContract = artifacts.require("MyContract");

contract("MyContract", (accounts) => {
    let myContractInstance;

    before(async () => {
        myContractInstance = await MyContract.deployed();
    });

    it("test initializes the contract with correct values", async () => {
        const number = await myContractInstance.myNumber();
        assert.equal(number, "42", "has the correct initial value for myNumber");

        const word = await myContractInstance.myWords();
        assert.equal(word, "Hello", "has the correct initial value for myWords ")
    });
});