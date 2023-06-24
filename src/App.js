// import {  Form,  Select } from 'antd';
import Form, { Field } from './component/form'
import React, { useEffect } from 'react';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};


const App = () => {
  const formApi = Form.useForm();
  // const form = Form.useForm();

  useEffect(() => {
    console.log(formApi.current)
    formApi.current.setValues({
      note: 'note init'
    })
  }, [formApi])

  const onSubmit = (values, errs) => {
    console.log(values, errs);
  };

  return (
    <Form
      {...layout}
      // form={form}
      ref={ref => formApi.current = ref}
      name="control-hooks"
      onSubmit={onSubmit}
      initialValues={{
        note: 'note',
        gender: 'gender'
      }}
      style={{ maxWidth: 600 }}
    >
      <div>
        <Field name="note" label="Note" required validate={(value) => {
          console.log(132, value)
          if (!value) {
            return '不能为空'
          }
        }}>
          <input />
        </Field>
      </div>
      <div>
        <Field name="gender" label="Gender" required>
          <input />
        </Field>
      </div>
      <div>
        <button type="primary" htmlType="submit">
          Submit
        </button>
      </div>
    </Form>
  );
};

export default App;