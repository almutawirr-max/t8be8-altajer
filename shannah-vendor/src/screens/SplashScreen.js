import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoSymbol}>S3</Text>
        <View style={styles.logoTextContainer}>
          <Text style={styles.logoArabic}>شنـــة</Text>
          <Text style={styles.logoEnglish}>SHANNAH</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoSymbol: {
    fontSize: 60,
    color: COLORS.white,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  logoTextContainer: {
    alignItems: 'flex-end',
  },
  logoArabic: {
    fontSize: 32,
    color: COLORS.white,
    fontWeight: '700',
  },
  logoEnglish: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: '600',
    letterSpacing: 3,
  },
});
