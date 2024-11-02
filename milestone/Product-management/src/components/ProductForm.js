import React, { useState } from 'react';
import { Form, Input, InputNumber, Select, Button, DatePicker } from 'antd';
import dayjs from 'dayjs';

const ProductForm = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const [defaultDate] = useState(dayjs()); 

  const handleFinish = (values) => {
    onSubmit({ ...values, date: values.date ? values.date.format('YYYY-MM-DD') : defaultDate.format('YYYY-MM-DD') });
    form.resetFields(); 
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input the product title!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input the product price!' }]}>
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select a category!' }]}>
        <Select>
          <Select.Option value="electronics">Electronics</Select.Option>
          <Select.Option value="fashion">Fashion</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Date" name="date" initialValue={defaultDate}>
        <DatePicker style={{ width: '100%' }} defaultValue={defaultDate} format="YYYY-MM-DD" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};

export default ProductForm;
