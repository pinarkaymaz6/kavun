const memory = [];

const startTimer = (id, cache = memory) => {
  cache[id] = process.hrtime();
};

const stopTimer = (id, cache = memory) => {
  const timeDiff = process.hrtime(cache[id]);
  return parseMiliseconds(timeDiff);
};

const parseMiliseconds = ([seconds, nanoseconds]) => {
  const secondsToMiliseconds = second => second * Math.pow(10, 3);
  const nanosecondsToMiliseconds = nanosecond => nanosecond * Math.pow(10, -6);

  return secondsToMiliseconds(seconds) + nanosecondsToMiliseconds(nanoseconds);
};

const totalExecutionTime = () => parseMiliseconds(process.hrtime());

module.exports = {
  startTimer,
  stopTimer,
  totalExecutionTime
};