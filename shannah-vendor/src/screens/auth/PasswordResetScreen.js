import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING } from '../../theme';
import { PrimaryButton, AppInput, TabSelector } from '../../components';

export default function PasswordResetScreen({ navigation }) {
  const [tab, setTab] = useState('phone');
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Text style={styles.backText}>عودة</Text>
      </TouchableOpacity>

      <Text style={styles.title}>إعادة تعيين كلمة المرور الخاصة بك</Text>
      <Text style={styles.subtitle}>
        أدخل بريدك الإلكتروني المسجل أو رقم هاتفك لتلقي كلمة مرور لمرة واحدة لإعادة تعيين كلمة المرور.
      </Text>

      <TabSelector
        tabs={[
          { key: 'email', label: 'البريد الالكتروني' },
          { key: 'phone', label: 'رقم الجوال' },
        ]}
        selected={tab}
        onSelect={setTab}
      />

      <View style={{ marginTop: SPACING.base }}>
        <AppInput
          placeholder={tab === 'email' ? 'البريد الإلكتروني' : 'رقم الهاتف'}
          value={value}
          onChangeText={setValue}
          keyboardType={tab === 'email' ? 'email-address' : 'phone-pad'}
        />
      </View>

      <View style={styles.footer}>
        <PrimaryButton
          title="إعادة تعيين كلمة المرور"
          onPress={() =>
            navigation.navigate('PasswordResetOTP', {
              type: 'password_reset',
              contact: value,
            })
          }
          disabled={!value}
          style={!value ? { opacity: 0.5 } : {}}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>العودة إلى تسجيل الدخول</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.xl,
    paddingTop: 60,
    paddingBottom: SPACING.xxl,
    gap: SPACING.base,
  },
  backBtn: { alignSelf: 'flex-end' },
  backText: { color: COLORS.primary, fontSize: FONTS.sizes.base },
  title: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'right',
  },
  subtitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray500,
    textAlign: 'right',
    lineHeight: 22,
  },
  footer: { marginTop: 'auto', gap: SPACING.base },
  loginLink: {
    color: COLORS.primary,
    textAlign: 'center',
    fontSize: FONTS.sizes.sm,
    fontWeight: '500',
  },
});
