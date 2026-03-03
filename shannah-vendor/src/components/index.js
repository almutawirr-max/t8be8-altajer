import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../theme';

// ─── Primary Button ────────────────────────────────────────────────────────────
export const PrimaryButton = ({ title, onPress, disabled, loading, style, textStyle, outline }) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled || loading}
    style={[
      styles.primaryBtn,
      outline && styles.outlineBtn,
      disabled && styles.disabledBtn,
      style,
    ]}
    activeOpacity={0.8}
  >
    {loading ? (
      <ActivityIndicator color={outline ? COLORS.primary : COLORS.white} />
    ) : (
      <Text style={[styles.primaryBtnText, outline && styles.outlineBtnText, textStyle]}>
        {title}
      </Text>
    )}
  </TouchableOpacity>
);

// ─── Text Input ────────────────────────────────────────────────────────────────
export const AppInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  style,
  rightIcon,
  leftIcon,
  editable = true,
  multiline,
  numberOfLines,
}) => (
  <View style={[styles.inputContainer, !editable && styles.inputDisabled, style]}>
    {rightIcon && <View style={styles.inputIconRight}>{rightIcon}</View>}
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={COLORS.gray400}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      style={[styles.input, rightIcon && { paddingRight: 40 }, leftIcon && { paddingLeft: 40 }, multiline && { height: 100, textAlignVertical: 'top', paddingTop: SPACING.md }]}
      editable={editable}
      multiline={multiline}
      numberOfLines={numberOfLines}
      textAlign="right"
    />
    {leftIcon && <View style={styles.inputIconLeft}>{leftIcon}</View>}
  </View>
);

// ─── Section Card ─────────────────────────────────────────────────────────────
export const Card = ({ children, style }) => (
  <View style={[styles.card, style]}>{children}</View>
);

// ─── Status Badge ─────────────────────────────────────────────────────────────
export const StatusBadge = ({ status }) => {
  const config = {
    new: { label: 'جديد', color: COLORS.statusNew },
    preparing: { label: 'قيد التحضير', color: COLORS.statusPrep },
    ready: { label: 'جاهز', color: COLORS.statusReady },
    delivered: { label: 'تم التوصيل', color: COLORS.statusDelivery },
    completed: { label: 'مكتمل', color: COLORS.statusDone },
  };
  const c = config[status] || config.new;
  return (
    <View style={[styles.badge, { backgroundColor: c.color }]}>
      <Text style={styles.badgeText}>{c.label}</Text>
    </View>
  );
};

// ─── Header ──────────────────────────────────────────────────────────────────
export const ScreenHeader = ({ title, onBack, rightAction }) => (
  <View style={styles.header}>
    {rightAction ? rightAction : <View style={{ width: 40 }} />}
    <Text style={styles.headerTitle}>{title}</Text>
    {onBack ? (
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <Text style={styles.backArrow}>{'→'}</Text>
      </TouchableOpacity>
    ) : (
      <View style={{ width: 40 }} />
    )}
  </View>
);

// ─── Tab Selector ─────────────────────────────────────────────────────────────
export const TabSelector = ({ tabs, selected, onSelect }) => (
  <View style={styles.tabContainer}>
    {tabs.map((tab) => (
      <TouchableOpacity
        key={tab.key}
        onPress={() => onSelect(tab.key)}
        style={[styles.tab, selected === tab.key && styles.tabActive]}
      >
        <Text style={[styles.tabText, selected === tab.key && styles.tabTextActive]}>
          {tab.label}
          {tab.count != null ? ` (${tab.count})` : ''}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

// ─── Divider ──────────────────────────────────────────────────────────────────
export const Divider = ({ style }) => <View style={[styles.divider, style]} />;

// ─── Row Item ─────────────────────────────────────────────────────────────────
export const RowItem = ({ label, value, labelStyle, valueStyle }) => (
  <View style={styles.rowItem}>
    <Text style={[styles.rowValue, valueStyle]}>{value}</Text>
    <Text style={[styles.rowLabel, labelStyle]}>{label}</Text>
  </View>
);

// ─── Empty State ─────────────────────────────────────────────────────────────
export const EmptyState = ({ icon, title, subtitle }) => (
  <View style={styles.emptyState}>
    <Text style={styles.emptyIcon}>{icon || '📭'}</Text>
    <Text style={styles.emptyTitle}>{title}</Text>
    {subtitle && <Text style={styles.emptySubtitle}>{subtitle}</Text>}
  </View>
);

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  primaryBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.xl,
    paddingVertical: SPACING.base,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  disabledBtn: {
    opacity: 0.5,
  },
  primaryBtnText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
  },
  outlineBtnText: {
    color: COLORS.primary,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputDisabled: {
    backgroundColor: COLORS.gray100,
  },
  input: {
    flex: 1,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.md,
    fontSize: FONTS.sizes.base,
    color: COLORS.text,
    textAlign: 'right',
  },
  inputIconRight: {
    position: 'absolute',
    right: SPACING.base,
    zIndex: 1,
  },
  inputIconLeft: {
    position: 'absolute',
    left: SPACING.base,
    zIndex: 1,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.base,
    ...SHADOWS.sm,
  },
  badge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.xs,
    fontWeight: '700',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  headerTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    flex: 1,
  },
  backBtn: {
    width: 40,
    alignItems: 'flex-end',
  },
  backArrow: {
    fontSize: 20,
    color: COLORS.text,
    fontWeight: '300',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.gray100,
    borderRadius: RADIUS.full,
    padding: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
    borderRadius: RADIUS.full,
  },
  tabActive: {
    backgroundColor: COLORS.white,
    ...SHADOWS.sm,
  },
  tabText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray500,
    fontWeight: '500',
  },
  tabTextActive: {
    color: COLORS.text,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  rowLabel: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray500,
  },
  rowValue: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text,
    fontWeight: '500',
    textAlign: 'left',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xxxl,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: SPACING.base,
  },
  emptyTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  emptySubtitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray500,
    textAlign: 'center',
  },
});
