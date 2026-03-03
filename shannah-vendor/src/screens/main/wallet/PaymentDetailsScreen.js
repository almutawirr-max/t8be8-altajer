import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../../../theme';
import { PrimaryButton, ScreenHeader, Card, Divider, RowItem } from '../../../components';
import { MOCK_PAYMENT_DETAIL } from '../../../data/mockData';

export default function PaymentDetailsScreen({ navigation }) {
  const details = MOCK_PAYMENT_DETAIL;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.gray100 }}>
      <ScreenHeader title="ملخص المدفوعات" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.periodCard}>
          <Text style={styles.periodLabel}>فترة الدفع</Text>
          <Text style={styles.periodValue}>{details.period}</Text>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>تفاصيل الأرباح</Text>
          <RowItem label="إجمالي الطلبات" value={`${details.totalOrders} طلباً`} />
          <RowItem label="إجمالي المبيعات" value={`﷼ ${details.totalSales}`} />
          <RowItem label="رسوم المنصة (8%)" value={`﷼ ${details.platformFee}`} valueStyle={{ color: COLORS.error }} />
          <RowItem label="رسوم معالجة المدفوعات (10%)" value={`﷼ ${details.paymentFee}`} valueStyle={{ color: COLORS.error }} />
          <RowItem label="رسوم التوصيل" value={`﷼ ${details.deliveryFee}`} valueStyle={{ color: COLORS.error }} />
          <RowItem label="المبالغ المستردة" value={`﷼ ${details.refunds}`} valueStyle={{ color: COLORS.error }} />
          <Divider />
          <RowItem
            label="صافي الأرباح"
            value={`﷼ ${details.netEarnings}`}
            labelStyle={{ fontWeight: '800', color: COLORS.text }}
            valueStyle={{ fontWeight: '800', fontSize: FONTS.sizes.lg, color: COLORS.success }}
          />
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>وسيلة سحب الأرباح</Text>
          <View style={styles.bankRow}>
            <View style={styles.bankAvatar}><Text>🏦</Text></View>
            <View style={styles.bankInfo}>
              <Text style={styles.bankName}>الحساب المصرفي</Text>
              <Text style={styles.bankAccount}>{details.bankAccount}</Text>
            </View>
          </View>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>فاتورة ضريبية</Text>
          <Text style={styles.taxNote}>قم بتنزيل البيان المفصل للاحتفاظ به في سجلاتك</Text>
          <TouchableOpacity style={styles.downloadBtn}>
            <Text style={styles.downloadBtnText}>تحميل فاتورة بصيغة PDF</Text>
          </TouchableOpacity>
        </Card>

        <View style={styles.scheduledBanner}>
          <Text style={styles.scheduledIcon}>✅</Text>
          <Text style={styles.scheduledText}>تم تحديد موعد صرف الأرباح</Text>
          <Text style={styles.scheduledSubText}>يصل خلال يومين إلى ثلاثة أيام عمل</Text>
        </View>

        <PrimaryButton title="طلب صرف جديد" onPress={() => navigation.goBack()} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: SPACING.base, gap: SPACING.md, paddingBottom: SPACING.xxxl },
  periodCard: { alignItems: 'center', gap: SPACING.sm },
  periodLabel: { fontSize: FONTS.sizes.xs, color: COLORS.gray500 },
  periodValue: { fontSize: FONTS.sizes.base, fontWeight: '600', color: COLORS.text },
  sectionTitle: { fontSize: FONTS.sizes.base, fontWeight: '800', color: COLORS.text, textAlign: 'right', marginBottom: SPACING.md },
  bankRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  bankAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.gray100, alignItems: 'center', justifyContent: 'center' },
  bankInfo: { flex: 1, alignItems: 'flex-end' },
  bankName: { fontSize: FONTS.sizes.base, fontWeight: '700', color: COLORS.text },
  bankAccount: { fontSize: FONTS.sizes.sm, color: COLORS.gray500 },
  taxNote: { fontSize: FONTS.sizes.sm, color: COLORS.gray500, textAlign: 'right', marginBottom: SPACING.md },
  downloadBtn: {
    borderWidth: 1.5, borderColor: COLORS.primary, borderRadius: RADIUS.full,
    paddingVertical: SPACING.sm, alignItems: 'center',
  },
  downloadBtnText: { color: COLORS.primary, fontWeight: '700', fontSize: FONTS.sizes.sm },
  scheduledBanner: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.base,
    borderWidth: 1, borderColor: COLORS.success,
  },
  scheduledIcon: { fontSize: 20 },
  scheduledText: { fontSize: FONTS.sizes.sm, fontWeight: '700', color: COLORS.text, flex: 1, textAlign: 'right' },
  scheduledSubText: { fontSize: FONTS.sizes.xs, color: COLORS.gray500, textAlign: 'right' },
});
