import Timer from "./Timer";

const TimerList = ({ timers, deleteTimer }) => {
  const totalSeconds = (timer) => {
    let hrSec = (timer?.hours * 3600) | 0;
    let mmSec = (timer.minutes * 60) | 0;
    let sec = timer?.seconds | 0;
    return hrSec + mmSec + sec;
  };

  return (
    <div>
      {timers.map((timer, index) => (
        <Timer
          uuid={timer.uuid}
          key={timer.uuid}
          index={index}
          time={totalSeconds(timer)}
          deleteTimer={deleteTimer}
          name={timer.name}
        />
      ))}
    </div>
  );
};

export default TimerList;
