import { Divider, Layout, Menu, MenuProps, Spin, Tabs, Tag } from "antd";
import { TransactionOutlined } from "@ant-design/icons";

import React, { useEffect, useState } from "react";
import Table, { ColumnsType } from "antd/es/table";
import { Type } from "./App";
import TransactionForm from "./transactionForm";

type Transactions = {
  id: number;
  personId: number;
  amount: number;
  type: "debit" | "credit";
  oldTotal: number;
  newTotal: number;
  createdAt: Date;
};

export type AddTransaction = Pick<Transactions, "amount" | "type" | "personId">;

interface Props {
  user: string;
}
function Account({ user }: Props) {
  const [data, setData] = useState<Transactions[]>([]);
  const [status, setStatus] = useState<"pending" | "resolved">("pending");
  const [isSuccessful, setIsSuccessful] = useState(false);

  const { Header, Content } = Layout;

  const items: MenuProps["items"] = [
    {
      label: "Transactions",
      key: "transactions",
      icon: <TransactionOutlined />,
    },
  ];

  const getTransaction = () => {
    fetch("http://localhost:3001/api/transactions/" + user)
      .then((res) => res.json())
      .then((data: Transactions[]) => setData(data));
    setStatus("resolved");
    setIsSuccessful(false);
  };

  useEffect(() => {
    getTransaction();
  }, [isSuccessful]);

  if (status === "pending") {
    return <Spin size="large" />;
  }

  const reversedData = [...data].reverse();

  const tableColumns: ColumnsType<Transactions> = [
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
      render: (text: string) => {
        return `$${text}`;
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text: string) => {
        return `$${text}`;
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

  const tabs = [
    {
      label: "Deposit",
      key: "1",
      children: (
        <TransactionForm
          personId={user}
          setIsSuccessful={setIsSuccessful}
          type={Type.Credit}
        />
      ),
    },
    {
      label: "Withdraw",
      key: "2",
      children: (
        <TransactionForm
          personId={user}
          setIsSuccessful={setIsSuccessful}
          type={Type.Debit}
        />
      ),
    },
  ];

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" items={items} />
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Tabs style={{ padding: "50px" }} type="card" items={tabs} />
        <Divider>All transactions</Divider>

        <Table columns={tableColumns} dataSource={reversedData} />
      </Content>
    </Layout>
  );
}

export default Account;
