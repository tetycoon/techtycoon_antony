// WhatsApp group links for each course
interface WhatsAppGroupLinks {
  [key: string]: string;
}

export const whatsappGroupLinks: WhatsAppGroupLinks = {
  'unlock-ai-secrets': 'https://chat.whatsapp.com/I2QevcMsyZjLuqGuQnqD4Q',
  'ai-linkedin-mastery': 'https://chat.whatsapp.com/FFVKlUkVCcu3lvVGkKoTrq',
  'business-automation-ai': 'https://chat.whatsapp.com/DzkbXM22Ngr5YV11d4gJgN',
  '10x-income-with-ai': 'https://chat.whatsapp.com/BZhx0NoHjHJI51Ixhby880',
  'make-movies-with-ai': 'https://chat.whatsapp.com/LbzrFP0Eosy4zhI2kfvzme',
  'digital-marketing-ai': 'https://chat.whatsapp.com/EDygoQ0RYNuK2KasiX1rrl',
  'business-growth-ai': 'https://chat.whatsapp.com/FHCo6KWR3TWLwL4szH6Dab',
  'generative-ai': 'https://chat.whatsapp.com/E9KN0NeLvwZCoxY5nAKs4v',
  'ms-excel-with-ai': 'https://chat.whatsapp.com/FXiEd2WoHXr7jae5JiPkiO',
  'trading-with-ai': 'https://chat.whatsapp.com/KtlCxA7h39lFwUMhCMO9H1',
  'powerbi': 'https://chat.whatsapp.com/CoM7UujxfSuILrJatHX3xw',
  'advanced-ppt-mastery': 'https://chat.whatsapp.com/CoM7UujxfSuILrJatHX3xw',
  'summer-special': 'https://chat.whatsapp.com/I2QevcMsyZjLuqGuQnqD4Q',
  'ai-tycoon': 'https://chat.whatsapp.com/I2QevcMsyZjLuqGuQnqD4Q'
};

// Function to get the WhatsApp group link for a course
export const getWhatsAppGroupLink = (courseId: string): string => {
  return whatsappGroupLinks[courseId] || 'https://chat.whatsapp.com/I2QevcMsyZjLuqGuQnqD4Q'; // Default link if not found
}; 