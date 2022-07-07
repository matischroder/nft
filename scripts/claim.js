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
    console.log(Nft.interface)

    nft = new Contract(
        "0x8736b26702CF73b6e496F9ca5D7F5B88D6Cb4321",
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
