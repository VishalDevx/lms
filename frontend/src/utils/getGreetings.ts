// utils/getGreeting.ts
export const getGreeting = () => {
  const now = new Date();

  // Force India Standard Time (IST)
  const hour = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: false,
    timeZone: "Asia/Kolkata",
  }).format(now);

  const hr = parseInt(hour, 10);

  if (hr >= 5 && hr < 12) {
    return "Good Morning";
  } else if (hr >= 12 && hr < 17) {
    return "Good Afternoon";
  } else if (hr >= 17 && hr < 21) {
    return "Good Evening";
  } else {
    return "Good Night";
  }
};
