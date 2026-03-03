import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, ScrollView } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../../../theme';
import useStore from '../../../store/useStore';

const MenuItem = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Text style={styles.menuArrow}>{'<'}</Text>
    <Text style={styles.menuLabel}>{label}</Text>
    <Text style={styles.menuIcon}>{icon}</Text>
  </TouchableOpacity>
);

export default function ProfileScreen({ navigation }) {
  const store = useStore((s) => s.store);
  const toggleOnline = useStore((s) => s.toggleStoreOnline);
  const logout = useStore((s) => s.logout);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.storeLogoBox}>
          <Text style={styles.storeLogoText}>🍽️</Text>
        </View>
        <View style={styles.storeInfo}>
          <Text style={styles.storeName}>{store.name}</Text>
          <View style={styles.onlineRow}>
            <Switch
              value={store.isOnline}
              onValueChange={toggleOnline}
              trackColor={{ true: COLORS.success }}
              thumbColor={COLORS.white}
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            />
            <Text style={[styles.onlineText, { color: store.isOnline ? COLORS.success : COLORS.gray400 }]}>
              {store.isOnline ? 'متصل' : 'غير متصل'}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.manageBtn}
          onPress={() => navigation.navigate('StoreManagement')}
        >
          <Text style={styles.manageBtnText}>إدارة المتجر</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.quickAction} onPress={() => navigation.navigate('OrdersList')}>
          <Text style={styles.quickActionIcon}>🛍️</Text>
          <Text style={styles.quickActionLabel}>الطلبات</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickAction} onPress={() => navigation.navigate('Wallet')}>
          <Text style={styles.quickActionIcon}>💳</Text>
          <Text style={styles.quickActionLabel}>المحفظة</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickAction} onPress={() => navigation.navigate('Catalog')}>
          <Text style={styles.quickActionIcon}>🍽️</Text>
          <Text style={styles.quickActionLabel}>القائمة</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Items */}
      <View style={styles.menuSection}>
        <MenuItem icon="⭐" label="التقييمات" onPress={() => navigation.navigate('Reviews')} />
        <MenuItem icon="🏷️" label="إدارة العروض الترويجية" onPress={() => navigation.navigate('Promotions')} />
        <MenuItem icon="▶️" label="الدروس التعليمية" onPress={() => navigation.navigate('EducationalVideos')} />
        <MenuItem icon="🔔" label="الإشعارات" onPress={() => navigation.navigate('Notifications')} />
        <MenuItem icon="❓" label="مركز المساعدة" onPress={() => {}} />
        <MenuItem icon="❓" label="الشروط والأحكام" onPress={() => {}} />
      </View>

      {/* Language */}
      <View style={styles.languageRow}>
        <View style={styles.languageToggle}>
          <Text style={styles.langText}>إنجليزي</Text>
          <Switch value={true} trackColor={{ true: COLORS.primary }} thumbColor={COLORS.white}
            style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }} />
          <Text style={styles.langText}>العربية</Text>
        </View>
        <Text style={styles.langIcon}>🌐</Text>
        <Text style={styles.menuLabel}>اللغة</Text>
      </View>

      {/* Logout */}
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => {
          logout();
          navigation.replace('Auth');
        }}
      >
        <Text style={styles.logoutText}>⟵ تسجيل الخروج</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { paddingBottom: SPACING.xxxl },
  header: {
    flexDirection: 'row', alignItems: 'center',
    padding: SPACING.base, gap: SPACING.md,
    borderBottomWidth: 1, borderBottomColor: COLORS.gray100,
  },
  storeLogoBox: {
    width: 52, height: 52, borderRadius: RADIUS.md,
    backgroundColor: COLORS.gray100, alignItems: 'center', justifyContent: 'center',
  },
  storeLogoText: { fontSize: 28 },
  storeInfo: { flex: 1 },
  storeName: { fontSize: FONTS.sizes.base, fontWeight: '700', color: COLORS.text, textAlign: 'right' },
  onlineRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 4 },
  onlineText: { fontSize: FONTS.sizes.xs, fontWeight: '600' },
  manageBtn: {
    borderWidth: 1.5, borderColor: COLORS.primary,
    borderRadius: RADIUS.full, paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs,
  },
  manageBtnText: { color: COLORS.primary, fontSize: FONTS.sizes.xs, fontWeight: '700' },
  quickActions: {
    flexDirection: 'row', paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.base, gap: SPACING.md,
  },
  quickAction: {
    flex: 1, alignItems: 'center', gap: SPACING.sm,
    borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.lg,
    paddingVertical: SPACING.base, ...SHADOWS.sm,
  },
  quickActionIcon: { fontSize: 28 },
  quickActionLabel: { fontSize: FONTS.sizes.xs, color: COLORS.text, fontWeight: '600' },
  menuSection: { paddingHorizontal: SPACING.base },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end',
    paddingVertical: SPACING.base, gap: SPACING.md,
    borderBottomWidth: 1, borderBottomColor: COLORS.gray100,
  },
  menuLabel: { flex: 1, fontSize: FONTS.sizes.base, color: COLORS.text, textAlign: 'right', fontWeight: '500' },
  menuIcon: { fontSize: 20, width: 28, textAlign: 'center' },
  menuArrow: { color: COLORS.gray400, fontSize: 16 },
  languageRow: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.base, gap: SPACING.md,
    borderBottomWidth: 1, borderBottomColor: COLORS.gray100,
  },
  languageToggle: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  langText: { fontSize: FONTS.sizes.xs, color: COLORS.gray600 },
  langIcon: { fontSize: 20 },
  logoutBtn: {
    margin: SPACING.xl, padding: SPACING.base,
    backgroundColor: '#FEF2F2', borderRadius: RADIUS.lg, alignItems: 'center',
  },
  logoutText: { color: COLORS.error, fontSize: FONTS.sizes.base, fontWeight: '700' },
});
