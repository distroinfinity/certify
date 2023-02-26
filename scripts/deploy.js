const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const Degree = await hre.ethers.getContractFactory("Degree");
  const degree = await Degree.deploy();
  await degree.deployed();
  console.log("degree deployed to:", degree.address);

  fs.writeFileSync(
    "./config.js",
    `
  export const degree = "${degree.address}"
  `
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
