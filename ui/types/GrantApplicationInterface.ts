import type { FormList } from '@mantine/form/lib/form-list/form-list';

export enum GrantTypes {
    Equity = 'equity',
    NonEquity = 'non-equity',
}

export enum GrantCategories {
    ChannelBrandPartnership = 'channel-brand-partnership',
    Daos = 'daos',
    GamingMetaverse = 'gaming-metaverse',
    InfrastructureWallets = 'infrastructure-wallets',
    InstitutionalFinancial = 'institutional-financial',
    Nfts = 'nfts',
    SocialImpact = 'social-impact',
    Other = 'other',
}

export enum ProjectStatus {
    Mvp = 'mvp',
    PreAlpha = 'pre-alpha',
    Alpha = 'alpha',
    Beta = 'beta',
    Live = 'live',
}

export enum OpenSourceStates {
    FullyOpenSource = 'fully-open-source',
    PartiallyOpenSource = 'partially-open-source',
    ClosedSource = 'closed-source',
}

export enum WorkingTypes {
    WorkingAlone = 'working-alone',
    WorkingWithTeam = 'working-with-team',
}

export enum RaisingRoundStatus {
    Raising = 'raising',
    NotRaising = 'not-raising',
}

export enum PaymentStatuses {
    Pending = 'pending',
    Paid = 'paid',
}

export interface PaymentInterface {
    _id: string;
    id: string;
    date: Date;
    milestoneNumber: number; // to link a milestone to a payment should be 0 if initial payment
    amount: number;
    currency: string;
    status: PaymentStatuses;
}

export interface GrantApplicationInterface {
    id: number | undefined;
    nearId: string;

    // Member related
    firstname?: string;
    lastname?: string;
    dateOfBirth?: Date;
    email?: string;
    github?: string;
    twitter?: string;
    workingAloneOrTeam?: WorkingTypes;
    aboutTeam?: string;
    teamMembers?: FormList<{ githubUrl?: string }>;

    hasPreviouslyReceivedFundingTokensGrantsFromNear?: boolean;
    aboutTokensReceivedFromNear?: string;

    // Project related
    projectName?: string;
    grantType?: GrantTypes;
    grantCategory?: GrantCategories;
    projectUrl?: string;
    githubUrl?: string;
    projectStatus?: ProjectStatus;
    projectLaunchDate?: Date;
    projectDescription?: string;
    currency?: string;
    fundingAmount?: number;
    whatAndWhy?: string;
    competitionDifference?: string;
    openSourceState?: OpenSourceStates;
    opensourceComponentUse?: string;
    impactOnEcosystem?: string;
    excitementNear?: string;
    successMesurement?: string;
    projectRaisingRound?: RaisingRoundStatus;
    attachment?: string; // to replace with AttachmentInterface;

    // Address
    addressCountry?: string;
    addressCity?: string;
    addressStreet?: string;
    addressZip?: string;

    // About
    howHeardGrants?: string;
    referral?: string;
    comments?: string;

    // Status and date
    dateLastDraftSaving?: Date;
    dateSubmission?: Date;
    proposalNearTransactionHash?: string;
    hashProposal?: string | null;
    isNearProposalValid?: boolean;
    dateEvaluation?: Date;
    dateInterviewScheduled?: Date;
    dateInterview?: Date;
    dateInterviewCompletionConfirmation?: Date;
    dateDenial?: Date;
    dateApproval?: Date;
    dateKycCompletion?: Date;
    dateKycDenied?: Date;
    dateKycApproved?: Date;
    dateAgreementSignatureGrantReceiver?: Date;
    dateAgreementSignatureGrantGiver?: Date;
    dateOnboardingMeeting?: Date;
    dateFirstPaymentSent?: Date;
    dateOnboardingCompletion?: Date;

    // Hellosign
    helloSignSignatureRequestId?: string;
    helloSignRequestUrl?: string;
    helloSignRequestId?: string;

    // Links
    interviewUrl?: string;
    agreementUrl?: string;
    invoiceUrl?: string;

    // reviews
    reviewProject?: string;
    reviewMemberDetail?: string;
    reviewAttachments?: string;

    milestones: FormList<{
        budget?: number | null;
        deliveryDate?: Date | null;
        description?: string | null;
        reviewMilestone?: string | null;
        dateSubmission?: Date | null;
        proposalNearTransactionHash?: string | null;
        isNearProposalValid?: boolean | null;
        dateInterview?: Date | null;
        dateInterviewScheduled?: Date | null;
        dateRejection?: Date | null;
        dateValidation?: Date | null;
        status?: string | null;
        step?: number | null;
        pendingStep?: number | null;
        hashProposal?: string | null;
    }>;
    payments?: PaymentInterface[];
    created_at?: Date;
    updated_at?: Date;
}
