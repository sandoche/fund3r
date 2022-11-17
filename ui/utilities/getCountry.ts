import Countries from '@kycdao/kycdao-sdk/dist/countries.list.json';

const getCountry = (countryCode: string | undefined): string => {
  const countryItem = Countries.find((country) => country.iso_cca2 === countryCode);
  return countryItem ? countryItem.name : '';
};

export default getCountry;
