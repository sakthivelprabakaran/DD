import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import StyledButton from '../components/StyledButton';
import UserService from '../services/UserService';
import { colors } from '../theme/colors';
import { fontSizes } from '../theme/typography';

const DeviceManagementScreen = ({ navigation }) => {
  const [devices, setDevices] = useState([]);
  const [deviceName, setDeviceName] = useState('');
  const [yearsOfUse, setYearsOfUse] = useState('');

  useEffect(() => {
    // Fetch initial devices
    UserService.getUserProfile('some-user-id').then(user => {
      setDevices(user.devices);
    });
  }, []);

  const handleAddDevice = () => {
    if (!deviceName || !yearsOfUse) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
    UserService.addDevice('some-user-id', { name: deviceName, yearsOfUse })
      .then(newDevice => {
        setDevices([...devices, newDevice]);
        setDeviceName('');
        setYearsOfUse('');
      });
  };

  const handleDeleteDevice = (deviceId) => {
    UserService.deleteDevice('some-user-id', deviceId).then(() => {
      setDevices(devices.filter(d => d.id !== deviceId));
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.addForm}>
        <Text style={styles.sectionTitle}>Add a New Device</Text>
        <TextInput style={styles.input} placeholder="Device Name (e.g., iPhone 15 Pro)" value={deviceName} onChangeText={setDeviceName} />
        <TextInput style={styles.input} placeholder="Years of Use (e.g., 1.5 years)" value={yearsOfUse} onChangeText={setYearsOfUse} />
        <StyledButton title="Add Device" onPress={handleAddDevice} />
      </View>
      <FlatList
        data={devices}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.deviceItem}>
            <Text>{item.name} ({item.yearsOfUse})</Text>
            <TouchableOpacity onPress={() => handleDeleteDevice(item.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        ListHeaderComponent={<Text style={styles.sectionTitle}>Your Devices</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  addForm: { padding: 20, borderBottomWidth: 1, borderColor: '#eee' },
  sectionTitle: { fontSize: fontSizes.title, fontWeight: 'bold', marginBottom: 10 },
  input: { borderColor: colors.grey, borderWidth: 1, borderRadius: 8, padding: 12, fontSize: fontSizes.body, marginBottom: 16 },
  deviceItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#eee' },
  deleteButton: { color: colors.error, fontWeight: 'bold' },
});

export default DeviceManagementScreen;
