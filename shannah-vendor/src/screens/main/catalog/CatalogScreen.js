import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../../../theme';
import useStore from '../../../store/useStore';

export default function CatalogScreen({ navigation }) {
  const products = useStore((s) => s.products);
  const deleteProduct = useStore((s) => s.deleteProduct);

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <View style={styles.productImagePlaceholder}>
        <Text style={styles.productImageIcon}>🍽️</Text>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>﷼ {item.price}</Text>
        <Text style={styles.productType}>{item.type}</Text>
        <View style={styles.productActions}>
          <TouchableOpacity onPress={() => deleteProduct(item.id)}>
            <Text style={styles.deleteText}>حذف</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddEditProduct', { productId: item.id })}
          >
            <Text style={styles.editText}>تحرير</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.productCapacity}>
        <Text style={styles.capacityText}>{item.dailyCapacity}</Text>
        <Text style={styles.capacityLabel}>يومي</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>الكتالوج</Text>
      </View>

      <FlatList
        data={products}
        keyExtractor={(i) => i.id}
        renderItem={renderProduct}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🍽️</Text>
            <Text style={styles.emptyTitle}>لا توجد منتجات بعد</Text>
            <Text style={styles.emptySubtitle}>ابدأ بإضافة منتجاتك لعرضها للعملاء</Text>
          </View>
        }
      />

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate('AddEditProduct', {})}
      >
        <Text style={styles.addBtnText}>+ إضافة منتج</Text>
      </TouchableOpacity>
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
  list: { padding: SPACING.base, gap: SPACING.md, paddingBottom: 100 },
  productCard: {
    flexDirection: 'row', gap: SPACING.md,
    borderWidth: 1, borderColor: COLORS.border,
    borderRadius: RADIUS.lg, padding: SPACING.base,
    backgroundColor: COLORS.white, ...SHADOWS.sm,
  },
  productImagePlaceholder: {
    width: 70, height: 70, borderRadius: RADIUS.md,
    backgroundColor: COLORS.gray100, alignItems: 'center', justifyContent: 'center',
  },
  productImageIcon: { fontSize: 32 },
  productInfo: { flex: 1, alignItems: 'flex-end', gap: 4 },
  productName: { fontSize: FONTS.sizes.base, fontWeight: '700', color: COLORS.text },
  productPrice: { fontSize: FONTS.sizes.sm, color: COLORS.primary, fontWeight: '600' },
  productType: { fontSize: FONTS.sizes.xs, color: COLORS.gray500 },
  productActions: { flexDirection: 'row', gap: SPACING.base },
  deleteText: { color: COLORS.error, fontSize: FONTS.sizes.sm, fontWeight: '600' },
  editText: { color: COLORS.primary, fontSize: FONTS.sizes.sm, fontWeight: '600' },
  productCapacity: { alignItems: 'center', justifyContent: 'center', gap: 2 },
  capacityText: { fontSize: FONTS.sizes.lg, fontWeight: '800', color: COLORS.text },
  capacityLabel: { fontSize: FONTS.sizes.xs, color: COLORS.gray400 },
  emptyState: { flex: 1, alignItems: 'center', paddingTop: SPACING.xxxl, gap: SPACING.md },
  emptyIcon: { fontSize: 64 },
  emptyTitle: { fontSize: FONTS.sizes.lg, fontWeight: '700', color: COLORS.text },
  emptySubtitle: { fontSize: FONTS.sizes.sm, color: COLORS.gray500, textAlign: 'center' },
  addBtn: {
    position: 'absolute', bottom: SPACING.xl, left: SPACING.xl, right: SPACING.xl,
    backgroundColor: COLORS.primary, borderRadius: RADIUS.xl,
    paddingVertical: SPACING.base, alignItems: 'center', ...SHADOWS.lg,
  },
  addBtnText: { color: COLORS.white, fontSize: FONTS.sizes.md, fontWeight: '700' },
});
