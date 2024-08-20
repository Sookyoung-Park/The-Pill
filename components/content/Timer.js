import React from "react";
import { View, Text, Image } from "react-native";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import pillimg from '../../images/pillimg.png';

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
    isPlaying: true,
    size: 200,
    strokeWidth: 14,
};

const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;

const renderTime = (remainingTime) => {
    const timehr = getTimeHours(remainingTime);
    const timemin = getTimeMinutes(remainingTime);
    return (
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 18 }}>{timehr}</Text>
                <Text style={{ fontSize: 18 }}>hr </Text>
                <Text style={{ fontSize: 18 }}>{timemin}</Text>
                <Text style={{ fontSize: 18 }}>min</Text>
            </View>
            <View style={{ marginTop: 16 }}>
                <Image source={pillimg} />
            </View>
        </View>
    );
};

const getNextElevenPM = () => {
    const now = new Date();
    const nextElevenPM = new Date();
    nextElevenPM.setHours(11, 10, 0, 0);
    if (now > nextElevenPM) {
        nextElevenPM.setDate(nextElevenPM.getDate() + 1);
    }
    return nextElevenPM;
};

const Timer = () => {
    const now = Date.now() / 1000; // 현재 유닉스 타임스탬프 (초)
    const endTime = getNextElevenPM().getTime() / 1000; // 다음 오후 11시 유닉스 타임스탬프 (초)
    const remainingTime = endTime - now;

    return (
        <View style={{ alignSelf: 'center', justifyContent: 'center', flex: 1 }}>
            <CountdownCircleTimer
                {...timerProps}
                colors="#FF1F55"
                duration={daySeconds}
                initialRemainingTime={remainingTime}    
                onComplete={() => ({ shouldRepeat: true, delay: 1 })} // Ensure that it waits a bit before restarting
            >
                {({ remainingTime }) => (
                    <View style={{ alignItems: 'center' }}>
                        {renderTime(remainingTime)}
                    </View>
                    
                )}
            </CountdownCircleTimer>
        </View>
    );
};

export default Timer;