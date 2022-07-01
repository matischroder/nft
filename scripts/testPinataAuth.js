var axios = require("axios")
require("dotenv").config()

var config = {
    method: "get",
    url: "https://api.pinata.cloud/data/testAuthentication",
    headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
    },
}

const test = async () => {
    const res = await axios(config)
    console.log(res.data)
}

test()
