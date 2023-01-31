import { Button, Form, Input, notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import React from "react";
import { AddTransaction } from "./account";
import { Type } from "./App";
import { FormButton } from "./styles";

type TransactionForm = {
  amount: number;
};

export const REGEXP = {
  NUMBERS: /^[0-9]*$/,
};

interface Props {
  personId: string;
  setIsSuccessful: (value: boolean) => void;
  type: Type;
}

function TransactionForm({ personId, setIsSuccessful, type }: Props) {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const successNotification = (
    amount: number,
    placement: NotificationPlacement
  ) => {
    const getVerb = () => {
      if (type === Type.Credit) return "deposited to";
      else return "withdrawn of";
    };

    api.open({
      message: `Success!`,
      description: `You have successfully ${getVerb()} $${amount} your account.`,
      placement,
    });
  };

  const onDeposit = (values: TransactionForm) => {
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

    fetch("http://localhost:3001/api/transactions", requestOptions).then(
      (response) => response.json()
    );
    setIsSuccessful(true);
    successNotification(values.amount, "topRight");
    form.setFieldsValue({ amount: "" });
  };

  return (
    <FormButton>
      {contextHolder}

      <Form
        form={form}
        name="withdraw"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, marginTop: 20 }}
        onFinish={onDeposit}
      >
        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            { required: true, message: "Please input the amount" },
            {
              pattern: new RegExp(REGEXP.NUMBERS),
              message: "Please input numbers only",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </FormButton>
  );
}

export default TransactionForm;
