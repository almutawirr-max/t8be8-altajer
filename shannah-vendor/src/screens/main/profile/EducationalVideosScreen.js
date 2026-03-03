import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../../../theme';
import { ScreenHeader } from '../../../components';

const VIDEOS = [
  { id: '1', title: 'كيفية إنشاء متجر' },
  { id: '2', title: 'كيفية تحميل المنتج' },
  { id: '3', title: 'كيفية قبول ومعالجة الطلب' },
];

export default function EducationalVideosScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScreenHeader title="كيفية استخدام التطبيق" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.container}>
        {VIDEOS.map((video) => (
          <View key={video.id} style={styles.videoSection}>
            <Text style={styles.videoTitle}>{video.title}</Text>
            <TouchableOpacity style={styles.videoPlayer}>
              <View style={styles.playButton}>
                <Text style={styles.playIcon}>▶</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: SPACING.base, gap: SPACING.xl, paddingBottom: SPACING.xxxl },
  videoSection: { gap: SPACING.sm },
  videoTitle: { fontSize: FONTS.sizes.base, fontWeight: '600', color: COLORS.text, textAlign: 'right' },
  videoPlayer: {
    height: 160, backgroundColor: COLORS.gray200, borderRadius: RADIUS.lg,
    alignItems: 'center', justifyContent: 'center',
  },
  playButton: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center',
  },
  playIcon: { color: COLORS.white, fontSize: 20, marginLeft: 4 },
});
