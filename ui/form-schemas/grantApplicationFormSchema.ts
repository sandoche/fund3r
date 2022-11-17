import Countries from '@kycdao/kycdao-sdk/dist/countries.list.json';
import type { TFunction } from 'next-i18next';
import { z } from 'zod';

import { GrantCategories, GrantTypes, OpenSourceStates, ProjectStatus, RaisingRoundStatus, WorkingTypes } from '@/types/GrantApplicationInterface';

const countryCodes = Countries.map((country) => country.iso_cca2);

// eslint-disable-next-line max-lines-per-function
const createSchema = (t: TFunction) => {
  return z.object({
    projectName: z.string().min(1, { message: t('form.projectName.error') }),
    grantType: z.nativeEnum(GrantTypes, {
      errorMap: () => {
        return { message: t('form.grantType.error') };
      },
    }),
    grantCategory: z.nativeEnum(GrantCategories, {
      errorMap: () => {
        return { message: t('form.grantCategory.error') };
      },
    }),
    projectUrl: z.string({ required_error: t('form.projectUrl.error') }).url({ message: t('form.projectUrl.error') }),
    githubUrl: z.string({ required_error: t('form.githubUrl.error') }).url({ message: t('form.githubUrl.error') }),
    projectStatus: z.nativeEnum(ProjectStatus, {
      errorMap: () => {
        return { message: t('form.projectStatus.error') };
      },
    }),
    projectLaunchDate: z.date({ required_error: t('form.projectLaunchDate.error'), invalid_type_error: t('form.projectLaunchDate.error') }),
    projectDescription: z
      .string({ required_error: t('form.projectDescription.error') })
      .min(1, { message: t('form.projectDescription.error') })
      .max(100, { message: t('form.projectDescription.error') }),
    fundingAmount: z
      .number({ invalid_type_error: t('form.fundingAmount.error'), required_error: t('form.fundingAmount.error') })
      .min(1, { message: t('form.fundingAmount.error') })
      .describe(t('form.fundingAmount.description')),

    milestones: z.array(
      z.object({
        budget: z.number({ invalid_type_error: t('form.budget.error'), required_error: t('form.budget.error') }).min(1, { message: t('form.budget.error') }),
        deliveryDate: z.date({ invalid_type_error: t('form.deliveryDate.error'), required_error: t('form.deliveryDate.error') }),
        description: z
          .string({ required_error: t('form.milestoneDescription.error') })
          .min(1, { message: t('form.milestoneDescription.error') })
          .max(100, { message: t('form.milestoneDescription.error') }),
      }),
    ),

    whatAndWhy: z
      .string({ required_error: t('form.whatAndWhy.error') })
      .min(1, { message: t('form.whatAndWhy.error') })
      .max(100, { message: t('form.whatAndWhy.error') }),
    competitionDifference: z
      .string({ required_error: t('form.competitionDifference.error') })
      .min(1, { message: t('form.competitionDifference.error') })
      .max(100, { message: t('form.competitionDifference.error') }),
    openSourceState: z.nativeEnum(OpenSourceStates, {
      errorMap: () => {
        return { message: t('form.openSourceState.error') };
      },
    }),
    opensourceComponentUse: z
      .string({ required_error: t('form.opensourceComponentUse.error') })
      .min(1, { message: t('form.opensourceComponentUse.error') })
      .describe(t('form.opensourceComponentUse.description')),
    impactOnEcosystem: z
      .string({ required_error: t('form.impactOnEcosystem.error') })
      .min(1, { message: t('form.impactOnEcosystem.error') })
      .max(1000, { message: t('form.impactOnEcosystem.error') }),
    excitementNear: z
      .string({ required_error: t('form.excitementNear.error') })
      .min(1, { message: t('form.excitementNear.error') })
      .max(1000, { message: t('form.excitementNear.error') }),
    successMesurement: z
      .string({ required_error: t('form.successMesurement.error') })
      .min(1, { message: t('form.successMesurement.error') })
      .describe(t('form.successMesurement.description')),
    projectRaisingRound: z.nativeEnum(RaisingRoundStatus, {
      errorMap: () => {
        return { message: t('form.projectRaisingRound.error') };
      },
    }),
    attachment: z.string({ required_error: t('form.attachment.error') }).optional(),

    firstname: z.string({ required_error: t('form.firstname.error') }).min(1, { message: t('form.firstname.error') }),
    lastname: z.string({ required_error: t('form.lastname.error') }).min(1, { message: t('form.lastname.error') }),
    dateOfBirth: z.date({ required_error: t('form.dateOfBirth.error'), invalid_type_error: t('form.dateOfBirth.error') }),
    email: z.string({ required_error: t('form.email.error') }).email({ message: t('form.email.error') }),
    github: z.string().optional(),
    twitter: z.string().optional(),
    workingAloneOrTeam: z.nativeEnum(WorkingTypes, {
      errorMap: () => {
        return { message: t('form.workingAloneOrTeam.error') };
      },
    }),
    aboutTeam: z
      .string({ required_error: t('form.aboutTeam.error') })
      .nullable()
      .optional(),
    teamMembers: z.array(
      z.object({
        githubUrl: z.string().url({ message: t('form.githubUrl.error') }),
      }),
    ),

    hasPreviouslyReceivedFundingTokensGrantsFromNear: z.boolean(),
    aboutTokensReceivedFromNear: z.string().optional(),

    addressCountry: z.enum(['AF', ...countryCodes]),
    addressCity: z.string({ required_error: t('form.addressCity.error') }).min(1, { message: t('form.addressCity.error') }),
    addressStreet: z.string({ required_error: t('form.addressStreet.error') }).min(1, { message: t('form.addressStreet.error') }),
    addressZip: z.string({ required_error: t('form.addressZip.error') }).min(1, { message: t('form.addressZip.error') }),

    howHeardGrants: z
      .string({ required_error: t('form.howHeardGrants.error') })
      .min(1, { message: t('form.howHeardGrants.error') })
      .describe(t('form.howHeardGrants.description')),
    referral: z.string().optional(),
    comments: z
      .string()
      .max(1000, { message: t('form.comments.error') })
      .optional(),
  });
};

export default createSchema;
