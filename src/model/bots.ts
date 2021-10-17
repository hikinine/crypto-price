import { DataTypes, Model, Sequelize } from "sequelize";

import db from "../database/config";
import { Network, Currency , subCurrency} from "../types";

export interface BotsProps {
  contract: string;

  isCoingecko: boolean;
  ref: string;

  network: Network;


  name: string;
  symbol: string;

  price?: number;

  currency: Currency
  subCurrency: subCurrency;

  status?: boolean;


  discordApiKey?: string;
  discordId?: string
}

export class Bots extends Model<BotsProps> {}

Bots.init(
  {
    contract: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },

    isCoingecko: DataTypes.BOOLEAN,

    ref: DataTypes.STRING,
    network: DataTypes.STRING,
    name: DataTypes.STRING,
    symbol: DataTypes.STRING,
    discordApiKey: DataTypes.STRING,
    discordId: DataTypes.STRING,

    price: DataTypes.FLOAT,
    currency: DataTypes.STRING,
    subCurrency: DataTypes.STRING,

    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize: db,
    tableName: "bots",
  }
);
