import {TokenPrice} from "./src/pancakeswap.api"

;(async() => {

  const Token = new TokenPrice({
    network: "bscscan"
  })

  Token.getPrice("0x1228fb5ef4c98cabd696ba1bd4819e050389d21a")
    .then(console.log)
    .catch(console.log)
  Token.getPriceBNBBased("0x1228fb5ef4c98cabd696ba1bd4819e050389d21a")
    .then(console.log)
    .catch(console.log)
})()