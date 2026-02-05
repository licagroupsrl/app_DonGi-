import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { COLORS, FONTS, COMMON_STYLES, SHADOWS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);

  // Function to handle the "Watch Live" action
  const handleWatchLive = () => {
    if (video.current) {
      video.current.playAsync();
      setIsPlaying(true);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.headerContainer}>
        <Text style={FONTS.header}>Benvenuto in DonGiò</Text>
        <Text style={FONTS.subHeader}>La tua parrocchia, ovunque tu sia.</Text>
      </View>

      {/* Live Streaming Section */}
      <View style={styles.liveSection}>
        <View style={styles.videoContainer}>
          {/*
            CONFIGURATION NOTE:
            Replace 'source' with your actual HLS stream URL or MP4 link.
            For YouTube Live, consider using 'react-native-youtube-iframe' instead of expo-av.
          */}
          <Video
            ref={video}
            style={styles.video}
            source={{
              uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4', // Placeholder Stream URL
            }}
            useNativeControls={true}
            resizeMode="contain"
            isLooping={false}
            onPlaybackStatusUpdate={status => setStatus(() => status)}
          />
        </View>

        {!isPlaying && (
          <TouchableOpacity style={styles.mainButton} onPress={handleWatchLive}>
            <Ionicons name="play-circle-outline" size={30} color={COLORS.white} style={{ marginRight: 10 }} />
            <Text style={FONTS.buttonText}>Guarda la Messa in Diretta</Text>
          </TouchableOpacity>
        )}

        {isPlaying && (
          <View style={styles.liveIndicator}>
             <View style={styles.redDot} />
             <Text style={{color: 'red', fontWeight: 'bold'}}>IN DIRETTA</Text>
          </View>
        )}
      </View>

      {/* Info / Welcome Card */}
      <View style={COMMON_STYLES.card}>
        <Text style={styles.cardTitle}>Avvisi Parrocchiali</Text>
        <Text style={FONTS.body}>
          La Santa Messa domenicale sarà trasmessa alle ore 10:30.
          Il Rosario sarà recitato tutti i giorni alle 18:00.
        </Text>
      </View>

      <View style={COMMON_STYLES.card}>
        <Text style={styles.cardTitle}>Pensiero del Giorno</Text>
        <Text style={[FONTS.body, { fontStyle: 'italic' }]}>
          "Non temere, perché io sono con te; non smarrirti, perché io sono il tuo Dio."
        </Text>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  liveSection: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.primary,
    ...SHADOWS.medium,
  },
  videoContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#000',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 15,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  mainButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.accent, // Bordeaux
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    ...SHADOWS.light,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  redDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    marginRight: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 5,
  },
});

export default HomeScreen;
