const { Contract, Signer } = require("ethers")
const { ethers } = require("hardhat")
const fs = require("fs")

require("dotenv").config()

const path = "/home/matischroder/my-nft"

async function mint() {
    const [owner] = await ethers.getSigners()
    console.log("Using account:", owner.address)
    console.log("Account balance:", (await owner.getBalance()).toString())

    Nft = await ethers.getContractFactory("Nft")
    nft = new Contract(
        "0x782501b7e37822bb0b527575b8ebb93a15925948",
        Nft.interface,
        owner
    )

    let file = fs.readFileSync(`${path}/nft_info.json`)
    let data = JSON.parse(file)

    for (i = 0; i < 100; i++) {
        let charged
        let chargedBool = false
        try {
            charged = await nft.nft(i)
            await sleep(10000)
            for (j = 0; j < 100; j++) {
                if (charged.cid == data[j].cid) chargedBool = true
            }
        } catch (err) {
            console.log(err)
            // do nothing
        }
        if (!chargedBool) {
            await sleep(10000)
            await nft.mint(
                data[i].background,
                data[i].tie,
                data[i].suit,
                data[i].base,
                data[i].dna,
                data[i].cid
            )
        }
    }
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

mint()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
