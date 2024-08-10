export function validateFutureDate(dateValidate) {
  const examDate = new Date(dateValidate);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  if (examDate >= currentDate) {
    return true;
  } else {
    return false;
  }
}
