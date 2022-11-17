/* eslint-disable max-lines */
import { rest } from 'msw';

import { GrantApplicationInterface, GrantCategories, GrantTypes, OpenSourceStates, ProjectStatus, RaisingRoundStatus, WorkingTypes } from '@/types/GrantApplicationInterface';

if (typeof window === 'undefined') {
  // eslint-disable-next-line global-require
  require('localstorage-polyfill');
}

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_HOST;
const GET_DELAY = process.env.NEXT_PUBLIC_MOCK_DELAY_GET ? parseInt(process.env.NEXT_PUBLIC_MOCK_DELAY_GET, 10) : 0;
const POST_PUT_DELAY = process.env.NEXT_PUBLIC_MOCK_DELAY_POST_PUT ? parseInt(process.env.NEXT_PUBLIC_MOCK_DELAY_POST_PUT, 10) : 0;

const fullProjectData = {
  dateLastDraftSaving: new Date(),
  projectName: 'Metaverse Lab',
  grantType: GrantTypes.Equity,
  grantCategory: GrantCategories.GamingMetaverse,
  projectUrl: 'https://san.cx',
  githubUrl: 'https://github.com/NEAR-labs/ui.fund3r',
  projectStatus: ProjectStatus.Mvp,
  projectLaunchDate: new Date(),
  projectDescription: 'Metaverse Lab is a decentralized, open-source, decentralized gaming platform.',
  fundingAmount: 500000,
  whatAndWhy: 'Enable developers to build, test, and deploy decentralized games on the near blockchain.',
  competitionDifference: 'On the near blockchain.',
  openSourceState: OpenSourceStates.FullyOpenSource,
  opensourceComponentUse: 'For the infrastructure and the UI: React and Godot',
  impactOnEcosystem: 'More wallet created',
  excitementNear: 'For the speed.',
  successMesurement: 'Number of daily users.',
  projectRaisingRound: RaisingRoundStatus.Raising,
  firstname: 'John',
  lastname: 'Doe',
  dateOfBirth: new Date(),
  email: 'dummy@test.world',
  github: 'https://github.com/NEAR-labs',
  twitter: 'https://twitter.com/NEAR_labs',
  workingAloneOrTeam: WorkingTypes.WorkingWithTeam,
  hasPreviouslyReceivedFundingTokensGrantsFromNear: true,
  addressCountry: 'France',
  addressCity: 'Paris',
  addressStreet: '1 Rue de la Paix',
  addressZip: '75001',
  howHeardGrants: 'Twitter',
  referral: '',
  comments: '',
  currency: 'USN',
  milestones: [
    {
      budget: 100000,
      deliveryDate: new Date().setFullYear(new Date().getFullYear() + 1),
      description: 'Alpha of the Metaverse',
    },
    {
      budget: 200000,
      deliveryDate: new Date().setFullYear(new Date().getFullYear() + 2),
      description: 'Beta of the Metaverse',
    },
  ],
  payments: [
    {
      id: '00001',
      amount: 94161,
      currency: 'NEAR',
      date: new Date(),
      status: 'pending',
    },
  ],
  attachment: 'https://san.cx/',
  teamMembers: [
    {
      githubUrl: 'https://github.com/sandoche',
    },
  ],
  aboutTeam: 'We are a team of developers who love to play & build games.',
  aboutTokensReceivedFromNear: 'We got a grant for building a library to help developers to build decentralized games.',
};

const getGrantsData = (accountId: string): GrantApplicationInterface[] => [{ id: 0, nearId: accountId }];

