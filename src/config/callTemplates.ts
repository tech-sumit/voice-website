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
IMPORTANT: Always speak numbers, amounts, dates, and percentages in WORDS, not digits. For example:
- Say "five thousand rupees" instead of "5000 rupees"
- Say "fifteen percent" instead of "15%"
- Say "twenty-fifth January" instead of "25th January"

1. Greet, identify & confirm customer  
   "Hello! This is the AI assistant from Voice AI. May I know your name please?"
   → Wait for response and use their name throughout the conversation

2. Introduce purpose  
   "Thank you [Customer Name]. I'm calling on behalf of Voice AI to assist you. How may I help you today?"

3. Handle questions appropriately  
   • Answer general inquiries about Voice AI technology and services.
   • Take note of specific requests or concerns.
   • Respond with relevant information based on the query.
   • Always use the customer's name when addressing them.
   • Speak all numbers and amounts in words for voice clarity.

4. Provide information or solutions  
   "Based on what you've shared [Customer Name], [provide appropriate information or solution]."

5. Check for additional questions  
   "Is there anything else I can help you with today, [Customer Name]?"

6. Close call politely  
   "Thank you for your time, [Customer Name]. Have a wonderful day!"
      `.trim();
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
      // Convert number to words for better voice clarity
      const convertToWords = (num: string) => {
        const amount = parseInt(num);
        if (amount < 1000) return num;
        if (amount < 100000) return `${Math.floor(amount/1000)} thousand ${amount%1000 ? (amount%1000) : ''}`.trim();
        if (amount < 10000000) return `${Math.floor(amount/100000)} lakh ${amount%100000 ? Math.floor((amount%100000)/1000) + ' thousand' : ''}`.trim();
        return amount.toLocaleString('en-IN');
      };

      const amountInWords = convertToWords(values.overdueAmount);
      
      return `
IMPORTANT: Always speak ALL numbers, amounts, dates, and time periods in WORDS, not digits. Examples:
- Say "rupees fifteen thousand" instead of "rupees 15000"
- Say "thirty days" instead of "30 days"
- Say "twenty-fifth December" instead of "25th December"

1. Greet, identify & confirm customer  
   "Hello! This is ${values.aiName} calling from ${values.bankName}. Am I speaking with ${values.customerName}?"  
   → If confirmed: "Thank you, ${values.customerName}!"  
   → If not available: "No problem, I'll try again later. Have a great day!" [End call]
   → If wrong person: "I apologize, may I know your name please?" [Get correct name and use throughout]

2. State purpose with overdue details  
   "I'm calling regarding your loan account, ${values.customerName}. Our records show an overdue balance of rupees ${amountInWords}, pending for ${values.overdueDays} days."

3. Explain consequence & request date  
   "To avoid additional fees or credit impact, we'd like to set a payment date today, ${values.customerName}."  
   "On which date do you plan to make this payment?"

4. Capture & confirm date  
   • Parse the spoken date to YYYY-MM-DD format.  
   • Repeat for confirmation:  
     "Just to confirm, ${values.customerName}, you intend to pay on [Parsed-Date], correct?"  
   • If unclear or too far out, ask again or negotiate a nearer date.

5. Summarize arrangement  
   "Great, ${values.customerName}. You'll pay rupees ${amountInWords} on [Confirmed-Date].  
   We'll send a reminder SMS 24 hours before the due date."

6. Offer assistance  
   "Do you have any questions, ${values.customerName}, or is there anything else I can help you with today?"

7. Close politely  
   "Thank you for your cooperation, ${values.customerName}. [end the call]."

Important: Always use the customer's name throughout the conversation and speak amounts in words for clarity.
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
IMPORTANT: Always speak ALL numbers, dates, times, and quantities in WORDS, not digits. Examples:
- Say "two thirty PM" instead of "2:30 PM"
- Say "twenty-fifth January" instead of "25th January"
- Say "ten minutes early" instead of "10 minutes early"

