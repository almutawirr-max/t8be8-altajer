import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../../../theme';
import { PrimaryButton, ScreenHeader } from '../../../components';
import useStore from '../../../store/useStore';

export default function ReplyToReviewScreen({ navigation, route }) {
  const { reviewId } = route.params;
  const reviews = useStore((s) => s.reviews);
  const replyToReview = useStore((s) => s.replyToReview);
  const [reply, setReply] = useState('');

  const review = reviews.find((r) => r.id === reviewId);
  if (!review) return null;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScreenHeader title="الرد على المراجعة" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Review */}
        <View style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <Text style={styles.reviewTime}>{review.time}</Text>
            <Text style={styles.reviewCustomer}>{review.customer}</Text>
          </View>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Text key={s} style={{ color: s <= review.rating ? COLORS.warning : COLORS.gray300, fontSize: 16 }}>★</Text>
            ))}
          </View>
          <Text style={styles.reviewComment}>{review.comment}</Text>
        </View>

        {/* Reply Input */}
        <Text style={styles.label}>رد</Text>
        <TextInput
          value={reply}
          onChangeText={setReply}
          placeholder="اشكر عميلك وقم بمعالجة أي محاوف لديه..."
          multiline
          numberOfLines={4}
          style={styles.replyInput}
          textAlign="right"
          textAlignVertical="top"
          placeholderTextColor={COLORS.gray400}
        />

        {/* Tips */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 نصائح للحصول على ردود رائعة</Text>
          {[
            'نشكر العملاء على ملاحظاتهم',
            'معالجة المخاوف المحددة إن وجدت',
            'حافظ على الردود الاحترافية وودية',
            'الرد في غضون 24-48 ساعة كلما أمكن ذلك',
          ].map((tip, i) => (
            <Text key={i} style={styles.tipText}>• {tip}</Text>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          title="ارسال"
          onPress={() => {
            replyToReview(reviewId, reply);
            navigation.goBack();
          }}
          disabled={!reply.trim()}
        />
        <PrimaryButton title="الغاء" outline onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: SPACING.xl, gap: SPACING.base, paddingBottom: SPACING.xxxl },
  reviewCard: {
    borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.lg, padding: SPACING.base, gap: SPACING.sm,
  },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  reviewCustomer: { fontSize: FONTS.sizes.base, fontWeight: '700', color: COLORS.text },
  reviewTime: { fontSize: FONTS.sizes.xs, color: COLORS.gray400 },
  starsRow: { flexDirection: 'row' },
  reviewComment: { fontSize: FONTS.sizes.sm, color: COLORS.gray600, textAlign: 'right', lineHeight: 22 },
  label: { fontSize: FONTS.sizes.sm, color: COLORS.text, fontWeight: '600', textAlign: 'right' },
  replyInput: {
    borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.md,
    padding: SPACING.base, minHeight: 100, fontSize: FONTS.sizes.sm, color: COLORS.text,
  },
  tipsCard: {
    backgroundColor: COLORS.gray100, borderRadius: RADIUS.lg, padding: SPACING.base, gap: SPACING.sm,
  },
  tipsTitle: { fontSize: FONTS.sizes.sm, fontWeight: '700', color: COLORS.text, textAlign: 'right' },
  tipText: { fontSize: FONTS.sizes.sm, color: COLORS.gray600, textAlign: 'right' },
  footer: { padding: SPACING.base, gap: SPACING.sm, backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: COLORS.gray200 },
});
