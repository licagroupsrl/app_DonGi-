import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { COLORS, FONTS, COMMON_STYLES } from '../constants/theme';

// Mock Data for Prayers
const PRAYERS = [
  { id: '1', title: 'Padre Nostro', content: 'Padre nostro che sei nei cieli, sia santificato il tuo nome...' },
  { id: '2', title: 'Ave Maria', content: 'Ave, o Maria, piena di grazia, il Signore è con te...' },
  { id: '3', title: 'Gloria al Padre', content: 'Gloria al Padre e al Figlio e allo Spirito Santo...' },
  { id: '4', title: 'Salve Regina', content: 'Salve, Regina, madre di misericordia, vita, dolcezza e speranza nostra...' },
];

// Mock Data for Gospel/Bible (In a real app, fetch from API)
const GOSPEL = {
  date: 'Oggi, 24 Ottobre',
  title: 'Vangelo secondo Luca',
  content: 'In quel tempo, Gesù disse ai suoi discepoli: "Sono venuto a gettare fuoco sulla terra, e quanto vorrei che fosse già acceso!..."',
};

const LibraryScreen = () => {
  const [activeTab, setActiveTab] = useState('prayers'); // 'prayers' or 'bible'

  const renderTabButton = (key, label) => (
    <TouchableOpacity
      style={[
        styles.tabButton,
        activeTab === key && styles.activeTabButton,
      ]}
      onPress={() => setActiveTab(key)}
    >
      <Text
        style={[
          styles.tabText,
          activeTab === key && styles.activeTabText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderPrayers = () => (
    <FlatList
      data={PRAYERS}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={COMMON_STYLES.card}>
          <Text style={styles.prayerTitle}>{item.title}</Text>
          <Text style={styles.prayerContent} numberOfLines={3}>{item.content}</Text>
          <TouchableOpacity>
             <Text style={styles.readMore}>Leggi tutto</Text>
          </TouchableOpacity>
        </View>
      )}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );

  const renderBible = () => (
    <ScrollView style={COMMON_STYLES.card}>
      <Text style={styles.dateText}>{GOSPEL.date}</Text>
      <Text style={styles.gospelTitle}>{GOSPEL.title}</Text>
      <Text style={FONTS.body}>{GOSPEL.content}</Text>
      <View style={{ marginTop: 20, padding: 10, backgroundColor: '#f9f9f9', borderRadius: 8 }}>
        <Text style={{ fontStyle: 'italic', color: COLORS.secondaryText }}>
          Nota Tecnica: Questa sezione può essere collegata a un'API biblica (es. BibleGateway o API CEI) per caricare le letture del giorno automaticamente.
        </Text>
      </View>
    </ScrollView>
  );

  return (
    <View style={COMMON_STYLES.container}>
      {/* Custom Top Tabs */}
      <View style={styles.tabContainer}>
        {renderTabButton('prayers', 'Preghiere')}
        {renderTabButton('bible', 'Vangelo e Bibbia')}
      </View>

      {/* Content Area */}
      <View style={styles.contentContainer}>
        {activeTab === 'prayers' ? renderPrayers() : renderBible()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginBottom: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTabButton: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.secondaryText,
  },
  activeTabText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
  },
  prayerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.accent,
    marginBottom: 8,
  },
  prayerContent: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 22,
    marginBottom: 8,
  },
  readMore: {
    color: COLORS.primary,
    fontWeight: 'bold',
    marginTop: 5,
  },
  dateText: {
    fontSize: 14,
    color: COLORS.secondaryText,
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  gospelTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.accent,
    marginBottom: 15,
  },
});

export default LibraryScreen;
