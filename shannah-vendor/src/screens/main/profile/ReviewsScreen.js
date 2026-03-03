import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../../../theme';
import { ScreenHeader, Card } from '../../../components';
import useStore from '../../../store/useStore';

const RatingBar = ({ stars, count, maxCount }) => (
  <View style={styles.ratingBarRow}>
    <Text style={styles.ratingBarCount}>{count}</Text>
    <View style={styles.ratingBarTrack}>
      <View style={[styles.ratingBarFill, { width: `${(count / maxCount) * 100}%` }]} />
    </View>
    <Text style={styles.ratingBarStar}>{stars}★</Text>
  </View>
);

export default function ReviewsScreen({ navigation }) {
  const reviews = useStore((s) => s.reviews);
  const store = useStore((s) => s.store);

  const renderReview = ({ item }) => (
    <View style={styles.reviewItem}>
      <View style={styles.replyBox}>
        {item.reply ? (
          <View style={styles.replyContainer}>
            <Text style={styles.replyText}>{item.reply}</Text>
            <Text style={styles.replyLabel}>ردك:</Text>
          </View>
        ) : null}
        <Text style={styles.reviewComment}>{item.comment}</Text>
        <View style={styles.reviewStars}>
          {[1, 2, 3, 4, 5].map((s) => (
            <Text key={s} style={{ color: s <= item.rating ? COLORS.warning : COLORS.gray300, fontSize: 14 }}>★</Text>
          ))}
        </View>
        <View style={styles.reviewHeader}>
          <Text style={styles.reviewTime}>{item.time}</Text>
          <Text style={styles.reviewCustomer}>{item.customer}</Text>
        </View>
      </View>
      <View style={styles.reviewActions}>
        {!item.reply && (
          <TouchableOpacity
            onPress={() => navigation.navigate('ReplyToReview', { reviewId: item.id })}
          >
            <Text style={styles.replyActionText}>رد</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity>
          <Text style={styles.reportActionText}>تقرير</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const distributions = [
    { stars: 5, count: 107 },
    { stars: 4, count: 13 },
    { stars: 3, count: 4 },
    { stars: 2, count: 2 },
    { stars: 1, count: 0 },
  ];
  const maxCount = Math.max(...distributions.map((d) => d.count));

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScreenHeader title="التقييمات" onBack={() => navigation.goBack()} />

      <FlatList
        ListHeaderComponent={
          <Card style={styles.summaryCard}>
            <View style={styles.summaryLeft}>
              <Text style={styles.overallRating}>{store.rating}</Text>
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Text key={s} style={{ color: COLORS.warning, fontSize: 16 }}>★</Text>
                ))}
              </View>
              <Text style={styles.totalRatings}>{store.totalRatings} تقييماً</Text>
            </View>
            <View style={styles.summaryRight}>
              {distributions.map((d) => (
                <RatingBar key={d.stars} stars={d.stars} count={d.count} maxCount={maxCount} />
              ))}
            </View>
          </Card>
        }
        data={reviews}
        keyExtractor={(i) => i.id}
        renderItem={renderReview}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: { padding: SPACING.base, gap: SPACING.md, paddingBottom: SPACING.xxxl },
  summaryCard: { flexDirection: 'row', gap: SPACING.md, marginBottom: SPACING.md },
  summaryLeft: { alignItems: 'center', gap: 4 },
  overallRating: { fontSize: 36, fontWeight: '900', color: COLORS.text },
  starsRow: { flexDirection: 'row' },
  totalRatings: { fontSize: FONTS.sizes.xs, color: COLORS.gray500 },
  summaryRight: { flex: 1, gap: 4 },
  ratingBarRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  ratingBarStar: { fontSize: FONTS.sizes.xs, color: COLORS.warning, width: 20, textAlign: 'right' },
  ratingBarTrack: { flex: 1, height: 8, backgroundColor: COLORS.gray200, borderRadius: 4 },
  ratingBarFill: { height: 8, backgroundColor: COLORS.primary, borderRadius: 4 },
  ratingBarCount: { fontSize: FONTS.sizes.xs, color: COLORS.gray500, width: 24, textAlign: 'left' },
  reviewItem: {
    borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.lg, padding: SPACING.base,
  },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.sm },
  reviewCustomer: { fontSize: FONTS.sizes.base, fontWeight: '700', color: COLORS.text },
  reviewTime: { fontSize: FONTS.sizes.xs, color: COLORS.gray400 },
  reviewStars: { flexDirection: 'row', marginBottom: SPACING.sm },
  reviewComment: { fontSize: FONTS.sizes.sm, color: COLORS.gray600, textAlign: 'right', lineHeight: 22, marginBottom: SPACING.sm },
  replyContainer: {
    backgroundColor: COLORS.primaryLight, borderRadius: RADIUS.md, padding: SPACING.md, marginBottom: SPACING.sm,
  },
  replyLabel: { fontSize: FONTS.sizes.xs, color: COLORS.primary, fontWeight: '700', textAlign: 'right', marginBottom: 4 },
  replyText: { fontSize: FONTS.sizes.sm, color: COLORS.gray700, textAlign: 'right' },
  reviewActions: { flexDirection: 'row', gap: SPACING.base, justifyContent: 'flex-end', marginTop: SPACING.sm },
  replyActionText: { color: COLORS.primary, fontSize: FONTS.sizes.sm, fontWeight: '600' },
  reportActionText: { color: COLORS.gray500, fontSize: FONTS.sizes.sm },
});
