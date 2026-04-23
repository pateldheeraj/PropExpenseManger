import Session from "../models/session.model.js";
import Account from "../models/account.model.js";

export const createSessionWithAccounts = async (req, res) => {
  try {
    const { name, accounts } = req.body;
    
    if (!name) {
      return res.status(400).json({ status: "error", message: "Session name is required" });
    }

    if (!accounts || !Array.isArray(accounts) || accounts.length === 0) {
      return res.status(400).json({ status: "error", message: "At least one account is required" });
    }

    // 1. Create Session
    const session = new Session({
      userId: req.user.id,
      name,
      status: "Active"
    });

    await session.save();

    // 2. Create Accounts linked to Session
    const accountsToInsert = accounts.map(acc => ({
      ...acc,
      sessionId: session._id
    }));

    let insertedAccounts;
    try {
      insertedAccounts = await Account.insertMany(accountsToInsert);
    } catch (err) {
      // Manual Rollback if account creation fails
      await Session.findByIdAndDelete(session._id);
      throw new Error("Failed to create accounts, rolling back session creation.");
    }

    res.status(201).json({
      status: "success",
      message: "Session and accounts created successfully",
      data: {
        session,
        accounts: insertedAccounts
      }
    });
  } catch (error) {
    console.error("Create session error:", error);
    res.status(500).json({ status: "error", message: error.message || "Server error" });
  }
};

export const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user.id }).sort({ createdAt: -1 });
    
    res.status(200).json({
      status: "success",
      data: sessions
    });
  } catch (error) {
    console.error("Get sessions error:", error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

export const getSessionById = async (req, res) => {
  try {
    const session = await Session.findOne({ _id: req.params.id, userId: req.user.id });
    
    if (!session) {
      return res.status(404).json({ status: "error", message: "Session not found" });
    }

    const accounts = await Account.find({ sessionId: session._id });

    res.status(200).json({
      status: "success",
      data: {
        session,
        accounts
      }
    });
  } catch (error) {
    console.error("Get session by id error:", error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};
