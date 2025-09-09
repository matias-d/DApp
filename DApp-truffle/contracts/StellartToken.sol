// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;


contract StellartToken {

   // Token basic info
    string public name = "Stellart Token";
    string public symbol = "STE";
    uint256 public totalSupply = 1000000000000000000000000;
    uint8 public decimals = 18;

    // Event emitted when tokens are transferred
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    // Event emitted when an operator is approved
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

  // Stores balances of each address
    mapping(address => uint256) public balanceOf;

    // Stores allowances for delegated spending
    mapping(address => mapping(address => uint256)) public allowance;

     // Constructor: assigns the total supply to the contract deployer
    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }

    // Transfer tokens from sender to another address
    function transfer(address _to, uint256 _value) public returns (bool success){
        require(balanceOf[msg.sender] >= _value, "JAM: tokens insufeccent");

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return  true;
    }

    // Transfer tokens from sender to another address
    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    // Approve an operator to spend tokens on behalf of the sender
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from], "JAM: tokens insufeccent");
        require(_value <= allowance[_from][msg.sender], "JAM: allowance exceded" );

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return  true;
    }

}