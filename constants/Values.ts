import dedent from "dedent";

export const DEPENDENCIES = {
  uuid4: "^2.0.3",
  "tailwind-merge": "^2.4.0",
  "lucide-react": "latest",
  "react-router-dom": "latest",
  firebase: "^11.1.0",
  "@google/generative-ai": "^0.21.0",
  tailwindcss: "^3.3.0",
  postcss: "^8.4.0",
  autoprefixer: "^10.4.0",
};

export const DEFAULT_FILES = {
  "/src/index.html": {
    code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sandpack Tailwind</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-gray-100 text-gray-800">
    <div id="root"></div>
    <!-- React app mounts here -->
    <script type="module" src="/src/App.js"></script>
  </body>
</html>

    `,
  },
  "/src/input.css": {
    code: `@tailwind base;
@tailwind components;
@tailwind utilities;
    `,
  },
  "/src/styles.css": {
    code: `@tailwind base;
@tailwind components;
@tailwind utilities;
`,
  },
  "/src/tailwind.config.js": {
    code: `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

    `,
  },
  "/src/postcss.config.js": {
    code: `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
    `,
  },
  "/src/App.css": {
    code: `/* Add any custom styles here */`,
  },
  "/src/App.js": {
    code: `import React from 'react';
import './src/input.css';

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold text-blue-600">Hello, World!</h1>
      <p className="mt-4 text-lg">This is demo.</p>
    </div>
  );
};

export default App;
`,
  },
};
