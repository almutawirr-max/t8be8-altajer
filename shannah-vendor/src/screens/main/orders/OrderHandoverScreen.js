import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../../../theme';
import { PrimaryButton, StatusBadge, Card } from '../../../components';
import useStore from '../../../store/useStore';

export default function OrderHandoverScreen({ navigation, route }) {
  const { orderId } = route.params;
  const orders = useStore((s) => s.orders);
  const handoverOrder = useStore((s) => s.handoverOrder);

  const order = orders.find((o) => o.id === orderId);
  if (!order) return null;

  const isRiderHandover = order.deliveryMethod !== 'استلام';

  const handleHandover = () => {
    handoverOrder(orderId);
    navigation.navigate('OrderCompleted', { orderId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <StatusBadge status={order.status} />
        <Text style={styles.orderTitle}>رقم الطلب {order.orderNumber}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>→  تفاصيل الطلب</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.timerBanner}>
        <Text style={styles.timerText}>{isRiderHandover ? '08:34' : '06:34'}</Text>
        <Text style={styles.timerLabel}>
          {isRiderHandover ? 'وصول مندوب التوصيل خلال:' : 'وصول المستلم خلال:'}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Rider info (if delivery) */}
        {isRiderHandover && order.rider && (
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
                <Text style={styles.personMeta}>
                  {order.rider.vehicle} {order.rider.plate}
                </Text>
                <View style={styles.ratingRow}>
                  <Text style={styles.ratingText}>
                    ★ {order.rider.rating} ({order.rider.reviews})
                  </Text>
                </View>
                <Text style={styles.personName}>{order.rider.name}</Text>
              </View>
              <View style={styles.avatarPlaceholder}><Text>👤</Text></View>
            </View>
          </Card>
        )}

        {/* Customer */}
        <Card>
          <Text style={styles.sectionTitle}>عميل</Text>
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
              <Text style={styles.personMeta}>{order.customerPhone}</Text>
              <Text style={styles.personName}>{order.customerName}</Text>
            </View>
            <View style={styles.avatarPlaceholder}><Text>👤</Text></View>
          </View>
        </Card>

        {/* Order photo */}
        <Card>
          <Text style={styles.sectionTitle}>صورة الطلب</Text>
          <View style={styles.photoUpload}>
            <Text style={styles.photoIcon}>⬆️</Text>
            <TouchableOpacity style={styles.uploadBtn}>
              <Text style={styles.uploadBtnText}>ارفاق</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          title={isRiderHandover ? 'التسليم لمندوب التوصيل' : 'التسليم لمندوب التوصيل'}
          onPress={handleHandover}
        />
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
  orderTitle: { fontSize: FONTS.sizes.base, fontWeight: '700', color: COLORS.text },
  backArrow: { fontSize: FONTS.sizes.sm, color: COLORS.gray500 },
  timerBanner: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: SPACING.base, backgroundColor: COLORS.primaryLight,
    borderWidth: 1, borderColor: COLORS.primary,
  },
  timerText: { fontSize: FONTS.sizes.lg, fontWeight: '800', color: COLORS.primary },
  timerLabel: { fontSize: FONTS.sizes.sm, color: COLORS.primary },
  content: { padding: SPACING.base, gap: SPACING.md, paddingBottom: SPACING.xxxl },
  sectionTitle: { fontSize: FONTS.sizes.base, fontWeight: '800', color: COLORS.text, textAlign: 'right', marginBottom: SPACING.sm },
  personRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  personInfo: { flex: 1, alignItems: 'flex-end', gap: 4 },
  personName: { fontSize: FONTS.sizes.base, fontWeight: '700', color: COLORS.text },
  personMeta: { fontSize: FONTS.sizes.xs, color: COLORS.gray500 },
  ratingRow: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { fontSize: FONTS.sizes.xs, color: COLORS.warning, fontWeight: '600' },
  personActions: { flexDirection: 'row', gap: SPACING.sm },
  actionChip: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs, borderRadius: RADIUS.full, borderWidth: 1.5, borderColor: COLORS.primary },
  actionChipText: { color: COLORS.primary, fontSize: FONTS.sizes.xs, fontWeight: '600' },
  avatarPlaceholder: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.gray200, alignItems: 'center', justifyContent: 'center' },
  photoUpload: {
    height: 120, borderRadius: RADIUS.md, borderWidth: 1.5, borderColor: COLORS.border,
    borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', gap: SPACING.sm,
    backgroundColor: COLORS.gray100,
  },
  photoIcon: { fontSize: 28 },
  uploadBtn: { backgroundColor: COLORS.primary, paddingHorizontal: SPACING.base, paddingVertical: SPACING.xs, borderRadius: RADIUS.full },
  uploadBtnText: { color: COLORS.white, fontSize: FONTS.sizes.sm, fontWeight: '600' },
  footer: { padding: SPACING.base, backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: COLORS.gray200 },
});
