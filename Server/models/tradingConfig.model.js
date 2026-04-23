import mongoose from "mongoose";

const tradingConfigSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userId is required"],
    },
    configName: {
      type: String,
      trim: true,
      default: "",
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, "data field is required"],
      validate: {
        validator: (v) => typeof v === "object" && v !== null && !Array.isArray(v),
        message: "data must be a plain object",
      },
    },
  },
  { timestamps: true }
);

const TradingConfig = mongoose.model("TradingConfig", tradingConfigSchema);

export default TradingConfig;
