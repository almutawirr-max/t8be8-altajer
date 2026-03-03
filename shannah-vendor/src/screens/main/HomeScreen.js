import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch,
} from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../../theme';
import { StatusBadge } from '../../components';
import useStore from '../../store/useStore';

const formatTime = (date) => {
  const diff = Math.floor((Date.now() - new Date(date)) / 60000);
  if (diff < 1) return 'قبل دقيقة واحدة';
  if (diff < 60) return `قبل ${diff} دقيقة`;
  return `قبل ${Math.floor(diff / 60)} ساعة`;
};

export default function HomeScreen({ navigation }) {
  const store = useStore((s) => s.store);
  const orders = useStore((s) => s.orders);
  const toggleOnline = useStore((s) => s.toggleStoreOnline);

  const activeOrders = orders.filter((o) => ['new', 'preparing', 'ready'].includes(o.status));

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity>
            <Text style={styles.headerIcon}>▶</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.headerIcon}>🔔</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.headerRight}>
          <View>
            <Text style={styles.storeName}>{store.name}</Text>
            <View style={styles.statusRow}>
              <Switch
                value={store.isOnline}
                onValueChange={toggleOnline}
                trackColor={{ true: COLORS.success, false: COLORS.gray300 }}
                thumbColor={COLORS.white}
                style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
              />
              <View style={[styles.statusDot, { backgroundColor: store.isOnline ? COLORS.success : COLORS.gray400 }]} />
              <Text style={[styles.statusText, { color: store.isOnline ? COLORS.success : COLORS.gray400 }]}>
                {store.isOnline ? 'متصل' : 'غير متصل'}
              </Text>
            </View>
          </View>
          <View style={styles.storeLogo}>
            <Text style={styles.storeLogoText}>🍽️</Text>
          </View>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>مبيعات اليوم</Text>
          <Text style={styles.statValue}>﷼ {store.todaySales}</Text>
          <Text style={styles.statSub}>{store.todayOrders} طلبات</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>مبيعات اليوم</Text>
          <Text style={styles.statValue}>﷼ {store.todaySales}</Text>
          <Text style={styles.statSub}>{store.todayOrders} طلبات</Text>
        </View>
      </View>

      {/* Active Orders */}
      <Text style={styles.sectionTitle}>الطلبات النشطة</Text>
      {activeOrders.length === 0 ? (
        <View style={styles.emptyOrders}>
          <Text style={styles.emptyText}>لا توجد طلبات نشطة حالياً</Text>
        </View>
      ) : (
        activeOrders.map((order) => (
          <TouchableOpacity
            key={order.id}
            style={styles.orderCard}
            onPress={() => navigation.navigate('OrderDetails', { orderId: order.id })}
          >
            <View style={styles.orderCardRow}>
              <Text style={styles.orderTime}>{formatTime(order.createdAt)}</Text>
              <Text style={styles.orderNumber}>رقم الطلب: sh-{order.orderNumber}</Text>
            </View>
            <View style={styles.orderCardRow}>
              <Text style={styles.orderAmount}>﷼ {order.total}</Text>
              <StatusBadge status={order.status} />
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { paddingBottom: SPACING.xxxl },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.base,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  headerLeft: { flexDirection: 'row', gap: SPACING.base, alignItems: 'center' },
  headerIcon: { fontSize: 20 },
  headerRight: { flexDirection: 'row', gap: SPACING.md, alignItems: 'center' },
  storeLogo: {
    width: 44, height: 44, borderRadius: RADIUS.md,
    backgroundColor: COLORS.gray100, alignItems: 'center', justifyContent: 'center',
  },
  storeLogoText: { fontSize: 24 },
  storeName: { fontSize: FONTS.sizes.base, fontWeight: '700', color: COLORS.text, textAlign: 'right' },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 4, justifyContent: 'flex-end' },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { fontSize: FONTS.sizes.xs, fontWeight: '600' },
  statsRow: {
    flexDirection: 'row',
    padding: SPACING.base,
    gap: SPACING.md,
  },
  statCard: {
    flex: 1,
    borderWidth: 1, borderColor: COLORS.border,
    borderRadius: RADIUS.lg, padding: SPACING.base,
    alignItems: 'flex-end',
  },
  statLabel: { fontSize: FONTS.sizes.sm, color: COLORS.gray500, marginBottom: 4 },
  statValue: { fontSize: FONTS.sizes.xl, fontWeight: '800', color: COLORS.text },
  statSub: { fontSize: FONTS.sizes.xs, color: COLORS.gray400, marginTop: 2 },
  sectionTitle: {
    fontSize: FONTS.sizes.lg, fontWeight: '800', color: COLORS.text,
    paddingHorizontal: SPACING.base, paddingVertical: SPACING.md, textAlign: 'right',
  },
  orderCard: {
    marginHorizontal: SPACING.base, marginBottom: SPACING.md,
    borderWidth: 1, borderColor: COLORS.border,
    borderRadius: RADIUS.lg, padding: SPACING.base,
    gap: SPACING.sm, backgroundColor: COLORS.white, ...SHADOWS.sm,
  },
  orderCardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  orderNumber: { fontSize: FONTS.sizes.base, fontWeight: '700', color: COLORS.text },
  orderTime: { fontSize: FONTS.sizes.xs, color: COLORS.gray400 },
  orderAmount: { fontSize: FONTS.sizes.base, fontWeight: '600', color: COLORS.text },
  emptyOrders: { alignItems: 'center', padding: SPACING.xxl },
  emptyText: { fontSize: FONTS.sizes.base, color: COLORS.gray400 },
});
