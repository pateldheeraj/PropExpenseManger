import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
      index: true,
    },
    propfirmName: {
      type: String,
      required: [true, "Propfirm name is required"],
      trim: true,
    },
    accountPhase: {
      type: String,
      enum: ["Phase 1", "Phase 2", "Funded"],
      required: [true, "Account phase is required"],
    },
    startingBalance: {
      type: Number,
      required: [true, "Starting balance is required"],
    },
    drawdown: {
      type: Number,
      required: [true, "Drawdown is required"],
    },
    target: {
      type: Number,
      required: [true, "Target is required"],
    },
  },
  { timestamps: true }
);

const Account = mongoose.model("Account", accountSchema);

export default Account;
