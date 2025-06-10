import { VALID_SYMBOLS } from '../../constants/validSymbols';

export const isValidSequence = (input: string): boolean => {
  if (!input || input.length === 0) {
    return false;
  }

  const splittingInput = input.split('');

  for (let item of splittingInput) {
    if (!VALID_SYMBOLS.has(item)) {
      return false;
    }
  }

  return true;
};
