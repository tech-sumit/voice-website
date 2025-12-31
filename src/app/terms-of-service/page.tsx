import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - PixPoc",
  description: "Terms of Service for PixPoc AI Technologies Pvt Ltd. Learn about our service terms, usage policies, and legal agreements.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[var(--hw-chassis)] pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="bg-[var(--hw-panel)] border border-[var(--hw-border)] rounded-lg p-8 md:p-12 shadow-sm">
          <div className="mb-10 border-b border-[var(--hw-border)] pb-8">
            <div className="inline-block bg-[var(--hw-text-main)] px-4 py-1 mb-4 shadow-[0_2px_0_rgba(0,0,0,0.2)]">
              <span className="text-[var(--hw-panel)] text-xs font-mono uppercase tracking-widest">Legal Document</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--hw-text-main)] mb-4 tracking-tight uppercase">
              Terms of Service
            </h1>
            <p className="text-[var(--hw-text-muted)] font-mono text-sm">
              Last Updated: December 31, 2025
            </p>
          </div>

          <div className="prose prose-stone dark:prose-invert max-w-none text-[var(--hw-text-muted)]">
            <section className="mb-10">
              <h2 className="text-xl font-bold text-[var(--hw-text-main)] mb-4 uppercase tracking-wide">Introduction</h2>
              <p className="mb-4 leading-relaxed">
                Welcome to PixPoc! These Terms of Service (&quot;Terms&quot;) govern your access to and use of the AI calling agents platform and related services (collectively, the &quot;Service&quot;) operated by PIXPOC AI TECHNOLOGIES PVT LTD (&quot;PixPoc,&quot; &quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). Please read these Terms carefully before using the Service.
              </p>
              <p className="leading-relaxed">
                By accessing or using the Service, you (&quot;you,&quot; &quot;your,&quot; or &quot;User&quot;) agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not access or use the Service.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[var(--hw-text-main)] mb-4 uppercase tracking-wide">1. Acceptance of Terms</h2>
              <p className="leading-relaxed">
                By creating an account, accessing the platform, or using any features of the Service, you confirm that you accept these Terms and agree to comply with them. If you are using the Service on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[var(--hw-text-main)] mb-4 uppercase tracking-wide">2. Description of Service</h2>
              <p className="mb-4 leading-relaxed">
                PixPoc provides a sophisticated cloud-based AI calling agents platform that enables businesses to:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>Automate outbound and inbound voice calls</li>
                <li>Conduct customer outreach, follow-ups, and lead qualification</li>
                <li>Schedule appointment reminders and conduct surveys</li>
                <li>Provide automated support interactions through intelligent voice agents</li>
                <li>Integrate with CRM systems and business tools</li>
                <li>Access real-time analytics and call insights</li>
              </ul>
              <p className="leading-relaxed">
                The Service includes web applications, mobile applications, APIs, and related software and services.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[var(--hw-text-main)] mb-4 uppercase tracking-wide">3. Eligibility</h2>
              <p className="leading-relaxed">
                You must be at least 18 years old and have the legal capacity to enter into binding contracts to use our Service. By using the Service, you represent and warrant that you meet these requirements. If you are using the Service on behalf of a business entity, you represent that you are authorized to accept these Terms on behalf of that entity.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[var(--hw-text-main)] mb-4 uppercase tracking-wide">4. User Accounts</h2>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">4.1 Registration</h3>
              <p className="mb-4 leading-relaxed">
                To access certain features, you must register for an account. You agree to:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and promptly update your account information</li>
                <li>Keep your account credentials secure and confidential</li>
                <li>Accept responsibility for all activities that occur under your account</li>
              </ul>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">4.2 Account Security</h3>
              <p className="mb-4 leading-relaxed">
                You are solely responsible for safeguarding your account credentials. You agree to:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>Use a strong, unique password</li>
                <li>Not share your password with any third party</li>
                <li>Notify us immediately of any unauthorized access or security breach</li>
                <li>Take all reasonable steps to prevent unauthorized access</li>
              </ul>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">4.3 Account Termination</h3>
              <p className="mb-4 leading-relaxed">
                We reserve the right to suspend or terminate your account at our sole discretion if you:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>Violate these Terms or any applicable laws</li>
                <li>Engage in fraudulent or abusive behavior</li>
                <li>Fail to pay fees when due</li>
                <li>Use the Service in a manner that harms PixPoc or other users</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[var(--hw-text-main)] mb-4 uppercase tracking-wide">5. Acceptable Use Policy</h2>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">5.1 Permitted Use</h3>
              <p className="mb-4 leading-relaxed">
                You may use the Service for lawful business purposes in accordance with these Terms and all applicable laws and regulations.
              </p>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">5.2 Prohibited Activities</h3>
              <p className="mb-4 leading-relaxed">
                You agree not to:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>Use the Service for any illegal, fraudulent, or unauthorized purpose</li>
                <li>Make unsolicited calls in violation of telemarketing laws or regulations</li>
                <li>Violate any applicable Do Not Call registry requirements</li>
                <li>Transmit spam, harassment, threats, or abusive content</li>
                <li>Impersonate any person or entity or misrepresent your affiliation</li>
                <li>Upload or transmit viruses, malware, or other malicious code</li>
                <li>Attempt to gain unauthorized access to the Service or related systems</li>
                <li>Interfere with or disrupt the Service&apos;s proper functioning</li>
                <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
                <li>Use the Service to compete with PixPoc or develop competing products</li>
                <li>Scrape, harvest, or collect user data without authorization</li>
                <li>Violate any third-party rights, including privacy and intellectual property rights</li>
                <li>Use the Service in any way that could damage PixPoc&apos;s reputation</li>
              </ul>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">5.3 Compliance with Laws</h3>
              <p className="mb-4 leading-relaxed">
                You are solely responsible for ensuring that your use of the Service complies with all applicable laws, including but not limited to:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>Telephone Consumer Protection Act (TCPA)</li>
                <li>Telemarketing Sales Rule (TSR)</li>
                <li>General Data Protection Regulation (GDPR)</li>
                <li>California Consumer Privacy Act (CCPA)</li>
                <li>Information Technology Act, 2000 (India)</li>
                <li>Any other applicable telecommunications and data protection laws</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[var(--hw-text-main)] mb-4 uppercase tracking-wide">6. Payment Terms</h2>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">6.1 Fees</h3>
              <p className="mb-4 leading-relaxed">
                Certain features of the Service require payment of fees. You agree to pay all applicable fees as described in your selected pricing plan. All fees are non-refundable except as expressly stated in these Terms.
              </p>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">6.2 Billing</h3>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>Fees are billed in advance on a subscription basis (monthly, annually, or as otherwise agreed)</li>
                <li>You authorize us to charge your designated payment method for all fees</li>
                <li>You are responsible for providing accurate billing information</li>
                <li>Failure to pay fees may result in suspension or termination of your account</li>
              </ul>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">6.3 Price Changes</h3>
              <p className="mb-4 leading-relaxed">
                We reserve the right to modify our pricing at any time. We will provide you with reasonable notice of any price changes. Continued use of the Service after a price change constitutes acceptance of the new pricing.
              </p>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">6.4 Taxes</h3>
              <p className="leading-relaxed">
                All fees are exclusive of applicable taxes, duties, or similar governmental assessments. You are responsible for paying all such taxes except for taxes based on PixPoc&apos;s net income.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[var(--hw-text-main)] mb-4 uppercase tracking-wide">7. Refund and Cancellation Policy</h2>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">7.1 No Refunds</h3>
              <p className="mb-4 leading-relaxed">
                All purchases and subscription fees are final and non-refundable, except as required by law or as expressly provided in a written agreement with PixPoc.
              </p>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">7.2 Cancellation</h3>
              <p className="mb-4 leading-relaxed">
                You may cancel your subscription at any time through your account settings. Cancellation will be effective at the end of your current billing period. No refunds will be provided for partial billing periods.
              </p>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">7.3 Free Trials</h3>
              <p className="leading-relaxed">
                If you are participating in a free trial, you may cancel at any time during the trial period without charge. If you do not cancel before the trial ends, you will be automatically charged for the selected subscription plan.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[var(--hw-text-main)] mb-4 uppercase tracking-wide">8. Intellectual Property Rights</h2>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">8.1 PixPoc&apos;s Ownership</h3>
              <p className="mb-4 leading-relaxed">
                The Service and all content, features, functionality, software, code, designs, graphics, user interfaces, trademarks, logos, and other materials are owned by PixPoc and are protected by copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">8.2 Limited License</h3>
              <p className="mb-4 leading-relaxed">
                Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to access and use the Service for your internal business purposes.
              </p>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">8.3 Restrictions</h3>
              <p className="mb-4 leading-relaxed">
                You shall not:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>Copy, modify, distribute, sell, or lease any part of the Service</li>
                <li>Reproduce, duplicate, or create derivative works from the Service</li>
                <li>Remove, alter, or obscure any proprietary notices</li>
                <li>Use PixPoc&apos;s trademarks, logos, or branding without written permission</li>
              </ul>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">8.4 Your Content</h3>
              <p className="mb-4 leading-relaxed">
                You retain ownership of any content, data, or materials you upload to the Service (&quot;Your Content&quot;). By uploading Your Content, you grant PixPoc a worldwide, non-exclusive, royalty-free license to use, process, store, and transmit Your Content solely to provide the Service to you.
              </p>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">8.5 Feedback</h3>
              <p className="leading-relaxed">
                If you provide feedback, suggestions, or ideas about the Service, you grant PixPoc a perpetual, irrevocable, worldwide, royalty-free license to use, modify, and incorporate such feedback without any obligation to you.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[var(--hw-text-main)] mb-4 uppercase tracking-wide">9. Data Processing and Privacy</h2>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">9.1 Privacy Policy</h3>
              <p className="mb-4 leading-relaxed">
                Your use of the Service is governed by our Privacy Policy, which describes how we collect, use, store, and protect your personal data and call data.
              </p>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">9.2 Data Processing Agreement</h3>
              <p className="mb-4 leading-relaxed">
                When you use the Service to process personal data of third parties (such as call recipients), you act as the data controller and PixPoc acts as the data processor. You are responsible for:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>Obtaining all necessary consents and authorizations</li>
                <li>Complying with all applicable data protection laws</li>
                <li>Ensuring you have the legal right to process such data</li>
              </ul>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">9.3 Call Recording Consent</h3>
              <p className="leading-relaxed">
                You are solely responsible for obtaining all necessary consents for recording phone calls in accordance with applicable laws. PixPoc is not responsible for your failure to obtain proper consent.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[var(--hw-text-main)] mb-4 uppercase tracking-wide">10. Third-Party Services and Integrations</h2>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">10.1 Third-Party Services</h3>
              <p className="mb-4 leading-relaxed">
                The Service may integrate with or link to third-party services, websites, or applications not owned or controlled by PixPoc. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party services.
              </p>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">10.2 Third-Party Terms</h3>
              <p className="mb-4 leading-relaxed">
                Your use of third-party services is subject to their respective terms and conditions. You are responsible for reviewing and complying with such terms.
              </p>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">10.3 No Endorsement</h3>
              <p className="leading-relaxed">
                PixPoc does not endorse or make any representations about third-party services. Access and use of third-party services is at your own risk.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[var(--hw-text-main)] mb-4 uppercase tracking-wide">11. Disclaimers and Warranties</h2>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">11.1 &quot;As Is&quot; Basis</h3>
              <p className="mb-4 leading-relaxed">
                THE SERVICE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
              </p>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">11.2 No Warranty</h3>
              <p className="mb-4 leading-relaxed">
                PixPoc does not warrant that:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>The Service will meet your specific requirements or expectations</li>
                <li>The Service will be uninterrupted, timely, secure, or error-free</li>
                <li>The results obtained from using the Service will be accurate or reliable</li>
                <li>Any errors or defects in the Service will be corrected</li>
                <li>The Service will be compatible with all devices or systems</li>
              </ul>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">11.3 AI Technology Limitations</h3>
              <p className="leading-relaxed">
                You acknowledge that the Service uses artificial intelligence and machine learning technologies, which may produce unexpected or inaccurate results. PixPoc is not responsible for any decisions made based on AI-generated outputs.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[var(--hw-text-main)] mb-4 uppercase tracking-wide">12. Limitation of Liability</h2>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">12.1 Exclusion of Damages</h3>
              <p className="mb-4 leading-relaxed">
                TO THE FULLEST EXTENT PERMITTED BY LAW, PIXPOC, ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, SUPPLIERS, AND LICENSORS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>Loss of profits, revenue, or business opportunities</li>
                <li>Loss of data or information</li>
                <li>Loss of goodwill or reputation</li>
                <li>Business interruption</li>
                <li>Cost of substitute services</li>
              </ul>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">12.2 Maximum Liability</h3>
              <p className="mb-4 leading-relaxed">
                IN NO EVENT SHALL PIXPOC&apos;S TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICE EXCEED THE AMOUNT YOU PAID TO PIXPOC IN THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO LIABILITY, OR ONE HUNDRED DOLLARS ($100), WHICHEVER IS GREATER.
              </p>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">12.3 Basis of the Bargain</h3>
              <p className="leading-relaxed">
                You acknowledge that the limitations of liability set forth in this section are fundamental elements of the agreement between you and PixPoc, and that PixPoc would not provide the Service without such limitations.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[var(--hw-text-main)] mb-4 uppercase tracking-wide">13. Indemnification</h2>
              <p className="mb-4 leading-relaxed">
                You agree to defend, indemnify, and hold harmless PixPoc, its affiliates, and their respective officers, directors, employees, agents, suppliers, and licensors from and against any claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys&apos; fees) arising out of or relating to:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>Your use or misuse of the Service</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any applicable laws or regulations</li>
                <li>Your violation of any third-party rights, including privacy or intellectual property rights</li>
                <li>Your Content or any content you submit through the Service</li>
                <li>Any calls made using the Service on your behalf</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[var(--hw-text-main)] mb-4 uppercase tracking-wide">14. Service Modifications and Availability</h2>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">14.1 Right to Modify</h3>
              <p className="mb-4 leading-relaxed">
                We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) at any time, with or without notice, for any reason, including but not limited to:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>Maintenance and updates</li>
                <li>Security concerns</li>
                <li>Legal or regulatory requirements</li>
                <li>Business decisions</li>
              </ul>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">14.2 No Liability</h3>
              <p className="mb-4 leading-relaxed">
                PixPoc shall not be liable to you or any third party for any modification, suspension, or discontinuation of the Service.
              </p>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">14.3 Service Availability</h3>
              <p className="leading-relaxed">
                While we strive to maintain high availability, we do not guarantee that the Service will be available at all times. The Service may be unavailable due to maintenance, technical issues, or circumstances beyond our control.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[var(--hw-text-main)] mb-4 uppercase tracking-wide">15. Amendments to Terms</h2>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">15.1 Right to Amend</h3>
              <p className="mb-4 leading-relaxed">
                We may revise and update these Terms from time to time at our sole discretion. All changes are effective immediately upon posting to our website.
              </p>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">15.2 Notice of Changes</h3>
              <p className="mb-4 leading-relaxed">
                We will make reasonable efforts to notify you of material changes to these Terms by:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>Posting a notice on our website</li>
                <li>Sending an email to your registered email address</li>
                <li>Displaying a notification in your account</li>
              </ul>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">15.3 Acceptance of Changes</h3>
              <p className="leading-relaxed">
                Your continued use of the Service after any changes to these Terms constitutes acceptance of those changes. If you do not agree to the modified Terms, you must stop using the Service.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[var(--hw-text-main)] mb-4 uppercase tracking-wide">16. Termination</h2>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">16.1 Termination by You</h3>
              <p className="mb-4 leading-relaxed">
                You may terminate your account at any time by following the cancellation process in your account settings or by contacting our support team.
              </p>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">16.2 Termination by PixPoc</h3>
              <p className="mb-4 leading-relaxed">
                We may suspend or terminate your access to the Service immediately, without prior notice or liability, for any reason, including but not limited to:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>Breach of these Terms</li>
                <li>Fraudulent or illegal activity</li>
                <li>Non-payment of fees</li>
                <li>Conduct that harms PixPoc or other users</li>
                <li>Extended periods of inactivity</li>
              </ul>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">16.3 Effect of Termination</h3>
              <p className="mb-4 leading-relaxed">
                Upon termination:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>Your right to access and use the Service will immediately cease</li>
                <li>You remain liable for all fees and charges incurred prior to termination</li>
                <li>We may delete Your Content and account data in accordance with our data retention policies</li>
                <li>Sections of these Terms that by their nature should survive termination shall survive</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[var(--hw-text-main)] mb-4 uppercase tracking-wide">17. Governing Law and Jurisdiction</h2>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">17.1 Governing Law</h3>
              <p className="mb-4 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of Maharashtra, India, without regard to its conflict of law provisions.
              </p>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">17.2 Jurisdiction</h3>
              <p className="mb-4 leading-relaxed">
                Any disputes arising out of or relating to these Terms or the Service shall be subject to the exclusive jurisdiction of the courts located in Pune, Maharashtra, India.
              </p>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">17.3 Dispute Resolution</h3>
              <p className="leading-relaxed">
                Before filing any legal action, the parties agree to attempt to resolve disputes through good-faith negotiations. If negotiations fail within thirty (30) days, either party may pursue legal remedies.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[var(--hw-text-main)] mb-4 uppercase tracking-wide">18. General Provisions</h2>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">18.1 Entire Agreement</h3>
              <p className="mb-4 leading-relaxed">
                These Terms, together with our Privacy Policy and any other agreements expressly incorporated by reference, constitute the entire agreement between you and PixPoc regarding the Service and supersede all prior agreements and understandings.
              </p>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">18.2 Severability</h3>
              <p className="mb-4 leading-relaxed">
                If any provision of these Terms is held to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect.
              </p>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">18.3 Waiver</h3>
              <p className="mb-4 leading-relaxed">
                No waiver of any term or condition of these Terms shall be deemed a further or continuing waiver of such term or any other term. PixPoc&apos;s failure to assert any right or provision under these Terms shall not constitute a waiver of such right or provision.
              </p>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">18.4 Assignment</h3>
              <p className="mb-4 leading-relaxed">
                You may not assign or transfer these Terms or your rights and obligations hereunder without PixPoc&apos;s prior written consent. PixPoc may assign these Terms without restriction.
              </p>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">18.5 Force Majeure</h3>
              <p className="mb-4 leading-relaxed">
                PixPoc shall not be liable for any failure or delay in performance due to circumstances beyond its reasonable control, including but not limited to acts of God, natural disasters, war, terrorism, labor disputes, or government actions.
              </p>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">18.6 Relationship of Parties</h3>
              <p className="mb-4 leading-relaxed">
                Nothing in these Terms creates a partnership, joint venture, agency, or employment relationship between you and PixPoc.
              </p>

              <h3 className="text-lg font-semibold text-[var(--hw-text-main)] mb-3 mt-6">18.7 Notices</h3>
              <p className="mb-4 leading-relaxed">
                All notices under these Terms shall be in writing and shall be deemed given when:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                <li>Delivered personally</li>
                <li>Sent by confirmed email</li>
                <li>Sent by registered or certified mail, return receipt requested</li>
              </ul>
              <p className="leading-relaxed">
                Notices to PixPoc should be sent to the contact information provided below.
              </p>
            </section>

            <section className="mt-16 pt-10 border-t border-[var(--hw-border)]">
              <h2 className="text-xl font-bold text-[var(--hw-text-main)] mb-6 uppercase tracking-wide">19. Contact Information</h2>
              <div className="bg-[var(--hw-chassis)] p-6 rounded border border-[var(--hw-border)]">
                <p className="mb-4 font-medium text-[var(--hw-text-main)]">
                  If you have any questions, concerns, or requests regarding these Terms of Service, please contact us:
                </p>
                <div className="space-y-2 text-[var(--hw-text-muted)] font-mono text-sm">
                  <p><span className="font-bold text-[var(--hw-text-main)]">Company:</span> PIXPOC AI TECHNOLOGIES PVT LTD</p>
                  <p><span className="font-bold text-[var(--hw-text-main)]">Email:</span> admin@pixpoc.in</p>
                  <p><span className="font-bold text-[var(--hw-text-main)]">Address:</span> Sadanand Business Centre, Building No.: 9th, 10th, 11th, 12th Floor, Nyati Emporius, Baner, Pune, Maharashtra – 411045, India</p>
                  <p><span className="font-bold text-[var(--hw-text-main)]">Website:</span> https://pixpoc.ai</p>
                </div>
              </div>
              <p className="mt-8 text-xs text-[var(--hw-text-muted)] text-center">
                © 2025 PIXPOC AI TECHNOLOGIES PVT LTD. All rights reserved.
              </p>
              <p className="mt-4 text-sm text-[var(--hw-text-muted)] leading-relaxed text-center">
                By using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
