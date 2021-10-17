import { DataTypes, Model } from "sequelize";

import db from "../database/config";

export interface PricesProps {
  id: number;

  apiResponse: string
}

export class Price extends Model<PricesProps> {}

Price.init(
  {
    id: {
      type: DataTypes.INTEGER,  
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    apiResponse: {
      type: DataTypes.TEXT         
    },

  },
  {
    sequelize: db,
    tableName: "prices",
  }
);