// eslint-disable-next-line max-lines-per-function
const getGrantData = (accountId: string, id: number): GrantApplicationInterface => {
  return [
    { id: 0, nearId: accountId },
    {
      ...fullProjectData,
      id: 1,
      nearId: accountId,
    },
    {
      ...fullProjectData,
      id: 2,
      nearId: accountId,
      dateSubmission: new Date(),
      dateEvaluation: new Date(), // the date evaluation will automatically set if SKIP_EVALUATION_APPROVAL is true
    },
    {
      ...fullProjectData,
      id: 3,
      nearId: accountId,
      dateSubmission: new Date(),
      dateEvaluation: new Date(),
      dateInterviewScheduled: new Date(),
      dateInterview: new Date(),
    },
    {
      ...fullProjectData,
      id: 4,
      nearId: accountId,
      dateSubmission: new Date(),
      dateEvaluation: new Date(),
      dateInterviewScheduled: new Date(),
      dateInterview: new Date(),
      dateInterviewCompletionConfirmation: new Date(),
    },
    {
      ...fullProjectData,
      id: 5,
      nearId: accountId,
      dateSubmission: new Date(),
      dateEvaluation: new Date(),
      dateInterviewScheduled: new Date(),
      dateInterview: new Date(),
      dateInterviewCompletionConfirmation: new Date(),
      dateDenial: new Date(),
      reviewProject: 'How are you differentiating with the competition',
      reviewMemberDetail: 'We would like the github of the project',
      reviewAttachments: 'We would like a demo video',
      milestones: [
        {
          budget: 100000,
          deliveryDate: new Date().setFullYear(new Date().getFullYear() + 1),
          description: 'Alpha of the Metaverse',
        },
        {
          budget: 200000,
          deliveryDate: new Date().setFullYear(new Date().getFullYear() + 2),
          description: 'Beta of the Metaverse',
          reviewMilestone: 'We would like more details about this milestone',
        },
      ],
    },
    {
      ...fullProjectData,
      id: 6,
      nearId: accountId,
      dateSubmission: new Date(),
      dateEvaluation: new Date(),
      dateInterviewScheduled: new Date(),
      dateInterview: new Date(),
      dateInterviewCompletionConfirmation: new Date(),
      dateApproval: new Date(),
    },
    {
      ...fullProjectData,
      id: 7,
      nearId: accountId,
      dateSubmission: new Date(),
      dateEvaluation: new Date(),
      dateInterviewScheduled: new Date(),
      dateInterview: new Date(),
      dateInterviewCompletionConfirmation: new Date(),
      dateApproval: new Date(),
      dateKycCompletion: new Date(),
    },
    {
      ...fullProjectData,
      id: 8,
      nearId: accountId,
      dateSubmission: new Date(),
      dateEvaluation: new Date(),
      dateInterviewScheduled: new Date(),
      dateInterview: new Date(),
      dateInterviewCompletionConfirmation: new Date(),
      dateApproval: new Date(),
      dateKycCompletion: new Date(),
      dateKycDenied: new Date(),
    },
    {
      ...fullProjectData,
      id: 9,
      nearId: accountId,
      dateSubmission: new Date(),
      dateEvaluation: new Date(),
      dateInterviewScheduled: new Date(),
      dateInterview: new Date(),
      dateInterviewCompletionConfirmation: new Date(),
      dateApproval: new Date(),
      dateKycCompletion: new Date(),
      dateKycApproved: new Date(),
      helloSignSignatureRequestId: '145e28738c1e9d3c8cbbc5623a8c49fb8708b7f6', // Should be created by the backend and passing the redirect url
    },
    {
      ...fullProjectData,
      id: 10,
      nearId: accountId,
      dateSubmission: new Date(),
      dateEvaluation: new Date(),
      dateInterviewScheduled: new Date(),
      dateInterview: new Date(),
      dateInterviewCompletionConfirmation: new Date(),
      dateApproval: new Date(),
      dateKycCompletion: new Date(),
      dateKycApproved: new Date(),
      dateAgreementSignatureGrantReceiver: new Date(), // Should be checked by the backend using hello sign api
      helloSignSignatureRequestId: '145e28738c1e9d3c8cbbc5623a8c49fb8708b7f6',
    },
    {
      ...fullProjectData,
      id: 11,
      nearId: accountId,
      dateSubmission: new Date(),
      dateEvaluation: new Date(),
      dateInterviewScheduled: new Date(),
      dateInterview: new Date(),
      dateInterviewCompletionConfirmation: new Date(),
      dateApproval: new Date(),
      dateKycCompletion: new Date(),
      dateKycApproved: new Date(),
      dateAgreementSignatureGrantReceiver: new Date(), // Should be checked by the backend using hello sign api
      helloSignSignatureRequestId: '145e28738c1e9d3c8cbbc5623a8c49fb8708b7f6',
      isNearProposalValid: true,
    },
    {
      ...fullProjectData,
      id: 12,
      nearId: accountId,
      dateSubmission: new Date(),
      isNearProposalValid: true,
      dateEvaluation: new Date(),
      dateInterviewScheduled: new Date(),
      dateInterview: new Date(),
      dateInterviewCompletionConfirmation: new Date(),
      dateApproval: new Date(),
      dateKycCompletion: new Date(),
      dateKycApproved: new Date(),
      dateAgreementSignatureGrantReceiver: new Date(),
      dateFirstPaymentSent: new Date(),
      helloSignSignatureRequestId: '145e28738c1e9d3c8cbbc5623a8c49fb8708b7f6',
      payments: [
        {
          id: '00001',
          amount: 94161,
          currency: 'NEAR',
          date: new Date(),
          status: 'paid',
        },
      ],
    },
    {
      ...fullProjectData,
      id: 13,
      nearId: accountId,
      dateSubmission: new Date(),
      isNearProposalValid: true,
      dateEvaluation: new Date(),
      dateInterviewScheduled: new Date(),
      dateInterview: new Date(),
      dateInterviewCompletionConfirmation: new Date(),
      dateApproval: new Date(),
      dateKycCompletion: new Date(),
      dateKycApproved: new Date(),
      dateAgreementSignatureGrantReceiver: new Date(),
      dateFirstPaymentSent: new Date(),
      dateOnboardingCompletion: new Date(), // Will be automatically set as date if SKIP_ONBOARDING is set to true and the first payment sent
      helloSignSignatureRequestId: '145e28738c1e9d3c8cbbc5623a8c49fb8708b7f6',
      payments: [
        {
          id: '00001',
          amount: 94161,
          currency: 'NEAR',
          date: new Date(),
          status: 'paid',
        },
      ],
    },
    {
      ...fullProjectData,
      id: 14,
      nearId: accountId,
      dateSubmission: new Date(),
      isNearProposalValid: true,
      dateEvaluation: new Date(),
      dateInterviewScheduled: new Date(),
      dateInterview: new Date(),
      dateInterviewCompletionConfirmation: new Date(),
      dateApproval: new Date(),
      dateKycCompletion: new Date(),
      dateKycApproved: new Date(),
      dateAgreementSignatureGrantReceiver: new Date(),
      dateFirstPaymentSent: new Date(),
      dateOnboardingCompletion: new Date(),
      helloSignSignatureRequestId: '145e28738c1e9d3c8cbbc5623a8c49fb8708b7f6',
      payments: [
        {
          id: '00001',
          amount: 94161,
          currency: 'NEAR',
          date: new Date(),
          status: 'paid',
        },
      ],
      milestones: [
        {
          budget: 100000,
          deliveryDate: new Date().setFullYear(new Date().getFullYear() + 1),
          description: 'Alpha of the Metaverse',
          dateSubmission: new Date(),
        },
        {
          budget: 200000,
          deliveryDate: new Date().setFullYear(new Date().getFullYear() + 2),
          description: 'Beta of the Metaverse',
        },
      ],
    },
    {
      ...fullProjectData,
      id: 15,
      nearId: accountId,
      dateSubmission: new Date(),
      isNearProposalValid: true,
      dateEvaluation: new Date(),
      dateInterviewScheduled: new Date(),
      dateInterview: new Date(),
      dateInterviewCompletionConfirmation: new Date(),
      dateApproval: new Date(),
      dateKycCompletion: new Date(),
      dateKycApproved: new Date(),
      dateAgreementSignatureGrantReceiver: new Date(),
      dateFirstPaymentSent: new Date(),
      dateOnboardingCompletion: new Date(),
      helloSignSignatureRequestId: '145e28738c1e9d3c8cbbc5623a8c49fb8708b7f6',
      payments: [
        {
          id: '00001',
          amount: 94161,
          currency: 'NEAR',
          date: new Date(),
          status: 'paid',
        },
      ],
      milestones: [
        {
          budget: 100000,
          deliveryDate: new Date().setFullYear(new Date().getFullYear() + 1),
          description: 'Alpha of the Metaverse',
          dateSubmission: new Date(),
          isNearProposalValid: true,
        },
        {
          budget: 200000,
          deliveryDate: new Date().setFullYear(new Date().getFullYear() + 2),
          description: 'Beta of the Metaverse',
        },
      ],
    },
    {
      ...fullProjectData,
      id: 16,
      nearId: accountId,
      dateSubmission: new Date(),
      isNearProposalValid: true,
      dateEvaluation: new Date(),
      dateInterviewScheduled: new Date(),
      dateInterview: new Date(),
      dateInterviewCompletionConfirmation: new Date(),
      dateApproval: new Date(),
      dateKycCompletion: new Date(),
      dateKycApproved: new Date(),
      dateAgreementSignatureGrantReceiver: new Date(),
      dateFirstPaymentSent: new Date(),
      dateOnboardingCompletion: new Date(),
      helloSignSignatureRequestId: '145e28738c1e9d3c8cbbc5623a8c49fb8708b7f6',
      payments: [
        {
          id: '00001',
          amount: 94161,
          currency: 'NEAR',
          date: new Date(),
          status: 'paid',
        },
      ],
      milestones: [
        {
          budget: 100000,
          deliveryDate: new Date().setFullYear(new Date().getFullYear() + 1),
          description: 'Alpha of the Metaverse',
          dateSubmission: new Date(),
          isNearProposalValid: true,
          dateInterview: new Date(),
          dateInterviewCompletionConfirmation: new Date(),
          dateInterviewScheduled: new Date(),
        },
        {
          budget: 200000,
          deliveryDate: new Date().setFullYear(new Date().getFullYear() + 2),
          description: 'Beta of the Metaverse',
        },
      ],
    },
    {
      ...fullProjectData,
      id: 17,
      nearId: accountId,
      dateSubmission: new Date(),
      isNearProposalValid: true,
      dateEvaluation: new Date(),
      dateInterviewScheduled: new Date(),
      dateInterview: new Date(),
      dateInterviewCompletionConfirmation: new Date(),
      dateApproval: new Date(),
      dateKycCompletion: new Date(),
      dateKycApproved: new Date(),
      dateAgreementSignatureGrantReceiver: new Date(),
      dateFirstPaymentSent: new Date(),
      dateOnboardingCompletion: new Date(),
      helloSignSignatureRequestId: '145e28738c1e9d3c8cbbc5623a8c49fb8708b7f6',
      payments: [
        {
          id: '00001',
          amount: 94161,
          currency: 'NEAR',
          date: new Date(),
          status: 'paid',
        },
      ],
      milestones: [
        {
          budget: 100000,
          deliveryDate: new Date().setFullYear(new Date().getFullYear() + 1),
          description: 'Alpha of the Metaverse',
          dateSubmission: new Date(),
          isNearProposalValid: true,
          dateRejection: new Date(),
          reviewMilestone: 'We would like more details about this milestone',
        },
        {
          budget: 200000,
          deliveryDate: new Date().setFullYear(new Date().getFullYear() + 2),
          description: 'Beta of the Metaverse',
        },
      ],
    },
    {
      ...fullProjectData,
      id: 18,
      nearId: accountId,
      dateSubmission: new Date(),
      isNearProposalValid: true,
      dateEvaluation: new Date(),
      dateInterviewScheduled: new Date(),
      dateInterview: new Date(),
      dateInterviewCompletionConfirmation: new Date(),
      dateApproval: new Date(),
      dateKycCompletion: new Date(),
      dateKycApproved: new Date(),
      dateAgreementSignatureGrantReceiver: new Date(),
      dateFirstPaymentSent: new Date(),
      dateOnboardingCompletion: new Date(),
      helloSignSignatureRequestId: '145e28738c1e9d3c8cbbc5623a8c49fb8708b7f6',
      payments: [
        {
          id: '00001',
          amount: 94161,
          currency: 'NEAR',
          date: new Date(),
          status: 'paid',
        },
        {
          id: '00002',
          amount: 188300,
          currency: 'NEAR',
          date: new Date(),
          status: 'paid',
        },
      ],
      milestones: [
        {
          budget: 100000,
          deliveryDate: new Date().setFullYear(new Date().getFullYear() + 1),
          description: 'Alpha of the Metaverse',
          dateSubmission: new Date(),
          isNearProposalValid: true,
          dateRejection: new Date(),
          dateValidation: new Date(),
        },
        {
          budget: 200000,
          deliveryDate: new Date().setFullYear(new Date().getFullYear() + 2),
          description: 'Beta of the Metaverse',
        },
      ],
    },
  ][id];
};

