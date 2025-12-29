
export interface RecognitionResult {
  text: string;
  confidence: number;
}

export interface TranslationHistory {
  id: string;
  source: string;
  translated: string;
  timestamp: Date;
  type: 'sign-to-text' | 'text-to-sign';
}

export interface LearningModule {
  id: string;
  title: string;
  category: 'Alphabets' | 'Greetings' | 'Emergency' | 'Numbers';
  progress: number;
  totalSigns: number;
  image: string;
}

export enum AppRoute {
  DASHBOARD = 'dashboard',
  RECOGNITION = 'recognition',
  TRANSLATION = 'translation',
  LEARNING = 'learning',
  SETTINGS = 'settings'
}
