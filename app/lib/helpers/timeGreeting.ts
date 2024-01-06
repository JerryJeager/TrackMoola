export const getGreeting = () => {
  let currentTime = new Date();
  let greeting = "";
  currentTime.getHours() >= 0 && currentTime.getHours() < 12
    ? (greeting = "Good Morning,")
    : currentTime.getHours() >= 12 && currentTime.getHours() < 18
    ? (greeting = "Good Afternoon,")
    : (greeting = "Good Evening,");
  return greeting;
};