1. Greet, identify & confirm customer  
   "Hello! This is ${values.aiName} calling from ${values.businessName}. Am I speaking with ${values.customerName}?"  
   → If confirmed: "Thank you, ${values.customerName}!"  
   → If not available: "No problem, I'll try again later. Have a great day!" [End call]
   → If wrong person: "I apologize, may I know your name please?" [Get correct name and use throughout]

2. State purpose with appointment details  
   "I'm calling regarding your upcoming ${values.appointmentType} appointment, ${values.customerName}. It's scheduled for ${values.appointmentDate} at ${values.appointmentTime}."

3. Request attendance confirmation  
   "I'd like to confirm that you'll be able to attend this appointment, ${values.customerName}. Will you be able to make it?"

4. Handle response appropriately  
   • If confirmed: "Excellent, ${values.customerName}! We look forward to seeing you then. Please remember to arrive 10 minutes early to complete any necessary paperwork."
   • If not confirmed: "I understand, ${values.customerName}. Would you like to reschedule your appointment for another time?"
     → If yes: "I'll make a note of that, ${values.customerName}. Someone from our office will call you back shortly to arrange a new time."
     → If no: "I'll mark this as a cancellation, ${values.customerName}. Please note [mention any cancellation policies if applicable]."

5. Provide additional information  
   "Do you have any questions about your upcoming appointment, ${values.customerName}, or any special requirements we should be aware of?"

6. Summarize and confirm  
   "To summarize, ${values.customerName}, your ${values.appointmentType} appointment is [confirmed/being rescheduled/cancelled] for ${values.appointmentDate} at ${values.appointmentTime}."

7. Close call  
   "Thank you for your time, ${values.customerName}. We look forward to seeing you on ${values.appointmentDate}. Have a great day!"

