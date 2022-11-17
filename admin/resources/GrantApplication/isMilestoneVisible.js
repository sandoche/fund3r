const isMilestoneVisible = (context) => {
  const { record } = context;

  const milestones = record.param('milestones');

  const currentMilestone = milestones.find(
    (milestone) => milestone.dateSubmission && milestone.isNearProposalValid && milestone.dateInterviewScheduled && !(milestone.dateRejection || milestone.dateValidation),
  );

  return !!currentMilestone;
};

module.exports = isMilestoneVisible;
