import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../theme';

// Screens
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';

// Auth
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import OTPVerificationScreen from '../screens/auth/OTPVerificationScreen';
import PasswordResetScreen from '../screens/auth/PasswordResetScreen';
import NewPasswordScreen from '../screens/auth/NewPasswordScreen';

// Setup
import StoreInfoScreen from '../screens/setup/StoreInfoScreen';
import IdentityVerificationScreen from '../screens/setup/IdentityVerificationScreen';
import StorePreferencesScreen from '../screens/setup/StorePreferencesScreen';
import StoreLocationScreen from '../screens/setup/StoreLocationScreen';
import SetupSuccessScreen from '../screens/setup/SetupSuccessScreen';

// Main
import HomeScreen from '../screens/main/HomeScreen';
import OrdersListScreen from '../screens/main/orders/OrdersListScreen';
import OrderDetailsScreen from '../screens/main/orders/OrderDetailsScreen';
import OrderPreparationScreen from '../screens/main/orders/OrderPreparationScreen';
import OrderHandoverScreen from '../screens/main/orders/OrderHandoverScreen';
import OrderCompletedScreen from '../screens/main/orders/OrderCompletedScreen';
import OrderTrackingScreen from '../screens/main/orders/OrderTrackingScreen';
import CatalogScreen from '../screens/main/catalog/CatalogScreen';
import AddEditProductScreen from '../screens/main/catalog/AddEditProductScreen';
import WalletScreen from '../screens/main/wallet/WalletScreen';
import PaymentDetailsScreen from '../screens/main/wallet/PaymentDetailsScreen';
import ProfileScreen from '../screens/main/profile/ProfileScreen';
import StoreManagementScreen from '../screens/main/profile/StoreManagementScreen';
import NotificationsScreen from '../screens/main/profile/NotificationsScreen';
import ReviewsScreen from '../screens/main/profile/ReviewsScreen';
import ReplyToReviewScreen from '../screens/main/profile/ReplyToReviewScreen';
import PromotionsScreen from '../screens/main/profile/PromotionsScreen';
import CreatePromoScreen from '../screens/main/profile/CreatePromoScreen';
import ChatScreen from '../screens/main/profile/ChatScreen';
import EducationalVideosScreen from '../screens/main/profile/EducationalVideosScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  Home: '🏠',
  OrdersList: '🛍️',
  Catalog: '🍽️',
  Wallet: '💳',
  Profile: '👤',
};

const TAB_LABELS = {
  Home: 'لوحة التحكم',
  OrdersList: 'طلبات',
  Catalog: 'الكتالوج',
  Wallet: 'محفظة',
  Profile: 'حساب تعريفي',
};

function TabIcon({ name, focused }) {
  return (
    <View style={styles.tabIconContainer}>
      <Text style={[styles.tabIcon, focused && styles.tabIconActive]}>{TAB_ICONS[name]}</Text>
      <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>{TAB_LABELS[name]}</Text>
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused }) => <TabIcon name={route.name} focused={focused} />,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="OrdersList" component={OrdersListScreen} />
      <Tab.Screen name="Catalog" component={CatalogScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />

        {/* Auth */}
        <Stack.Screen name="Auth" component={LoginScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
        <Stack.Screen name="PasswordReset" component={PasswordResetScreen} />
        <Stack.Screen name="PasswordResetOTP" component={OTPVerificationScreen} />
        <Stack.Screen name="NewPassword" component={NewPasswordScreen} />

        {/* Setup */}
        <Stack.Screen name="Setup" component={StoreInfoScreen} />
        <Stack.Screen name="SetupIdentity" component={IdentityVerificationScreen} />
        <Stack.Screen name="SetupPreferences" component={StorePreferencesScreen} />
        <Stack.Screen name="SetupLocation" component={StoreLocationScreen} />
        <Stack.Screen name="SetupSuccess" component={SetupSuccessScreen} />

        {/* Main */}
        <Stack.Screen name="Main" component={MainTabs} />

        {/* Orders */}
        <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
        <Stack.Screen name="OrderPreparation" component={OrderPreparationScreen} />
        <Stack.Screen name="OrderHandover" component={OrderHandoverScreen} />
        <Stack.Screen name="OrderCompleted" component={OrderCompletedScreen} />
        <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />

        {/* Catalog */}
        <Stack.Screen name="AddEditProduct" component={AddEditProductScreen} />

        {/* Wallet */}
        <Stack.Screen name="PaymentDetails" component={PaymentDetailsScreen} />

        {/* Profile */}
        <Stack.Screen name="StoreManagement" component={StoreManagementScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Reviews" component={ReviewsScreen} />
        <Stack.Screen name="ReplyToReview" component={ReplyToReviewScreen} />
        <Stack.Screen name="Promotions" component={PromotionsScreen} />
        <Stack.Screen name="CreatePromo" component={CreatePromoScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="EducationalVideos" component={EducationalVideosScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
    paddingBottom: 0,
    paddingTop: 0,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    gap: 2,
  },
  tabIcon: {
    fontSize: 22,
    opacity: 0.5,
  },
  tabIconActive: {
    opacity: 1,
  },
  tabLabel: {
    fontSize: 9,
    color: COLORS.gray400,
    fontWeight: '500',
  },
  tabLabelActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});
