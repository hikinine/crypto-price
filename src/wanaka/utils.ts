export interface ApiResponse {
  __typename: string
  activeOrder?: {
    __typename: string
    buyer: any
    category: string
    createdAt: string
    id: string
    nftAddress: string
    owner: string
    price: string
    quantity: number
    status: string
    txHash: string
  },
  category: string
  contractAddress: string,
  id: string
  image: string
  itemId: string
  owner: {
    __typename: string
    address: string
  },
  tokenURI: string
  wland: {
    __typename: string
    environment: { 
      __typename: string
       id: string
       name: string 
    },
    id: string
    itemId: string
    level: number
    name: string
    salePrice: string
  }
}

export interface LandsAttributes {
  trait_type: string 
  value: string | number
}
export interface LandApiResponse {
  attributes: LandsAttributes[]
  description:  string
  external_url: string
  id: number
  image: string
  isPacked: boolean
  itemId: number
  name: string
}

export interface TransactionsResponse {
  from?: any
  itemId: string
  price: string
  timestamp: string
  to: {
    __typename: string
    id: string
  }
  txHash: string
  type: string
  __typename: string
}

export const EndpointAPI = "https://api.thegraph.com/subgraphs/name/wanaka-inc/wmarketplace"
export const EndpointLand = "https://files.wanakafarm.com/data/lands"


export const TransactionsEntities = (landId: number | string) => {
  return {
    query: `{
      transactionEntities(
        where: {
          itemId: \"${landId}\",
          type_in: [
            \"orderFinished\",
            \"offerFinished\",
            \"mint\",
            \"nftItemTransfered\",
            \"wLandTransfered\"
          ]
        }, 
        first: 5, 
        skip: 0, 
        orderBy: \"timestamp\", 
        orderDirection: \"desc\"
      ) {
        txHash
        type    
        price    
        timestamp    
        from {      
          id      
          __typename    
        }    
        to {      
          id      
          __typename    
        }    
        itemId    
        __typename  
      }
    }`,
    variables: {}
  }

}
export const NFTEntities = (landId: number | string) => {
  return {
    query: `{  
      nftentities(
        where: {
          itemId_gt: 0, 
          isActive: true, 
          category: \"wland\", 
          itemId: \"${landId}\"
        }
      ) {    
        id    
        itemId    
        contractAddress    
        category    
        image    
        tokenURI    
        activeOrder {      
          id      
          category      
          nftAddress      
          txHash      
          owner      
          buyer      
          quantity      
          price      
          status      
          createdAt      
          __typename    
        }    
        owner {      
          address      
          __typename    
        }    
        wland {      
          id     
          itemId      
          name      
          salePrice      
          level      
          environment {        
            id       
            name       
            __typename      
          }      
          __typename    
        }    
        __typename  
      }
    }`,
    variables: {}
  }
} 

export const BigNumberParse = (toParse: string | number, decimal: number=18 ): number =>{

  if (typeof toParse === "number") {
    toParse = toParse.toString()
  }
  
  const length = toParse.length
  const parsed = toParse.substr(0,length - decimal) 
    + "." + toParse.substr(length - decimal, length)

  return  parseFloat(parsed)
}

export const RarityStars = {
  "common": "",
  "immortal": "⭐️⭐️⭐️⭐️⭐️",
  legendary: "⭐️⭐️⭐️",
  mythical: "⭐️⭐️⭐️⭐️",
  rare: "⭐️⭐️",
  uncommon: "⭐️",
  boxed: ""

} as {[key: string]: string}

export const RarityImages = {
  "common": "https://i.ibb.co/19WJsLZ/common.png",
  "immortal": "https://i.ibb.co/j8HdygB/immortal.png",
  legendary: "https://i.ibb.co/8nyMyqj/legendary.png",
  mythical: "https://i.ibb.co/ynnmXYh/mythical.png",
  rare: "https://i.ibb.co/2MXTWGq/rare.png",
  uncommon: "https://i.ibb.co/3SL0V7h/uncommon.png",
  boxed: "https://i.ibb.co/SfRzC5j/boxed.png"

} as {[key: string]: string}

export const Seasons = {
  Summer: "☀️",
  Spring: "🌹",
  Autumn: "🍁",
  Winter: "❄️"
} as {[key: string]: string}
