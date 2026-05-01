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

export const addAccountToSession = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await Session.findOne({ _id: id, userId: req.user.id });

    if (!session) {
      return res.status(404).json({ status: "error", message: "Session not found or unauthorized" });
    }

    const { propfirmName, accountPhase, startingBalance, drawdown, target } = req.body;

    const account = new Account({
      sessionId: id,
      propfirmName,
      accountPhase,
      startingBalance,
      drawdown,
      target
    });

    await account.save();

    res.status(201).json({
      status: "success",
      message: "Account added successfully",
      data: account
    });
  } catch (error) {
    console.error("Add account error:", error);
    res.status(500).json({ status: "error", message: error.message || "Server error" });
  }
};

export const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    
    // First find account and populate session to check ownership
    const account = await Account.findById(id).populate('sessionId');
    
    if (!account || account.sessionId.userId.toString() !== req.user.id) {
      return res.status(404).json({ status: "error", message: "Account not found or unauthorized" });
    }

    const updatedAccount = await Account.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: "success",
      message: "Account updated successfully",
      data: updatedAccount
    });
  } catch (error) {
    console.error("Update account error:", error);
    res.status(500).json({ status: "error", message: error.message || "Server error" });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    
    const account = await Account.findById(id).populate('sessionId');
    
    if (!account || account.sessionId.userId.toString() !== req.user.id) {
      return res.status(404).json({ status: "error", message: "Account not found or unauthorized" });
    }

    await Account.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      message: "Account deleted successfully"
    });
  } catch (error) {
    console.error("Delete account error:", error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};
