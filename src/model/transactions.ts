import { DataTypes, Model } from "sequelize";

import db from "../database/config";

export interface TransactionsProps {
  txHash: string;
  itemId: number;
  from: string| null
  to: string | null
  price: number
  timestamp: string
  type: string
}

export class Transactions extends Model<TransactionsProps> {}

Transactions.init(
  {
    txHash: {
      type: DataTypes.STRING,  
      allowNull: false,
      primaryKey: true,
    },
    itemId: DataTypes.INTEGER,
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    price: DataTypes.FLOAT,
    timestamp: DataTypes.STRING,
    type: DataTypes.STRING,
  },
  {
    sequelize: db,
    tableName: "transactions",
  }
);
