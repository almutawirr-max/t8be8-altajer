import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../../../theme';
import { PrimaryButton, TabSelector } from '../../../components';
import useStore from '../../../store/useStore';

const TABS = [
  { key: 'transactions', label: 'المعاملات' },
  { key: 'payments', label: 'المدفوعات' },
  { key: 'fees', label: 'مصاريف' },
];

export default function WalletScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('transactions');
  const transactions = useStore((s) => s.transactions);
  const balance = useStore((s) => s.balance);
  const todayEarnings = useStore((s) => s.todayEarnings);

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionLeft}>
        <Text style={styles.transactionStatus}>
          {item.status === 'pending' ? 'قيد الانتظار' : 'مكتمل'}
        </Text>
        <Text style={styles.transactionAmount}>+ ﷼ {item.amount.toFixed(2)}</Text>
      </View>
      <View style={styles.transactionRight}>
        <Text style={styles.transactionTime}>{item.time}</Text>
        <Text style={styles.transactionCustomer}>{item.customer}</Text>
        {item.orderId && <Text style={styles.transactionOrder}>رقم الطلب {item.orderId}</Text>}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>محفظة</Text>
        <Text style={styles.screenSubtitle}>المحفظة والتمويل</Text>
      </View>

      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>الرصيد المتاح</Text>
        <Text style={styles.balanceAmount}>﷼ {balance.toFixed(2)}</Text>
        <View style={styles.earningsRow}>
          <Text style={styles.earningsText}>↑ ﷼ {todayEarnings.toFixed(2)} ربح اليوم</Text>
        </View>
        <PrimaryButton
          title="طلب صرف الأموال"
          onPress={() => navigation.navigate('PaymentDetails')}
          style={styles.payoutBtn}
        />
      </View>

      {/* Tabs */}
      <View style={{ paddingHorizontal: SPACING.base, paddingVertical: SPACING.sm }}>
        <TabSelector tabs={TABS} selected={activeTab} onSelect={setActiveTab} />
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(i) => i.id}
        renderItem={renderTransaction}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>لا توجد معاملات</Text>
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
  screenSubtitle: { fontSize: FONTS.sizes.sm, color: COLORS.gray500, textAlign: 'right' },
  balanceCard: {
    margin: SPACING.base,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    ...SHADOWS.md,
    alignItems: 'flex-end',
  },
  balanceLabel: { fontSize: FONTS.sizes.sm, color: COLORS.gray500 },
  balanceAmount: { fontSize: 36, fontWeight: '900', color: COLORS.text, marginVertical: SPACING.xs },
  earningsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.base },
  earningsText: { fontSize: FONTS.sizes.sm, color: COLORS.success, fontWeight: '600' },
  payoutBtn: { alignSelf: 'stretch' },
  list: { paddingHorizontal: SPACING.base, paddingBottom: SPACING.xxxl },
  separator: { height: 1, backgroundColor: COLORS.gray100 },
  transactionItem: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: SPACING.base,
  },
  transactionLeft: { alignItems: 'flex-start', gap: 4 },
  transactionRight: { alignItems: 'flex-end', gap: 2 },
  transactionOrder: { fontSize: FONTS.sizes.base, fontWeight: '700', color: COLORS.text },
  transactionCustomer: { fontSize: FONTS.sizes.sm, color: COLORS.gray500 },
  transactionTime: { fontSize: FONTS.sizes.xs, color: COLORS.gray400 },
  transactionAmount: { fontSize: FONTS.sizes.base, fontWeight: '700', color: COLORS.success },
  transactionStatus: {
    fontSize: FONTS.sizes.xs, color: COLORS.warning,
    borderWidth: 1, borderColor: COLORS.warning,
    paddingHorizontal: SPACING.sm, paddingVertical: 2,
    borderRadius: RADIUS.full, fontWeight: '600',
  },
  emptyState: { alignItems: 'center', padding: SPACING.xxl },
  emptyText: { fontSize: FONTS.sizes.base, color: COLORS.gray400 },
});
