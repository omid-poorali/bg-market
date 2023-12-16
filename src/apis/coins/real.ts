import request from '../request';

import { GetCoinsResponse } from './contract';

export const getCoins = async () => request.get<GetCoinsResponse>('/v1/coins');
