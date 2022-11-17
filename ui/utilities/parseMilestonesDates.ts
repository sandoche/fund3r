// todo refactor with milestone type

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseMilestonesDates = (milestones: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return milestones.map((milestone: any) => {
    return {
      ...milestone,
      deliveryDate: milestone.deliveryDate ? new Date(milestone.deliveryDate) : null,
    };
  });
};

export default parseMilestonesDates;
