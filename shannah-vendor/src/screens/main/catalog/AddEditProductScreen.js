import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../../../theme';
import { PrimaryButton, AppInput, ScreenHeader } from '../../../components';
import useStore from '../../../store/useStore';
import { DAYS } from '../../../data/mockData';

export default function AddEditProductScreen({ navigation, route }) {
  const { productId } = route.params || {};
  const products = useStore((s) => s.products);
  const addProduct = useStore((s) => s.addProduct);
  const updateProduct = useStore((s) => s.updateProduct);

  const existing = productId ? products.find((p) => p.id === productId) : null;

  const [name, setName] = useState(existing?.name || '');
  const [price, setPrice] = useState(existing?.price?.toString() || '');
  const [capacity, setCapacity] = useState(existing?.dailyCapacity?.toString() || '');
  const [description, setDescription] = useState(existing?.description || '');
  const [type, setType] = useState(existing?.type || 'ولائم');
  const [availability, setAvailability] = useState(existing?.availability || DAYS.slice(0, 6));

  const toggleDay = (day) => {
    setAvailability((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSave = () => {
    const product = {
      name, price: parseFloat(price), dailyCapacity: parseInt(capacity),
      description, type, availability, addons: [], image: null,
    };
    if (existing) {
      updateProduct(productId, product);
    } else {
      addProduct(product);
    }
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScreenHeader
        title={existing ? 'تحرير منتج' : 'إضافة منتج'}
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.sectionTitle}>معلومات المنتج</Text>

        {/* Image */}
        <View style={styles.imageUploadRow}>
          <View>
            <Text style={styles.label}>صورة المنتج</Text>
          </View>
          <TouchableOpacity style={styles.imageBox}>
            <Text style={styles.uploadIcon}>⬆️</Text>
            <TouchableOpacity style={styles.uploadBtn}>
              <Text style={styles.uploadBtnText}>{existing ? 'يحرر' : 'رفع'}</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>اسم المنتج</Text>
        <AppInput
          placeholder="على سبيل المثال، البرياني، دجاج تيكا"
          value={name}
          onChangeText={setName}
        />

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>الطاقة الاستيعابية اليومية</Text>
            <AppInput placeholder="20" value={capacity} onChangeText={setCapacity} keyboardType="numeric" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>السعر</Text>
            <AppInput placeholder="0.00" value={price} onChangeText={setPrice} keyboardType="decimal-pad" />
          </View>
        </View>

        <Text style={styles.label}>الوصف</Text>
        <AppInput
          placeholder="صف المكونات وطريقة التحضير."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>نوع المنتج</Text>
        <View style={styles.typeRow}>
          {['ولائم', 'وجبات'].map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.typeChip, type === t && styles.typeChipActive]}
              onPress={() => setType(t)}
            >
              <Text style={[styles.typeText, type === t && styles.typeTextActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>إضافات (اختيارية)</Text>
        <TouchableOpacity style={styles.addonsBtn}>
          <Text style={styles.addonsBtnText}>+ إضافة خيارات إضافية</Text>
        </TouchableOpacity>

        <Text style={styles.label}>التوافر</Text>
        <View style={styles.daysRow}>
          {DAYS.map((day) => (
            <TouchableOpacity
              key={day}
              style={[styles.dayChip, availability.includes(day) && styles.dayChipActive]}
              onPress={() => toggleDay(day)}
            >
              <Text style={[styles.dayText, availability.includes(day) && styles.dayTextActive]}>
                {day.slice(0, 3)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <PrimaryButton
          title="نشر"
          onPress={handleSave}
          style={{ marginTop: SPACING.base }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: SPACING.xl, gap: SPACING.sm, paddingBottom: SPACING.xxxl },
  sectionTitle: { fontSize: FONTS.sizes.base, fontWeight: '700', color: COLORS.text, textAlign: 'right' },
  label: { fontSize: FONTS.sizes.sm, color: COLORS.text, fontWeight: '600', textAlign: 'right', marginTop: SPACING.sm },
  imageUploadRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  imageBox: {
    width: 90, height: 90, borderRadius: RADIUS.md,
    borderWidth: 1.5, borderColor: COLORS.border, borderStyle: 'dashed',
    alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.gray100, gap: 4,
  },
  uploadIcon: { fontSize: 20 },
  uploadBtn: { backgroundColor: COLORS.primary, paddingHorizontal: SPACING.sm, paddingVertical: 3, borderRadius: RADIUS.full },
  uploadBtnText: { color: COLORS.white, fontSize: 11, fontWeight: '600' },
  row: { flexDirection: 'row', gap: SPACING.md },
  typeRow: { flexDirection: 'row', gap: SPACING.md },
  typeChip: {
    flex: 1, paddingVertical: SPACING.sm,
    borderWidth: 1.5, borderColor: COLORS.border,
    borderRadius: RADIUS.md, alignItems: 'center',
  },
  typeChipActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primaryLight },
  typeText: { fontSize: FONTS.sizes.sm, color: COLORS.gray600, fontWeight: '500' },
  typeTextActive: { color: COLORS.primary, fontWeight: '700' },
  addonsBtn: {
    borderWidth: 1.5, borderColor: COLORS.border, borderRadius: RADIUS.md,
    padding: SPACING.base, alignItems: 'center',
  },
  addonsBtnText: { color: COLORS.gray500, fontSize: FONTS.sizes.sm },
  daysRow: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  dayChip: {
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full, borderWidth: 1.5, borderColor: COLORS.border, backgroundColor: COLORS.white,
  },
  dayChipActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primary },
  dayText: { fontSize: FONTS.sizes.xs, color: COLORS.gray600, fontWeight: '500' },
  dayTextActive: { color: COLORS.white, fontWeight: '700' },
});
