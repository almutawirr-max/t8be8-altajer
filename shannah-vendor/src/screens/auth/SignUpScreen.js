import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { COLORS, FONTS, SPACING } from '../../theme';
import { PrimaryButton, AppInput } from '../../components';

export default function SignUpScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    navigation.navigate('OTPVerification', { type: 'signup', contact: email });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.logoBox}>
        <Text style={styles.logoSymbol}>S3</Text>
      </View>

      <Text style={styles.title}>إنشاء حساب</Text>
      <Text style={styles.subtitle}>ابدأ البيع في غضون دقائق معدودة</Text>

      <View style={styles.form}>
        <AppInput placeholder="الاسم الأول" value={firstName} onChangeText={setFirstName} />
        <AppInput placeholder="اسم العائلة" value={lastName} onChangeText={setLastName} />
        <AppInput placeholder="بريد إلكتروني" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <AppInput placeholder="رقم الهاتف المحمول" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <AppInput placeholder="كلمة المرور" value={password} onChangeText={setPassword} secureTextEntry />
        <AppInput placeholder="تأكيد كلمة المرور" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

        <PrimaryButton title="اشتراك" onPress={handleSignUp} />

        <View style={styles.loginRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}> تسجيل الدخول</Text>
          </TouchableOpacity>
          <Text style={styles.loginText}>هل لديك حساب بالفعل؟</Text>
        </View>
      </View>

      <Text style={styles.legal}>
        بمتابعتك، فإنك توافق على شروطنا وسياسة الخصوصية الخاصة بنا
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: SPACING.xl,
    paddingTop: 60,
    paddingBottom: SPACING.xxl,
    backgroundColor: COLORS.white,
    gap: SPACING.lg,
  },
  logoBox: {
    alignSelf: 'center',
    width: 72,
    height: 72,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoSymbol: {
    fontSize: 28,
    color: COLORS.primary,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  title: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray500,
    textAlign: 'center',
  },
  form: {
    gap: SPACING.md,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text,
  },
  loginLink: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
    fontWeight: '700',
  },
  legal: {
    fontSize: 11,
    color: COLORS.gray400,
    textAlign: 'center',
  },
});
