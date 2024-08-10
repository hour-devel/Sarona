export function validateTime(startTime, endTime) {
  // Compare hours first
  if (endTime.hour > startTime.hour) {
    return true;
  } else if (endTime.hour === startTime.hour) {
    // If hours are the same, compare minutes
    if (endTime.minute > startTime.minute) {
      return true;
    } else if (endTime.minute === startTime.minute) {
      // If minutes are the same, compare seconds
      return endTime.second > startTime.second;
    }
  }
  return false;
}
