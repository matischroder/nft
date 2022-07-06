require("@nomiclabs/hardhat-waffle")
require("@openzeppelin/hardhat-upgrades")
require("dotenv").config({ path: __dirname + "/.env" })
require("hardhat-abi-exporter")

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: "0.8.15",
    networks: {
        rinkeby: {
            url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
            accounts: [`${process.env.PRIVATE_KEY}`],
        },
    },
    abiExporter: {
        path: "./data/abi",
        runOnCompile: true,
        clear: true,
        flat: true,
        only: [":ERC20$"],
        spacing: 2,
        pretty: true,
    },
}
