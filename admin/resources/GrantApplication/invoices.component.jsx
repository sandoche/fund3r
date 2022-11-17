const Invoices = (props) => {
  const { record } = props;

  if (!record.params.config) {
    window.location.reload();
  }

  const urlPreffix =
    record.params.config.backendHost + '/admin/' + record.params.config.backendAdminToken + '/accounts/' + record.params.nearId + '/grants/' + record.params.id + '/invoices';

  const paymentCount = (Object.entries(record.params) || []).reduce((acc, key) => {
    console.log(key[0]);
    const match = key[0].startsWith('payments.') && key[0].endsWith('._id');

    if (match) {
      acc++;
    }
    return acc;
  }, 0);

  return (
    <ul>
      {Array.from({ length: paymentCount }).map((_, index) => {
        return (
          <li key={index}>
            <a href={urlPreffix + '/' + index}>Invoice #{index}</a>
          </li>
        );
      })}
    </ul>
  );
};

export default Invoices;
