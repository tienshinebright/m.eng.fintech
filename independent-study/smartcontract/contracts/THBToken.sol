// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract THBToken is ERC20 {
    constructor() ERC20("THB Token", "THB") {
        _mint(msg.sender, 1000000 * 10**decimals());
    }
}