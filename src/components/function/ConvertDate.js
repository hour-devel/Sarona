//  // Function to parse the date and set UTC time
//  export const convertDate = (dateObj) => {
//      let day = parseInt(dateObj?.day || 1);
//      let month = parseInt(dateObj?.month || 1);
//      let year = parseInt(dateObj?.year || 1970);
//      const date = new Date(year, month - 1, day);
//      date.setUTCHours(13, 34, 51, 361);
//      return date;
//    };

export const convertDate = (examdDate, time) => {
  let day = parseInt(examdDate?.day || 1, 10);
  let month = parseInt(examdDate?.month || 1, 10) - 1;
  let year = parseInt(examdDate?.year || 1970, 10);

  const dates = new Date(year, month, day);

  if (isNaN(dates.getTime())) {
    console.error("Invalid date components", { year, month: month + 1, day });
    return null;
  }
  if (
    time &&
    time.hour !== undefined &&
    time.minute !== undefined &&
    time.second !== undefined
  ) {
    dates.setHours(
      parseInt(time.hour, 10),
      parseInt(time.minute, 10),
      parseInt(time.second, 10)
    );
    if (isNaN(dates.getTime())) {
      console.error("Invalid time components", time);
      return null; // or handle error appropriately
    }
  }
  return dates;
};
