import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StyledButton from '../../components/StyledButton';
import { colors } from '../../theme/colors';
import { fontSizes } from '../../theme/typography';

const SessionScreen = ({ route, navigation }) => {
  const { slot } = route.params;
  const [timer, setTimer] = useState(slot.duration * 60); // Timer in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          // Navigate to rating screen when timer ends
          navigation.replace('Rating', { bookingId: 'some-booking-id' });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [navigation]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleEndSession = () => {
    setTimer(1); // End the session early
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Session in Progress</Text>
      <Text style={styles.timer}>{formatTime(timer)}</Text>
      <View style={styles.content}>
        {slot.type === 'Voice Call' ? (
          <Text style={styles.sessionType}>📞 Voice Call View 📞</Text>
        ) : (
          <Text style={styles.sessionType}>💬 Chat View 💬</Text>
        )}
      </View>
      <StyledButton title="End Session" onPress={handleEndSession} style={styles.endButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center' },
  title: { fontSize: fontSizes.title, fontWeight: 'bold' },
  timer: { fontSize: fontSizes.largeTitle, marginVertical: 20 },
  content: { flex: 1, justifyContent: 'center' },
  sessionType: { fontSize: fontSizes.subtitle },
  endButton: { backgroundColor: colors.error },
});

export default SessionScreen;
