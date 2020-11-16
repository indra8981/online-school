import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import { Modal, Button, Form, Input, Checkbox } from "antd";
import "../styles/homepage.css";

export default class CreateClassRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectCode: "",
      subjectName: "",
      academicYear: "",
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
        .post("/classrooms/create-classroom", values)
        .then((res) => {
          this.props.handleCancel();
          window.location = "/dashboard";
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
          title="Create Classroom"
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
              label="Subject Code"
              name="subjectCode"
              rules={[
                {
                  required: true,
                  message: "Please input your subject code!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Subject Name"
              name="subjectName"
              rules={[
                {
                  required: true,
                  message: "Please input your subject name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Academic Year"
              name="academicYear"
              rules={[
                {
                  required: true,
                  message: "Please input your academic year!",
                },
              ]}
            >
              <Input />
            </Form.Item>
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
