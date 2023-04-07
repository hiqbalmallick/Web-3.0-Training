import {
  Divider,
  Form,
  Input,
  Layout,
  notification,
  Space,
  Button,
  Table,
  InputNumber
} from "antd";
import React, { useState, useEffect } from "react";
import "./App.css";
import { connectRegistrationContract } from "./utils/util";

const { Header, Content } = Layout;
const { Search } = Input;

const App = () => {
  const [form] = Form.useForm();
  const [transferForm] = Form.useForm();

  const [contract, setContract] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    /**
     * Connect contract if it's not already connected
     */
    if (!contract) {
      connectContract();
    }
  }, [contract]);

  const connectContract = async () => {
    try {
      /**
       * Set contract and logged in user address
       */
      const { contract: res, address } = await connectRegistrationContract();
      setContract(res);
      setUserAddress(address);
      notification.success({
        message: "Connected",
        description: "Wallet Connected!"
      });
    } catch (ex) {
      notification.error({ message: "Error", description: ex.message });
    }
  };

  const addCarDetails = async ({
    registrationNumber,
    brandName,
    modelName,
    launchYear
  }) => {
    try {
      await contract.setCarDetails(
        registrationNumber,
        brandName,
        modelName,
        launchYear,
        userAddress
      );
      notification.success({
        message: "Success",
        description: "Car Detail Added Success"
      });
      form.resetFields();
    } catch (error) {
      notification.error({
        message: "Error",
        description: `${error.reason}`
      });
    }
  };

  const getCarDetails = async carNo => {
    if (carNo) {
      try {
        const res = await contract.getCarDetails(carNo);
        const { brandName, modelName, launchYear, owner } = res;
        if (!brandName) {
          throw Error("Data not found against given registration number");
        }
        setDataSource([
          {
            registrationNumber: carNo,
            brandName,
            modelName,
            launchYear: launchYear.toString(),
            owner
          }
        ]);
      } catch (error) {
        notification.error({
          message: "Error",
          description: `${error.reason || error}`
        });
      }
    }
  };

  const transferOwnership = async ({ registrationNumber, address }) => {
    try {
      await contract.changeCarOwnership(registrationNumber, address);
      notification.success({
        message: "Success",
        description: "Ownership transferred!"
      });
      transferForm.resetFields();
    } catch (error) {
      notification.error({
        message: "Error",
        description: `${error.reason}`
      });
    }
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout>
        <Header className="App-header">Car Registration</Header>
        <Content className="App-content">
          {/**
           * Form to register car details
           */}
          <Divider orientation="center">Add Car Details</Divider>
          <Form form={form} layout="inline" onFinish={addCarDetails}>
            <Form.Item
              label="Registration No."
              name="registrationNumber"
              rules={[{ required: true }]}>
              <Input placeholder="ABC-123" />
            </Form.Item>
            <Form.Item
              label="Brand"
              name="brandName"
              rules={[{ required: true }]}>
              <Input placeholder="Tesla" />
            </Form.Item>
            <Form.Item
              label="Model"
              name="modelName"
              rules={[{ required: true }]}>
              <Input placeholder="Model S" />
            </Form.Item>
            <Form.Item
              label="Launch Year"
              name="launchYear"
              rules={[{ required: true }]}>
              <InputNumber placeholder="2023" />
            </Form.Item>
            <Button htmlType="submit">Submit</Button>
          </Form>
          {/**
           * Form to change car ownership
           */}
          <Divider orientation="center">Change Car Owner</Divider>
          <Form
            form={transferForm}
            layout="inline"
            onFinish={transferOwnership}>
            <Form.Item
              label="Registration No."
              name="registrationNumber"
              rules={[{ required: true }]}>
              <Input placeholder="ABC-123" />
            </Form.Item>
            <Form.Item
              label="Buyer Address"
              name="address"
              rules={[{ required: true }]}>
              <Input placeholder="0x0000000000" />
            </Form.Item>
            <Button htmlType="submit">Transfer</Button>
          </Form>
          {/**
           * To get car details and display them in table
           */}
          <Divider orientation="center">Get Cart Details</Divider>
          <Search
            placeholder="Registration No."
            allowClear
            onSearch={getCarDetails}
            style={{ width: 304 }}
          />
          <Table
            columns={[
              {
                title: "Owner",
                dataIndex: "owner",
                key: "owner"
              },
              {
                title: "Car Registration Number",
                dataIndex: "registrationNumber",
                key: "registrationNumber"
              },
              {
                title: "Model Name",
                dataIndex: "modelName",
                key: "modelName"
              },
              {
                title: "Brand Name",
                dataIndex: "brandName",
                key: "brandName"
              },
              {
                title: "Launch Year",
                dataIndex: "launchYear",
                key: "launchYear"
              }
            ]}
            dataSource={dataSource}
          />
        </Content>
      </Layout>
    </Space>
  );
};

export default App;
