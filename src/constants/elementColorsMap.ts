import { GRAY, GREEN, YELLOW, RED, VIOLET, BLUE } from './colors';

export const ELEMENT_COLORS_MAP = {
  [YELLOW]: new Set(['C']),
  [GREEN]: new Set(['A', 'I', 'L', 'M', 'F', 'W', 'Y', 'V', 'P']),
  [GRAY]: new Set(['G']),
  [RED]: new Set(['D', 'E']),
  [VIOLET]: new Set(['K', 'R']),
  [BLUE]: new Set(['S', 'T', 'H', 'Q', 'N']),
};
