export function uuid() {
  return new Date().valueOf();
}

export function findMaxBy(array, key) {
  let maxItem = array[0];
  for (let item of array) {
    if (item[key] > maxItem[key]) {
      maxItem = item;
    }
  }
  return maxItem;
}