import { GreetingConfig } from "../types/greeting";
import {
  generateGreeting,
  defaultNames,
  Language,
  Formality,
} from "./greetingGenerator";

interface GreetingOptions {
  language?: Language;
  formality?: Formality;
  signatureName?: string;
}
export async function getGreeting(
  name: string | undefined,
  options: GreetingOptions = {},
): Promise<{ greeting: GreetingConfig; isGeneric: boolean }> {
  const language = options.language || "en";
  const formality = options.formality || "informal";

  // Always use default name if none provided or empty
  const recipientName =
    typeof name !== "string" || !name.trim()
      ? defaultNames[language][formality]
      : name.trim();

  // Generate greeting with validated parameters
  const greeting = generateGreeting(
    recipientName,
    language,
    formality,
    options.signatureName,
  );

  return {
    greeting,
    isGeneric: typeof name !== "string" || !name.trim(),
  };
}
