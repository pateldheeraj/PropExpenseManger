import TradingConfig from "../models/tradingConfig.model.js";

// ─── Create Config ─────────────────────────────────────────────────────────────
export const createConfig = async (req, res) => {
  try {
    const { configName, data } = req.body;

    if (!data || typeof data !== "object" || Array.isArray(data)) {
      return res.status(400).json({ status: "error", message: "data field is required and must be a plain object" });
    }

    const config = await TradingConfig.create({
      userId: req.user.id,
      configName: configName || "",
      data,
    });

    return res.status(201).json({
      status: "success",
      message: "Trading config created",
      data: config,
    });
  } catch (error) {
    console.error("createConfig error:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

// ─── Get All Configs ───────────────────────────────────────────────────────────
export const getAllConfigs = async (req, res) => {
  try {
    const configs = await TradingConfig.find({ userId: req.user.id }).sort({ createdAt: -1 });

    return res.status(200).json({
      status: "success",
      data: configs,
    });
  } catch (error) {
    console.error("getAllConfigs error:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

// ─── Get Config By ID ──────────────────────────────────────────────────────────
export const getConfigById = async (req, res) => {
  try {
    const config = await TradingConfig.findOne({ _id: req.params.id, userId: req.user.id });

    if (!config) {
      return res.status(404).json({ status: "error", message: "Config not found" });
    }

    return res.status(200).json({ status: "success", data: config });
  } catch (error) {
    console.error("getConfigById error:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

// ─── Delete Config ─────────────────────────────────────────────────────────────
export const deleteConfig = async (req, res) => {
  try {
    const config = await TradingConfig.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

    if (!config) {
      return res.status(404).json({ status: "error", message: "Config not found" });
    }

    return res.status(200).json({ status: "success", message: "Config deleted successfully" });
  } catch (error) {
    console.error("deleteConfig error:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
