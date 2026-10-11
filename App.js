import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import HomeScreen from './HomeScreen';
import OfflineScreen from './OfflineScreen';
import OnlineScreen from './OnlineScreen';

const TABS = [
  { key: 'home', label: '홈' },
  { key: 'offline', label: '오프라인' },
  { key: 'online', label: '온라인' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderScreen = () => {
    if (activeTab === 'offline') return <OfflineScreen />;
    if (activeTab === 'online') return <OnlineScreen />;
    return <HomeScreen />;
  };

  return (
    <View style={styles.container}>
      {renderScreen()}

      <View style={styles.tabBar}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            activeOpacity={0.8}
            onPress={() => setActiveTab(tab.key)}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
          >
            <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7F3',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5EAE7',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
  },
  tabActive: {
    backgroundColor: '#EAF4EE',
  },
  tabText: {
    color: '#586D67',
    fontWeight: '700',
  },
  tabTextActive: {
    color: '#1B3A2F',
  },
});
