import React from "react";
import { View, Text } from "react-native";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
    isPlaying: true,
    size: 200,
    strokeWidth: 16
  };


  const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
  const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;

const renderTime = (remainingTime,elapsedTime) => {
    const timehr=getTimeHours(remainingTime - elapsedTime);
    const timemin=getTimeMinutes(remainingTime - elapsedTime);
    return (
        <View style={{flexDirection:'row', alignItems: 'center', justifyContent:'center'}}>
            <Text style={{fontSize:20}}>{timehr}</Text>
            <Text style={{fontSize:20}}>hrs </Text>
            <Text style={{fontSize:20}}>{timemin}</Text>
            <Text style={{fontSize:20}}>mins</Text>
        </View> 
    );
};



const getNextElevenPM = () => {
    const now = new Date();
    //Need to be upated based on user's data
    const nextElevenPM = new Date();
    nextElevenPM.setHours(23, 0, 0, 0);
    if (now > nextElevenPM) {
        nextElevenPM.setDate(nextElevenPM.getDate() + 1);
    }
    return nextElevenPM;
};

const Timer = () => {
    const startTime = Date.now() / 1000; // 현재 유닉스 타임스탬프 (초)
    const endTime = getNextElevenPM().getTime() / 1000; // 다음 오후 11시 유닉스 타임스탬프 (초)

    const remainingTime = endTime - startTime;

    return (
        <View style={{alignSelf:'center', justifyContent:'center', flex:1}}>
            <CountdownCircleTimer
                {...timerProps}
                colors="#FF1F55"
                duration={daySeconds}
                initialRemainingTime={remainingTime}    
                onComplete={() => ({ shouldRepeat: true })}            
            >
                {({ elapsedTime, color }) => (
                    <View style={{ alignItems:'center', color }}>
                        {renderTime(remainingTime, elapsedTime)}
                    </View>
                )}
            </CountdownCircleTimer>
        </View>
    );
}

export default Timer;
