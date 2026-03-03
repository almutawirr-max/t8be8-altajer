import React, { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
} from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../../../theme';
import { StatusBadge, ScreenHeader } from '../../../components';
import useStore from '../../../store/useStore';

const TABS = [
  { key: 'new', label: 'جديد' },
  { key: 'ready', label: 'جاهز' },
  { key: 'preparing', label: 'توصيل' },
  { key: 'delivered', label: 'مكتمل' },
];

export default function OrdersListScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('new');
  const orders = useStore((s) => s.orders);
  const acceptOrder = useStore((s) => s.acceptOrder);
  const rejectOrder = useStore((s) => s.rejectOrder);
  const markOrderReady = useStore((s) => s.markOrderReady);

  const tabOrders = orders.filter((o) => {
    if (activeTab === 'new') return o.status === 'new';
    if (activeTab === 'ready') return o.status === 'ready';
    if (activeTab === 'preparing') return o.status === 'preparing' || o.status === 'delivered';
    if (activeTab === 'delivered') return o.status === 'completed';
    return false;
  });

  const getTabCount = (key) => {
    if (key === 'new') return orders.filter((o) => o.status === 'new').length;
    if (key === 'ready') return orders.filter((o) => o.status === 'ready').length;
    return null;
  };

  const renderOrder = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.orderTime}>
          {item.status === 'new' ? `04:32` : item.status === 'preparing' ? '12 دقيقة' : ''} {item.status === 'preparing' ? 'جاهز' : ''}
        </Text>
        <View style={styles.cardHeaderRight}>
          <StatusBadge status={item.status} />
          <Text style={styles.orderNumber}>رقم الطلب {item.orderNumber}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.orderMeta}>بكتب  •  {item.deliveryMethod === 'استلام' ? 'بلتقط' : 'توصيل المنصة'}</Text>
        <Text style={styles.customerName}>{item.customerName}</Text>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.orderTotal}>﷼ {item.subtotal}</Text>
        <Text style={styles.orderItems}>{item.items.reduce((a, i) => a + i.qty, 0)} عناصر</Text>
      </View>

      <View style={styles.cardActions}>
        {item.status === 'new' && (
          <>
            <TouchableOpacity
              style={styles.actionBtnReject}
              onPress={() => rejectOrder(item.id)}
            >
              <Text style={styles.actionBtnRejectText}>رفض</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionBtnAccept}
              onPress={() => {
                acceptOrder(item.id);
                navigation.navigate('OrderDetails', { orderId: item.id });
              }}
            >
              <Text style={styles.actionBtnAcceptText}>قبول</Text>
            </TouchableOpacity>
          </>
        )}
        {item.status === 'preparing' && (
          <>
            <TouchableOpacity
              style={styles.actionBtnDetails}
              onPress={() => navigation.navigate('OrderDetails', { orderId: item.id })}
            >
              <Text style={styles.actionBtnDetailsText}>عرض التفاصيل</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionBtnAccept}
              onPress={() => markOrderReady(item.id)}
            >
              <Text style={styles.actionBtnAcceptText}>ضع علامة "جاهز"</Text>
            </TouchableOpacity>
          </>
        )}
        {item.status === 'ready' && (
          <TouchableOpacity
            style={[styles.actionBtnAccept, { flex: 1 }]}
            onPress={() => navigation.navigate('OrderHandover', { orderId: item.id })}
          >
            <Text style={styles.actionBtnAcceptText}>تسليم الطلب</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>الطلبات</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {TABS.map((tab) => {
          const count = getTabCount(tab.key);
          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, activeTab === tab.key && styles.tabActive]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
                {tab.label}{count != null ? ` (${count})` : ''}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <FlatList
        data={tabOrders}
        keyExtractor={(i) => i.id}
        renderItem={renderOrder}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyText}>لا توجد طلبات</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: {
    paddingHorizontal: SPACING.base, paddingVertical: SPACING.md,
    borderBottomWidth: 1, borderBottomColor: COLORS.gray100,
  },
  screenTitle: { fontSize: FONTS.sizes.xl, fontWeight: '800', color: COLORS.text, textAlign: 'right' },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
    gap: SPACING.sm,
    backgroundColor: COLORS.gray100,
    borderRadius: RADIUS.full,
    margin: SPACING.base,
  },
  tab: {
    flex: 1, paddingVertical: SPACING.sm,
    alignItems: 'center', borderRadius: RADIUS.full,
  },
  tabActive: { backgroundColor: COLORS.white, ...SHADOWS.sm },
  tabText: { fontSize: 12, color: COLORS.gray500, fontWeight: '500' },
  tabTextActive: { color: COLORS.text, fontWeight: '700' },
  list: { padding: SPACING.base, gap: SPACING.md, paddingBottom: SPACING.xxxl },
  card: {
    borderWidth: 1, borderColor: COLORS.border,
    borderRadius: RADIUS.lg, padding: SPACING.base,
    gap: SPACING.sm, backgroundColor: COLORS.white, ...SHADOWS.sm,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardHeaderRight: { flexDirection: 'row', gap: SPACING.sm, alignItems: 'center' },
  orderNumber: { fontSize: FONTS.sizes.base, fontWeight: '700', color: COLORS.text },
  orderTime: { fontSize: FONTS.sizes.xs, color: COLORS.gray400 },
  cardBody: { alignItems: 'flex-end', gap: 2 },
  customerName: { fontSize: FONTS.sizes.sm, fontWeight: '600', color: COLORS.text },
  orderMeta: { fontSize: FONTS.sizes.xs, color: COLORS.gray500 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  orderTotal: { fontSize: FONTS.sizes.base, fontWeight: '600', color: COLORS.text },
  orderItems: { fontSize: FONTS.sizes.xs, color: COLORS.gray500 },
  cardActions: { flexDirection: 'row', gap: SPACING.md, marginTop: SPACING.sm },
  actionBtnAccept: {
    flex: 1, backgroundColor: COLORS.primary, borderRadius: RADIUS.full,
    paddingVertical: SPACING.sm + 2, alignItems: 'center',
  },
  actionBtnAcceptText: { color: COLORS.white, fontWeight: '700', fontSize: FONTS.sizes.sm },
  actionBtnReject: {
    flex: 1, borderWidth: 1.5, borderColor: COLORS.primary,
    borderRadius: RADIUS.full, paddingVertical: SPACING.sm + 2, alignItems: 'center',
  },
  actionBtnRejectText: { color: COLORS.primary, fontWeight: '700', fontSize: FONTS.sizes.sm },
  actionBtnDetails: {
    flex: 1, borderWidth: 1.5, borderColor: COLORS.border,
    borderRadius: RADIUS.full, paddingVertical: SPACING.sm + 2, alignItems: 'center',
  },
  actionBtnDetailsText: { color: COLORS.text, fontWeight: '600', fontSize: FONTS.sizes.sm },
  emptyState: { flex: 1, alignItems: 'center', paddingTop: SPACING.xxxl, gap: SPACING.base },
  emptyIcon: { fontSize: 48 },
  emptyText: { fontSize: FONTS.sizes.base, color: COLORS.gray400 },
});
