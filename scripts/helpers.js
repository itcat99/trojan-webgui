const isObject = obj => Object.prototype.toString.call(obj).indexOf("Object") >= 0;

const deepAssign = (origin, target) => {
  const tempObj = Object.assign({}, origin);

  for (const key in target) {
    if (isObject(origin[key]) && target[key]) {
      tempObj[key] = deepAssign(origin[key], target[key]);
    } else {
      tempObj[key] = target[key];
    }
  }

  return tempObj;
};

module.exports = {
  isObject,
  deepAssign,
};
