import axios from 'axios';

const getNearUsdConvertRate = async (): Promise<number> => {
  const { data } = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=near&vs_currencies=usd');

  return data.near.usd;
};

const convertUsdToNear = async (amount: number, rate: number) => {
  return amount / rate;
};

export { convertUsdToNear, getNearUsdConvertRate };
