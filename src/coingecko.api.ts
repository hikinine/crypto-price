import axios from "axios";
import { coinGeckoApiURL, currencyList } from "./config/coingecko";
import { Price, PricesProps } from "./model/prices";

export interface ApiResponse {
  [key: string]: {
    brl: number;
    usd: number;
    php: number;
  };
}

const buildEndpointURL = (token: string): string => {
  return (
    coinGeckoApiURL + "/price?ids=" + token + "&vs_currencies=" + currencyList
  );
};

export const coinGeckoPrice = async (
  token: string
): Promise<ApiResponse> => {
  try {
    const response = await axios.get(buildEndpointURL(token));
    const data = response.data;

    if (!data) return {};

    const __data: PricesProps = {
      id: 1,
      apiResponse: JSON.stringify(data),
    };

    await Price.upsert(__data)
      .then(() => {})
      .catch((err) => {
        console.log("Falhei na inserção preço.");
        console.log(err);
      });

    return data;

  } catch (error) {
    console.log("Failed to request endpoint: " + buildEndpointURL(token));

    return {};
  }
};
