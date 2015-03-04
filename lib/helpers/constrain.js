// Constrain a value to a set of options, or otherwise, choose the defaultValue
module.exports = function (value, options, defaultValue) {
  if (!!options && options.indexOf(value) >= 0) {
    return value;
  } else {
    return defaultValue;
  }
};
