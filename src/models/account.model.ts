import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class Account extends Model {
  public id!: number;
  public user_id!: number;
  public balance!: number;
  public account_number!: string;
}

Account.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    balance: {
        type: DataTypes.DECIMAL(12, 2),
        defaultValue: 0,
    },
    account_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: "accounts",
    timestamps: false,
  }
);
