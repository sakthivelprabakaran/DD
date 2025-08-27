import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import StyledButton from '../../components/StyledButton';
import DiscussPlusService from './DiscussPlusService';
import { colors } from '../../theme/colors';
import { fontSizes } from '../../theme/typography';

const RatingScreen = ({ route, navigation }) => {
  const { bookingId } = route.params;
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert('Error', 'Please select a rating.');
      return;
    }
    setIsSubmitting(true);
    DiscussPlusService.submitRating(bookingId, rating, review)
      .then(() => {
        Alert.alert('Success', 'Your feedback has been submitted!');
        navigation.popToTop(); // Go back to the root of the stack (e.g., HomeScreen)
      })
      .catch(err => {
        console.error(err);
        Alert.alert('Error', 'Could not submit your feedback.');
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rate Your Session</Text>
      {/* A real app would use a star rating component here */}
      <Text style={styles.ratingText}>Your Rating: {rating}/5</Text>
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map(star => (
          <Text key={star} style={styles.star} onPress={() => setRating(star)}>{star <= rating ? '★' : '☆'}</Text>
        ))}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Leave a public review (optional)"
        value={review}
        onChangeText={setReview}
        multiline
      />
      <StyledButton
        title={isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        onPress={handleSubmit}
        disabled={isSubmitting}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: fontSizes.largeTitle, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  ratingText: { fontSize: fontSizes.body, textAlign: 'center' },
  starContainer: { flexDirection: 'row', justifyContent: 'center', marginVertical: 20 },
  star: { fontSize: 40, color: 'gold', marginHorizontal: 5 },
  input: { height: 120, borderColor: colors.grey, borderWidth: 1, borderRadius: 8, padding: 12, textAlignVertical: 'top', marginBottom: 20 },
});

export default RatingScreen;
