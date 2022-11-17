# Manual testing

> A guide to not forget to test anything.

## Testing list

- [ ] Should authenticate with NEAR wallet when clicking on the call to actions
- [ ] Should disconnect from NEAR when clicking logout in the navbar
- [ ] The /api/v1/grants page should require NEAR login
- [ ] Saving as draft the form should not verify field types
- [ ] Saving as draft should display last saved time
- [ ] Submitting the form should requires field validation
- [ ] Submitting should first save as draft, then validate and submit to mark the data as submitted, then redirect to the NEAR submission
- [ ] If submission to the blockchain not completed show button to finish
- [ ] Submission to the blockchain should create a proposal to the DAO
- [ ] If submission to the blockchain and to the backend we should see the details

### Conditional form rendering

- [ ] If member part of a team add field about the team and team members
- [ ] If total amount requested above 100 000 ask for a video
- [ ] If member already got a grant ask about

## Status testing URLs

First complete the full form process then go to these URLs

- [ ] http://localhost:3000/api/v1/grants/t3st.testnet-1 | Should show "You have successfully completed the application", "You will receive a follow up email to confirm your application has been received and separately when the review process has started. If you have questions that aren’t answered on near.org/grants, please contact us via email at grants@near.foundation." and only "Submit your Application" checked ---> Only if NEXT_PUBLIC_SKIP_EVALUATION_APPROVAL === false (backend will have this setting also)
- [ ] http://localhost:3000/api/v1/grants/t3st.testnet-2 | Should show "You are invited to an interview. Please, select available date." and "Evaluation & Approval" should be checked
- [ ] http://localhost:3000/api/v1/grants/t3st.testnet-3 | Should show "Waiting for a interview" with the date of the interview and "Evaluation & Approval" should be checked
- [ ] http://localhost:3000/api/v1/grants/t3st.testnet-4 | Should show "You have successfully completed the interview" and "You will receive a follow up email to confirm your application has been approved. If you have questions that aren’t answered on near.org/grants, please contact us via email at grants@near.foundation." with "Evaluation & Approval" checked and "Acceptance or Denial Notification" with a logo pending
- [ ] http://localhost:3000/api/v1/grants/t3st.testnet-5 | Should show "Your application has been denied. Please, check comments and submit your application again." and the comments
- [ ] http://localhost:3000/api/v1/grants/t3st.testnet-6 | Should show "Your funding has been approved, please verivy your account." and a "Verify account" button and "Acceptance or Denial Notification" should be checked
- [ ] http://localhost:3000/api/v1/grants/t3st.testnet-7 | Should show "Thank you! We are currently checking your data" and its description, "Acceptance or Denial Notification" should be checked and "KYC" have a pending icon
- [ ] http://localhost:3000/api/v1/grants/t3st.testnet-8 | Should show "Sorry, the KYC has been denied" and a button button and "Acceptance or Denial Notification" should be checked
- [ ] http://localhost:3000/api/v1/grants/t3st.testnet-9 | Should show "Your account has been approved. To continue please sign the grant agreement." and a sign agreement button, KYC should be checked
- [ ] http://localhost:3000/api/v1/grants/t3st.testnet-10 | Should show "You successfully signed the agreement, in order to receive the first payment" and there should be a button "Submit proposal" and Signing of agreement should be checked and On-chain submission should be pending
- [ ] http://localhost:3000/api/v1/grants/t3st.testnet-11 | Should show "You have successfully completed the application. You will receive soon the first payout." and "On-chain submission" should be checked and "Upfront payout" pending
- [ ] http://localhost:3000/api/v1/grants/t3st.testnet-12 | Should show "We have successfully completed the first payment. We are waiting for you at the onboarding meeting." and Upfront payout should be checked and Onboarding pending ---> Only if SKIP_ONBOARDING === false (backend will have this setting also)
- [ ] http://localhost:3000/api/v1/grants/t3st.testnet-13 | Should show "Let us know when you are done with milestone 1 and we will start the review." with a submit button and "Let’s start to work" instead of the process overview with only "Working on Milestone 1" marked as pending
- [ ] http://localhost:3000/api/v1/grants/t3st.testnet-14 | Should show "Please submit your milestone to the DAO" and a "Submit button", "Working on Milestone 1" should be marked as waiting
- [ ] http://localhost:3000/api/v1/grants/t3st.testnet-15 | Should show "Please book your interview with our team in order to validate your milestone", "Submit" on the right should be as waiting
- [ ] http://localhost:3000/api/v1/grants/t3st.testnet-16 | Should show "Please attend your interview with our team in order to validate your milestone." and the date of the meeting " should be marked as done and "Submit" aswell, "Review" should be marked as pending
- [ ] http://localhost:3000/api/v1/grants/t3st.testnet-17 | Should show "Your application has been denied. Please, check comments and submit your application again." and the submit component below with only "Working on Milestone 1" marked as pending
- [ ] http://localhost:3000/api/v1/grants/t3st.testnet-18 | Should show "Working on Milestone 1" as done, "Working on Milestone 2" as pending and "Let us know when you are done with milestone 2 and we will start the review." with a submit button; it should have 2 payments in the payment part and have ticks in the 2 first items of payment schedule

### Milestones submission

- [ ] Milestone submission page should give an error if the milestone doesn't exist
- [ ] Milestone submission page should only allow milestones that has not been submitted
- [ ] Milestone submission page will not let you submit milestone i + 1 if milestone i had not been submitted
- [ ] Milestone submission page will show you the page to submit it to the DAO if it has only been sent to the backend
- [ ] Milestone submission page should show the form if it has not been submitted at all

### Payments tab

- [ ] Should show the initial payment by default
- [ ] Should show the extra payment for submitted milestones
- [ ] Should mark the initial payment as pending until paid
- [ ] Should mark the extra payment for submitted miletone pending until sent

### Project details milestone part

- [ ] Should show a checkmark when milestone is paid
- [ ] Should show a cross and a comment when milestone rejected

### Payment schedule

- [ ] Should show a checkmark when milestone is paid

## API Implementation informations

- Check `__tests__/mocks/handlers.ts` to see how the API should behave
