"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ClipboardDocumentIcon,
  ShareIcon,
  ArrowLeftIcon,
  ArrowDownTrayIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { Language, Formality } from "../../utils/greetingGenerator";
import html2canvas from "html2canvas";

interface FormData {
  name: string;
  language: Language;
  style: Formality;
  signatureName?: string;
}

export default function GeneratePage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    language: "en",
    style: "informal",
  });
  const [generatedUrl, setGeneratedUrl] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (formData.name) params.append("to", formData.name);
    params.append("lang", formData.language);
    params.append("style", formData.style);
    if (formData.signatureName)
      params.append("signatureName", formData.signatureName);

    const url = `${window.location.origin}/?${params.toString()}`;
    setGeneratedUrl(url);
  };

  const captureAndDownload = async () => {
    if (generatedUrl) {
      try {
        // Create a hidden iframe to load the page
        const iframe = document.createElement("iframe");
        iframe.style.position = "fixed";
        iframe.style.left = "-9999px";
        iframe.style.top = "-9999px";
        document.body.appendChild(iframe);

        // Load the page with capture mode in the URL
        const captureUrl = `${generatedUrl}${generatedUrl.includes("?") ? "&" : "?"}forCapture=true`;
        iframe.src = captureUrl;

        // Wait for the iframe to load
        await new Promise((resolve) => {
          iframe.onload = resolve;
        });

        // Wait a bit for styles to settle
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Find the main content container
        const contentElement = iframe.contentDocument!.querySelector(
          '[data-capture-mode="true"]',
        );
        if (!contentElement) throw new Error("Content element not found");

        const canvas = await html2canvas(contentElement as HTMLElement, {
          useCORS: true,
          scale: 2, // Higher quality
          logging: false,
          backgroundColor: null, // Let the gradient show through
          allowTaint: true,
          width: 1600,
          height: 900,
          onclone: (clonedDoc) => {
            const element = clonedDoc.querySelector(
              "[data-capture-mode]",
            ) as HTMLElement;
            if (element) {
              element.style.width = "1600px";
              element.style.height = "900px";
              element.style.position = "fixed";
              element.style.top = "0";
              element.style.left = "0";
              element.style.transform = "none";
              element.style.overflow = "hidden";
            }
          },
        });

        // Create and trigger download
        const image = canvas.toDataURL("image/png", 1.0);
        const link = document.createElement("a");
        link.download = "birthday-greeting.png";
        link.href = image;
        link.click();

        // Clean up
        document.body.removeChild(iframe);
      } catch {
        console.error("Error capturing screenshot");
      }
    }
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
      <h1 className="text-3xl font-bold mb-8 text-center">
        Birthday Greeting Generator
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Recipient&apos;s Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
            placeholder="Enter name (optional)"
          />
        </div>

        <div>
          <label
            htmlFor="language"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Language
          </label>
          <select
            id="language"
            value={formData.language}
            onChange={(e) =>
              setFormData({
                ...formData,
                language: e.target.value as FormData["language"],
              })
            }
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          >
            <option value="en">English</option>
            <option value="de">German</option>
            <option value="ru">Russian</option>
            <option value="ka">Georgian</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="style"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Style
          </label>
          <select
            id="style"
            value={formData.style}
            onChange={(e) =>
              setFormData({
                ...formData,
                style: e.target.value as FormData["style"],
              })
            }
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          >
            <option value="informal">Informal</option>
            <option value="formal">Formal</option>
            <option value="parent.mama">To Mother</option>
            <option value="parent.papa">To Father</option>
            <option value="intimate">Intimate</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="signatureName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Signature Name (optional)
          </label>
          <input
            type="text"
            id="signatureName"
            value={formData.signatureName || ""}
            onChange={(e) =>
              setFormData({ ...formData, signatureName: e.target.value })
            }
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
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

      <div
        className={`mt-8 transition-all duration-500 ease-in-out transform origin-top ${
          generatedUrl
            ? "opacity-100 scale-y-100 h-auto"
            : "opacity-0 scale-y-0 h-0 overflow-hidden"
        }`}
      >
        <div className="p-4 aqua-card">
          <h2 className="text-lg font-medium text-gray-900 mb-2">
            Generated URL:
          </h2>
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              readOnly
              value={generatedUrl}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none text-gray-900"
            />
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={() =>
                window.open(generatedUrl, "_blank", "noopener,noreferrer")
              }
              className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              title="Open greeting in new tab"
            >
              <ArrowTopRightOnSquareIcon className="h-5 w-5" />
              <span className="text-sm">Open in New Tab</span>
            </button>
          </div>

          <div className="mt-6">
            <div className="mb-3">
              <span className="text-sm font-medium text-gray-700">
                Share your greeting:
              </span>
            </div>

            <div className="space-y-3">
              {/* URL Section */}
              <div className="flex items-center justify-between p-3 rounded border-2 border-gray-400">
                <div>
                  <span className="block text-sm font-medium text-gray-700">
                    Share URL
                  </span>
                  <span className="text-sm text-gray-500 break-all">
                    {generatedUrl}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(generatedUrl)}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                    title="Copy URL"
                  >
                    <ClipboardDocumentIcon className="h-5 w-5" />
                    <span className="text-sm">Copy</span>
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        await navigator.share({
                          url: generatedUrl,
                          title: "Birthday Greeting",
                          text: "Check out this birthday greeting!",
                        });
                      } catch {
                        window.open(generatedUrl, "_blank");
                      }
                    }}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                    title="Share URL"
                  >
                    <ShareIcon className="h-5 w-5" />
                    <span className="text-sm">Share</span>
                  </button>
                </div>
              </div>

              {/* Image Sharing Option */}
              <div className="flex items-center justify-between p-3 rounded border-2 border-gray-400">
                <div>
                  <span className="block text-sm font-medium text-gray-700">
                    Share as Image
                  </span>
                  <span className="text-sm text-gray-500">
                    Download the greeting as a picture
                  </span>
                </div>
                <button
                  type="button"
                  onClick={captureAndDownload}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                  title="Download as Image"
                >
                  <ArrowDownTrayIcon className="h-5 w-5" />
                  <span className="text-sm">Download Image</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
