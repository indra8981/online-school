import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import { Modal, Button, Form, Input, Checkbox } from "antd";
import "../styles/homepage.css";
import { Select } from "antd";

const { Option } = Select;

export default class SignUpModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: 1,
    };
  }

  render() {
    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };
    const tailLayout = {
      wrapperCol: {
        offset: 8,
        span: 16,
      },
    };

    const onFinish = (values) => {
      axios
        .post("/users/add", values)
        .then((res) => {
          this.props.history.push("/dashboard");
        })
        .catch((err) => console.log(err));
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    const onValuesChange = (values) => {
      if (typeof values["userType"] !== "undefined")
        this.setState({ userType: values["userType"] });
    };

    return (
      <div>
        <Modal
          title="SignUp"
          visible={this.props.visible}
          footer={null}
          onCancel={this.props.handleCancel}
        >
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onValuesChange={onValuesChange}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Select Student or Teacher"
              name="userType"
              onValuesChange={onValuesChange}
            >
              <Select style={{ width: 120 }}>
                <Option value={1}>Teacher</Option>
                <Option value={2}>Student</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter your name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please enter phone no!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="School"
              name="school"
              rules={[
                {
                  required: true,
                  message: "Please enter your school!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            {this.state.userType === 2 && (
              <Form.Item
                label="Enter your roll:"
                name="roll"
                rules={[
                  {
                    required: true,
                    message: "Please enter your roll no!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            )}
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
