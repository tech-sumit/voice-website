export interface TemplateField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'date';
  placeholder: string;
  maxLength?: number;
  required?: boolean;
}

export interface CallTemplate {
  id: string;
  name: string;
  description: string;
  fields: TemplateField[];
  generateFlow: (values: Record<string, string>) => string;
}

const callTemplates: CallTemplate[] = [
  {
    id: 'custom',
    name: 'Custom Flow',
    description: 'Create your own custom conversation flow',
    fields: [
      {
        name: 'name',
        label: 'Customer Name',
        type: 'text',
        placeholder: 'Enter customer name',
        maxLength: 20,
        required: true
      },
      {
        name: 'expectedFlow',
        label: 'Expected Conversation Flow',
        type: 'text',
        placeholder: 'Describe the expected call flow',
        maxLength: 1000,
        required: true
      }
    ],
    generateFlow: (values) => values.expectedFlow || ''
  },
  {
    id: 'loan-reminder',
    name: 'Loan Payment Reminder',
    description: 'Reminder for overdue loan payments',
    fields: [
      {
        name: 'bankName',
        label: 'Bank Name',
        type: 'text',
        placeholder: 'Enter bank name',
        maxLength: 30,
        required: true
      },
      {
        name: 'callerName',
        label: 'Caller Name',
        type: 'text',
        placeholder: 'Enter caller name',
        maxLength: 20,
        required: true
      },
      {
        name: 'overdueAmount',
        label: 'Overdue Amount',
        type: 'number',
        placeholder: 'Enter amount (e.g. 100)',
        required: true
      },
      {
        name: 'overdueDays',
        label: 'Overdue Days',
        type: 'number',
        placeholder: 'Enter days overdue',
        required: true
      }
    ],
    generateFlow: (values) => {
      return `
1. Greet & identify  
   "Hello! This is ${values.callerName} calling from ${values.bankName}."

2. State call purpose  
   "I'm reaching out about your loan account."

3. Present overdue details  
   "Our records show an overdue balance of ₹${values.overdueAmount} outstanding for ${values.overdueDays} days."

4. Explain consequence & request date  
   "To avoid additional fees or credit impact, we'd like to set a payment date today."  
   "On which date do you plan to make this payment?"

5. Capture & confirm date  
   • Parse the spoken date to YYYY-MM-DD format.  
   • Repeat for confirmation:  
     "Just to confirm, you intend to pay on [Parsed-Date], correct?"  
   • If unclear or too far out, ask again or negotiate a nearer date.

6. Summarize arrangement  
   "Great. You'll pay ₹${values.overdueAmount} on [Confirmed-Date].  
   We'll send a reminder SMS 24 hours before the due date."

7. Offer assistance  
   "Do you have any questions, or is there anything else I can help you with today?"

8. Close politely  
   "Thank you, [end the call]."
      `.trim();
    }
  },
  {
    id: 'appointment-reminder',
    name: 'Appointment Reminder',
    description: 'Reminder for upcoming appointments',
    fields: [
      {
        name: 'businessName',
        label: 'Business Name',
        type: 'text',
        placeholder: 'Enter business name',
        maxLength: 30,
        required: true
      },
      {
        name: 'callerName',
        label: 'Caller Name',
        type: 'text',
        placeholder: 'Enter caller name',
        maxLength: 20,
        required: true
      },
      {
        name: 'appointmentDate',
        label: 'Appointment Date',
        type: 'date',
        placeholder: 'YYYY-MM-DD',
        required: true
      },
      {
        name: 'appointmentTime',
        label: 'Appointment Time',
        type: 'text',
        placeholder: 'e.g. 2:30 PM',
        required: true
      },
      {
        name: 'appointmentType',
        label: 'Appointment Type',
        type: 'text',
        placeholder: 'e.g. Dental Checkup',
        required: true
      }
    ],
    generateFlow: (values) => {
      return `
1. Greet & identify  
   "Hello! This is ${values.callerName} calling from ${values.businessName}."

2. State call purpose  
   "I'm calling to remind you about your upcoming ${values.appointmentType} appointment."

3. Confirm appointment details  
   "You have an appointment scheduled for ${values.appointmentDate} at ${values.appointmentTime}."

4. Ask for confirmation  
   "I'm calling to confirm that you'll be able to make this appointment. Will you be able to attend?"

5. If confirmed:  
   "Great! We look forward to seeing you then."  
   "Please remember to arrive 10 minutes early to complete any necessary paperwork."

6. If not confirmed:  
   "I understand. Would you like to reschedule your appointment for another time?"
   • If yes, collect preferred dates/times and confirm they'll receive a follow-up.
   • If no, note the cancellation and inform of any cancellation policies.

7. Provide additional information  
   "Do you have any questions about your upcoming appointment?"

8. Close call  
   "Thank you for your time. We look forward to seeing you on ${values.appointmentDate}. Have a great day!"
      `.trim();
    }
  }
];

export default callTemplates; 