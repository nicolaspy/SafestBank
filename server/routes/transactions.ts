import express from "express";
import * as transactionsService from "../services/transactions";
import toNewTransaction from "./helpers";

const router = express.Router();

router.get("/:personId", (req, res) => {
  res.send(transactionsService.getTransactions(+req.params.personId));
});

router.use(express.json());
router.post("/", (req, res) => {
  try {
    const newTransaction = toNewTransaction(req.body);
    const addedTransaction = transactionsService.addTransaction(newTransaction);
    res.json(addedTransaction);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
});

export default router;
