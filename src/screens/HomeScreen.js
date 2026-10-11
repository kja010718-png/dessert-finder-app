import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { quickStats } from '../src/data/mockData';

const recommendedTags = ['강남 저당 디저트', '마포 글루텐프리', '성수 비건', '전국 택배'];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Dessert Finder</Text>
        <Text style={styles.subtitle}>당뇨인/다이어터를 위한 저당 디저트 찾기</Text>

        <View style={styles.grid}>
          {quickStats.map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>추천 검색</Text>
          <View style={styles.tagList}>
            {recommendedTags.map((tag) => (
              <TouchableOpacity key={tag} style={styles.tag} activeOpacity={0.8}>
                <Text style={styles.tagText}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7F3',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1B3A2F',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: '#4D6761',
  },
  grid: {
    marginTop: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  statLabel: {
    fontSize: 13,
    color: '#4D6761',
  },
  statValue: {
    marginTop: 8,
    fontSize: 28,
    fontWeight: '700',
    color: '#1B3A2F',
  },
  section: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1B3A2F',
    marginBottom: 12,
  },
  tagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#EAF4EE',
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginRight: 10,
    marginBottom: 10,
  },
  tagText: {
    color: '#215A45',
    fontWeight: '600',
  },
});
