import express from "express";
import * as balanceService from "../services/balance";

const router = express.Router();

router.get("/:personId", (req, res) => {
  res.json(balanceService.getBalance(+req.params.personId));
});

export default router;
