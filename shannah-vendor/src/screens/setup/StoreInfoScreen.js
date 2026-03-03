import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Image,
} from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../../theme';
import { PrimaryButton, AppInput, ScreenHeader } from '../../components';
import { CATEGORIES } from '../../data/mockData';

export default function StoreInfoScreen({ navigation }) {
  const [logo, setLogo] = useState(null);
  const [cover, setCover] = useState(null);
  const [fullName, setFullName] = useState('');
  const [storeName, setStoreName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('مطبخ منزلي');

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScreenHeader title="أنشئ ملفك الشخصي" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.sectionTitle}>معلومات المتجر</Text>

        {/* Logo */}
        <View style={styles.logoRow}>
          <Text style={styles.label}>الشعار</Text>
          <TouchableOpacity style={styles.logoBox}>
            <Text style={styles.uploadIcon}>⬆️</Text>
          </TouchableOpacity>
        </View>

        {/* Cover */}
        <Text style={styles.label}>صورة الغلاف</Text>
        <TouchableOpacity style={styles.coverBox}>
          <Text style={styles.uploadIcon}>⬆️</Text>
          <TouchableOpacity style={styles.browseBtn}>
            <Text style={styles.browseBtnText}>تصفح</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        <Text style={styles.label}>اسمك الكامل</Text>
        <AppInput placeholder="أدخل اسمك الكامل" value={fullName} onChangeText={setFullName} />

        <Text style={styles.label}>اسم المتجر</Text>
        <AppInput placeholder="أدخل اسم متجرك" value={storeName} onChangeText={setStoreName} />

        <Text style={styles.label}>الوصف</Text>
        <AppInput
          placeholder="ما الذي يجعل طعامك مميزاً؟"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>الفئة</Text>
        <View style={styles.categoriesGrid}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryChip, category === cat && styles.categoryChipActive]}
              onPress={() => setCategory(cat)}
            >
              <Text style={[styles.categoryText, category === cat && styles.categoryTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <PrimaryButton
          title="التالي"
          onPress={() => navigation.navigate('SetupIdentity')}
          style={{ marginTop: SPACING.base }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.xl,
    gap: SPACING.sm,
    paddingBottom: SPACING.xxxl,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.base,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'right',
    marginBottom: SPACING.sm,
  },
  label: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text,
    fontWeight: '600',
    textAlign: 'right',
    marginTop: SPACING.sm,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: SPACING.md,
  },
  logoBox: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.gray100,
  },
  coverBox: {
    height: 120,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.gray100,
    gap: SPACING.sm,
  },
  uploadIcon: { fontSize: 24 },
  browseBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
  },
  browseBtnText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    justifyContent: 'flex-end',
  },
  categoryChip: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  categoryChipActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  categoryText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray600,
  },
  categoryTextActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});
