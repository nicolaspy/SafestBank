import moment from "moment";
import React, { useEffect, useState } from "react";

type Transactions = {
  id: number;
  personId: number;
  amount: number;
  type: "debit" | "credit";
  oldTotal: number;
  newTotal: number;
  createdAt: Date;
};

interface Props {
  user: string;
}
function Account({ user }: Props) {
  const [data, setData] = useState<Transactions[]>([]);
  const [status, setStatus] = useState<"pending" | "resolved">("pending");

  const getTransaction = () => {
    fetch("http://localhost:3001/api/Transactions/" + user)
      .then((res) => res.json())
      .then((data: Transactions[]) => setData(data));
    setStatus("resolved");
  };

  useEffect(() => {
    getTransaction();
  }, []);

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ul className="App">
        {data.map((transaction) => {
          return (
            <div key={transaction.id}>
              <li>Amount: {transaction.amount}</li>
              <li>Type: {transaction.type}</li>
              <li>Old Total: {transaction.oldTotal}</li>
              <li>New Total: {transaction.newTotal}</li>
              <li>
                Date: {moment(transaction.createdAt).utc().format("YYYY-MM-DD")}
              </li>
              <hr />
            </div>
          );
        })}
      </ul>
    </>
  );
}

export default Account;