Important: Always use the customer's name throughout the conversation for a personal touch.
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
      return `
IMPORTANT: Always speak ALL numbers, percentages, dates, and years in WORDS, not digits. Examples:
- Say "fifty percent" instead of "50%"
- Say "forty-five percent" instead of "45%"
- Say "twenty-fifth January two thousand twenty-five" instead of "25-01-2025"
- Say "two minutes" instead of "2 minutes"

Keep the conversation dynamic and engaging. Make sure you ask according to who is speaking to you. Don't hurry to end the call - explain about your offerings. Always use the person's name throughout the conversation.

1. Greeting & Identification of student / parent of student
   "Hello, is this ${values.studentName}?"
   → If student answers: "Great! Thank you, ${values.studentName}."
   → If parent answers: "Hello, I understand you are the parent of ${values.studentName}. May I know your name please?" [Get parent's name and use it throughout]
   → If parent: Ask for the student or their number, or provide info if interested.

2. Self Introduction
   "This is ${values.aiName} from ${values.instituteName}. [Name], may I speak with you for 2 minutes about educational opportunities?"
   → If no: "I understand, [Name]. When would be a better time to call back?"
   → If yes, continue using their name throughout.

3. Graduation Status
   "[Name], has ${values.studentName} completed graduation?"
   → If not: "Is ${values.studentName} currently in the final year of degree?"
   → If not interested: "We also offer other courses at our institute, [Name]. If interested, please contact us."

4. Graduation Marks
   (If graduation complete or in final year)
   "[Name], can you tell me ${values.studentName}'s graduation percentage?"
   → Student: "I scored ... percent."
   → Parent: "My child scored ... percent."

5. Eligibility & CET Info
   "Congratulations, [Name]! ${values.studentName} is eligible for MBA/MCA admission. We require fifty percent for Open category and forty-five percent for Caste and E W S categories. ${values.studentName} is also required to appear for the C E T exam. C E T form filling is currently open."

6. Institute & Scholarship Info
   • Provide information about the institute to [Name].
   • For S C category, explain the Swadhar Yojana scholarship.
   • For OPEN category, explain the Punjabrao Deshmukh Hostel Scheme.

7. M B A Specialisations
   "[Name], our M B A Specialisations Available are: Human Resource, Marketing, Finance, Business Analytics, Agri-Business, International Business Environment, and Production."

8. C E T Form Deadline
   "[Name], the last date to fill the M B A and M C A C E T form is twenty-fifth January two thousand twenty-five."

Important: Always address the person by their name throughout the conversation and speak all dates and numbers in words for clarity.
      `.trim();
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
      // Convert number to words for better voice clarity
      const convertToWords = (num: string) => {
        const amount = parseInt(num);
        if (amount < 1000) return num;
        if (amount < 100000) return `${Math.floor(amount/1000)} thousand ${amount%1000 ? (amount%1000) : ''}`.trim();
        if (amount < 10000000) return `${Math.floor(amount/100000)} lakh ${amount%100000 ? Math.floor((amount%100000)/1000) + ' thousand' : ''}`.trim();
        return amount.toLocaleString('en-IN');
      };

      const amountInWords = convertToWords(values.dueAmount);

      return `
IMPORTANT: Always speak ALL numbers, amounts, dates, and phone numbers in WORDS, not digits. Examples:
- Say "rupees fifteen thousand" instead of "rupees 15000"
- Say "twenty-fifth January" instead of "25th January"
- Say "twenty-four hours" instead of "24 hours"
- Say phone numbers digit by digit: "nine eight seven six five four three two one zero"

1. Introductory Message & Name Confirmation
   "Hello! This call is from ${values.municipalityName}. Am I speaking with ${values.targetPersonName}?"
   → If confirmed: "Thank you, ${values.targetPersonName}!"
   → If wrong person: "May I know your name please?" [Get correct name and use throughout]
   
   "We are calling to bring to your attention, ${values.targetPersonName}. Your property tax of rupees ${amountInWords} is still pending. Please pay this tax as soon as possible to avoid penalties. If you have already paid, please ignore this call."

2. Handle Common Questions (FAQ)
   Be prepared to answer these frequently asked questions while using the person's name:
   
   Q: "How can I check my property tax?"
   A: "${values.targetPersonName}, you can view your property tax information on our website ${values.websiteUrl}. You will need your Property ID or information from your old receipt for this."
   
   Q: "What is the due date?"
   A: "${values.targetPersonName}, please pay the tax before ${values.dueDate}. Late payment may result in penalties or interest charges."
   
   Q: "Where and how can I make the payment?"
   A: "${values.targetPersonName}, you can pay the tax online using UPI, Net Banking, or Card. Alternatively, you can visit the nearest Tax Collection Center and pay in person."
   
   Q: "I have already paid. Why did I receive this call?"
   A: "Sometimes the system updates are delayed, ${values.targetPersonName}. Please verify your payment receipt on the website or contact our office."
   
   Q: "I don't remember my Property ID."
   A: "${values.targetPersonName}, please visit the nearest ward office with your old receipt, and they will help you retrieve your Property ID."

3. Payment Options & Instructions
   "${values.targetPersonName}, for your convenience, you have multiple payment options:
   • Online payment through ${values.websiteUrl} using UPI, Net Banking, or Card
   • Visit any authorized Tax Collection Center
   • Pay at the municipal corporation office during working hours"

4. Provide Additional Support
   "${values.targetPersonName}, if you need any assistance with the payment process or have questions about your property tax calculation, please don't hesitate to ask. Our helpdesk is also available at ${values.helpdeskNumber}."

5. Closing Message
   "Once again, we humbly request, ${values.targetPersonName} — please pay the rupees ${amountInWords} property tax as soon as possible to avoid penalties. For more information, visit: ${values.websiteUrl} or call: ${values.helpdeskNumber}. Thank you, ${values.targetPersonName}! ${values.municipalityName}."

6. Handle Follow-up Questions
   If the taxpayer has additional questions or concerns, provide helpful information and direct them to appropriate resources. Always maintain a respectful and helpful tone throughout the conversation and continue using their name.

Important: Always confirm the person's name at the beginning and use it throughout the conversation. Speak all monetary amounts and dates in words for better voice clarity.
      `.trim();
    }
  }
];

export default callTemplates; 