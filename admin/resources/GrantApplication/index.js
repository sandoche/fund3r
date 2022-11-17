const AdminJS = require('adminjs');
const GrantApplication = require('api.grants/modules/GrantApplication/GrantApplicationModel');
const config = require('../../config/app');
const isMilestoneVisible = require('./isMilestoneVisible');

const grantApplication = {
  resource: GrantApplication,
  options: {
    actions: {
      approveAfterInterview: {
        icon: 'Checkmark',
        actionType: 'record',
        handler: async (request, response, context) => {
          const { record } = context;

          const grantApplicationObject = await GrantApplication.findOne({
            // eslint-disable-next-line no-underscore-dangle
            _id: record.params._id,
          });

          grantApplicationObject.dateInterviewCompletionConfirmation = new Date();
          grantApplicationObject.dateApproval = new Date();

          record.params.dateInterviewCompletionConfirmation = grantApplicationObject.dateInterviewCompletionConfirmation;
          record.params.dateApproval = grantApplicationObject.dateApproval;

          await grantApplicationObject.save();

          return {
            record: record.toJSON(),
          };
        },
        component: false,
        isVisible: (context) =>
          context.record.params.dateSubmission &&
          context.record.params.dateEvaluation &&
          context.record.params.dateInterviewScheduled &&
          !context.record.params.dateInterviewCompletionConfirmation,
      },
      rejectAfterInterview: {
        icon: 'Close',
        actionType: 'record',
        handler: async (request, response, context) => {
          const { record } = context;

          const grantApplicationObject = await GrantApplication.findOne({
            // eslint-disable-next-line no-underscore-dangle
            _id: record.params._id,
          });

          grantApplicationObject.dateInterviewCompletionConfirmation = new Date();
          grantApplicationObject.dateDenial = new Date();

          record.params.dateInterviewCompletionConfirmation = grantApplicationObject.dateInterviewCompletionConfirmation;
          record.params.dateDenial = grantApplicationObject.dateDenial;

          await grantApplicationObject.save();

          return {
            record: record.toJSON(),
          };
        },
        component: false,
        isVisible: (context) =>
          context.record.params.dateSubmission &&
          context.record.params.dateEvaluation &&
          context.record.params.dateInterviewScheduled &&
          !context.record.params.dateInterviewCompletionConfirmation,
      },
      approveMilestone: {
        icon: 'Checkmark',
        actionType: 'record',
        handler: async (request, response, context) => {
          const { record } = context;

          const grantApplicationObject = await GrantApplication.findOne({
            // eslint-disable-next-line no-underscore-dangle
            _id: record.params._id,
          });

          const currentMilestone = grantApplicationObject.milestones.find(
            (milestone) => milestone.dateSubmission && milestone.isNearProposalValid && milestone.dateInterviewScheduled && !(milestone.dateRejection || milestone.dateValidation),
          );

          const index = grantApplicationObject.milestones.indexOf(currentMilestone);

          if (currentMilestone) {
            currentMilestone.dateValidation = new Date();
            record.params[`milestones.${index}.dateValidation`] = new Date();

            await grantApplicationObject.save();
          }

          return {
            record: record.toJSON(),
          };
        },
        component: false,
        isVisible: isMilestoneVisible,
      },
      rejectMilestone: {
        icon: 'Close',
        actionType: 'record',
        handler: async (request, response, context) => {
          const { record } = context;

          const grantApplicationObject = await GrantApplication.findOne({
            // eslint-disable-next-line no-underscore-dangle
            _id: record.params._id,
          });

          const currentMilestone = grantApplicationObject.milestones.find(
            (milestone) => milestone.dateSubmission && milestone.isNearProposalValid && milestone.dateInterviewScheduled && !(milestone.dateRejection || milestone.dateValidation),
          );

          const index = grantApplicationObject.milestones.indexOf(currentMilestone);

          if (currentMilestone) {
            currentMilestone.dateRejection = new Date();
            record.params[`milestones.${index}.dateRejection`] = new Date();

            await grantApplicationObject.save();
          }

          return {
            record: record.toJSON(),
          };
        },
        component: false,
        isVisible: isMilestoneVisible,
      },
      signAgreement: {
        icon: 'DocumentSigned',
        actionType: 'record',
        handler: (request, response, context) => {
          const { record } = context;

          record.params.config = {
            backendAdminToken: config.backendAdminToken,
            backendHost: config.backendHost,
          };

          return {
            record: record.toJSON(),
          };
        },
        component: AdminJS.bundle('./signature.component'),
        isVisible: (context) => context.record.params.dateKycApproved && !context.record.params.dateAgreementSignatureGrantGiver,
      },
      showInvoices: {
        icon: 'DocumentAttachment',
        actionType: 'record',
        handler: (request, response, context) => {
          const { record } = context;

          record.params.config = {
            backendAdminToken: config.backendAdminToken,
            backendHost: config.backendHost,
          };

          return {
            record: record.toJSON(),
          };
        },
        component: AdminJS.bundle('./invoices.component'),
        isVisible: (context) => context.record.params.isNearProposalValid,
      },
    },
  },
};

module.exports = grantApplication;
