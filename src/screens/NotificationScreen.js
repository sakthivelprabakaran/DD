import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import NotificationService from '../services/NotificationService';
import { colors } from '../theme/colors';
import { fontSizes } from '../theme/typography';

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    NotificationService.getNotifications('current-user-id')
      .then(response => setNotifications(response.notifications))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  const renderItem = ({ item }) => (
    <View style={[styles.notificationItem, !item.read && styles.unread]}>
      <Text style={styles.icon}>🔔</Text>
      <View style={styles.textContainer}>
        <Text style={styles.notificationText}>{item.text}</Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      style={styles.container}
      data={notifications}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ListEmptyComponent={<Text style={styles.emptyText}>You have no new notifications.</Text>}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  unread: {
    backgroundColor: '#e0f7ff',
  },
  icon: {
    fontSize: 24,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  notificationText: {
    fontSize: fontSizes.body,
  },
  timestamp: {
    fontSize: fontSizes.caption,
    color: colors.text.secondary,
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: fontSizes.body,
    color: colors.text.secondary,
  },
});

export default NotificationScreen;
