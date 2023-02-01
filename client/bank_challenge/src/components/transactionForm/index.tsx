import { Button, Form, Input, notification, Row } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import React from "react";
import { Type, TransactionFormType, AddTransaction } from "../../types";
import { REGEXP } from "../../utlis/common";
import { FormButton } from "./styles";

interface Props {
  personId: string;
  balance: number;
  setIsSuccessful: (value: boolean) => void;
  type: Type;
}

function TransactionForm({ personId, balance, setIsSuccessful, type }: Props) {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const successNotification = (
    amount: number,
    placement: NotificationPlacement
  ) => {
    const getVerb = (amount: number) => {
      if (type === Type.Credit) return `deposited $${amount} into`;
      else return `withdrawn $${amount} of`;
    };

    api.open({
      message: `Success!`,
      description: `You have successfully ${getVerb(amount)} your account.`,
      placement,
    });
  };

  const failNotification = (msg: string, placement: NotificationPlacement) => {
    api.open({
      message: `Failed!`,
      description: msg,
      placement,
    });
  };

  const onFinish = (values: TransactionFormType) => {
    const newDeposit: AddTransaction = {
      personId: +personId,
      amount: +values.amount,
      type,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newDeposit),
    };

    if (values.amount > balance && type === Type.Debit) {
      form.setFields([
        {
          name: "amount",
          errors: ["Insufficient funds, please try again."],
        },
      ]);
      return failNotification(
        "Insufficient funds, please try again.",
        "topRight"
      );
    } else
      fetch("http://localhost:3001/api/transactions", requestOptions)
        .then((response) => {
          response.json();
          setIsSuccessful(true);
          successNotification(values.amount, "topRight");
        })
        .catch((response) => {
          failNotification(response, "topRight");
        });
    form.setFieldsValue({ amount: "" });
  };

  return (
    <>
      {contextHolder}

      <Form
        form={form}
        name={type}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, marginTop: 20 }}
        onFinish={onFinish}
      >
        <Row>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              { required: true, message: "Please input the amount" },
              {
                pattern: new RegExp(REGEXP.NUMBERS),
                message: "Input numbers only",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <FormButton>
            <Form.Item>
              <Button id={`submit-${type}`} type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </FormButton>
        </Row>
      </Form>
    </>
  );
}

export default TransactionForm;
