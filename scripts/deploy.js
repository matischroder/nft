const { ethers } = require("hardhat")
require("dotenv").config()

async function main() {
    const [deployer] = await ethers.getSigners()
    console.log("Deploying contracts with the account:", deployer.address)
    console.log("Account balance:", (await deployer.getBalance()).toString())

    Nft = await ethers.getContractFactory("Nft")
    nft = await Nft.deploy()

    console.log("Nft address:", nft.address) //0x782501b7E37822bB0B527575B8EBb93A15925948
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
