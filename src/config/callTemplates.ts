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
    id: 'default',
    name: 'Default Flow',
    description: 'Standard conversation flow with basic greeting and assistance',
    fields: [],
    generateFlow: () => {
      return `
1. Greet, identify & confirm customer  
   "Hello! This is Sakshi from Voice AI"  

2. Introduce purpose  
   "I'm calling on behalf of Voice AI to assist you. How may I help you today?"

3. Handle questions appropriately  
   • Answer general inquiries about Voice AI technology and services.
   • Take note of specific requests or concerns.
   • Respond with relevant information based on the query.

4. Provide information or solutions  
   "Based on what you've shared, [provide appropriate information or solution]."

5. Check for additional questions  
   "Is there anything else I can help you with today?"

6. Close call politely  
   "Thank you for your time. Have a wonderful day!"
      `.trim();
    }
  },
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
    generateFlow: (values) => { 
      return `The customer's name is ${values.name}; use it when greeting. 
      Follow this expected conversation flow strictly: \n\n${values.expectedFlow}.\n\n`
    }
  },
  {
    id: 'loan-reminder',
    name: 'Loan Payment Reminder',
    description: 'Reminder for overdue loan payments',
    fields: [
      {
        name: 'aiName',
        label: 'AI Name',
        type: 'text',
        placeholder: 'Enter AI assistant name',
        maxLength: 20,
        required: true
      },
      {
        name: 'bankName',
        label: 'Bank Name',
        type: 'text',
        placeholder: 'Enter bank name',
        maxLength: 30,
        required: true
      },
      {
        name: 'customerName',
        label: 'Customer Name',
        type: 'text',
        placeholder: 'Enter customer name',
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
1. Greet, identify & confirm customer  
   "Hello! This is ${values.aiName} calling from ${values.bankName}. Am I speaking with ${values.customerName}?"  
   → If confirmed: "Thank you!"  
   → If not available: "No problem, I'll try again later. Have a great day!" [End call]

2. State purpose with overdue details  
   "I'm calling regarding your loan account. Our records show an overdue balance of ₹${values.overdueAmount}, pending for ${values.overdueDays} days."

3. Explain consequence & request date  
   "To avoid additional fees or credit impact, we'd like to set a payment date today."  
   "On which date do you plan to make this payment?"

4. Capture & confirm date  
   • Parse the spoken date to YYYY-MM-DD format.  
   • Repeat for confirmation:  
     "Just to confirm, you intend to pay on [Parsed-Date], correct?"  
   • If unclear or too far out, ask again or negotiate a nearer date.

5. Summarize arrangement  
   "Great. You'll pay ₹${values.overdueAmount} on [Confirmed-Date].  
   We'll send a reminder SMS 24 hours before the due date."

6. Offer assistance  
   "Do you have any questions, or is there anything else I can help you with today?"

7. Close politely  
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
        name: 'aiName',
        label: 'AI Name',
        type: 'text',
        placeholder: 'Enter AI assistant name',
        maxLength: 20,
        required: true
      },
      {
        name: 'businessName',
        label: 'Business Name',
        type: 'text',
        placeholder: 'Enter business name',
        maxLength: 30,
        required: true
      },
      {
        name: 'customerName',
        label: 'Customer Name',
        type: 'text',
        placeholder: 'Enter customer name',
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
1. Greet, identify & confirm customer  
   "Hello! This is ${values.aiName} calling from ${values.businessName}. Am I speaking with ${values.customerName}?"  
   → If confirmed: "Thank you!"  
   → If not available: "No problem, I'll try again later. Have a great day!" [End call]

2. State purpose with appointment details  
   "I'm calling regarding your upcoming ${values.appointmentType} appointment scheduled for ${values.appointmentDate} at ${values.appointmentTime}."

3. Request attendance confirmation  
   "I'd like to confirm that you'll be able to attend this appointment. Will you be able to make it?"

4. Handle response appropriately  
   • If confirmed: "Excellent! We look forward to seeing you then. Please remember to arrive 10 minutes early to complete any necessary paperwork."
   • If not confirmed: "I understand. Would you like to reschedule your appointment for another time?"
     → If yes: "I'll make a note of that. Someone from our office will call you back shortly to arrange a new time."
     → If no: "I'll mark this as a cancellation. Please note [mention any cancellation policies if applicable]."

5. Provide additional information  
   "Do you have any questions about your upcoming appointment or any special requirements we should be aware of?"

6. Summarize and confirm  
   "To summarize, your ${values.appointmentType} appointment is [confirmed/being rescheduled/cancelled] for ${values.appointmentDate} at ${values.appointmentTime}."

7. Provide additional information  
   "Do you have any questions about your upcoming appointment?"

8. Close call  
   "Thank you for your time. We look forward to seeing you on ${values.appointmentDate}. Have a great day!"
      `.trim();
    }
  }
];

export default callTemplates; 