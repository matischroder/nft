const { Contract, Signer } = require("ethers")
const { ethers } = require("hardhat")
const fs = require("fs")

require("dotenv").config()

const path = "/home/matischroder/my-nft"

async function mint() {
    const [user] = await ethers.getSigners()
    console.log("Using account:", user.address)
    console.log("Account balance:", (await user.getBalance()).toString())

    Nft = await ethers.getContractFactory("Nft")
    nft = new Contract(
        "0x782501b7e37822bb0b527575b8ebb93a15925948",
        Nft.interface,
        user
    )
    const options = { value: ethers.utils.parseEther("0.05") }
    await nft.claimNft(options)

    const number = await nft.NumberOfNfts(user.getAddress())
    console.log(number)
}

mint()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
