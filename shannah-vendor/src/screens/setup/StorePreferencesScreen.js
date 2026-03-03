import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../../theme';
import { PrimaryButton, AppInput, ScreenHeader } from '../../components';
import { DAYS } from '../../data/mockData';

const DELIVERY_OPTIONS = [
  { key: 'self', label: 'الاستلام الذاتي', desc: 'لا توجد رسوم توصيل، ويستلم العميل المبلغ بنفسه.' },
  { key: 'platform', label: 'توصيل', desc: 'يتولى سائقونا جميع عمليات التسليم' },
  { key: 'both', label: 'كلاهما', desc: 'دع العملاء يختارون عند الدفع' },
];

export default function StorePreferencesScreen({ navigation }) {
  const [minOrder, setMinOrder] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [deliveryRadius, setDeliveryRadius] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('both');
  const [hours, setHours] = useState(
    Object.fromEntries(DAYS.map((d) => [d, { open: d !== 'الأحد', from: '9:00 AM', to: '8:00 PM' }]))
  );

  const toggleDay = (day) => {
    setHours((h) => ({ ...h, [day]: { ...h[day], open: !h[day].open } }));
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScreenHeader title="أنشئ ملفك الشخصي" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.sectionTitle}>تفضيل المتجر</Text>

        <Text style={styles.label}>الحد الأدنى لقيمة الطلب</Text>
        <AppInput placeholder="أدخل قيمة الحد الأدنى للطلبات" value={minOrder} onChangeText={setMinOrder} keyboardType="numeric" />

        <Text style={styles.label}>متوسط وقت التحضير</Text>
        <AppInput placeholder="أدخل متوسط وقت التحضير بالدقائق" value={prepTime} onChangeText={setPrepTime} keyboardType="numeric" />

        <Text style={styles.label}>نطاق التوصيل</Text>
        <AppInput placeholder="أدخل نطاق التوصيل بالكيلومترات" value={deliveryRadius} onChangeText={setDeliveryRadius} keyboardType="numeric" />

        <Text style={styles.label}>طرق التوصيل</Text>
        {DELIVERY_OPTIONS.map((opt) => (
          <TouchableOpacity
            key={opt.key}
            style={[styles.deliveryOption, deliveryMethod === opt.key && styles.deliveryOptionActive]}
            onPress={() => setDeliveryMethod(opt.key)}
          >
            <Text style={[styles.deliveryLabel, deliveryMethod === opt.key && styles.deliveryLabelActive]}>
              {opt.label}
            </Text>
            <Text style={styles.deliveryDesc}>{opt.desc}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.label}>ساعات العمل</Text>
        {DAYS.map((day) => (
          <View key={day} style={styles.dayRow}>
            <Text style={styles.dayHours}>
              {hours[day].open ? `${hours[day].from} - ${hours[day].to}` : 'مغلق'}
            </Text>
            <Switch
              value={hours[day].open}
              onValueChange={() => toggleDay(day)}
              trackColor={{ true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
            <Text style={styles.dayName}>{day}</Text>
          </View>
        ))}

        <PrimaryButton
          title="التالي"
          onPress={() => navigation.navigate('SetupLocation')}
          style={{ marginTop: SPACING.xl }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: SPACING.xl, gap: SPACING.sm, paddingBottom: SPACING.xxxl },
  sectionTitle: { fontSize: FONTS.sizes.lg, fontWeight: '800', color: COLORS.text, textAlign: 'right', marginBottom: SPACING.base },
  label: { fontSize: FONTS.sizes.sm, color: COLORS.text, fontWeight: '600', textAlign: 'right', marginTop: SPACING.sm },
  deliveryOption: {
    borderWidth: 1.5, borderColor: COLORS.border, borderRadius: RADIUS.md,
    padding: SPACING.base, gap: 4,
  },
  deliveryOptionActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primaryLight },
  deliveryLabel: { fontSize: FONTS.sizes.base, fontWeight: '700', color: COLORS.text, textAlign: 'right' },
  deliveryLabelActive: { color: COLORS.primary },
  deliveryDesc: { fontSize: FONTS.sizes.xs, color: COLORS.gray500, textAlign: 'right' },
  dayRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
  },
  dayName: { fontSize: FONTS.sizes.sm, color: COLORS.text, fontWeight: '600', width: 70, textAlign: 'right' },
  dayHours: { fontSize: FONTS.sizes.xs, color: COLORS.gray500 },
});
