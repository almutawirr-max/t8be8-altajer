import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../../theme';
import { PrimaryButton, AppInput, ScreenHeader } from '../../components';

export default function IdentityVerificationScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [iban, setIban] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScreenHeader title="أنشئ ملفك الشخصي" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.sectionTitle}>التحقق من الهوية</Text>

        <Text style={styles.label}>اسمك الكامل</Text>
        <AppInput placeholder="أدخل اسمك" value={fullName} onChangeText={setFullName} />

        <Text style={styles.label}>رقم الهوية او الإقامة</Text>
        <AppInput placeholder="أدخل رقم الهوية الوطنية الخاص بك" value={idNumber} onChangeText={setIdNumber} keyboardType="number-pad" />

        <Text style={styles.label}>اسم البنك/المحفظة</Text>
        <AppInput placeholder="أدخل اسم البنك" value={bankName} onChangeText={setBankName} />

        <Text style={styles.label}>الحساب البنكي/IBAN</Text>
        <AppInput
          placeholder="SA03 8000 0000 6080 1016 7519"
          value={iban}
          onChangeText={setIban}
          keyboardType="default"
        />

        <Text style={styles.label}>شهادة العمل الحر أو السجل التجاري</Text>
        <TouchableOpacity style={styles.uploadBox}>
          <Text style={styles.uploadIcon}>⬆️</Text>
          <TouchableOpacity style={styles.browseBtn}>
            <Text style={styles.browseBtnText}>تصفح</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        <PrimaryButton
          title="التالي"
          onPress={() => navigation.navigate('SetupPreferences')}
          style={{ marginTop: SPACING.xl }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.xl,
    gap: SPACING.sm,
    paddingBottom: SPACING.xxxl,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'right',
    marginBottom: SPACING.base,
  },
  label: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text,
    fontWeight: '600',
    textAlign: 'right',
    marginTop: SPACING.sm,
  },
  uploadBox: {
    height: 120,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.gray100,
    gap: SPACING.sm,
  },
  uploadIcon: { fontSize: 24 },
  browseBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
  },
  browseBtnText: { color: COLORS.white, fontSize: FONTS.sizes.sm, fontWeight: '600' },
});
