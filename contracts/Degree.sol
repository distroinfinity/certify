// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

pragma solidity ^0.8.0;

contract Degree is ERC721URIStorage {
    address owner;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("UniDegree", "Degree") {
        owner = msg.sender;
    }

    mapping(address => bool) public issuedDegress;
    mapping(address => string) public personToDegree;

    modifier onlyOwner() {
        console.log("only owner", msg.sender, owner);
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    function isssueDegree(address to) external onlyOwner {
        console.log("address to issue", to);
        issuedDegress[to] = true;
    }

    function claimDegree(string memory tokenUri) public returns (uint256) {
        console.log("requesting degree", msg.sender);
        require(issuedDegress[msg.sender], "Degree is not issued!");
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenUri);
        personToDegree[msg.sender] = tokenUri;
        // issuedDegress[msg.sender] = false;
        return newTokenId;
    }
}
