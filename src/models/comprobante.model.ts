import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class Comprobante extends Model {
  public id!: number;
  public transfer_id!: number;
  public comprobante_url!: string;
  public generated_at!: Date;
}

Comprobante.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    transfer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comprobante_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    generated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "comprobantes",
    timestamps: false,
  }
);
