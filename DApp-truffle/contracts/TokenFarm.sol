// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./JamToken.sol";
import "./StellartToken.sol";

contract TokenFarm {

    // Contract name
    string public name = "Stellart Token Farm";

    // Contract owner
    address public owner;

    // Token references (ERC20)
    JamToken public jamToken;
    StellartToken public stellartToken;

    // List of all addresses that have staked
    address [] public stakers;

    // Mapping of user staking balances
    mapping(address => uint256) public stakingBalance;

    // Tracks if a user has ever staked
    mapping(address => bool) public hasStaked;

    // Tracks if a user is currently staking
    mapping(address => bool) public isStaking;

    // Constructor: sets owner and token addresses
    constructor(StellartToken _stellartToken, JamToken _jamToken) {
        owner = msg.sender;
        stellartToken = _stellartToken;
        jamToken = _jamToken;
    }

    // Stake JAM tokens into the contract
    function stakeTokens(uint _amount) public {
        require(_amount > 0, "The amount cannot be less than 0.");
        jamToken.transferFrom(msg.sender, address(this), _amount);
        stakingBalance[msg.sender] += _amount;
        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // Withdraw staked JAM tokens
    function unstakeTokens() public {
        uint balance = stakingBalance[msg.sender];
        require(balance > 0, "The staking balance is 0.");
        jamToken.transfer(msg.sender, balance);
        stakingBalance[msg.sender] = 0;
        isStaking[msg.sender] = false;
    }

    // Issue reward tokens (Stellart) to all stakers
    function issueTokens() public {
        require(msg.sender == owner, "You are not the owner");
        for(uint i = 0; i < stakers.length; i++ ) {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient];
            if (balance > 0) {
                stellartToken.transfer(recipient, balance);
            }

        }
    }

}