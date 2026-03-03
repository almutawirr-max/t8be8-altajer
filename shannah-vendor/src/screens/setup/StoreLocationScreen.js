import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../../theme';
import { PrimaryButton, ScreenHeader } from '../../components';

export default function StoreLocationScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(false);
  const [building, setBuilding] = useState('');
  const [street, setStreet] = useState('');
  const [label, setLabel] = useState('مكتب');

  const LABELS = ['بيت', 'مكتب', 'شريك', 'آخر +'];

  const handleSelectLocation = () => setSelected(true);

  if (!selected) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <ScreenHeader title="أنشئ ملفك الشخصي" onBack={() => navigation.goBack()} />
        <View style={styles.container}>
          {/* Map placeholder */}
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapText}>🗺️</Text>
          </View>

          <View style={styles.searchBox}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              placeholder="ابحث عن عنوانك هنا..."
              value={query}
              onChangeText={setQuery}
              style={styles.searchInput}
              textAlign="right"
              placeholderTextColor={COLORS.gray400}
            />
          </View>

          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🗺️</Text>
            <Text style={styles.emptyText}>أدخل عنوانك لاستكشاف المتاجر القريبة منك</Text>
            <TouchableOpacity onPress={handleSelectLocation}>
              <Text style={styles.useLocationLink}>استخدم الموقع الحالي</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScreenHeader title="أنشئ ملفك الشخصي" onBack={() => setSelected(false)} />
      <View style={styles.container}>
        <View style={styles.mapPlaceholderSmall}>
          <Text style={{ fontSize: 48 }}>📍</Text>
          <Text style={{ color: COLORS.gray500, fontSize: FONTS.sizes.sm }}>الرياض، السعودية</Text>
        </View>

        <Text style={styles.subLabel}>تفاصيل التوصيل</Text>
        <View style={styles.locationRow}>
          <Text style={styles.locationIcon}>📍</Text>
          <Text style={styles.locationName}>الياسمين</Text>
        </View>
        <Text style={styles.locationAddress}>عبد العزيز الرياض</Text>

        <Text style={styles.label}>تفاصيل العنوان</Text>
        <View style={styles.inputRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.inputLabel}>#شارع</Text>
            <TextInput
              value={street}
              onChangeText={setStreet}
              placeholder="02"
              style={styles.inputSmall}
              textAlign="right"
              placeholderTextColor={COLORS.gray400}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.inputLabel}>#منزل</Text>
            <TextInput
              value={building}
              onChangeText={setBuilding}
              placeholder="93"
              style={styles.inputSmall}
              textAlign="right"
              placeholderTextColor={COLORS.gray400}
            />
          </View>
        </View>

        <Text style={styles.label}>أضف تسمية</Text>
        <View style={styles.labelsRow}>
          {LABELS.map((l) => (
            <TouchableOpacity
              key={l}
              style={[styles.labelChip, label === l && styles.labelChipActive]}
              onPress={() => setLabel(l)}
            >
              <Text style={[styles.labelChipText, label === l && styles.labelChipTextActive]}>
                {l}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <PrimaryButton
          title="تقديم الطلب"
          onPress={() => navigation.navigate('SetupSuccess')}
          style={{ marginTop: 'auto' }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: SPACING.xl, gap: SPACING.md },
  mapPlaceholder: {
    height: 250, backgroundColor: COLORS.gray100,
    alignItems: 'center', justifyContent: 'center',
    borderRadius: RADIUS.lg,
  },
  mapText: { fontSize: 64 },
  mapPlaceholderSmall: {
    height: 160, backgroundColor: COLORS.gray100,
    alignItems: 'center', justifyContent: 'center',
    borderRadius: RADIUS.lg, gap: 8,
  },
  searchBox: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: COLORS.border,
    borderRadius: RADIUS.full, paddingHorizontal: SPACING.base,
    backgroundColor: COLORS.white, gap: SPACING.sm,
  },
  searchIcon: { fontSize: 16 },
  searchInput: { flex: 1, paddingVertical: SPACING.md, fontSize: FONTS.sizes.sm, color: COLORS.text },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: SPACING.md },
  emptyIcon: { fontSize: 64 },
  emptyText: { fontSize: FONTS.sizes.sm, color: COLORS.gray500, textAlign: 'center' },
  useLocationLink: { color: COLORS.primary, fontSize: FONTS.sizes.base, fontWeight: '700' },
  subLabel: { fontSize: FONTS.sizes.sm, color: COLORS.text, fontWeight: '700', textAlign: 'right' },
  locationRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: SPACING.sm },
  locationIcon: { fontSize: 16 },
  locationName: { fontSize: FONTS.sizes.base, fontWeight: '600', color: COLORS.text },
  locationAddress: { fontSize: FONTS.sizes.sm, color: COLORS.gray500, textAlign: 'right' },
  label: { fontSize: FONTS.sizes.sm, color: COLORS.text, fontWeight: '600', textAlign: 'right' },
  inputRow: { flexDirection: 'row', gap: SPACING.md },
  inputLabel: { fontSize: FONTS.sizes.xs, color: COLORS.gray500, textAlign: 'right', marginBottom: 4 },
  inputSmall: {
    borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.base, paddingVertical: SPACING.sm,
    fontSize: FONTS.sizes.sm, color: COLORS.text,
  },
  labelsRow: { flexDirection: 'row', gap: SPACING.sm, flexWrap: 'wrap', justifyContent: 'flex-end' },
  labelChip: {
    paddingHorizontal: SPACING.base, paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full, borderWidth: 1.5, borderColor: COLORS.border,
  },
  labelChipActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primaryLight },
  labelChipText: { fontSize: FONTS.sizes.sm, color: COLORS.gray600 },
  labelChipTextActive: { color: COLORS.primary, fontWeight: '700' },
});
