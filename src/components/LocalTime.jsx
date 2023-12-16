function LocalTime({ utcDate }) {
  // Get the user's browser language
  const userLanguage =
    window.navigator.language || window.navigator.userLanguage;

  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

  // Convert UTC date to local time with custom format and user's language
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: timeZone,
  };

  return `${utcDate.toLocaleString(userLanguage, options)} ${timeZone} time`;
}

export default LocalTime;
