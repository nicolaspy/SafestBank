import express from "express";
import cors from "cors";

import transactionsRouter from "../routes/transactions";
import balanceRouter from "../routes/balance";

function createServer() {
  const app = express();

  app.use(
    cors({
      origin: "*",
    })
  );
  app.use(express.json());

  app.use("/api/transactions", transactionsRouter);
  app.use("/api/balance", balanceRouter);

  return app;
}
export default createServer;
