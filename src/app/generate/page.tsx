'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ClipboardDocumentIcon, ShareIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Language, Formality } from '../../utils/greetingGenerator';

interface FormData {
  name: string;
  language: Language;
  style: Formality;
  signatureName?: string;
}

export default function GeneratePage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    language: 'en',
    style: 'informal'
  });
  const [generatedUrl, setGeneratedUrl] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (formData.name) params.append('to', formData.name);
    params.append('lang', formData.language);
    params.append('style', formData.style);
    if (formData.signatureName) params.append('signatureName', formData.signatureName);

    const url = `${window.location.origin}/?${params.toString()}`;
    setGeneratedUrl(url);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Go back
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-8 text-center">Birthday Greeting Generator</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Recipient&apos;s Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter name (optional)"
          />
        </div>

        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
            Language
          </label>
          <select
            id="language"
            value={formData.language}
            onChange={(e) => setFormData({ ...formData, language: e.target.value as FormData['language'] })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="en">English</option>
            <option value="de">German</option>
            <option value="ru">Russian</option>
            <option value="ka">Georgian</option>
          </select>
        </div>

        <div>
          <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-1">
            Style
          </label>
          <select
            id="style"
            value={formData.style}
            onChange={(e) => setFormData({ ...formData, style: e.target.value as FormData['style'] })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="informal">Informal</option>
            <option value="formal">Formal</option>
            <option value="parent.mama">To Mother</option>
            <option value="parent.papa">To Father</option>
            <option value="intimate">Intimate</option>
          </select>
        </div>

        <div>
          <label htmlFor="signatureName" className="block text-sm font-medium text-gray-700 mb-1">
            Signature Name (optional)
          </label>
          <input
            type="text"
            id="signatureName"
            value={formData.signatureName || ''}
            onChange={(e) => setFormData({ ...formData, signatureName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="How to sign the greeting"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Generate Greeting URL
        </button>
      </form>

      <div className={`mt-8 transition-all duration-500 ease-in-out transform origin-top ${
        generatedUrl
          ? 'opacity-100 scale-y-100 h-auto'
          : 'opacity-0 scale-y-0 h-0 overflow-hidden'
      }`}>
        <div className="p-4 aqua-card">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Generated URL:</h2>
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              readOnly
              value={generatedUrl}
              className="flex-1 min-w-0 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(generatedUrl);
              }}
              className="p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              title="Copy to clipboard"
            >
              <ClipboardDocumentIcon className="w-5 h-5" />
            </button>
            <button
              onClick={async () => {
                try {
                  await navigator.share({
                    url: generatedUrl,
                    title: 'Birthday Greeting',
                    text: 'Check out this birthday greeting!'
                  });
                } catch (error) {
                  console.error('Error sharing:', error);
                }
              }}
              className="p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              title="Share"
            >
              <ShareIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-4">
            <a
              href={generatedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600"
            >
              Open greeting in new tab →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}