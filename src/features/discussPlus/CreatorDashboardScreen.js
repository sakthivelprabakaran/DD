import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import DiscussPlusService from './DiscussPlusService';
import Card from '../../components/Card';
import { colors } from '../../theme/colors';
import { fontSizes } from '../../theme/typography';

const CreatorDashboardScreen = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Assuming the logged-in user is the creator
    DiscussPlusService.getDashboardData('current-user-id')
      .then(setDashboardData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (!dashboardData) {
    return <Text style={styles.errorText}>Could not load dashboard data.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Text style={styles.sectionTitle}>Earnings Summary</Text>
        <Text style={styles.earningText}>Total Earned: ${dashboardData.earnings.totalEarned.toFixed(2)}</Text>
        <Text style={styles.earningText}>Pending Clearance: ${dashboardData.earnings.pendingClearance.toFixed(2)}</Text>
      </Card>
      <Card>
        <Text style={styles.sectionTitle}>Booking History</Text>
        {dashboardData.bookingHistory.map(booking => (
          <View key={booking.bookingId} style={styles.listItem}>
            <Text>Booking with {booking.userId} - {new Date(booking.date).toLocaleDateString()}</Text>
            <Text>Status: {booking.status}</Text>
          </View>
        ))}
      </Card>
      <Card>
        <Text style={styles.sectionTitle}>Your Availability</Text>
        {dashboardData.availability.map(slot => (
          <View key={slot.id} style={styles.listItem}>
            <Text>{slot.day}: {slot.startTime} - {slot.endTime} ({slot.type})</Text>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5', padding: 8 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { textAlign: 'center', marginTop: 20 },
  sectionTitle: { fontSize: fontSizes.title, fontWeight: 'bold', marginBottom: 10 },
  earningText: { fontSize: fontSizes.body, marginBottom: 5 },
  listItem: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
});

export default CreatorDashboardScreen;
