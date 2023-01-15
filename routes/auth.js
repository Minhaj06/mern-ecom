const express = require("express");
const { register } = require("../controllers/auth");

const router = express.Router();

// Middlewares
const { requireSignin, isAdmin } = require("../middlewares/auth");

// Controllers
const { register, login } = require("../controllers/auth.js");

// Routes
router.post("/register", register);
router.post("/login", login);
router.get("/auth-check", requireSignin, (req, res) => {
  res.json({ ok: true });
});
router.get("admin-check", requireSignin, isAdmin, (req, res) => {
  res.json({ ok: true });
});
