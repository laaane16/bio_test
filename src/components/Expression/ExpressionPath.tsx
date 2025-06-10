import { type FC } from 'react';
import { Typography } from 'antd';

import { ELEMENT_COLORS_MAP } from '../../constants/elementColorsMap';

const { Text } = Typography;

import styles from './ExpressionPath.module.scss';

interface Props {
  className?: string;
  expressionChunk: string;
  isFirst: boolean;
  firstChunk?: string;
  onMouseUp: () => void;
}

const elementColorsMap = Object.entries(ELEMENT_COLORS_MAP);

const ExpressionPath: FC<Props> = ({ onMouseUp, expressionChunk, isFirst, firstChunk }) => {
  return (
    <div>
      {expressionChunk.split('').map((letter, idx) => {
        let color = null;
        const match = letter === firstChunk?.[idx];

        if ((isFirst === false && !match) || isFirst === true) {
          if (!match) {
            elementColorsMap.some(([curColor, vals]) => {
              if (vals.has(letter)) {
                color = curColor;
                return true;
              }
              return false;
            });
          }
        }

        return (
          <Text onMouseUp={onMouseUp} className={styles.letter} key={letter + idx} style={{ color: `${color ?? ''}` }}>
            {letter}
          </Text>
        );
      })}
    </div>
  );
};

export default ExpressionPath;
