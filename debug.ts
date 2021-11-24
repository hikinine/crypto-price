import {TokenPrice} from "./src/apeswap.api"

;(async() => {

  const Token = new TokenPrice({
    network: "bscscan"
  })

  Token.getPrice("0xcf2D2CE89AeD0073540C497fcF894Ea22d37C7aF")
    .then(console.log)
    .catch(console.log)
  Token.getPriceBNBBased("0xcf2D2CE89AeD0073540C497fcF894Ea22d37C7aF")
    .then(console.log)
    .catch(console.log)
})()