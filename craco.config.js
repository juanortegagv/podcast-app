const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@context": path.resolve(__dirname, "src/context/"),
      "@hooks": path.resolve(__dirname, "src/hooks/"),
      "@actions": path.resolve(__dirname, "src/actions/"),
      "@service": path.resolve(__dirname, "src/service/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
    },
  },
};
