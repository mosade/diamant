export interface AIBasisConfig {
  url: string;
  apiKey: string;
  model: string | string[];
  name:string;
}
export const message_trigger_generate_web_content='generate_web_content'

export const message_trigger_get_document='get_document'

export enum AICategory {
  DeepSeek = 'DeepSeek',
  OpenAI = 'OpenAI',
}

export interface Message{
  character:'ai'|'human'|'placeholder'|'system'|'user';
  content:string;
}
