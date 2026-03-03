import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../../../theme';
import { PrimaryButton, ScreenHeader, StatusBadge, Card } from '../../../components';
import useStore from '../../../store/useStore';

export default function OrderPreparationScreen({ navigation, route }) {
  const { orderId } = route.params;
  const orders = useStore((s) => s.orders);
  const togglePrepItem = useStore((s) => s.togglePrepItem);
  const markOrderReady = useStore((s) => s.markOrderReady);

  const order = orders.find((o) => o.id === orderId);
  if (!order) return null;

  const allDone = order.prepCheckList.every((i) => i.done);

  const handleMarkReady = () => {
    markOrderReady(orderId);
    navigation.navigate('OrderHandover', { orderId });
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
        <Text style={styles.timerText}>14:34</Text>
        <Text style={styles.timerLabel}>الوقت المتبقي للتحضير:</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Customer */}
        <Card>
          <Text style={styles.sectionTitle}>عميل</Text>
          <View style={styles.customerRow}>
            <View style={styles.customerActions}>
              <TouchableOpacity style={styles.actionChip}>
                <Text style={styles.actionChipText}>رسالة</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionChip}>
                <Text style={styles.actionChipText}>اتصال</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.customerInfo}>
              <Text style={styles.customerPhone}>{order.customerPhone}</Text>
              <Text style={styles.customerName}>{order.customerName}</Text>
            </View>
            <View style={styles.avatarPlaceholder}><Text>👤</Text></View>
          </View>
        </Card>

        {/* Prep Checklist */}
        <Card>
          <Text style={styles.sectionTitle}>قائمة التحضير</Text>
          {order.prepCheckList.map((item) => (
            <View key={item.id} style={styles.prepItem}>
              <Switch
                value={item.done}
                onValueChange={() => togglePrepItem(orderId, item.id)}
                trackColor={{ true: COLORS.primary }}
                thumbColor={COLORS.white}
              />
              <View style={styles.prepItemImagePlaceholder}><Text>🍽️</Text></View>
              <Text style={styles.prepItemName}>{item.name}</Text>
            </View>
          ))}
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          title='ضع علامة "جاهز"'
          onPress={handleMarkReady}
          disabled={!allDone}
          style={!allDone ? { opacity: 0.5 } : {}}
        />
        <PrimaryButton
          title="زيادة وقت تحضير الطلب (+10 دقائق)"
          outline
          onPress={() => {}}
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
  customerRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  customerInfo: { flex: 1, alignItems: 'flex-end', gap: 4 },
  customerName: { fontSize: FONTS.sizes.base, fontWeight: '700', color: COLORS.text },
  customerPhone: { fontSize: FONTS.sizes.sm, color: COLORS.gray500 },
  customerActions: { flexDirection: 'row', gap: SPACING.sm },
  actionChip: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs, borderRadius: RADIUS.full, borderWidth: 1.5, borderColor: COLORS.primary },
  actionChipText: { color: COLORS.primary, fontSize: FONTS.sizes.xs, fontWeight: '600' },
  avatarPlaceholder: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.gray200, alignItems: 'center', justifyContent: 'center' },
  prepItem: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, paddingVertical: SPACING.sm },
  prepItemImagePlaceholder: { width: 40, height: 40, borderRadius: RADIUS.md, backgroundColor: COLORS.gray100, alignItems: 'center', justifyContent: 'center' },
  prepItemName: { flex: 1, fontSize: FONTS.sizes.sm, color: COLORS.text, textAlign: 'right', fontWeight: '500' },
  footer: { padding: SPACING.base, gap: SPACING.md, backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: COLORS.gray200 },
});
