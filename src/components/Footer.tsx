import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export function Footer() {
  return (
    <footer className="text-center py-6 border-t border-gray-200/20">
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
  );
}
