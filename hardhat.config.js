require("@nomiclabs/hardhat-waffle")
require("@openzeppelin/hardhat-upgrades")
require("dotenv").config({ path: __dirname + "/.env" })

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
}
