import { useCallback, useState, type FC } from 'react';
import { Typography } from 'antd';

import MyForm from '../MyForm/MyForm';
import Exrpession from '../Expression/Exrpession';

import styles from './App.module.scss';

const { Title } = Typography;

const App: FC = () => {
  const [values, setValues] = useState({ first: '', second: '' });

  const onFinish = useCallback(
    (values: { first: string; second: string }) => {
      setValues(values);
    },
    [setValues],
  );

  return (
    <div className={styles.layout}>
      <Title className={styles.title} level={2} style={{ textAlign: 'center' }}>
        Выравнивание последовательностей аминокислот
      </Title>
      <MyForm className={styles.form} onFinish={onFinish} />
      {values.first && <Exrpession values={values} />}
    </div>
  );
};

export default App;
