import { GetCoinsResponse } from './contract';

export const getCoins = async () => new Promise<GetCoinsResponse>((resolve) => {
  resolve({
    data: [{
      name: 'name',
    }]
  });
});
