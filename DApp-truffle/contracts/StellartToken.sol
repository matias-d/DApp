// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;


contract StellartToken {

    // Declaraciones
    string public name ="Stellart Token";
    string public symbol = "STE";
    uint256 public totalSupply = 1000000000000000000000000; // 1 millon de tokens
    uint8 public decimals = 18;

    // Evento para la transferencia de tokens de un usuario
    event Transfer (
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    // Evento para la aprobacion de un operador
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    // Estructura de datos
    mapping(address => uint256) public balanceOf;
    mapping (address => mapping(address => uint256)) public allowance;

    // Constructor
    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }

    // Transferencia de tokens de un usuario
    function transfer(address _to, uint256 _value) public returns (bool success){
        require(balanceOf[msg.sender] >= _value, "JAM: tokens insufeccent");

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return  true;
    }

    // Aprobacion de una cantidad para ser gastada por un operador
    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    // Transferencia de tokens especificando el emisor
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