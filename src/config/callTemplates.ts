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
  },
  {
    id: 'aditya-education-english',
    name: 'Aditya Education Group (MCA/MBA) English',
    description: 'English conversation flow for MCA/MBA admission inquiry with student/parent',
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
        name: 'instituteName',
        label: 'Institute Name',
        type: 'text',
        placeholder: 'Aditya Education Group, Beed',
        maxLength: 50,
        required: true
      },
      {
        name: 'studentName',
        label: 'Student Name',
        type: 'text',
        placeholder: 'Enter student name',
        maxLength: 20,
        required: true
      }
    ],
    generateFlow: (values) => {
      return [
        `
Keep the conversation dynamic and engaging. Make sure you ask according to who is speaking to you. dont hurry to end the call explain about you offerings.
1. Greeting & Identification of student / parent of student
   "Hello, is this ${values.studentName}?"
   (If parent answers: "Yes, I am the parent of ${values.studentName}.")
   (If parent: Ask for the student or their number, or provide info if interested.)

2. Self Introduction
   "This is ${values.aiName} from ${values.instituteName}. May I speak with you for 2 minutes?"
   (If no: Ask for a better time to call back. If yes, continue.)

3. Graduation Status
   "${values.studentName}, have you completed your graduation?"
   (If not: "Are you currently in the final year of your degree?")
   (If not interested: "We also offer other courses at our institute. If interested, please contact us.")

4. Graduation Marks
   (If graduation complete or in final year)
   "Can you tell me your graduation percentage?"
   (Student: "Sir, I scored ... percent.")

5. Eligibility & CET Info
   "Congratulations! You are eligible for MBA/MCA admission. (50% for Open, 45% for Caste & EWS categories). You are also required to appear for the C E T exam. C E T form filling is currently open."

6. Institute & Scholarship Info
   • Provide information about the institute.
   • For S C category, explain the Swadhar Yojana scholarship.
   • For OPEN category, explain the Punjabrao Deshmukh Hostel Scheme.

7. M B A Specialisations
   "M B A Specialisations Available: Human Resource, Marketing, Finance, Business Analytics, Agri-Business, International Business Environment, Production."

8. C E T Form Deadline
   "The last date to fill the M B A and M C A, C E T form is 25-01-2025."
        `.trim()
      ].join('\n\n');
    }
  },
  {
    id: 'municipal-tax-reminder',
    name: 'Municipal Corporation Property Tax Reminder',
    description: 'Property tax payment reminder for municipal corporations',
    fields: [
      {
        name: 'targetPersonName',
        label: 'Target Person Name',
        type: 'text',
        placeholder: 'Enter taxpayer name',
        maxLength: 50,
        required: true
      },
      {
        name: 'municipalityName',
        label: 'Municipality Name',
        type: 'text',
        placeholder: 'Enter municipality name',
        maxLength: 100,
        required: true
      },
      {
        name: 'dueAmount',
        label: 'Due Amount',
        type: 'number',
        placeholder: 'Enter amount (e.g. 15000)',
        required: true
      },
      {
        name: 'dueDate',
        label: 'Due Date',
        type: 'date',
        placeholder: 'YYYY-MM-DD',
        required: true
      },
      {
        name: 'websiteUrl',
        label: 'Municipality Website',
        type: 'text',
        placeholder: 'www.malegaoncorporation.org',
        maxLength: 100,
        required: true
      },
      {
        name: 'helpdeskNumber',
        label: 'Helpdesk Number',
        type: 'text',
        placeholder: 'Enter helpdesk phone number',
        maxLength: 20,
        required: true
      }
    ],
    generateFlow: (values) => {
      return `
1. Introductory Message
   "Hello! This call is from ${values.municipalityName}. We are calling to bring to the attention of ${values.targetPersonName}. Your property tax of ₹${values.dueAmount} is still pending. Please pay this tax as soon as possible to avoid penalties. If you have already paid, please ignore this call."

2. Handle Common Questions (FAQ)
   Be prepared to answer these frequently asked questions:
   
   Q: "How can I check my property tax?"
   A: "You can view your property tax information on our website ${values.websiteUrl}. You will need your Property ID or information from your old receipt for this."
   
   Q: "What is the due date?"
   A: "Please pay the tax before ${values.dueDate}. Late payment may result in penalties or interest charges."
   
   Q: "Where and how can I make the payment?"
   A: "You can pay the tax online using UPI, Net Banking, or Card. Alternatively, you can visit the nearest Tax Collection Center and pay in person."
   
   Q: "I have already paid. Why did I receive this call?"
   A: "Sometimes the system updates are delayed. Please verify your payment receipt on the website or contact our office."
   
   Q: "I don't remember my Property ID."
   A: "Please visit the nearest ward office with your old receipt, and they will help you retrieve your Property ID."

3. Payment Options & Instructions
   "For your convenience, you have multiple payment options:
   • Online payment through ${values.websiteUrl} using UPI, Net Banking, or Card
   • Visit any authorized Tax Collection Center
   • Pay at the municipal corporation office during working hours"

4. Provide Additional Support
   "If you need any assistance with the payment process or have questions about your property tax calculation, please don't hesitate to ask. Our helpdesk is also available at ${values.helpdeskNumber}."

5. Closing Message
   "Once again, we humbly request — please pay the ₹${values.dueAmount} property tax as soon as possible to avoid penalties. For more information, visit: ${values.websiteUrl} or call: ${values.helpdeskNumber}. Thank you! ${values.municipalityName}."

6. Handle Follow-up Questions
   If the taxpayer has additional questions or concerns, provide helpful information and direct them to appropriate resources. Always maintain a respectful and helpful tone throughout the conversation.
      `.trim();
    }
  }
];

export default callTemplates; 