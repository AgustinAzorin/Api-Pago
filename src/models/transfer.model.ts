import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class Transfer extends Model {
  public id!: number;
  public from_account_id!: number;
  public to_account_id!: number;
  public amount!: number;
  public created_at!: Date;
  public status!: string;
  public comprobante_id!: number | null;
}

Transfer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    from_account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    to_account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.STRING(20),
      defaultValue: "completed",
    },
    comprobante_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "transfers",
    timestamps: false,
  }
);
