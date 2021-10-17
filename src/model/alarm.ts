import { DataTypes, Model } from "sequelize";

import db from "../database/config";

export interface AlarmProps {
  id: number;

  token: string
  discordId: string
  price: number

  upOrDown: string
  status: boolean
  recivedMessage?: boolean
}

export class Alarm extends Model<AlarmProps> {}

Alarm.init(
  {
    id: {
      type: DataTypes.INTEGER,  
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    token: DataTypes.STRING,
    discordId: DataTypes.STRING,
    price: {
      type: DataTypes.FLOAT
    },
    upOrDown: DataTypes.STRING,

    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    recivedMessage: {
      type: DataTypes.BOOLEAN,
      defaultValue: null,
      allowNull: true
    }

  },
  {
    sequelize: db,
    tableName: "alarm",
  }
);
