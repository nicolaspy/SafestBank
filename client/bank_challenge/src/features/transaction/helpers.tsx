import React from "react";

import { Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { Transaction, Type } from "../../types";
import { getNumbertoAmount } from "../../utlis/common";

export const buildTransactionColumns = (): ColumnsType<Transaction> => [
  {
    title: "Date",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text: string) => {
      return text.slice(0, 10);
    },
  },
  {
    title: "Balance",
    dataIndex: "newTotal",
    key: "newTotal",
    render: (text: number) => {
      return `$${getNumbertoAmount(text)}`;
    },
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (text: number) => {
      return `$${getNumbertoAmount(text)}`;
    },
  },
  {
    title: "Transaction Type",
    dataIndex: "type",
    key: "type",
    render: (type: Type) => {
      let color = "";
      let text = "";
      if (type === Type.Debit) {
        color = "volcano";
        text = "Withdrawal";
      } else if (type === Type.Credit) {
        color = "green";
        text = "Deposited";
      }
      return (
        <Tag color={color} key={type}>
          {text}
        </Tag>
      );
    },
  },
];
