import * as real from './real';
import * as mock from './mock';

const getApis = () => {
  if (import.meta.env.NODE_ENV === 'test') {
    return mock;
  }
  return real;
};

export const coins = getApis();
