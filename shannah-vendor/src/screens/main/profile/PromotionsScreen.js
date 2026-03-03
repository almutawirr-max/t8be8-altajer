import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../../../theme';
import { ScreenHeader } from '../../../components';
import useStore from '../../../store/useStore';

export default function PromotionsScreen({ navigation }) {
  const promotions = useStore((s) => s.promotions);
  const togglePromotion = useStore((s) => s.togglePromotion);

  const active = promotions.filter((p) => p.active);
  const scheduled = promotions.filter((p) => !p.active && p.timeBased);
  const special = [];

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScreenHeader title="العروض الترويجية" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Add Button */}
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate('CreatePromo')}
        >
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>

        {/* Active */}
        {active.length > 0 && (
          <>
            <Text style={styles.sectionLabel}>نشط</Text>
            {active.map((promo) => (
              <View key={promo.id} style={styles.promoCard}>
                <View style={styles.promoRow}>
                  <Switch
                    value={promo.active}
                    onValueChange={() => togglePromotion(promo.id)}
                    trackColor={{ true: COLORS.primary }}
                    thumbColor={COLORS.white}
                  />
                  <View style={styles.promoInfo}>
                    <Text style={styles.promoTitle}>{promo.code}</Text>
                    <Text style={styles.promoDetail}>
                      خصم {promo.discount}% على الطلبات التي تزيد قيمتها عن {promo.minOrder} ﷼
                    </Text>
                    {promo.endDate && (
                      <View style={styles.promoMeta}>
                        <Text style={styles.promoMetaText}>تاريخ الانتهاء: {promo.endDate}</Text>
                        <Text style={styles.promoMetaDot}>•</Text>
                        <Text style={styles.promoMetaText}>مستعمل: {promo.used}/{promo.total}</Text>
                      </View>
                    )}
                    <View style={styles.promoActions}>
                      <TouchableOpacity>
                        <Text style={styles.deleteText}>حذف</Text>
                      </TouchableOpacity>
                      <Text style={styles.actionSep}>|</Text>
                      <TouchableOpacity>
                        <Text style={styles.editText}>تحرير</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </>
        )}

        {/* Scheduled */}
        {scheduled.length > 0 && (
          <>
            <Text style={styles.sectionLabel}>مُجدول</Text>
            {scheduled.map((promo) => (
              <View key={promo.id} style={styles.promoCard}>
                <View style={styles.promoRow}>
                  <Switch
                    value={false}
                    onValueChange={() => togglePromotion(promo.id)}
                    trackColor={{ true: COLORS.primary }}
                    thumbColor={COLORS.white}
                  />
                  <View style={styles.promoInfo}>
                    <View style={styles.promoTitleRow}>
                      <View style={styles.pendingBadge}><Text style={styles.pendingText}>قيد الانتظار</Text></View>
                      <Text style={styles.promoTitle}>{promo.code}</Text>
                    </View>
                    <Text style={styles.promoDetail}>
                      خصم {promo.discount}% يومياً من الساعة 3 إلى 5 مساءً
                    </Text>
                    {promo.note && <Text style={styles.promoNote}>{promo.note}</Text>}
                    <View style={styles.promoActions}>
                      <TouchableOpacity>
                        <Text style={styles.deleteText}>حذف</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </>
        )}

        {/* Special Events */}
        <Text style={styles.sectionLabel}>فعاليات خاصة</Text>
        <View style={styles.specialCard}>
          <Text style={styles.specialTitle}>أسعار رمضان</Text>
          <Text style={styles.specialDesc}>تُطبق أسعار خاصة خلال شهر رمضان</Text>
          <TouchableOpacity style={styles.specialBtn}>
            <Text style={styles.specialBtnText}>تعديل اسعار العروض</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: SPACING.base, gap: SPACING.md, paddingBottom: SPACING.xxxl, alignItems: 'flex-end' },
  addBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-start',
  },
  addBtnText: { color: COLORS.white, fontSize: 24, fontWeight: '300' },
  sectionLabel: { fontSize: FONTS.sizes.sm, color: COLORS.gray500, fontWeight: '600', textAlign: 'right', alignSelf: 'flex-end' },
  promoCard: {
    width: '100%', borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.lg,
    padding: SPACING.base, ...SHADOWS.sm,
  },
  promoRow: { flexDirection: 'row', gap: SPACING.md, alignItems: 'flex-start' },
  promoInfo: { flex: 1, alignItems: 'flex-end', gap: 4 },
  promoTitleRow: { flexDirection: 'row', gap: SPACING.sm, alignItems: 'center' },
  promoTitle: { fontSize: FONTS.sizes.base, fontWeight: '700', color: COLORS.text },
  promoDetail: { fontSize: FONTS.sizes.sm, color: COLORS.gray500, textAlign: 'right' },
  promoMeta: { flexDirection: 'row', gap: SPACING.sm, alignItems: 'center' },
  promoMetaText: { fontSize: FONTS.sizes.xs, color: COLORS.gray400 },
  promoMetaDot: { color: COLORS.gray400 },
  promoNote: { fontSize: FONTS.sizes.xs, color: COLORS.gray400, textAlign: 'right' },
  promoActions: { flexDirection: 'row', gap: SPACING.sm, alignItems: 'center' },
  deleteText: { color: COLORS.error, fontSize: FONTS.sizes.sm, fontWeight: '600' },
  editText: { color: COLORS.primary, fontSize: FONTS.sizes.sm, fontWeight: '600' },
  actionSep: { color: COLORS.gray300 },
  pendingBadge: { backgroundColor: COLORS.gray200, paddingHorizontal: SPACING.sm, paddingVertical: 2, borderRadius: RADIUS.full },
  pendingText: { fontSize: 11, color: COLORS.gray600 },
  specialCard: {
    width: '100%', borderWidth: 1.5, borderColor: COLORS.border, borderRadius: RADIUS.lg,
    padding: SPACING.base, gap: SPACING.sm, alignItems: 'flex-end',
  },
  specialTitle: { fontSize: FONTS.sizes.base, fontWeight: '700', color: COLORS.text },
  specialDesc: { fontSize: FONTS.sizes.sm, color: COLORS.gray500 },
  specialBtn: {
    borderWidth: 1.5, borderColor: COLORS.primary, borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.xl, paddingVertical: SPACING.sm, alignSelf: 'stretch', alignItems: 'center',
  },
  specialBtnText: { color: COLORS.primary, fontSize: FONTS.sizes.sm, fontWeight: '700' },
});
