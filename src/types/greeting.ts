export interface Wish {
  emoji: string;
  text: string;
}

export interface GreetingConfig {
  name: string;
  language: string;
  greetingText: string;
  greetingIcon: string;
  message: string;
  wishes: Wish[];
  signature: string;
}
