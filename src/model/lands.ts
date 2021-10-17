import { DataTypes, Model } from "sequelize";

import db from "../database/config";

export interface LandsProps {
  itemId: number;

  Rare: string | null;
  Spring?: boolean | null;
  Summer?: boolean | null;
  Autumn?: boolean | null;
  Winter?: boolean | null;
  IncreaseMutantRate: number | null;
  TimeReduce: number | null;
  Level: number | null;
  Birth: number | null;

  description: string;
  external_url: string;
  image: string;
  isPacked: boolean
  name: string

  owner: string
  wland_id: string
  wland_salePrice: string

  wland_environment: string  | null;
  activeOrder_price: number | null;
  activeOrder_id: string | null;
  activeOrder_createdAt: string | null;

  activeOrder_category: string | null;
  activeOrder_status: string | null;
  activeOrder_txHash: string | null;
  activeOrder_owner: string | null;
  
  
}

export class Lands extends Model<LandsProps> {}

Lands.init(
  {
    itemId: {
      type: DataTypes.INTEGER,  
      allowNull: false,
      primaryKey: true,
    },

    Rare: DataTypes.STRING,

    Spring: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true
    },
    Summer: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true
    },
    Autumn: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true
    },
    Winter: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true
    },

    IncreaseMutantRate: DataTypes.FLOAT,
    TimeReduce: DataTypes.FLOAT,
    Level: DataTypes.INTEGER,
    Birth: DataTypes.INTEGER,
    description: DataTypes.STRING,
    external_url: DataTypes.STRING,
    image: DataTypes.STRING,
    name: DataTypes.STRING,
    isPacked: DataTypes.BOOLEAN,

    owner: DataTypes.STRING,
    wland_id: DataTypes.STRING,
    wland_salePrice: DataTypes.STRING,
  
    activeOrder_price: DataTypes.FLOAT,
    activeOrder_id: DataTypes.STRING,
    activeOrder_createdAt: DataTypes.STRING,
  
    activeOrder_category: DataTypes.STRING,
    activeOrder_status: DataTypes.STRING,
    activeOrder_txHash: DataTypes.STRING,
    activeOrder_owner: DataTypes.STRING,
    wland_environment: DataTypes.STRING,

   
  },
  {
    sequelize: db,
    tableName: "lands",
  }
);
