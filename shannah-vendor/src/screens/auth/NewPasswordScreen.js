import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING } from '../../theme';
import { PrimaryButton, AppInput } from '../../components';

export default function NewPasswordScreen({ navigation }) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Text style={styles.backText}>عودة</Text>
      </TouchableOpacity>

      <Text style={styles.title}>تعيين كلمة مرور جديدة</Text>
      <Text style={styles.subtitle}>أدخل كلمة المرور الجديدة للوصول إلى حسابك</Text>

      <View style={styles.form}>
        <AppInput placeholder="كلمة المرور الجديدة" value={password} onChangeText={setPassword} secureTextEntry />
        <AppInput placeholder="تأكيد كلمة المرور" value={confirm} onChangeText={setConfirm} secureTextEntry />
      </View>

      <View style={styles.footer}>
        <PrimaryButton
          title="تغيير كلمة المرور"
          onPress={() => navigation.replace('Main')}
          disabled={!password || password !== confirm}
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
  title: { fontSize: FONTS.sizes.xl, fontWeight: '800', color: COLORS.text, textAlign: 'right' },
  subtitle: { fontSize: FONTS.sizes.sm, color: COLORS.gray500, textAlign: 'right', lineHeight: 22 },
  form: { gap: SPACING.md },
  footer: { marginTop: 'auto', gap: SPACING.base },
  loginLink: { color: COLORS.primary, textAlign: 'center', fontSize: FONTS.sizes.sm, fontWeight: '500' },
});
