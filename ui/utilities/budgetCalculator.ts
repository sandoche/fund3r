import type { FormList } from '@mantine/form/lib/form-list/form-list';

const budgetCalculator = (
  fundingAmount?: number,
  milestones?: FormList<{ budget?: number | null; deliveryDate?: Date | null; description?: string | null }> | undefined,
): number => {
  const initialBudget = fundingAmount || 0;
  const totalMilestones = milestones?.reduce((acc, milestone) => acc + (milestone.budget || 0), 0);
  const totalFundingAmount = (totalMilestones || 0) + initialBudget;

  return totalFundingAmount;
};

export default budgetCalculator;
