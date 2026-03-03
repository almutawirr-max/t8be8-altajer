import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING } from '../../theme';
import { PrimaryButton } from '../../components';

export default function SetupSuccessScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.illustrationContainer}>
        <View style={styles.illustration}>
          <Text style={styles.illustrationIcon}>📋✅</Text>
        </View>
      </View>

      <Text style={styles.title}>تم تقديم الطلب!</Text>
      <Text style={styles.subtitle}>
        نقوم حالياً بالتحقق من مستنداتك. يستغرق هذا عادةً من يوم إلى يومي عمل. سنبلغك بمجرد الموافقة.
      </Text>

      <View style={styles.footer}>
        <PrimaryButton
          title="العودة إلى الصفحة الرئيسية"
          onPress={() => navigation.replace('Main')}
          outline
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xxxl,
    paddingTop: 60,
  },
  illustrationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    width: 200,
    height: 200,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationIcon: { fontSize: 72 },
  title: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.base,
  },
  subtitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray500,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: SPACING.xxl,
  },
  footer: {},
});
