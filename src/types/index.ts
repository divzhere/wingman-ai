export interface Message {
  id: number;
  text: string;
  isBot: boolean;
  type?: 'suggestion' | 'profile-review' | 'pickup-line' | 'general';
  suggestions?: string[];
}

export interface AIPersona {
  id: string;
  name: string;
  style: 'playful' | 'romantic' | 'casual' | 'professional';
  description: string;
  icon: string;
}