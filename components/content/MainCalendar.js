import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';


// https://www.npmjs.com/package/react-native-calendars/v/1.1286.0
// 로컬화 설정 (영어)
LocaleConfig.locales['en'] = {
  monthNames: [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  today: "Today"
};
LocaleConfig.defaultLocale = 'en';

const MainCalendar = () => {
  return (
    <View style={styles.container}>
      <Calendar
        // 기본 속성 설정
        style={styles.calendar}
        // 현재 날짜
        current={new Date().toISOString().split('T')[0]}
        theme={{
          todayTextColor:'#FF1F55',
          arrowColor:'#FF1F55',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendar: {
    height: 350,
    width: 336,
  },
});

export default MainCalendar;