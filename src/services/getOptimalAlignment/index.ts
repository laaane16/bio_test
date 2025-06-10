import { K_BREAK, K_EQUAL, K_MISMATCH } from '../../constants/coefficients';

const getMatrix = (input: string): number[][] => {
  return Array.from({ length: input.length + 1 }, () => new Array(input.length + 1).fill(null));
};

const fillTheMatrix = (matrix: number[][], first: string, second: string, current = [first.length, second.length]) => {
  const [x, y] = current;
  if (typeof matrix[x]?.[y] === 'number') {
    return matrix[x][y];
  }
  if (x < 0 || y < 0) {
    return null;
  }

  if (x === 0 && y === 0) {
    matrix[x][y] = 0;
    return 0;
  }

  const curK = first[x - 1] === second[y - 1] ? K_EQUAL : K_MISMATCH;

  let up = fillTheMatrix(matrix, first, second, [x, y - 1]);
  let left = fillTheMatrix(matrix, first, second, [x - 1, y]);
  let diagonal = fillTheMatrix(matrix, first, second, [x - 1, y - 1]);

  const possibleResults = [];
  if (up !== null) {
    up += K_BREAK;
    possibleResults.push(up);
  }
  if (left !== null) {
    left += K_BREAK;
    possibleResults.push(left);
  }
  if (diagonal !== null) {
    diagonal += curK;
    possibleResults.push(diagonal);
  }

  if (possibleResults.length === 0) {
    return null;
  }

  const result = Math.max(...possibleResults);
  matrix[x][y] = result;

  return result;
};

const backtrace = (matrix: number[][], first: string, second: string): [string, string] => {
  let i = first.length;
  let j = second.length;
  let aligned1 = '';
  let aligned2 = '';

  while (i > 0 || j > 0) {
    const score = matrix[i][j];
    const matchScore = i > 0 && j > 0 ? (first[i - 1] === second[j - 1] ? K_EQUAL : K_MISMATCH) : -Infinity;

    if (i > 0 && j > 0 && score === matrix[i - 1][j - 1] + matchScore) {
      aligned1 = first[i - 1] + aligned1;
      aligned2 = second[j - 1] + aligned2;
      i--;
      j--;
    } else if (i > 0 && score === matrix[i - 1][j] + K_BREAK) {
      aligned1 = first[i - 1] + aligned1;
      aligned2 = '-' + aligned2;
      i--;
    } else if (j > 0 && score === matrix[i][j - 1] + K_BREAK) {
      aligned1 = '-' + aligned1;
      aligned2 = second[j - 1] + aligned2;
      j--;
    } else {
      break;
    }
  }

  return [aligned1, aligned2];
};

export const getOptimalAlignment = (first: string, second: string) => {
  const matrix = getMatrix(first);

  fillTheMatrix(matrix, first, second);

  return backtrace(matrix, first, second);
};
