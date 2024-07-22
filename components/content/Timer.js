import React from "react";
import { View, Text} from "react-native";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
    isPlaying: true,
    size: 120,
    strokeWidth: 6
  };

const renderTime = (dimension, time) => {
return (
    <View className="time-wrapper">
        <Text className="time">{time}</Text>
        <Text>{dimension}</Text>
    </View>
);
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

const Timer = () => {
    // const { theme } = useContext(ThemeContext);
    const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
    const endTime = stratTime + 243248; // use UNIX timestamp in seconds

    const remainingTime = endTime - stratTime;
    const days = Math.ceil(remainingTime / daySeconds);
    const daysDuration = days * daySeconds;

    return (
        <View>
            <CountdownCircleTimer
                {...timerProps}
                colors="#7E2E84"
                duration={daysDuration}
                initialRemainingTime={remainingTime}
            >
                {({ elapsedTime, color }) => (
                <View style={{ color }}>
                    {renderTime("days", getTimeDays(daysDuration - elapsedTime))}
                </View>
                )}
            </CountdownCircleTimer>
        </View>
    );
}

export default Timer;



// const Timer = () => {
//   const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
//   const endTime = stratTime + 243248; // use UNIX timestamp in seconds

//   const remainingTime = endTime - stratTime;
//   const days = Math.ceil(remainingTime / daySeconds);
//   const daysDuration = days * daySeconds;

//   return (
//     <div className="Timer">
//       <CountdownCircleTimer
//         {...timerProps}
//         colors="#7E2E84"
//         duration={daysDuration}
//         initialRemainingTime={remainingTime}
//       >
//         {({ elapsedTime, color }) => (
//           <span style={{ color }}>
//             {renderTime("days", getTimeDays(daysDuration - elapsedTime))}
//           </span>
//         )}
//       </CountdownCircleTimer>
//       <CountdownCircleTimer
//         {...timerProps}
//         colors="#D14081"
//         duration={daySeconds}
//         initialRemainingTime={remainingTime % daySeconds}
//         onComplete={(totalElapsedTime) => ({
//           shouldRepeat: remainingTime - totalElapsedTime > hourSeconds
//         })}
//       >
//         {({ elapsedTime, color }) => (
//           <span style={{ color }}>
//             {renderTime("hours", getTimeHours(daySeconds - elapsedTime))}
//           </span>
//         )}
//       </CountdownCircleTimer>
//       <CountdownCircleTimer
//         {...timerProps}
//         colors="#EF798A"
//         duration={hourSeconds}
//         initialRemainingTime={remainingTime % hourSeconds}
//         onComplete={(totalElapsedTime) => ({
//           shouldRepeat: remainingTime - totalElapsedTime > minuteSeconds
//         })}
//       >
//         {({ elapsedTime, color }) => (
//           <span style={{ color }}>
//             {renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))}
//           </span>
//         )}
//       </CountdownCircleTimer>
//       <CountdownCircleTimer
//         {...timerProps}
//         colors="#218380"
//         duration={minuteSeconds}
//         initialRemainingTime={remainingTime % minuteSeconds}
//         onComplete={(totalElapsedTime) => ({
//           shouldRepeat: remainingTime - totalElapsedTime > 0
//         })}
//       >
//         {({ elapsedTime, color }) => (
//           <span style={{ color }}>
//             {renderTime("seconds", getTimeSeconds(elapsedTime))}
//           </span>
//         )}
//       </CountdownCircleTimer>
//     </div>
//   );
// }

// export default Timer;

// const Timer = () => (
//   <CountdownCircleTimer
//     isPlaying
//     duration={7}
//     colors={['#004777', '#F7B801', '#A30000', '#A30000']}
//     colorsTime={[7, 5, 2, 0]}
//   >
//     {({ remainingTime }) => remainingTime}
//   </CountdownCircleTimer>
// )

// export default Timer;