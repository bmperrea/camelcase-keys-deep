var camelcase = require("camelcase");

module.exports = function camelcaseKeysDeep(obj) {
  // Any falsy, which includes `null` whose typeof is `object`.
  if (!obj) {
    return obj;
  }
  // Date, whose typeof is `object` too.
  if (obj instanceof Date) {
    return obj;
  }
  // Array, whose typeof is `object` too.
  if (Array.isArray(obj)) {
    return obj.map(function(element) {
      return camelcaseKeysDeep(element);
    });
  }
  // So, if this is still an `object`, we might be interested in it.
  if (typeof obj === "object") {
    return Object.keys(obj).reduce( function(newObj, key) {
      var newKey = camelcase(key);
      if (key !== newKey && newKey in obj) {
        throw new Error("Camelcased key `" + newKey + "` would overwrite existing key of the given JSON object");
      }
      newObj[newKey] = camelcaseKeysDeep(obj[key]);
      return newObj
    }, {});
  }
  // Something else like a String or Number.
  return obj;
}
