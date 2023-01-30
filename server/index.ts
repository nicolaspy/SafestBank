import express from "express";
import cors from "cors";

import transactionsRouter from "./routes/transactions";
import balanceRouter from "./routes/balance";

const PORT = process.env.PORT || 3001;

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/transactions", transactionsRouter);
app.use("/api/balance", balanceRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
