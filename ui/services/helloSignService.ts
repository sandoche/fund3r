import axios from 'axios';
import type NearApiSignatureInterface from 'types/NearApiSignatureInterface';

const API_HOST = process.env.NEXT_PUBLIC_BACKEND_HOST;

const downloadFile = async (apiSignature: NearApiSignatureInterface | undefined, grantId: number | undefined) => {
  if (!apiSignature || !grantId) {
    return;
  }

  const response = await axios.get(`${API_HOST}/api/v1/grants/${grantId}/agreement`, {
    responseType: 'blob',
    headers: {
      'X-NEAR-ACCOUNT-ID': apiSignature.accountId,
      'X-NEAR-SIGNATURE': JSON.stringify(apiSignature.signature),
    },
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'agreement.zip');
  document.body.appendChild(link);
  link.click();
};

// eslint-disable-next-line import/prefer-default-export
export { downloadFile };
