const getdateAndTime = () => {
  const date = new Date();
  const today = date.toDateString();
  const time = date.toLocaleTimeString();
  return { date: today, time: time };
};

export default getdateAndTime;
