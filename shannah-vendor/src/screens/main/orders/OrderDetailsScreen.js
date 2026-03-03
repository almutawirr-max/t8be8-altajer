import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal,
} from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../../../theme';
import { PrimaryButton, StatusBadge, ScreenHeader, Divider, RowItem, Card } from '../../../components';
import useStore from '../../../store/useStore';
import { DECLINE_REASONS } from '../../../data/mockData';

export default function OrderDetailsScreen({ navigation, route }) {
  const { orderId } = route.params;
  const orders = useStore((s) => s.orders);
  const acceptOrder = useStore((s) => s.acceptOrder);
  const rejectOrder = useStore((s) => s.rejectOrder);
  const markOrderReady = useStore((s) => s.markOrderReady);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');

  const order = orders.find((o) => o.id === orderId);
  if (!order) return null;

  const handleAccept = () => {
    acceptOrder(orderId);
    navigation.navigate('OrderPreparation', { orderId });
  };

  const handleReject = () => setShowDeclineModal(true);

  const confirmReject = () => {
    rejectOrder(orderId, selectedReason || customReason);
    setShowDeclineModal(false);
    navigation.goBack();
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

      {order.status === 'new' && (
        <View style={styles.timerBanner}>
          <Text style={styles.timerText}>04:34</Text>
          <Text style={styles.timerLabel}>إلغاء تلقائي في خلال:</Text>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.content}>
        {/* Customer */}
        <Card style={styles.section}>
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
            <View style={styles.avatarPlaceholder}>
              <Text>👤</Text>
            </View>
          </View>
        </Card>

        {/* Order Summary */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>ملخص الطلب</Text>
          {order.items.map((item, i) => (
            <View key={i} style={styles.itemRow}>
              <Text style={styles.itemPrice}>﷼ {item.price}</Text>
              <Text style={styles.itemName}>{item.name} x {item.qty}</Text>
              <View style={styles.itemImagePlaceholder}>
                <Text>🍽️</Text>
              </View>
            </View>
          ))}
          <Divider />
          <RowItem label="المجموع الفرعي" value={`﷼ ${order.subtotal}`} />
          <RowItem label="التوصيل القياسي" value={`﷼ ${order.deliveryFee}`} />
          <RowItem label="ضريبة" value={`﷼ ${order.tax}`} />
          <Divider />
          <RowItem
            label="المجموع"
            value={`﷼ ${order.total}`}
            labelStyle={{ fontWeight: '800', color: COLORS.text }}
            valueStyle={{ fontWeight: '800', fontSize: FONTS.sizes.lg }}
          />
        </Card>

        {/* Delivery Details */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>تفاصيل التوصيل</Text>
          <RowItem label="طريقة الاستلام" value={order.deliveryMethod} />
          <RowItem label="الوقت المتوقع للتوصيل" value={order.expectedTime} />
          <RowItem label="العنوان" value={order.address} />
        </Card>

        {/* Notes */}
        {order.notes ? (
          <Card style={styles.notesCard}>
            <Text style={styles.sectionTitle}>التعليمات الخاصة</Text>
            <Text style={styles.notesText}>{order.notes}</Text>
          </Card>
        ) : null}
      </ScrollView>

      {/* Action Buttons */}
      {order.status === 'new' && (
        <View style={styles.footer}>
          <PrimaryButton title="قبول الطلب" onPress={handleAccept} />
          <PrimaryButton title="رفض" onPress={handleReject} outline />
        </View>
      )}

      {order.status === 'preparing' && (
        <View style={styles.footer}>
          <PrimaryButton
            title="عرض قائمة التحضير"
            onPress={() => navigation.navigate('OrderPreparation', { orderId })}
          />
        </View>
      )}

      {/* Decline Modal */}
      <Modal visible={showDeclineModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>سبب الرفض</Text>
            <Text style={styles.modalSubtitle}>يرجى تحديد سبب عدم قبولك لهذا الطلب</Text>
            {DECLINE_REASONS.map((reason) => (
              <TouchableOpacity
                key={reason}
                style={[styles.reasonOption, selectedReason === reason && styles.reasonOptionActive]}
                onPress={() => setSelectedReason(reason)}
              >
                <Text style={[styles.reasonText, selectedReason === reason && styles.reasonTextActive]}>
                  {reason}
                </Text>
              </TouchableOpacity>
            ))}
            <Text style={styles.reasonLabel}>سبب</Text>
            <View style={styles.reasonInput}>
              <Text style={{ color: COLORS.gray400, fontSize: FONTS.sizes.sm }}>أدخل السبب هنا...</Text>
            </View>
            <View style={styles.modalActions}>
              <PrimaryButton title="تأكيد الرفض" onPress={confirmReject} />
              <PrimaryButton title="الغاء" onPress={() => setShowDeclineModal(false)} outline />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.gray100 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  orderTitle: { fontSize: FONTS.sizes.base, fontWeight: '700', color: COLORS.text },
  backArrow: { fontSize: FONTS.sizes.sm, color: COLORS.gray500 },
  timerBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.base,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  timerText: { fontSize: FONTS.sizes.lg, fontWeight: '800', color: COLORS.error },
  timerLabel: { fontSize: FONTS.sizes.sm, color: COLORS.error },
  content: { padding: SPACING.base, gap: SPACING.md, paddingBottom: SPACING.xxxl },
  section: { gap: SPACING.md },
  sectionTitle: { fontSize: FONTS.sizes.base, fontWeight: '800', color: COLORS.text, textAlign: 'right' },
  customerRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  customerInfo: { flex: 1, alignItems: 'flex-end', gap: 4 },
  customerName: { fontSize: FONTS.sizes.base, fontWeight: '700', color: COLORS.text },
  customerPhone: { fontSize: FONTS.sizes.sm, color: COLORS.gray500 },
  customerActions: { flexDirection: 'row', gap: SPACING.sm },
  actionChip: {
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full, borderWidth: 1.5, borderColor: COLORS.primary,
  },
  actionChipText: { color: COLORS.primary, fontSize: FONTS.sizes.xs, fontWeight: '600' },
  avatarPlaceholder: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: COLORS.gray200, alignItems: 'center', justifyContent: 'center',
  },
  itemRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', gap: SPACING.sm,
  },
  itemImagePlaceholder: {
    width: 40, height: 40, borderRadius: RADIUS.md,
    backgroundColor: COLORS.gray100, alignItems: 'center', justifyContent: 'center',
  },
  itemName: { flex: 1, fontSize: FONTS.sizes.sm, color: COLORS.text, textAlign: 'right' },
  itemPrice: { fontSize: FONTS.sizes.sm, color: COLORS.text, fontWeight: '600' },
  notesCard: { backgroundColor: COLORS.gray100 },
  notesText: { fontSize: FONTS.sizes.sm, color: COLORS.gray600, textAlign: 'right', lineHeight: 22 },
  footer: { padding: SPACING.base, gap: SPACING.md, backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: COLORS.gray200 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modal: {
    backgroundColor: COLORS.white, borderTopLeftRadius: RADIUS.xl, borderTopRightRadius: RADIUS.xl,
    padding: SPACING.xl, gap: SPACING.md,
  },
  modalTitle: { fontSize: FONTS.sizes.xl, fontWeight: '800', color: COLORS.text, textAlign: 'center' },
  modalSubtitle: { fontSize: FONTS.sizes.sm, color: COLORS.gray500, textAlign: 'center' },
  reasonOption: {
    borderWidth: 1.5, borderColor: COLORS.border,
    borderRadius: RADIUS.md, padding: SPACING.base, alignItems: 'center',
  },
  reasonOptionActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primaryLight },
  reasonText: { fontSize: FONTS.sizes.sm, color: COLORS.gray600, fontWeight: '500' },
  reasonTextActive: { color: COLORS.primary, fontWeight: '700' },
  reasonLabel: { fontSize: FONTS.sizes.sm, color: COLORS.text, fontWeight: '600', textAlign: 'right' },
  reasonInput: {
    borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.md,
    padding: SPACING.base, minHeight: 80, justifyContent: 'flex-start',
  },
  modalActions: { gap: SPACING.sm },
});
