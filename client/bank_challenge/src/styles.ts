import { Divider, Typography } from "antd";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

export const LoginForm = styled.div`
  margin-top: 5vh;
  max-width: 500px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: white;
  padding: 5vh;
  border-radius: 8px;
  background-color: #efe7bc;
  box-shadow: 0px 5px 0px 0px rgb(0 0 0 / 15%);
`;

export const LogoContainer = styled.div`
  margin-bottom: 30px;
`;

export const LoginItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0 0 20px 0;
  text-align: center;

  .ant-btn {
    width: 100%;
    margin: 0;
    background-color: #236328;
    color: white;
    &:hover {
      background-color: #2c792e;
      color: white;
    }
  }
`;

export const FormButton = styled.div`
  .ant-btn {
    margin: 0;
    background-color: #236328;
    color: white;
    display: flex;
    &:hover {
      background-color: #2c792e;
      color: white;
    }
  }
`;

export const WelcomeMessage = styled(Typography)`
  font-size: 24px;
  padding-left: 50px;
`;
