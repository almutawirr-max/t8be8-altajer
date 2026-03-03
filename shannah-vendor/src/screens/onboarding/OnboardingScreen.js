import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { COLORS, SPACING, FONTS, RADIUS } from '../../theme';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: 1,
    title: 'أدرج متجرك في دقائق',
    subtitle: 'أنشئ متجرك الإلكتروني وابدأ بيع الأطباق المنزلية لمجتمعك المحلي',
    icon: '🏪',
    dots: 3,
    active: 0,
  },
  {
    id: 2,
    title: 'نقبل الطلبات الفورية أو الطلبات المسبقة',
    subtitle: 'يمكنك إدارة كل من الوجبات الجاهزة للأكل وطلبات الطعام المسبقة من مكان واحد.',
    icon: '📦',
    dots: 3,
    active: 1,
  },
  {
    id: 3,
    title: 'تتبع المبيعات والمدفوعات بسهولة',
    subtitle: 'اطلع على الأرباح في الوقت الفعلي، وإحصائيات الأداء، واحصل على أموالك مباشرة في حسابك المصرفي.',
    icon: '📊',
    dots: 3,
    active: 2,
  },
];

export default function OnboardingScreen({ navigation }) {
  const [current, setCurrent] = useState(0);

  const isLast = current === SLIDES.length - 1;
  const slide = SLIDES[current];

  const handleNext = () => {
    if (isLast) {
      navigation.replace('Auth');
    } else {
      setCurrent(current + 1);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.replace('Auth')}
        style={styles.skipBtn}
      >
        <Text style={styles.skipText}>تخطي</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.illustration}>
          <Text style={styles.illustrationIcon}>{slide.icon}</Text>
        </View>

        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.subtitle}>{slide.subtitle}</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <Text style={styles.nextBtnText}>
            {isLast ? 'ابدأ الآن' : 'التالي'} {'>'}
          </Text>
        </TouchableOpacity>

        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === current && styles.dotActive]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.xl,
    paddingTop: 60,
    paddingBottom: SPACING.xxl,
  },
  skipBtn: {
    alignSelf: 'flex-start',
  },
  skipText: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.base,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    width: 220,
    height: 220,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 110,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xxl,
  },
  illustrationIcon: {
    fontSize: 90,
  },
  title: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.base,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: FONTS.sizes.base,
    color: COLORS.gray500,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: SPACING.md,
  },
  footer: {
    alignItems: 'center',
    gap: SPACING.base,
  },
  nextBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.xl,
    paddingVertical: SPACING.base,
    paddingHorizontal: SPACING.xxl,
    minWidth: 160,
    alignItems: 'center',
  },
  nextBtnText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
  },
  dots: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.gray300,
  },
  dotActive: {
    width: 24,
    backgroundColor: COLORS.primary,
  },
});
