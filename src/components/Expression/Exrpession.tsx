import { useEffect, useState, type FC } from 'react';
import { message } from 'antd';

import ExpressionPath from './ExpressionPath';
import { useWindowResize } from '../../hooks/useWindowResize';

interface Props {
  className?: string;
  values: { first: string; second: string };
}

const onMouseUp = async () => {
  const selected = window.getSelection()?.toString();
  try {
    await navigator.clipboard.writeText(selected || '');
    message.success('Текст скопирован в буфер обмена', 1);
  } catch (err) {
    message.error(`Ошибка при копировании: ${err}`, 1);
  }
};

const Expression: FC<Props> = ({ values }) => {
  const [stringCount, setStringCount] = useState(1);

  const windowWidth = useWindowResize();

  useEffect(() => {
    if (!values.first) {
      return;
    }

    const usableWidth = windowWidth * 0.7;
    const approxCharWidth = 16;
    const charsPerLine = Math.floor(usableWidth / approxCharWidth);
    const newStringCount = Math.ceil(values.first.length / charsPerLine);

    setStringCount(newStringCount || 1);
  }, [windowWidth, values.first]);

  const symbolsPerLine = Math.ceil(values.first.length / stringCount);
  const result = [];
  const { first, second } = values;

  for (let i = 0; i < stringCount; i++) {
    const from = i * symbolsPerLine;
    const to = from + symbolsPerLine;

    const firstChunk = first.slice(from, to);
    const secondChunk = second.slice(from, to);

    result.push(
      <ExpressionPath onMouseUp={onMouseUp} expressionChunk={firstChunk} key={`first-${i}`} isFirst={true} />,
    );
    result.push(
      <ExpressionPath
        onMouseUp={onMouseUp}
        expressionChunk={secondChunk}
        key={`second-${i}`}
        isFirst={false}
        firstChunk={firstChunk}
      />,
    );
  }

  return result;
};

export default Expression;
