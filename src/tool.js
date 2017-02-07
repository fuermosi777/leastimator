export function todayDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;
  return today;
}

export function uuid() {
  return new Date().valueOf();
}