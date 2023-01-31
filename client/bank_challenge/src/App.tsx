import { Button, Input, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import Account from "./account";
import safestBank from "./shared/images/safestBank.png";

import { Container, LoginForm, LoginItem, LogoContainer } from "./styles";
import { NotificationPlacement } from "antd/es/notification/interface";

export enum Type {
  Debit = "debit",
  Credit = "credit",
}

function App() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement: NotificationPlacement) => {
    api.open({
      message: `Login error`,
      description:
        "Incorrect identification and password combination. Please try again.",
      placement,
    });
  };

  const handleOnLogin = () => {
    if (user === password) setLogin(true);
    else openNotification("topRight");
  };

  return (
    <>
      {contextHolder}
      {!login ? (
        <Container>
          <LoginForm>
            <LogoContainer>
              <img src={safestBank} alt="Logo" />
            </LogoContainer>
            <LoginItem>
              <Input
                onChange={(e) => setUser(e.target.value)}
                placeholder="Identification"
                prefix={<UserOutlined />}
              />
            </LoginItem>
            <LoginItem>
              <Input.Password
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                prefix={<LockOutlined />}
              />
            </LoginItem>
            <LoginItem>
              <Button
                onClick={() => handleOnLogin()}
                block
                disabled={!user || !password}
              >
                Login
              </Button>
            </LoginItem>
          </LoginForm>
        </Container>
      ) : (
        <Account user={user} />
      )}
    </>
  );
}

export default App;
