import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import DiscussPlusService from './DiscussPlusService';
import StyledButton from '../../components/StyledButton';
import { colors } from '../../theme/colors';
import { fontSizes } from '../../theme/typography';

const BookingScreen = ({ route, navigation }) => {
  const { authorId } = route.params;
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    DiscussPlusService.getAuthorAvailability(authorId)
      .then(response => setSlots(response.slots))
      .finally(() => setLoading(false));
  }, [authorId]);

  const handleBooking = () => {
    if (!selectedSlot) return;

    DiscussPlusService.processPayment({ amount: selectedSlot.price })
      .then(paymentResult => {
        if (paymentResult.success) {
          return DiscussPlusService.createBooking('current-user-id', selectedSlot.slotId, paymentResult.transactionId);
        } else {
          throw new Error('Payment failed');
        }
      })
      .then(() => {
        Alert.alert('Success', 'Your session is booked!');
        navigation.navigate('Session', { slot: selectedSlot }); // Navigate to the session screen
      })
      .catch(err => {
        Alert.alert('Error', 'Could not complete booking.');
        console.error(err);
      });
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Slots</Text>
      {slots.map(slot => (
        <TouchableOpacity
          key={slot.slotId}
          style={[styles.slot, selectedSlot?.slotId === slot.slotId && styles.selectedSlot]}
          onPress={() => setSelectedSlot(slot)}
        >
          <Text>{new Date(slot.startTime).toLocaleString()}</Text>
          <Text>${slot.price.toFixed(2)} ({slot.duration} min)</Text>
        </TouchableOpacity>
      ))}
      <StyledButton
        title="Confirm & Book"
        onPress={handleBooking}
        disabled={!selectedSlot}
        style={styles.bookButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: fontSizes.title, fontWeight: 'bold', marginBottom: 16 },
  slot: { padding: 16, borderWidth: 1, borderColor: colors.grey, borderRadius: 8, marginBottom: 10 },
  selectedSlot: { borderColor: colors.primary, borderWidth: 2, backgroundColor: '#e0f7ff' },
  bookButton: { marginTop: 'auto' },
});

export default BookingScreen;
