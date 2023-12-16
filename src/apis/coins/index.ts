import * as real from './real';
import * as mock from './mock';

const getApis = () => {
  if (import.meta.env.VITE_USER_NODE_ENV === 'test') {
    return mock;
  }
  return real;
};

export const coins = getApis();
