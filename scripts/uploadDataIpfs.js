var axios = require("axios")
var FormData = require("form-data")
var fs = require("fs")
require("dotenv").config()

const path = "/home/matischroder/my-nft"
let nft_info = []

const uploadData = async () => {
    for (let i = 1; i <= 100; i++) {
        //update file
        var data = new FormData()
        data.append("file", fs.createReadStream(`${path}/images/${i}.png`))
        data.append("pinataOptions", '{"cidVersion": 1}')
        let jsonFile = fs.readFileSync(`${path}/json/${i}.json`, {
            encoding: "utf8",
        })
        let json = JSON.parse(jsonFile)
        let metadata = {
            name: `Buffalo-${i - 1}`,
            keyvalues: {
                background: json.attributes[0].value,
                tie: json.attributes[1].value,
                suit: json.attributes[2].value,
                base: json.attributes[3].value,
                dna: json.custom_fields.dna,
            },
        }
        data.append("pinataMetadata", JSON.stringify(metadata))

        let config = {
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            headers: {
                Authorization: `Bearer ${process.env.PINATA_JWT}`,
                ...data.getHeaders(),
            },
            data: data,
        }
        const res = await axios(config)

        nft_info.push({
            id: i - 1,
            background: json.attributes[0].value,
            tie: json.attributes[1].value,
            suit: json.attributes[2].value,
            base: json.attributes[3].value,
            dna: json.custom_fields.dna,
            cid: res.data.IpfsHash,
        })
    }
    fs.writeFileSync(`${path}/nft_info.json`, JSON.stringify(nft_info))
}
uploadData()
