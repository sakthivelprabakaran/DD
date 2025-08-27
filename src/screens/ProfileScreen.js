import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import UserService from '../services/UserService';
import SocialService from '../services/SocialService';
import DiscussPlusService from '../features/discussPlus/DiscussPlusService';
import StyledButton from '../components/StyledButton';
import Card from '../components/Card';
import { colors } from '../theme/colors';
import { fontSizes } from '../theme/typography';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCreator, setIsCreator] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      UserService.getUserProfile('some-user-id')
        .then(setUser)
        .finally(() => setLoading(false));
      // Check for creator eligibility
      DiscussPlusService.checkDashboardEligibility('some-user-id').then(result => {
        setIsCreator(result.isEligible);
      });
    });
    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  const Stat = ({ label, value }) => (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.tagline}>{user.tagline}</Text>
        <StyledButton
          title="Edit Profile"
          onPress={() => navigation.navigate('EditProfile')}
          variant="secondary"
          style={styles.profileButton}
        />
        {isCreator && (
          <StyledButton
            title="Creator Dashboard"
            onPress={() => navigation.navigate('CreatorDashboard')}
            style={styles.profileButton}
          />
        )}
      </View>

      <View style={styles.statsContainer}>
        <Stat value={user.stats.followers} label="Followers" />
        <Stat value={user.stats.following} label="Following" />
        <Stat value={user.stats.discussions} label="Discussions" />
      </View>

      <Card>
        <View style={styles.cardHeader}>
          <Text style={styles.sectionTitle}>Currently Using</Text>
          <TouchableOpacity onPress={() => navigation.navigate('DeviceManagement')}>
            <Text style={styles.manageButton}>Manage</Text>
          </TouchableOpacity>
        </View>
        {user.devices.map(device => (
          <View key={device.id} style={styles.listItem}>
            <Text>📱 {device.name} ({device.yearsOfUse})</Text>
          </View>
        ))}
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Recent Posts</Text>
        {user.recentPosts.map(post => (
          <TouchableOpacity
            key={post.id}
            style={styles.listItem}
            onPress={() => navigation.navigate('PostDetail', { postId: post.id })}
          >
            <Text>📄 {post.title}</Text>
          </TouchableOpacity>
        ))}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { alignItems: 'center', padding: 20, backgroundColor: colors.white },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 12 },
  username: { fontSize: fontSizes.largeTitle, fontWeight: 'bold' },
  tagline: { fontSize: fontSizes.body, color: colors.text.secondary, textAlign: 'center' },
  profileButton: { marginTop: 16 },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-around', padding: 16, backgroundColor: colors.white, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#eee' },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: fontSizes.subtitle, fontWeight: 'bold' },
  statLabel: { fontSize: fontSizes.caption, color: colors.text.secondary },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: fontSizes.title, fontWeight: 'bold' },
  manageButton: { color: colors.primary, fontWeight: '600' },
  listItem: { paddingVertical: 8 },
});

export default ProfileScreen;