const milestoneData = {
  budget: 100000,
  deliveryDate: new Date().setFullYear(new Date().getFullYear() + 1),
  description: 'Alpha of the Metaverse',
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const handlers = [
  // The backend will verify the signature following this https://stackoverflow.com/questions/61982163/jwt-authentication-for-near-protocol-in-a-python-backend
  // It will retrieve the grants from the database
  // If there is no grant, it will create a new one and return an array of grants
  rest.get<never, any>(`${BASE_URL}/api/v1/grants`, (_req, res, ctx) => {
    return res(ctx.delay(GET_DELAY), ctx.json(getGrantsData(_req.headers.get('X-NEAR-ACCOUNT-ID') as string)));
  }),

  // when dateSubmission is true, the backend should check if a proposal really exists
  // maybe we should share the tx id or we can check all the proposals in a dao (?)
  rest.get<never, any>(`${BASE_URL}/api/v1/grants/:id`, (_req, res, ctx) => {
    const basicData = getGrantData(_req.headers.get('X-NEAR-ACCOUNT-ID') as string, parseInt(_req.params.id, 10));

    const dummyDataString = localStorage.getItem('fund3r-mock-data');
    const dummyData = dummyDataString ? JSON.parse(dummyDataString) : {};

    const fundingAmount = dummyData?.fundingAmount;

    const response = {
      ...basicData,
    };

    if (localStorage.getItem('fund3r-mock-submission')) {
      response.dateSubmission = new Date();
      response.projectName = dummyData.projectName || 'Mocked Dummy Project';
      response.projectDescription = dummyData.projectDescription || 'Mocked Dummy Project Description';
      response.fundingAmount = fundingAmount.toString();
    }

    if (localStorage.getItem('fund3r-mock-near-tx') === 'true') {
      response.isNearProposalValid = true;
    }

    if (localStorage.getItem('fund3r-milestone-submission-mock') === 'true' && response.milestones && response.milestones[0].budget) {
      response.milestones[0].dateSubmission = new Date();
    }

    if (localStorage.getItem('fund3r-milestone-mock-near-tx') === 'true' && response.milestones && response.milestones[0].budget) {
      response.milestones[0].isNearProposalValid = true;
    }

    return res(ctx.delay(GET_DELAY), ctx.json(response));
  }),

  rest.put<never, any>(`${BASE_URL}/api/v1/grants/:id`, (_req, res, ctx) => {
    const basicData = getGrantData(_req.headers.get('X-NEAR-ACCOUNT-ID') as string, parseInt(_req.params.id, 10));
    const { grantData } = _req.body;

    const response = {
      ...basicData,
      ...grantData,
      dateLastDraftSaving: new Date(),
    };

    localStorage.setItem('fund3r-mock-data', JSON.stringify(grantData));

    return res(ctx.delay(POST_PUT_DELAY), ctx.json(response));
  }),

  rest.post<never, any>(`${BASE_URL}/api/v1/grants/:id`, (_req, res, ctx) => {
    const basicData = getGrantData(_req.headers.get('X-NEAR-ACCOUNT-ID') as string, parseInt(_req.params.id, 10));

    const dummyDataString = localStorage.getItem('fund3r-mock-data');
    const dummyData = dummyDataString ? JSON.parse(dummyDataString) : {};

    const fundingAmount = dummyData?.fundingAmount;

    const response = {
      ...basicData,
      dateSubmission: new Date(),
      projectName: dummyData.projectName || 'Mocked Dummy Project',
      projectDescription: dummyData.projectDescription || 'Mocked Dummy Project Description',
      fundingAmount,
    };

    localStorage.setItem('fund3r-mock-submission', 'true');

    // uncomment below for testing error management
    // start
    // return res(
    //   ctx.status(400),
    //   ctx.json({
    //     ...response,
    //     errors: {
    //       projectName: 'Please enter a project name that is at least 3 characters long.',
    //     },
    //   }),
    // );
    // end

    return res(ctx.delay(POST_PUT_DELAY), ctx.json(response));
  }),

  // When this endpoint is called the backend should verify that the transaction hash is matching the grant
  rest.put<never, any>(`${BASE_URL}/api/v1/grants/:id/near-transactions`, (_req, res, ctx) => {
    const basicData = getGrantData(_req.headers.get('X-NEAR-ACCOUNT-ID') as string, parseInt(_req.params.id, 10));
    const { proposalNearTransactionHash } = _req.body;

    const dummyDataString = localStorage.getItem('fund3r-mock-data');
    const dummyData = dummyDataString ? JSON.parse(dummyDataString) : {};

    const fundingAmount = dummyData?.fundingAmount;

    const response = {
      ...basicData,
      dateSubmission: new Date(),
      projectName: dummyData.projectName || 'Mocked Dummy Project',
      projectDescription: dummyData.projectDescription || 'Mocked Dummy Project Description',
      fundingAmount,
      proposalNearTransactionHash,
      isNearProposalValid: true,
    };

    localStorage.setItem('fund3r-mock-near-tx', 'true');

    return res(ctx.delay(POST_PUT_DELAY), ctx.json(response));
  }),

  // This endpoint will save the interview url & return date of interview and other info updated
  rest.put<never, any>(`${BASE_URL}/api/v1/grants/:id/calendly/interview`, (_req, res, ctx) => {
    const basicData = getGrantData(_req.headers.get('X-NEAR-ACCOUNT-ID') as string, parseInt(_req.params.id, 10));

    const response = {
      ...basicData,
      dateInterviewScheduled: new Date(),
      dateInterview: new Date(),
    };

    return res(ctx.delay(POST_PUT_DELAY), ctx.json(response));
  }),

  rest.post<never, any>(`${BASE_URL}/api/v1/grants/:id/milestones/:milestoneId`, (_req, res, ctx) => {
    const response = {
      ...milestoneData,
      dateSubmission: new Date(),
    };

    localStorage.setItem('fund3r-milestone-submission-mock', 'true');

    return res(ctx.delay(POST_PUT_DELAY), ctx.json(response));
  }),

  // When this endpoint is called the backend should verify that the transaction hash is matching the milestone
  rest.put<never, any>(`${BASE_URL}/api/v1/grants/:id/milestones/:milestoneId/near-transactions`, (_req, res, ctx) => {
    const response = {
      ...milestoneData,
      dateSubmission: new Date(),
      isNearProposalValid: true,
    };

    localStorage.setItem('fund3r-milestone-mock-near-tx', 'true');

    return res(ctx.delay(POST_PUT_DELAY), ctx.json(response));
  }),

  // This endpoint will save the interview url & return date of interview and other info updated
  rest.put<never, any>(`${BASE_URL}/api/v1/grants/:id/milestones/:milestoneId/calendly/interview`, (_req, res, ctx) => {
    const basicData = getGrantData(_req.headers.get('X-NEAR-ACCOUNT-ID') as string, parseInt(_req.params.id, 10));

    const { milestoneId } = _req.params;
    const milestone = basicData.milestones[milestoneId];

    const response = {
      ...milestone,
      dateInterviewScheduled: new Date(),
      dateInterview: new Date(),
    };

    return res(ctx.delay(POST_PUT_DELAY), ctx.json(response));
  }),

  // todo
  // rest.post<never, any>(`${BASE_URL}/api/v1/grants/:id/milestones/:milestoneId/attachment`, (_req, res, ctx) => {
  //   return res(ctx.delay(POST_PUT_DELAY), ctx.json({ todo: true }));
  // }),

  // todo
  // rest.post<never, any>(`${BASE_URL}/api/v1/grants/:id/attachment`, (_req, res, ctx) => {
  //   return res(ctx.delay(POST_PUT_DELAY), ctx.json({ todo: true }));
  // }),
];

export default handlers;
