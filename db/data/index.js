const ENV = process.env.NODE_ENV || "development";

const data = {
  test: require("./test"),
  development: require("./dev"),
  production: require("./dev"),
};

module.exports = data[ENV];
