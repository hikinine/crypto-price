import { TokenPrice } from "./src/pancakeswap.api";
import { coinGeckoPrice, ApiResponse } from "./src/coingecko.api";
import { Bots, BotsProps } from "./src/model/bots";
import { Price, PricesProps } from "./src/model/prices";
import {WanaMarketplace} from "./src/wanaka/marketplace"
import axios from "axios"

let API_RESPONSE: ApiResponse;
let GLOBAL_DATA: ApiResponse = {};

;(async () => {
  try {
    const wana = new WanaMarketplace()    
    wana.init()
  } catch (error) {
    
  }

})()


const fetchPancakePrice = (contractAddress: Partial<BotsProps>[], Token: TokenPrice) => {

  contractAddress.map(async info => {

    try {
      info.ref = info.ref || ""
      info.contract = info.contract?.toLowerCase() || ""
  
      let price = await Token.getPrice(info.contract)
      
      if (price == 0 || info.ref === "cars") {
        price = await Token.getPriceBNBBased(info.contract)
      }

      GLOBAL_DATA[info.ref || ""] = {
        brl: price * (API_RESPONSE["binance-usd"].brl || 0),
        php: price * (API_RESPONSE["binance-usd"].php || 0), 
        usd: price
      }  
      
    } catch (error) { }
  
  })
}

const fetchPancakeApiPrice = (contractAddress: Partial<BotsProps>[]) => {
  const endpoint = "https://api.pancakeswap.info/api/v2/tokens/";

  contractAddress.map(async info => {

    try {
      
      info.ref = info.ref || ""
      info.contract = info.contract?.toLowerCase() || ""

      const request = await axios.get(`${endpoint}${info.contract}`)
      if (! request.data.updated_at) {
        throw Error("Unknow address")
      }

      let price = 0;

      const data = request.data.data;

    
      function insert(str: string, index: number, value: string) {
        return str.substr(0, index) + value + str.substr(index);
      }

      if (data.name === "unknown" || data.symbol === "unknown") {
        let _ = data.price.split(".")[1] || ""
        price = parseFloat(insert(_, 18, ".")) 
      }
      else {
        price = parseFloat(data.price)
      }

      GLOBAL_DATA[info.ref || ""] = {
        brl: price * (API_RESPONSE["binance-usd"].brl || 0),
        php: price * (API_RESPONSE["binance-usd"].php || 0), 
        usd: price
      }  

    } catch (error) {
      
    }
  })
  
}

;(async () => {
 
  try {
    
    const botsList = await Bots.findAll({
      where: {
        isCoingecko: false,
        network: "bscscan",
        status: true,
      },
    });
    const contractAddress = botsList.map((bot) => {

      GLOBAL_DATA[bot.getDataValue("ref")] = {
        brl: 0,
        php: 0,
        usd: 0
      }

      return {
        contract: bot.getDataValue("contract"),
        ref: bot.getDataValue("ref"),
      };
    });


    const Token = new TokenPrice({ network: "bscscan" });
    

   // fetchPancakePrice(contractAddress, Token)
    fetchPancakeApiPrice(contractAddress)

    setInterval(() => {
      
      Price.upsert({
        id: 2,
        apiResponse: JSON.stringify(GLOBAL_DATA)
      })
      .then(() => {})
      .catch(() => {})
    }, 1000 * 20)

    setInterval(() => {
    //  fetchPancakePrice(contractAddress, Token)
    fetchPancakeApiPrice(contractAddress)
    }, 1000 * 40)
   


  } catch (error) {
    
  }



})()

;(async () => {

  return false;

  const Token = new TokenPrice({ network: "bscscan" });

  const botsList = await Bots.findAll({
    where: {
      isCoingecko: false,
      network: "bscscan",
      status: true,
    },
  });

  const contractAddress = botsList.map((bot) => {
    return {
      contract: bot.getDataValue("contract"),
      ref: bot.getDataValue("ref"),
    } as Partial<BotsProps>;
  });

  setInterval(async () => {
    let data: ApiResponse = {};

    for (let i in contractAddress) {
      try {
        const bot = contractAddress[i];

        console.log("shouldn't be here. check")
        console.log(bot?.contract)

        const price = await Token.getPrice(bot?.contract || "");

        if (data.hasOwnProperty(bot?.ref || "")) {
          data[bot?.ref || ""] = {
            php: 0,
            brl: 0,
            usd: 0,
          };
        }

        let buildData;

        try {
          if (!API_RESPONSE.hasOwnProperty("binance-usd")) {
            throw Error("buildData invalid");
          }
          buildData = {
            php: price * API_RESPONSE["binance-usd"].php,
            brl: price * API_RESPONSE["binance-usd"].brl,
            usd: price,
          };
        } catch (e) {
          buildData = {
            php: 0,
            brl: 0,
            usd: price,
          };
        }

        data[bot?.ref || ""] = buildData;
      } catch (error) {}
    }

    if (data == {}) {
      return
    }

    const __data = {
      id: 2,
      apiResponse: JSON.stringify(data),
    };

    Price.upsert(__data)
      .then(() => {})
      .catch((err) => {
        console.log("Falhei na inserção preço.");
        console.log(err);
      });
  }, 1000 * 25);

})();

;(async () => {
  const botsList = await Bots.findAll({
    where: {
      isCoingecko: true,
      status: true,
      currency: "usd",
      subCurrency: "brl",
    },
  });

  const tokenList = botsList
    .filter((bot) => bot.getDataValue("subCurrency") === "brl")
    .map((bot) => bot.getDataValue("ref"))
    .join(",");



  console.log("Factory coingecko fetching: ")
  console.log(tokenList)

  coinGeckoPrice(tokenList)
    .then((apiResponse) => (API_RESPONSE = apiResponse))
    .catch((err) => {});

  setInterval(() => {

    coinGeckoPrice(tokenList)
      .then((apiResponse) => (API_RESPONSE = apiResponse))
      .catch((err) => {});
  }, 22 * 1000);
})();
