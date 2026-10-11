import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { offlineStores, onlineStores, categoryMap } from '../data/mockData';

const categoryOptions = ['all', 'lowSugar', 'glutenFree', 'both', 'vegan'];

export default function OfflineScreen() {
  const [selectedDistrict, setSelectedDistrict] = useState('강남구');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const districts = [...new Set(offlineStores.map((store) => store.district))];

  const filteredStores = useMemo(() => {
    return offlineStores.filter((store) => {
      const matchesDistrict = store.district === selectedDistrict;
      const matchesCategory =
        selectedCategory === 'all' || store.categories.includes(selectedCategory);
      return matchesDistrict && matchesCategory;
    });
  }, [selectedDistrict, selectedCategory]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>오프라인 매장</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
          {districts.map((district) => (
            <TouchableOpacity
              key={district}
              style={[styles.chip, district === selectedDistrict && styles.chipSelected]}
              onPress={() => setSelectedDistrict(district)}
            >
              <Text style={[styles.chipText, district === selectedDistrict && styles.chipTextSelected]}>
                {district}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
          {categoryOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.chip, selectedCategory === option && styles.chipSelected]}
              onPress={() => setSelectedCategory(option)}
            >
              <Text style={[styles.chipText, selectedCategory === option && styles.chipTextSelected]}>
                {option === 'all' ? '전체' : categoryMap[option]}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {filteredStores.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>조건에 맞는 매장이 없습니다.</Text>
          </View>
        ) : (
          filteredStores.map((store) => (
            <View key={store.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.storeName}>{store.name}</Text>
                {store.deliveryAvailable && <Text style={styles.badge}>택배가능</Text>}
              </View>

              <Text style={styles.meta}>{store.dong} · {store.address}</Text>
              <Text style={styles.meta}>영업시간: {store.openingHours}</Text>

              <View style={styles.tagWrap}>
                {store.categories.map((category) => (
                  <Text key={category} style={styles.tag}>
                    {categoryMap[category]}
                  </Text>
                ))}
              </View>

              <Text style={styles.sectionLabel}>메뉴</Text>
              {store.menu.map((item) => (
                <View key={`${store.id}-${item.name}`} style={styles.menuRow}>
                  <Text style={styles.menuName}>{item.name}</Text>
                  <Text style={styles.menuPrice}>{item.price}</Text>
                </View>
              ))}
            </View>
          ))
        )}
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
    fontSize: 26,
    fontWeight: '800',
    color: '#1B3A2F',
    marginBottom: 12,
  },
  chipRow: {
    marginBottom: 12,
  },
  chip: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#DCEAE2',
  },
  chipSelected: {
    backgroundColor: '#1B3A2F',
    borderColor: '#1B3A2F',
  },
  chipText: {
    color: '#1B3A2F',
    fontWeight: '600',
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginTop: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  storeName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1B3A2F',
  },
  badge: {
    backgroundColor: '#EAF4EE',
    color: '#215A45',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 8,
    fontSize: 12,
    fontWeight: '700',
  },
  meta: {
    color: '#4D6761',
    marginTop: 8,
    fontSize: 14,
  },
  tagWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    marginBottom: 8,
  },
  tag: {
    backgroundColor: '#F1F7F4',
    color: '#245A47',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 12,
    fontWeight: '600',
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1B3A2F',
    marginTop: 10,
    marginBottom: 6,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  menuName: {
    color: '#2F3F3B',
  },
  menuPrice: {
    color: '#2F3F3B',
    fontWeight: '600',
  },
  emptyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 24,
    marginTop: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#4D6761',
    fontSize: 16,
  },
});
