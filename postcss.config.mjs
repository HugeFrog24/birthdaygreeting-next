/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {
      config: "./tailwind.css"
    },
  },
};

export default config;
