import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../../../theme';
import { PrimaryButton, StatusBadge, Card, Divider, RowItem } from '../../../components';
import useStore from '../../../store/useStore';

export default function OrderCompletedScreen({ navigation, route }) {
  const { orderId } = route.params;
  const orders = useStore((s) => s.orders);
  const order = orders.find((o) => o.id === orderId);
  if (!order) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.deliveredBadge}>
          <Text style={styles.deliveredBadgeText}>تم التوصيل</Text>
        </View>
        <Text style={styles.orderTitle}>رقم الطلب {order.orderNumber}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>→  تفاصيل الطلب</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.successBanner}>
          <Text style={styles.successTitle}>تم توصيل الطلب!</Text>
          <Text style={styles.successSubtitle}>تم تسليم طلبك بنجاح</Text>
        </View>

        <Card>
          <Text style={styles.sectionTitle}>ملخص الطلب</Text>
          <RowItem label="عميل" value={order.customerName} />
          <RowItem label="تاريخ الطلب" value="29-0-أكتوبر-2025" />
          <RowItem label="تم التسليم في" value="03:45 مساءً" />
          <RowItem label="المبلغ الإجمالي" value={`﷼ ${order.total}`} />
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>أرباحك</Text>
          <RowItem label="إجمالي الطلب" value={`${order.total}`} />
          <RowItem label="رسوم المنصة (5%)" value={`-${(order.total * 0.05).toFixed(1)}`} />
          <RowItem label="رسوم الدفع (2%)" value={`-${(order.total * 0.02).toFixed(2)}`} />
          <Divider />
          <RowItem
            label="صافي الأرباح"
            value={`${(order.total * 0.93).toFixed(2)}`}
            labelStyle={{ fontWeight: '800', color: COLORS.text }}
            valueStyle={{ fontWeight: '800', fontSize: FONTS.sizes.lg }}
          />
        </Card>

        <Card style={{ backgroundColor: COLORS.gray50 || COLORS.gray100 }}>
          <Text style={styles.paymentNote}>
            سيتم تسوية الأرباح الخاصة بهذا الطلب في دورة الدفع التالية للفترة من 28 أكتوبر إلى 5 نوفمبر.
          </Text>
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
  deliveredBadge: { backgroundColor: COLORS.success, paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs, borderRadius: RADIUS.full },
  deliveredBadgeText: { color: COLORS.white, fontSize: FONTS.sizes.xs, fontWeight: '700' },
  orderTitle: { fontSize: FONTS.sizes.base, fontWeight: '700', color: COLORS.text },
  backArrow: { fontSize: FONTS.sizes.sm, color: COLORS.gray500 },
  content: { padding: SPACING.base, gap: SPACING.md, paddingBottom: SPACING.xxxl },
  successBanner: {
    backgroundColor: COLORS.white, borderRadius: RADIUS.lg,
    padding: SPACING.lg, alignItems: 'center', gap: SPACING.sm,
  },
  successTitle: { fontSize: FONTS.sizes.xl, fontWeight: '800', color: COLORS.text },
  successSubtitle: { fontSize: FONTS.sizes.sm, color: COLORS.gray500 },
  sectionTitle: { fontSize: FONTS.sizes.base, fontWeight: '800', color: COLORS.text, textAlign: 'right', marginBottom: SPACING.md },
  paymentNote: { fontSize: FONTS.sizes.sm, color: COLORS.gray500, textAlign: 'right', lineHeight: 22 },
  footer: { padding: SPACING.base, backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: COLORS.gray200 },
});
