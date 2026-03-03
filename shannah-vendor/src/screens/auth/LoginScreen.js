import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
} from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../../theme';
import { PrimaryButton, AppInput, TabSelector } from '../../components';
import useStore from '../../store/useStore';

export default function LoginScreen({ navigation }) {
  const [tab, setTab] = useState('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const login = useStore((s) => s.login);

  const handleLogin = () => {
    login(email || phone, password);
    navigation.replace('Main');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.logoBox}>
        <Text style={styles.logoSymbol}>S3</Text>
      </View>

      <Text style={styles.title}>مرحبًا بعودتك</Text>
      <Text style={styles.subtitle}>
        سجل الدخول باستخدام رقم هاتفك وابدأ البيع بسهولة تامة
      </Text>

      <TabSelector
        tabs={[
          { key: 'email', label: 'بريد إلكتروني' },
          { key: 'phone', label: 'هاتف' },
        ]}
        selected={tab}
        onSelect={setTab}
      />

      <View style={styles.form}>
        {tab === 'email' ? (
          <AppInput
            placeholder="بريد إلكتروني"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        ) : (
          <AppInput
            placeholder="رقم الهاتف"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        )}

        <AppInput
          placeholder="كلمة المرور"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPass}
          rightIcon={
            <TouchableOpacity onPress={() => setShowPass(!showPass)}>
              <Text style={{ fontSize: 18 }}>{showPass ? '👁️' : '🙈'}</Text>
            </TouchableOpacity>
          }
        />

        <TouchableOpacity onPress={() => navigation.navigate('PasswordReset')}>
          <Text style={styles.forgotText}>نسيت كلمة السر؟</Text>
        </TouchableOpacity>

        <View style={styles.rememberRow}>
          <Text style={styles.rememberText}>الصحيح هو تذكرني</Text>
          <Switch
            value={remember}
            onValueChange={setRemember}
            trackColor={{ true: COLORS.primary }}
            thumbColor={COLORS.white}
          />
        </View>

        <PrimaryButton title="تسجيل الدخول" onPress={handleLogin} />

        <View style={styles.signupRow}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupLink}> سجل الآن</Text>
          </TouchableOpacity>
          <Text style={styles.signupText}>ليس لديك حساب؟</Text>
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
    lineHeight: 22,
  },
  form: {
    gap: SPACING.md,
  },
  forgotText: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.sm,
    textAlign: 'left',
    fontWeight: '500',
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: SPACING.sm,
  },
  rememberText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text,
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text,
  },
  signupLink: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
    fontWeight: '700',
  },
  legal: {
    fontSize: 11,
    color: COLORS.gray400,
    textAlign: 'center',
    marginTop: SPACING.base,
  },
});
