import { Lands } from "../model/lands";
import { Transactions } from "../model/transactions";
import {
  ApiResponse,
  EndpointAPI,
  EndpointLand,
  LandApiResponse,
  NFTEntities,
  TransactionsResponse,
  TransactionsEntities,
  BigNumberParse,
} from "./utils";

import axios from "axios";

let global = 0

function getRandomInt(min: number, max:number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export class WanaMarketplace {
  constructor() {}

  sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  request = async (landID: number) => {
    try {
      const responseLand = await axios.get(`${EndpointLand}/${landID}`);
      const Land: LandApiResponse = responseLand.data;

      const responseNFT = await axios.post(EndpointAPI, NFTEntities(landID));
      const data: ApiResponse = responseNFT.data.data.nftentities[0];

      if (!Land || !data) {
        console.log(`${landID} falhou.`);
        throw Error("Failed to fetch data");
      }

      let Attributes;

      if (!Land.attributes.length) {
        Attributes = {
          Rare:  null,
          Spring: null,
          Summer: null,
          Autumn: null,
          Winter: null,
  
          IncreaseMutantRate: null,
          TimeReduce:null,
          Level: null,
          Birth: null,
        }
      }
      else {
        Attributes = {
           Rare: Land?.attributes?.[0].value?.toString() || null,
          Spring:
            Land?.attributes?.[1]?.value?.toString().includes("Spring") || null,
          Summer:
            Land?.attributes?.[1]?.value?.toString().includes("Summer") || null,
          Autumn:
            Land?.attributes?.[1]?.value?.toString().includes("Autumn") || null,
          Winter:
            Land?.attributes?.[1]?.value?.toString().includes("Winter") || null,

          IncreaseMutantRate: Number(Land?.attributes?.[2].value) || null,
          TimeReduce: Number(Land?.attributes?.[3].value) || null,
          Level: Number(Land?.attributes?.[4].value) || null,
          Birth: Number(Land?.attributes?.[5].value) || null,
        }
      }
     
      
      Lands.upsert({
        itemId: Land.itemId,

        ...Attributes,
        description: Land.description,
        external_url: Land.external_url,
        image: Land.image,
        isPacked: Land.isPacked,
        name: Land.name,

        owner: data.owner.address,

        wland_id: data.wland.id,
        wland_salePrice: data.wland.salePrice,
        wland_environment: data.wland.environment.id || null,
        activeOrder_price:
          BigNumberParse(data.activeOrder?.price || "") || null,
        activeOrder_id: data.activeOrder?.id || null,
        activeOrder_createdAt: data.activeOrder?.createdAt || null,
        activeOrder_category: data.activeOrder?.category || null,
        activeOrder_txHash: data.activeOrder?.txHash || null,
        activeOrder_status: data.activeOrder?.status || null,
        activeOrder_owner: data.activeOrder?.owner || null,
      })
        .then(() => {
          if (global++ < 1)
            console.log("ok bro!")
        })
        .catch(console.log);

      const responseTransactions = await axios.post(
        EndpointAPI,
        TransactionsEntities(landID)
      );
      const transactions: TransactionsResponse[] =
        responseTransactions.data.data.transactionEntities;

      transactions.map((tx) => {
        Transactions.create({
          txHash: tx?.txHash,
          from: tx?.from?.id || null,
          to: tx?.to.id || null,
          itemId: parseInt(tx.itemId),
          price: BigNumberParse(tx.price),
          timestamp: tx.timestamp,
          type: tx.type,
        })
          .then(() => {})
          .catch(() => {});
      });
    } catch (error) {}
  };








  init2 = async () => {
    let landID = 15000
    console.log(landID)
    while (1) {
      try {
        this.request(landID).catch(() => {});
      } catch (error) {}

      landID--;

      if (landID < 1) {
        landID = 15000;
      }

      await this.sleep(1000);
    }
  };

  init3 = async () => {
    let landID = getRandomInt(10000, 12500);
    console.log(landID)
    while (1) {
      try {
        this.request(landID).catch(() => {});
      } catch (error) {}

      landID--;

      if (landID < 1) {
        landID = 15000;
      }

      await this.sleep(1000);
    }
  };

  init = async () => {

    this.init3()
    await this.sleep(222);
    this.init2();
    await this.sleep(222);
    await this.sleep(222);
    let landID = getRandomInt(2000, 4000);
    console.log(landID)

    while (1) {
      try {
        this.request(landID).catch(() => {});
      } catch (error) {}

      landID--;

      if (landID < 1) {
        landID = 15000;
      }

      await this.sleep(1000);
    }
  };
}
