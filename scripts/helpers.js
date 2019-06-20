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

const success = (res, msg) => res.json({ type: "success", msg });
const fail = (res, msg) => res.json({ type: "fail", msg });

module.exports = {
  isObject,
  deepAssign,
  success,
  fail,
};
