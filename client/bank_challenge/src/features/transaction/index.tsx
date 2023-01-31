import { Divider, Layout, Menu, MenuProps, Spin, Tabs } from "antd";
import { TransactionOutlined } from "@ant-design/icons";

import React, { useEffect, useState } from "react";
import Table from "antd/es/table";
import TransactionForm from "../../components/transactionForm";
import safestBank from "../../shared/images/safestBank.png";
import { Balance, Transaction, Type } from "../../types";
import { CentralLogo, WelcomeContainer, WelcomeMessage } from "./styles";
import { buildTransactionColumns } from "./helpers";

interface Props {
  user: string;
}
function Account({ user }: Props) {
  const [data, setData] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>();
  const [status, setStatus] = useState<"pending" | "resolved">("pending");
  const [isSuccessful, setIsSuccessful] = useState(false);

  const { Header, Content } = Layout;

  const menuItems: MenuProps["items"] = [
    {
      label: "Transactions",
      key: "transactions",
      icon: <TransactionOutlined />,
    },
    {
      label: "Profile",
      key: "profile",
      icon: <TransactionOutlined />,
    },
    {
      label: "Settings",
      key: "settings",
      icon: <TransactionOutlined />,
    },
  ];

  const getTransaction = () => {
    fetch("http://localhost:3001/api/transactions/" + user)
      .then((res) => res.json())
      .then((data: Transaction[]) => {
        setData(data);
        setStatus("resolved");
      })
      .catch((errorPromise: Promise<unknown>) => {
        console.log(errorPromise);
      });
    setIsSuccessful(false);
  };
  const getBalance = () => {
    fetch("http://localhost:3001/api/balance/" + user)
      .then((res) => res.json())
      .then((data: Balance) => setBalance(data))
      .catch((errorPromise: Promise<unknown>) => {
        console.log(errorPromise);
      });
  };

  useEffect(() => {
    getTransaction();
    getBalance();
  }, [isSuccessful]);

  if (status === "pending") {
    return <Spin size="large" />;
  }

  const reversedData = [...data].reverse();

  const buildTabs = [
    {
      label: "Deposit",
      key: "1",
      children: (
        <TransactionForm
          personId={user}
          balance={balance ? balance?.balance : 0}
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
          balance={balance ? balance?.balance : 0}
          setIsSuccessful={setIsSuccessful}
          type={Type.Debit}
        />
      ),
    },
  ];

  return (
    <Layout className="layout">
      <Header>
        <Menu theme="dark" mode="horizontal" items={menuItems} />
      </Header>
      <CentralLogo>
        <img src={safestBank} alt="Logo" />
      </CentralLogo>

      <WelcomeContainer>
        <WelcomeMessage>Hey there User {user}!</WelcomeMessage>
        <WelcomeMessage>
          Your current Balance is: ${balance?.balance}
        </WelcomeMessage>
      </WelcomeContainer>

      <Content style={{ padding: "0 50px" }}>
        <Tabs
          style={{ padding: "50px", color: "green" }}
          type="card"
          items={buildTabs}
        />
        <Divider>All transactions</Divider>
        <Table
          columns={buildTransactionColumns()}
          dataSource={reversedData}
          rowKey={(record) => record.id}
        />
      </Content>
    </Layout>
  );
}

export default Account;
