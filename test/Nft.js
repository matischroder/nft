const { expect } = require("chai")
const { BigNumber } = require("ethers")
const { ethers } = require("hardhat")

describe("Nft contract", function () {
    let Nft
    let hardhatNft
    let owner
    let addr1
    let addr2
    beforeEach(async function () {
        ;[owner, addr1, addr2] = await ethers.getSigners()
        Nft = await ethers.getContractFactory("Nft")
        hardhatNft = await Nft.deploy()
    })

    it("Deployment should assign the deployer, the contract owner", async function () {
        const _owner = await hardhatNft.i_owner()
        expect(await owner.getAddress()).to.equal(_owner)
    })

    it("Mint nfts", async function () {
        const firstNft = [
            BigNumber.from("0"),
            "Purple",
            "Blue",
            "Gray",
            "Base",
            "18142782d84ac3a45ec34bf729cd920676ddc1c8",
            "bafkreigewh3khhu7ihpvl55hul2ovnfqhmjt35tf3tzlbjftcjtwtsfiqe",
            "0x0000000000000000000000000000000000000000",
        ]

        await hardhatNft.mint(
            "Purple",
            "Blue",
            "Gray",
            "Base",
            "18142782d84ac3a45ec34bf729cd920676ddc1c8",
            "bafkreigewh3khhu7ihpvl55hul2ovnfqhmjt35tf3tzlbjftcjtwtsfiqe"
        )
        let nft = await hardhatNft.nft(0)
        expect(nft.id).to.equal(firstNft[0])
        expect(nft.background).to.equal(firstNft[1])
        expect(nft.tie).to.equal(firstNft[2])
        expect(nft.suit).to.equal(firstNft[3])
        expect(nft.base).to.equal(firstNft[4])
        expect(nft.dna).to.equal(firstNft[5])
        expect(nft.cid).to.equal(firstNft[6])
        expect(nft.owner).to.equal(firstNft[7])
    })

    it("Buy Nft", async function () {
        await hardhatNft.mint(
            "Purple",
            "Blue",
            "Gray",
            "Base",
            "18142782d84ac3a45ec34bf729cd920676ddc1c8",
            "bafkreigewh3khhu7ihpvl55hul2ovnfqhmjt35tf3tzlbjftcjtwtsfiqe"
        )

        var options = { value: ethers.utils.parseEther("0.05") }
        await hardhatNft.connect(addr1).claimNft(options)

        expect(await hardhatNft.users(0)).to.equal(await addr1.getAddress())
        expect(await hardhatNft.hasAccount(addr1.getAddress())).to.equal(true)
        let nft = await hardhatNft.nft(0)
        expect(await nft.owner).to.equal(await addr1.getAddress())
        expect(await hardhatNft.NftToAddress(0)).to.equal(
            await addr1.getAddress()
        )
        expect(
            await hardhatNft.NumberOfNfts(await addr1.getAddress())
        ).to.equal(1)
    })

    it("Transfer nft", async function () {
        await hardhatNft.mint(
            "Purple",
            "Blue",
            "Gray",
            "Base",
            "18142782d84ac3a45ec34bf729cd920676ddc1c8",
            "bafkreigewh3khhu7ihpvl55hul2ovnfqhmjt35tf3tzlbjftcjtwtsfiqe"
        )

        var options = { value: ethers.utils.parseEther("0.05") }
        await hardhatNft.connect(addr1).claimNft(options)
        expect(await hardhatNft.NumberOfNfts(addr1.getAddress())).to.equal(1)
        await hardhatNft.connect(addr1).transfer(0, addr2.getAddress())

        expect(await hardhatNft.hasAccount(addr2.getAddress())).to.equal(true)
        let nft = await hardhatNft.nft(0)
        expect(await nft.owner).to.equal(await addr2.getAddress())
        expect(await hardhatNft.NftToAddress(0)).to.equal(
            await addr2.getAddress()
        )
        expect(await hardhatNft.NumberOfNfts(addr1.getAddress())).to.equal(0)
        expect(await hardhatNft.NumberOfNfts(addr2.getAddress())).to.equal(1)
    })

    it("Burn nft", async function () {
        await hardhatNft.mint(
            "Purple",
            "Blue",
            "Gray",
            "Base",
            "18142782d84ac3a45ec34bf729cd920676ddc1c8",
            "bafkreigewh3khhu7ihpvl55hul2ovnfqhmjt35tf3tzlbjftcjtwtsfiqe"
        )

        var options = { value: ethers.utils.parseEther("0.05") }
        await hardhatNft.connect(addr1).claimNft(options)
        await hardhatNft.connect(addr1).burn(0)

        let nft = await hardhatNft.nft(0)
        expect(await nft.owner).to.equal(BigNumber.from("0x0"))
        expect(await hardhatNft.NftToAddress(0)).to.equal(BigNumber.from("0x0"))
        expect(await hardhatNft.NumberOfNfts(addr1.getAddress())).to.equal(0)
    })

    it("Withdraw", async function () {
        await hardhatNft.mint(
            "Purple",
            "Blue",
            "Gray",
            "Base",
            "18142782d84ac3a45ec34bf729cd920676ddc1c8",
            "bafkreigewh3khhu7ihpvl55hul2ovnfqhmjt35tf3tzlbjftcjtwtsfiqe"
        )
        await hardhatNft.mint(
            "Red",
            "Yewllow",
            "Blue",
            "Base",
            "18142782d84ac3a45ec34bf729cd920676ddc1c8",
            "bafkreigewh3khhu7ihpvl55hul2ovnfqhmjt35tf3tzlbjftcjtwtsfiqe"
        )

        let options = { value: ethers.utils.parseEther("0.05") }
        await hardhatNft.connect(addr1).claimNft(options)
        await hardhatNft.connect(addr2).claimNft(options)
        let contractAddress = await hardhatNft.address
        let balance = await ethers.provider.getBalance(contractAddress)
        expect(balance).to.equal(ethers.utils.parseEther("0.1"))
        await hardhatNft.withdraw()
        balance = await ethers.provider.getBalance(contractAddress)
        expect(balance).to.equal(0)
    })
})
