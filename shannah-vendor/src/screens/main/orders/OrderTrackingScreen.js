import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../../../theme';
import { PrimaryButton, Card, Divider } from '../../../components';
import useStore from '../../../store/useStore';

export default function OrderTrackingScreen({ navigation, route }) {
  const { orderId } = route.params;
  const orders = useStore((s) => s.orders);
  const order = orders.find((o) => o.id === orderId);
  if (!order) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.deliveryBadge}>
          <Text style={styles.deliveryBadgeText}>في طريقها للتسليم</Text>
        </View>
        <Text style={styles.orderTitle}>رقم الطلب {order.orderNumber}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>→  تفاصيل الطلب</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.trackingBanner}>
          <Text style={styles.trackingTitle}>مندوب التوصيب في الطريق</Text>
          <Text style={styles.trackingSubtitle}>وقت التوصيل المتوقع: 5-10 دقائق</Text>
        </View>

        {/* Map Placeholder */}
        <View style={styles.mapContainer}>
          <Text style={styles.mapPlaceholder}>🗺️</Text>
          <Text style={styles.mapText}>الرياض</Text>
        </View>

        {/* Rider */}
        {order.rider && (
          <Card>
            <Text style={styles.sectionTitle}>مندوب التوصيل</Text>
            <View style={styles.personRow}>
              <View style={styles.personActions}>
                <TouchableOpacity style={styles.actionChip}>
                  <Text style={styles.actionChipText}>رسالة</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionChip}>
                  <Text style={styles.actionChipText}>اتصال</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.personInfo}>
                <Text style={styles.ratingText}>★ {order.rider.rating} ({order.rider.reviews})</Text>
                <Text style={styles.personMeta}>{order.rider.vehicle} {order.rider.plate}</Text>
                <Text style={styles.personName}>{order.rider.name}</Text>
              </View>
              <View style={styles.avatar}><Text>👤</Text></View>
            </View>
          </Card>
        )}

        <Card>
          <Text style={styles.sectionTitle}>ملخص الطلب</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryValue}>﷼ {order.total}</Text>
            <Text style={styles.summaryLabel}>المبلغ الإجمالي</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryValue}>{order.address}</Text>
            <Text style={styles.summaryLabel}>عنوان التسليم</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.expandText}>تفاصيل المنح ∧</Text>
          </TouchableOpacity>
          {order.items.map((item, i) => (
            <Text key={i} style={styles.itemText}>{item.name} عدد {item.qty}</Text>
          ))}
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton title="تواصل مع الدعم" onPress={() => {}} outline />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.gray100 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: SPACING.base, paddingVertical: SPACING.md,
    backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: COLORS.gray100,
  },
  deliveryBadge: { backgroundColor: COLORS.success, paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs, borderRadius: RADIUS.full },
  deliveryBadgeText: { color: COLORS.white, fontSize: FONTS.sizes.xs, fontWeight: '700' },
  orderTitle: { fontSize: FONTS.sizes.base, fontWeight: '700', color: COLORS.text },
  backArrow: { fontSize: FONTS.sizes.sm, color: COLORS.gray500 },
  content: { gap: SPACING.md, paddingBottom: SPACING.xxxl },
  trackingBanner: {
    backgroundColor: COLORS.white, padding: SPACING.base, alignItems: 'center', gap: 4,
  },
  trackingTitle: { fontSize: FONTS.sizes.xl, fontWeight: '800', color: COLORS.text },
  trackingSubtitle: { fontSize: FONTS.sizes.sm, color: COLORS.gray500 },
  mapContainer: {
    height: 200, backgroundColor: COLORS.gray200,
    alignItems: 'center', justifyContent: 'center', gap: SPACING.sm,
  },
  mapPlaceholder: { fontSize: 64 },
  mapText: { fontSize: FONTS.sizes.base, color: COLORS.gray600, fontWeight: '600' },
  sectionTitle: { fontSize: FONTS.sizes.base, fontWeight: '800', color: COLORS.text, textAlign: 'right', marginBottom: SPACING.sm },
  personRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  personInfo: { flex: 1, alignItems: 'flex-end', gap: 4 },
  personName: { fontSize: FONTS.sizes.base, fontWeight: '700', color: COLORS.text },
  personMeta: { fontSize: FONTS.sizes.xs, color: COLORS.gray500 },
  ratingText: { fontSize: FONTS.sizes.xs, color: COLORS.warning, fontWeight: '600' },
  personActions: { flexDirection: 'row', gap: SPACING.sm },
  actionChip: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs, borderRadius: RADIUS.full, borderWidth: 1.5, borderColor: COLORS.primary },
  actionChipText: { color: COLORS.primary, fontSize: FONTS.sizes.xs, fontWeight: '600' },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.gray200, alignItems: 'center', justifyContent: 'center' },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: SPACING.sm },
  summaryLabel: { fontSize: FONTS.sizes.sm, color: COLORS.gray500 },
  summaryValue: { fontSize: FONTS.sizes.sm, color: COLORS.text, fontWeight: '500', flex: 1, textAlign: 'left' },
  expandText: { color: COLORS.primary, fontSize: FONTS.sizes.sm, fontWeight: '600', textAlign: 'left' },
  itemText: { fontSize: FONTS.sizes.sm, color: COLORS.gray500, textAlign: 'right', marginTop: 4 },
  footer: { padding: SPACING.base, backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: COLORS.gray200 },
});
