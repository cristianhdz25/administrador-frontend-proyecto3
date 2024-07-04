const keepPreset = require("keep-react/preset");

const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/keep-react/**/*.{js,jsx,ts,tsx}"
  ],
  container: {
    padding: '2rem',
  },
  presets: [keepPreset],
};

module.exports = config;
