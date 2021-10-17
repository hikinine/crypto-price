import { DataTypes, Model } from "sequelize";

import db from "../database/config";

export interface CurrencyProps {
  guildId: string;
  currency: string
}

export class Currency extends Model<CurrencyProps> {}

Currency.init(
  {
    guildId: {
      type: DataTypes.STRING,  
      allowNull: false,
      primaryKey: true,
    },
    currency: DataTypes.STRING

  },
  {
    sequelize: db,
    tableName: "currency",
  }
);
