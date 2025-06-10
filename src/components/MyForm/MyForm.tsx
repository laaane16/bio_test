import { memo, type FC } from 'react';
import { type FormProps, Button, Form, Input } from 'antd';
import type { RuleObject } from 'antd/es/form';

import { isValidSequence } from '../../services/isValidSequence';
import { getOptimalAlignment } from '../../services/getOptimalAlignment';

import styles from './MyForm.module.scss';

interface Props {
  className?: string;
  onFinish: (arg: { first: string; second: string }) => void;
}

const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const inputRules = [
  { required: true, message: 'Введите аминокислотную последовательность' },
  {
    validator: async (_: RuleObject, value: string) => {
      if ((value?.length ?? 0) === 0) {
        return Promise.resolve();
      }
      return isValidSequence(value) === true ? Promise.resolve() : Promise.reject('Некорректный ввод');
    },
  },
];

const MyForm: FC<Props> = ({ className, onFinish }) => {
  const handleFinish: FormProps['onFinish'] = (values) => {
    const { first, second } = values;

    const [firstAlignment, secondAlignment] = getOptimalAlignment(first, second);

    onFinish({ first: firstAlignment, second: secondAlignment });
  };

  return (
    <Form
      className={`${styles.form} ${className}`}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={handleFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item label="Первая" name="first" rules={inputRules}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Вторая"
        name="second"
        rules={[
          ...inputRules,
          ({ getFieldValue }) => ({
            validator(_, value) {
              const firstValue = getFieldValue('first');

              if (!value || !firstValue) {
                return Promise.resolve();
              }
              if (value.length !== firstValue.length) {
                return Promise.reject(new Error('Последовательности должны быть одинаковой длины'));
              }

              return Promise.resolve();
            },
          }),
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item className={styles.btn}>
        <Button type="primary" htmlType="submit">
          Визуализировать
        </Button>
      </Form.Item>
    </Form>
  );
};

export default memo(MyForm);
