import { Suspense } from 'react';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { getGreeting } from '../utils/greetings';
import { GreetingConfig } from '../types/greeting';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

function BirthdayMessage({ config }: { config: GreetingConfig }) {
  const directionClass = config.language === 'ar' ? 'rtl' : 'ltr';

  return (
    <div className={`animate-fade-in space-y-6 text-center ${directionClass} max-w-4xl mx-auto`}>
      <div className="space-y-4">
        <div className="text-6xl md:text-7xl lg:text-8xl">
          {config.greetingIcon}
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold birthday-gradient break-words px-4">
          {config.greetingText}
        </h1>
      </div>
      <div className="animate-float">
        <p className="text-xl md:text-2xl text-gray-700 mb-6">
          {config.message}
        </p>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-4 md:gap-8 flex-wrap">
            {config.wishes.map((wish, index) => (
              <div
                key={index}
                className="aqua-card p-6 transform hover:scale-105 transition-transform duration-300 w-full md:w-1/4 min-w-[250px]"
              >
                <span className="text-3xl">{wish.emoji}</span>
                <p className="text-gray-700 mt-2 break-words">{wish.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-xl md:text-2xl text-gray-700 whitespace-pre-line">
            {config.signature}
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  
  // Limit URL parameter lengths to 20 chars
  const MAX_NAME_LENGTH = 20;
  const MAX_SIGNATURE_LENGTH = 20;
  
  const recipientId = typeof params.to === 'string'
    ? params.to.slice(0, MAX_NAME_LENGTH)
    : undefined;
    
  const language = typeof params.lang === 'string'
    ? params.lang as 'en' | 'de' | 'ru'
    : undefined;
    
  const validStyles = ['formal', 'informal', 'parent.mama', 'parent.papa', 'intimate'] as const;
  const formality = typeof params.style === 'string' && validStyles.includes(params.style as typeof validStyles[number])
    ? params.style as typeof validStyles[number]
    : 'informal';
  
  const signatureName = typeof params.signatureName === 'string'
    ? params.signatureName.slice(0, MAX_SIGNATURE_LENGTH)
    : undefined;
  const { greeting } = await getGreeting(recipientId, { language, formality, signatureName });

  return (
    <div className="container mx-auto px-4 pt-16 min-h-screen flex flex-col">
      <Suspense fallback={<div>Loading...</div>}>
        <BirthdayMessage config={greeting} />
      </Suspense>
      <div className="flex-grow">
        <div className="text-center mt-12">
          <a
            href="/generate"
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            Create your own greeting →
          </a>
        </div>
      </div>
      <footer className="text-center py-6 mt-auto border-t border-gray-200/20">
        <a
          href="https://github.com/HugeFrog24/birthdaygreeting-next"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors"
        >
          Birthday Greeting Generator
          <ArrowTopRightOnSquareIcon className="h-4 w-4" />
        </a>
      </footer>
    </div>
  );
}
