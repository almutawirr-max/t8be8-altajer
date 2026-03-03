import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../../../theme';
import { PrimaryButton, AppInput, ScreenHeader } from '../../../components';
import useStore from '../../../store/useStore';

export default function CreatePromoScreen({ navigation }) {
  const addPromotion = useStore((s) => s.addPromotion);
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState('percentage');
  const [discount, setDiscount] = useState('');
  const [maxDiscount, setMaxDiscount] = useState('');
  const [minOrder, setMinOrder] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [timeBased, setTimeBased] = useState(false);
  const [active, setActive] = useState(true);

  const handleCreate = () => {
    addPromotion({
      code, type: discountType,
      discount: parseFloat(discount), maxDiscount: parseFloat(maxDiscount),
      minOrder: parseFloat(minOrder), startDate, endDate,
      timeBased, active, used: 0, total: 100,
    });
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScreenHeader title="إنشاء قسيمة" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.label}>رمز القسيمة</Text>
        <AppInput placeholder="مثال: SAVE20" value={code} onChangeText={setCode} />

        <Text style={styles.label}>نوع الخصم</Text>
        <View style={styles.typeRow}>
          {[{ key: 'percentage', label: 'نسبة مئوية %' }, { key: 'fixed', label: 'مبلغ ثابت' }].map((t) => (
            <TouchableOpacity
              key={t.key}
              style={[styles.typeChip, discountType === t.key && styles.typeChipActive]}
              onPress={() => setDiscountType(t.key)}
            >
              {discountType === t.key && <View style={styles.radioActive} />}
              {discountType !== t.key && <View style={styles.radioInactive} />}
              <Text style={[styles.typeText, discountType === t.key && styles.typeTextActive]}>
                {t.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>الحد الأقصى للخصم</Text>
            <AppInput placeholder="100" value={maxDiscount} onChangeText={setMaxDiscount} keyboardType="numeric" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>تخفيض %</Text>
            <AppInput placeholder="20" value={discount} onChangeText={setDiscount} keyboardType="numeric" />
          </View>
        </View>

        <Text style={styles.label}>الحد الأدنى للإنفاق</Text>
        <AppInput placeholder="25.00" value={minOrder} onChangeText={setMinOrder} keyboardType="decimal-pad" />

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>تاريخ الانتهاء</Text>
            <AppInput placeholder="يوم-شهر-سنة" value={endDate} onChangeText={setEndDate} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>تاريخ البدء</Text>
            <AppInput placeholder="يوم-شهر-سنة" value={startDate} onChangeText={setStartDate} />
          </View>
        </View>

        <View style={styles.toggleRow}>
          <View>
            <Text style={styles.toggleLabel}>خصم قائم على الوقت</Text>
            <Text style={styles.toggleDesc}>التقديم متاح فقط خلال ساعات محددة</Text>
          </View>
          <Switch
            value={timeBased}
            onValueChange={setTimeBased}
            trackColor={{ true: COLORS.primary }}
            thumbColor={COLORS.white}
          />
        </View>

        {timeBased && (
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>تاريخ الانتهاء</Text>
              <AppInput placeholder="يوم-شهر-سنة" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>تاريخ البدء</Text>
              <AppInput placeholder="يوم-شهر-سنة" />
            </View>
          </View>
        )}

        <View style={styles.toggleRow}>
          <View>
            <Text style={styles.toggleLabel}>نشط</Text>
            <Text style={styles.toggleDesc}>القسيمة متاحة للاستخدام</Text>
          </View>
          <Switch
            value={active}
            onValueChange={setActive}
            trackColor={{ true: COLORS.primary }}
            thumbColor={COLORS.white}
          />
        </View>

        <PrimaryButton title="إنشاء قسيمة" onPress={handleCreate} style={{ marginTop: SPACING.base }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: SPACING.xl, gap: SPACING.sm, paddingBottom: SPACING.xxxl },
  label: { fontSize: FONTS.sizes.sm, color: COLORS.text, fontWeight: '600', textAlign: 'right' },
  typeRow: { flexDirection: 'row', gap: SPACING.md },
  typeChip: {
    flex: 1, flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    borderWidth: 1.5, borderColor: COLORS.border, borderRadius: RADIUS.full,
    padding: SPACING.md, justifyContent: 'center',
  },
  typeChipActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primaryLight },
  radioActive: { width: 16, height: 16, borderRadius: 8, backgroundColor: COLORS.primary, borderWidth: 4, borderColor: COLORS.primaryLight },
  radioInactive: { width: 16, height: 16, borderRadius: 8, borderWidth: 1.5, borderColor: COLORS.gray400 },
  typeText: { fontSize: FONTS.sizes.sm, color: COLORS.gray600 },
  typeTextActive: { color: COLORS.primary, fontWeight: '700' },
  row: { flexDirection: 'row', gap: SPACING.md },
  toggleRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.md, padding: SPACING.base,
  },
  toggleLabel: { fontSize: FONTS.sizes.sm, fontWeight: '700', color: COLORS.text, textAlign: 'right' },
  toggleDesc: { fontSize: FONTS.sizes.xs, color: COLORS.gray500, textAlign: 'right' },
});
