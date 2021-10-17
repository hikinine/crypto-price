import { DataTypes, Model, Sequelize } from "sequelize";

import db from "../database/config";

export interface GuildsProp {
  id: string
  token: string
  guildId: string
  ownerId: string
  name: string
  nameAcronym: string
  createdTimestamp?: string
  region: string
  memberCount: number
  preferredLocale: string
  splash?: string
  icon?: string
}

export class Guilds extends Model<GuildsProp> {}

Guilds.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    
    token: DataTypes.STRING,
    guildId: DataTypes.STRING,
    ownerId: DataTypes.STRING,
    name: DataTypes.STRING,
    nameAcronym: DataTypes.STRING,

    createdTimestamp:  DataTypes.STRING,  

    region: DataTypes.STRING,
    memberCount: DataTypes.INTEGER,
    preferredLocale: DataTypes.STRING,
    splash: {
      type:DataTypes.STRING,
      allowNull: true
    },
    icon: {
      type:DataTypes.STRING,
      allowNull: true
    },
  },
  {
    sequelize: db,
    tableName: "guilds",

  }
);
