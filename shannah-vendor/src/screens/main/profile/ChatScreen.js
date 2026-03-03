import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../../../theme';
import { ScreenHeader } from '../../../components';

const MOCK_MESSAGES = [
  { id: '1', sender: 'customer', text: 'مرحباً! هل يمكنك إضافة المزيد من الصلصة إلى طلبي؟', time: '10:15 صباحاً' },
  { id: '2', sender: 'vendor', text: 'بالتأكيد! سأضيف لك صلصة إضافية.', time: '10:17 صباحاً' },
  { id: '3', sender: 'customer', text: 'شكراً جزيلاً', time: '10:17 صباحاً' },
  { id: '4', sender: 'customer', text: 'كم من الوقت سيستغرق تجهيز الطلب؟', time: '10:20 صباحاً' },
  { id: '5', sender: 'vendor', text: 'سيكون جاهزاً في غضون 10 دقائق تقريباً', time: '10:21 صباحاً' },
];

export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: String(Date.now()), sender: 'vendor', text: input, time: 'الآن' },
    ]);
    setInput('');
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageBubble, item.sender === 'vendor' ? styles.vendorBubble : styles.customerBubble]}>
      <Text style={[styles.messageText, item.sender === 'vendor' ? styles.vendorText : styles.customerText]}>
        {item.text}
      </Text>
      <Text style={styles.messageTime}>{item.time}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScreenHeader title="سارة أحمد" onBack={() => navigation.goBack()} />
      <View style={styles.orderBanner}>
        <Text style={styles.orderBannerStatus}>تجهيز الطلب</Text>
        <Text style={styles.orderBannerText}>الوضع الحالي - 10:30</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '60%' }]} />
        </View>
        <Text style={styles.orderBannerNum}>رقم الطلب 1243 - نشط</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(i) => i.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messageList}
      />

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachBtn}>
          <Text style={{ fontSize: 20 }}>📎</Text>
        </TouchableOpacity>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="اكتب رسالتك..."
          style={styles.input}
          textAlign="right"
          placeholderTextColor={COLORS.gray400}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Text style={styles.sendIcon}>📤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  orderBanner: {
    backgroundColor: COLORS.primaryLight, padding: SPACING.base, gap: 4,
    borderBottomWidth: 1, borderBottomColor: COLORS.gray200,
  },
  orderBannerNum: { fontSize: FONTS.sizes.xs, color: COLORS.primary, fontWeight: '600' },
  orderBannerText: { fontSize: FONTS.sizes.xs, color: COLORS.gray500 },
  orderBannerStatus: { fontSize: FONTS.sizes.base, fontWeight: '700', color: COLORS.primary, textAlign: 'right' },
  progressBar: { height: 4, backgroundColor: COLORS.white, borderRadius: 2 },
  progressFill: { height: 4, backgroundColor: COLORS.primary, borderRadius: 2 },
  messageList: { padding: SPACING.base, gap: SPACING.md, paddingBottom: SPACING.md },
  messageBubble: {
    maxWidth: '75%', borderRadius: RADIUS.lg, padding: SPACING.md, gap: 2,
  },
  vendorBubble: { backgroundColor: COLORS.primary, alignSelf: 'flex-start', borderBottomLeftRadius: 4 },
  customerBubble: { backgroundColor: COLORS.gray100, alignSelf: 'flex-end', borderBottomRightRadius: 4 },
  messageText: { fontSize: FONTS.sizes.sm, lineHeight: 20 },
  vendorText: { color: COLORS.white },
  customerText: { color: COLORS.text },
  messageTime: { fontSize: 10, color: 'rgba(255,255,255,0.7)', textAlign: 'right' },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center', padding: SPACING.base,
    borderTopWidth: 1, borderTopColor: COLORS.gray200, gap: SPACING.sm,
    backgroundColor: COLORS.white,
  },
  attachBtn: { padding: SPACING.xs },
  input: {
    flex: 1, borderWidth: 1, borderColor: COLORS.border,
    borderRadius: RADIUS.full, paddingHorizontal: SPACING.base, paddingVertical: SPACING.sm,
    fontSize: FONTS.sizes.sm, color: COLORS.text,
  },
  sendBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center',
  },
  sendIcon: { fontSize: 18 },
});
