import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../../../theme';
import { PrimaryButton, AppInput, ScreenHeader } from '../../../components';
import useStore from '../../../store/useStore';
import { DAYS } from '../../../data/mockData';

const DELIVERY_OPTIONS = [
  { key: 'self', label: 'الاستلام الذاتي', desc: 'لا توجد رسوم توصيل، ويستلم العميل المبلغ بنفسه.' },
  { key: 'platform', label: 'توصيل', desc: 'يتولى سائقونا جميع عمليات التسليم' },
  { key: 'both', label: 'كلاهما', desc: 'دع العملاء يختارون عند الدفع' },
];

export default function StoreManagementScreen({ navigation }) {
  const store = useStore((s) => s.store);
  const updateStore = useStore((s) => s.updateStore);

  const [fullName, setFullName] = useState(store.ownerName);
  const [storeName, setStoreName] = useState(store.name);
  const [phone, setPhone] = useState(store.phone);
  const [description, setDescription] = useState(store.description);
  const [minOrder, setMinOrder] = useState(store.minOrder?.toString() || '');
  const [prepTime, setPrepTime] = useState('30');
  const [deliveryRadius, setDeliveryRadius] = useState('5');
  const [deliveryMethod, setDeliveryMethod] = useState('both');
  const [hours, setHours] = useState(
    Object.fromEntries(DAYS.map((d) => [d, { open: d !== 'الأحد', from: '9:00 AM', to: '8:00 PM' }]))
  );

  const toggleDay = (day) => {
    setHours((h) => ({ ...h, [day]: { ...h[day], open: !h[day].open } }));
  };

  const handleSave = () => {
    updateStore({ name: storeName, ownerName: fullName, phone, description });
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScreenHeader title="إدارة المتجر" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.sectionTitle}>معلومات المتجر</Text>

        {/* Cover Image */}
        <TouchableOpacity style={styles.coverBox}>
          <Text style={styles.editCoverText}>تحميل صورة الغلاف</Text>
        </TouchableOpacity>

        {/* Logo */}
        <View style={styles.logoRow}>
          <Text style={styles.label}>الشعار</Text>
          <View style={styles.logoBox}><Text>🍽️</Text></View>
          <TouchableOpacity style={styles.editLogoBtn}><Text style={styles.editLogoText}>تغيير الشعار</Text></TouchableOpacity>
        </View>

        <Text style={styles.label}>الاسم الكامل</Text>
        <AppInput value={fullName} onChangeText={setFullName} editable={false} />

        <Text style={styles.label}>اسم المتجر</Text>
        <AppInput value={storeName} onChangeText={setStoreName} />

        <Text style={styles.label}>رقم الاتصال</Text>
        <AppInput value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

        <Text style={styles.label}>الوصف</Text>
        <AppInput value={description} onChangeText={setDescription} multiline numberOfLines={3} />

        <View style={styles.divider} />
        <Text style={styles.sectionTitle}>تفضيل المتجر</Text>

        <Text style={styles.label}>الحد الأدنى لقيمة الطلب</Text>
        <AppInput value={minOrder} onChangeText={setMinOrder} keyboardType="numeric" />

        <Text style={styles.label}>متوسط وقت التحضير</Text>
        <AppInput value={prepTime} onChangeText={setPrepTime} keyboardType="numeric" />

        <Text style={styles.label}>نطاق التوصيل</Text>
        <AppInput value={deliveryRadius} onChangeText={setDeliveryRadius} keyboardType="numeric" />

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
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            />
            <Text style={styles.dayName}>{day}</Text>
          </View>
        ))}

        <PrimaryButton title="حفظ" onPress={handleSave} style={{ marginTop: SPACING.xl }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: SPACING.xl, gap: SPACING.sm, paddingBottom: SPACING.xxxl },
  sectionTitle: { fontSize: FONTS.sizes.base, fontWeight: '700', color: COLORS.text, textAlign: 'right', marginVertical: SPACING.sm },
  coverBox: {
    height: 100, backgroundColor: COLORS.gray200, borderRadius: RADIUS.lg,
    alignItems: 'center', justifyContent: 'center',
  },
  editCoverText: { color: COLORS.primary, fontWeight: '600', fontSize: FONTS.sizes.sm },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, justifyContent: 'flex-end' },
  logoBox: { width: 48, height: 48, borderRadius: RADIUS.md, backgroundColor: COLORS.gray100, alignItems: 'center', justifyContent: 'center' },
  editLogoBtn: { borderWidth: 1, borderColor: COLORS.primary, borderRadius: RADIUS.full, paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs },
  editLogoText: { color: COLORS.primary, fontSize: FONTS.sizes.xs, fontWeight: '600' },
  label: { fontSize: FONTS.sizes.sm, color: COLORS.text, fontWeight: '600', textAlign: 'right', marginTop: SPACING.sm },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: SPACING.md },
  deliveryOption: {
    borderWidth: 1.5, borderColor: COLORS.border, borderRadius: RADIUS.md,
    padding: SPACING.base, gap: 4,
  },
  deliveryOptionActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primaryLight },
  deliveryLabel: { fontSize: FONTS.sizes.base, fontWeight: '700', color: COLORS.text, textAlign: 'right' },
  deliveryLabelActive: { color: COLORS.primary },
  deliveryDesc: { fontSize: FONTS.sizes.xs, color: COLORS.gray500, textAlign: 'right' },
  dayRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: SPACING.sm },
  dayName: { fontSize: FONTS.sizes.sm, color: COLORS.text, fontWeight: '600', width: 70, textAlign: 'right' },
  dayHours: { fontSize: FONTS.sizes.xs, color: COLORS.gray500 },
});
