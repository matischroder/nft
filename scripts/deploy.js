const { ethers } = require("hardhat")
require("dotenv").config()

async function main() {
    const [deployer] = await ethers.getSigners()
    console.log("Deploying contracts with the account:", deployer.address)
    console.log("Account balance:", (await deployer.getBalance()).toString())

    Nft = await ethers.getContractFactory("Nft")
    nft = await Nft.deploy()

    console.log("Nft address:", nft.address) //0x8736b26702CF73b6e496F9ca5D7F5B88D6Cb4321
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
