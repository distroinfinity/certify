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

    mapping(address => string) public issuedDegress;
    mapping(address => string) public personToDegree;

    modifier onlyOwner() {
        console.log("only owner", msg.sender, owner);
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    function isssueDegree(address to, string memory tokenUri) external {
        console.log("address to issue", to);
        issuedDegress[to] = tokenUri;
    }

    function claimDegree() public returns (uint256) {
        console.log("requesting degree", msg.sender);
        // require(issuedDegress[msg.sender], "Degree is not issued!");
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, issuedDegress[msg.sender]);
        personToDegree[msg.sender] = issuedDegress[msg.sender];
        // issuedDegress[msg.sender] = false;
        return newTokenId;
    }

    function getDegree(address to) public view returns (string memory) {
        return personToDegree[to];
    }
}
