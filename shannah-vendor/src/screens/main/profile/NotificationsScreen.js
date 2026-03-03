import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../../../theme';
import { ScreenHeader, TabSelector } from '../../../components';
import useStore from '../../../store/useStore';

const TABS = [
  { key: 'all', label: 'الكل' },
  { key: 'orders', label: 'الطلبات' },
  { key: 'payments', label: 'المدفوعات' },
  { key: 'system', label: 'النظام' },
];

const getIcon = (type) => {
  if (type === 'order') return '🛍️';
  if (type === 'delivery') return '🚚';
  if (type === 'payment') return '💳';
  return '⚙️';
};

export default function NotificationsScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('all');
  const notifications = useStore((s) => s.notifications);

  const filtered = notifications.filter((n) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'orders') return n.type === 'order' || n.type === 'delivery';
    if (activeTab === 'payments') return n.type === 'payment';
    if (activeTab === 'system') return n.type === 'system';
    return true;
  });

  const renderItem = ({ item }) => (
    <View style={styles.notifItem}>
      <View style={styles.notifContent}>
        <Text style={styles.notifTime}>{item.time}</Text>
        {item.action && (
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionBtnText}>{item.action}</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.notifBody}>{item.body}</Text>
        <Text style={styles.notifTitle}>{item.title}</Text>
      </View>
      <View style={styles.notifIconBox}>
        <Text style={styles.notifIcon}>{getIcon(item.type)}</Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScreenHeader
        title="إشعارات"
        onBack={() => navigation.goBack()}
        rightAction={
          <TouchableOpacity>
            <Text style={{ fontSize: 20 }}>⚙️</Text>
          </TouchableOpacity>
        }
      />
      <View style={{ padding: SPACING.base }}>
        <TabSelector tabs={TABS} selected={activeTab} onSelect={setActiveTab} />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: SPACING.base, paddingBottom: SPACING.xxxl },
  separator: { height: 1, backgroundColor: COLORS.gray100 },
  notifItem: {
    flexDirection: 'row', paddingVertical: SPACING.base, gap: SPACING.md, alignItems: 'flex-start',
  },
  notifIconBox: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: COLORS.primaryLight, alignItems: 'center', justifyContent: 'center',
  },
  notifIcon: { fontSize: 20 },
  notifContent: { flex: 1, alignItems: 'flex-end', gap: 4 },
  notifTitle: { fontSize: FONTS.sizes.base, fontWeight: '700', color: COLORS.text, textAlign: 'right' },
  notifBody: { fontSize: FONTS.sizes.sm, color: COLORS.gray500, textAlign: 'right' },
  notifTime: { fontSize: FONTS.sizes.xs, color: COLORS.gray400 },
  actionBtn: {
    borderWidth: 1.5, borderColor: COLORS.primary,
    borderRadius: RADIUS.full, paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs,
  },
  actionBtnText: { color: COLORS.primary, fontSize: FONTS.sizes.xs, fontWeight: '700' },
});
