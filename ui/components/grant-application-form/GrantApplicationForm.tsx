import FormEdit from '@/components/grant-application-form/FormEdit';
import type { GrantApplicationInterface } from '@/types/GrantApplicationInterface';

function GrantApplicationForm({ data, setData }: { data: GrantApplicationInterface | undefined | null; setData: (data: GrantApplicationInterface) => void }) {
  return <FormEdit data={data} setData={setData} />;
}

export default GrantApplicationForm;
