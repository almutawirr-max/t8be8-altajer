import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../../theme';
import { PrimaryButton } from '../../components';
import useStore from '../../store/useStore';

export default function OTPVerificationScreen({ navigation, route }) {
  const { type, contact } = route.params || {};
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);
  const login = useStore((s) => s.login);

  const handleChange = (val, index) => {
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    if (val && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (type === 'signup') {
      login(contact, '');
      navigation.replace('Setup');
    } else if (type === 'password_reset') {
      navigation.navigate('NewPassword');
    } else {
      navigation.replace('Main');
    }
  };

  const isComplete = otp.every((d) => d !== '');

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Text style={styles.backText}>عودة</Text>
      </TouchableOpacity>

      <Text style={styles.title}>قم بالتسجيل للتحقق من هويتك</Text>
      <Text style={styles.subtitle}>
        تم إرسال رمز التحقق المكون من 6 أرقام إلى بريدك الإلكتروني{' '}
        <Text style={styles.contact}>{contact || 'email@email.com'}</Text>
        {'. هل تريد تغيير بريدك الإلكتروني؟'}
      </Text>

      <View style={styles.otpRow}>
        {otp.map((digit, i) => (
          <TextInput
            key={i}
            ref={(ref) => (inputs.current[i] = ref)}
            style={[styles.otpInput, digit ? styles.otpFilled : null]}
            value={digit}
            onChangeText={(v) => handleChange(v.slice(-1), i)}
            keyboardType="number-pad"
            maxLength={1}
            textAlign="center"
          />
        ))}
      </View>

      <Text style={styles.timerText}>ستنتهي صلاحية رمز التحقق لمرة واحدة خلال 29 ثانية</Text>
      <View style={styles.resendRow}>
        <TouchableOpacity>
          <Text style={styles.resendLink}>أعد الإرسال</Text>
        </TouchableOpacity>
        <Text style={styles.resendText}> لم تستلم رمز التحقق لمرة واحدة؟</Text>
      </View>

      <View style={styles.footer}>
        <PrimaryButton
          title="تحقق من رمز التحقق لمرة واحدة"
          onPress={handleVerify}
          disabled={!isComplete}
          style={!isComplete ? { opacity: 0.5 } : {}}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>العودة إلى صفحة تسجيل الدخول</Text>
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
  },
  backBtn: { alignSelf: 'flex-end', marginBottom: SPACING.xl },
  backText: { color: COLORS.primary, fontSize: FONTS.sizes.base },
  title: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'right',
    marginBottom: SPACING.base,
  },
  subtitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray500,
    textAlign: 'right',
    lineHeight: 22,
    marginBottom: SPACING.xl,
  },
  contact: { color: COLORS.primary },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  otpInput: {
    width: 46,
    height: 56,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    fontSize: FONTS.sizes.xl,
    color: COLORS.text,
    fontWeight: '700',
    textAlign: 'center',
  },
  otpFilled: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  timerText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.gray400,
    textAlign: 'right',
    marginBottom: SPACING.md,
  },
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: SPACING.xxl,
  },
  resendText: { fontSize: FONTS.sizes.sm, color: COLORS.gray500 },
  resendLink: { fontSize: FONTS.sizes.sm, color: COLORS.primary, fontWeight: '600' },
  footer: { gap: SPACING.base, marginTop: 'auto' },
  loginLink: {
    color: COLORS.primary,
    textAlign: 'center',
    fontSize: FONTS.sizes.sm,
    fontWeight: '500',
  },
});
