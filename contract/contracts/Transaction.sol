// SPDX-License-Identifier: MIT License
pragma solidity ^0.8.0;

contract Transaction {
    uint256 txnCount;

    event Transfer(
        address from,
        address receiver,
        uint256 amount,
        string message,
        uint256 timestamp
    );

    struct TransferStruct {
        address sender;
        address receiver;
        uint256 amount;
        string message;
        uint256 timestamp;
    }

    TransferStruct[] transactions;

    function makeTxn(
        address payable receiver,
        uint256 amount,
        string memory message
    ) public {
        transactions.push(
            TransferStruct(
                msg.sender,
                receiver,
                amount,
                message,
                block.timestamp
            )
        );

        emit Transfer(msg.sender, receiver, amount, message, block.timestamp);
    }
}
