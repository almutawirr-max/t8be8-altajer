export const MOCK_STORE = {
  id: '1',
  name: 'مطبخ كلثوم',
  ownerName: 'عبد الشيخ',
  phone: '+966 4567890',
  description: 'ماكولات متنوعة أصيلة محضرة منزلياً بكل حب ومكونات طازجة',
  category: 'مطبخ منزلي',
  logo: null,
  cover: null,
  isOnline: true,
  minOrder: 3,
  avgPrepTime: '25-30 دقيقة',
  deliveryRadius: '5 كم',
  deliveryMethod: 'كلاهما',
  workingHours: {
    السبت: { open: true, from: '9:00 AM', to: '8:00 PM' },
    الأحد: { open: false, from: '9:00 AM', to: '8:00 PM' },
    الاثنين: { open: true, from: '9:00 AM', to: '8:00 PM' },
    الثلاثاء: { open: true, from: '9:00 AM', to: '8:00 PM' },
    الأربعاء: { open: true, from: '9:00 AM', to: '8:00 PM' },
    الخميس: { open: true, from: '9:00 AM', to: '8:00 PM' },
    الجمعة: { open: true, from: '9:00 AM', to: '8:00 PM' },
  },
  rating: 4.8,
  totalRatings: 126,
  balance: 1284.50,
  todayEarnings: 342.00,
  todaySales: 1200,
  todayOrders: 8,
};

export const MOCK_ORDERS = [
  {
    id: 'sh-2323',
    orderNumber: '1248',
    status: 'new',
    customerName: 'عبد الحبيب',
    customerPhone: '+966 98987867',
    items: [
      { name: 'برياني الدجاج', qty: 3, price: 35, image: null },
      { name: 'برياني الدجاج', qty: 3, price: 35, image: null },
      { name: 'برياني الدجاج', qty: 3, price: 35, image: null },
    ],
    subtotal: 250,
    deliveryFee: 5,
    tax: 6,
    total: 262,
    deliveryMethod: 'توصيل المنصة',
    expectedTime: '45 دقيقة',
    address: 'شارع الملك فهد، الرياض',
    notes: 'أرجو أن يكون الطبق حاراً جداً وأن تضيفوا المزيد من الأرز. لا تضعوا البصل في البرياني.',
    createdAt: new Date(Date.now() - 60000),
    autoCancel: 274,
    prepCheckList: [
      { id: '1', name: 'برياني الدجاج x3', done: true },
      { id: '2', name: 'برياني الدجاج x3', done: false },
      { id: '3', name: 'برياني الدجاج x3', done: true },
    ],
    rider: null,
  },
  {
    id: 'sh-2324',
    orderNumber: '1247',
    status: 'preparing',
    customerName: 'عبد الحبيب',
    customerPhone: '+966 98987867',
    items: [
      { name: 'برياني الدجاج', qty: 3, price: 35, image: null },
    ],
    subtotal: 85.50,
    deliveryFee: 5,
    tax: 4,
    total: 94.50,
    deliveryMethod: 'استلام',
    expectedTime: '12 دقيقة',
    address: 'المبنى رقم ١٣، حي الياسمين، طريق الملك عبد العزيز، الرياض',
    notes: '',
    createdAt: new Date(Date.now() - 900000),
    autoCancel: 0,
    prepCheckList: [
      { id: '1', name: 'برياني الدجاج x3', done: true },
      { id: '2', name: 'برياني الدجاج x3', done: false },
    ],
    rider: {
      name: 'عبد الحبيب',
      rating: 4.9,
      reviews: 234,
      plate: 'ABC-1234',
      vehicle: 'تويوتا',
    },
  },
  {
    id: 'sh-2325',
    orderNumber: '1246',
    status: 'ready',
    customerName: 'سارة جونسون',
    customerPhone: '+966 11223344',
    items: [
      { name: 'برياني الدجاج', qty: 2, price: 35, image: null },
    ],
    subtotal: 72.89,
    deliveryFee: 5,
    tax: 0,
    total: 72.89,
    deliveryMethod: 'توصيل المنصة',
    expectedTime: '5-10 دقائق',
    address: 'المبنى رقم ١٣، حي الياسمين، طريق الملك عبد العزيز، الرياض',
    notes: '',
    createdAt: new Date(Date.now() - 1380000),
    autoCancel: 0,
    prepCheckList: [],
    rider: {
      name: 'عبد الحبيب',
      rating: 4.9,
      reviews: 234,
      plate: 'ABC-1234',
      vehicle: 'تويوتا',
    },
  },
  {
    id: 'sh-2326',
    orderNumber: '1245',
    status: 'delivered',
    customerName: 'مايك براون',
    customerPhone: '+966 55443322',
    items: [
      { name: 'برياني الدجاج', qty: 2, price: 35, image: null },
    ],
    subtotal: 68,
    deliveryFee: 5,
    tax: 0,
    total: 68,
    deliveryMethod: 'توصيل المنصة',
    expectedTime: null,
    address: 'المبنى رقم ٥، حي العليا، الرياض',
    notes: '',
    createdAt: new Date(Date.now() - 7200000),
    autoCancel: 0,
    prepCheckList: [],
    rider: null,
    earnings: 63.24,
    platformFee: -3.4,
    paymentFee: -1.36,
  },
];

export const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'برياني',
    price: 250.0,
    dailyCapacity: 20,
    description: 'أرز، دجاج، ماسالا برياني',
    type: 'ولائم',
    addons: [],
    availability: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
    image: null,
  },
  {
    id: '2',
    name: 'كبسة لحم',
    price: 180.0,
    dailyCapacity: 15,
    description: 'كبسة لحم طازجة مع الخضار',
    type: 'ولائم',
    addons: [],
    availability: ['السبت', 'الأحد', 'الاثنين'],
    image: null,
  },
  {
    id: '3',
    name: 'مندي دجاج',
    price: 120.0,
    dailyCapacity: 10,
    description: 'مندي دجاج على الطريقة اليمنية',
    type: 'وجبات',
    addons: [],
    availability: ['الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'],
    image: null,
  },
];

export const MOCK_TRANSACTIONS = [
  { id: '1', orderId: '1244', customer: 'سارة جونسون', amount: 25.00, status: 'pending', time: 'اليوم، الساعة 1:15 مساءً', type: 'order' },
  { id: '2', orderId: '1244', customer: 'جون سميث', amount: 25.00, status: 'pending', time: 'اليوم، الساعة 1:15 مساءً', type: 'order' },
  { id: '3', orderId: '1244', customer: 'جون سميث', amount: 25.00, status: 'pending', time: 'اليوم، الساعة 1:15 مساءً', type: 'order' },
  { id: '4', orderId: null, customer: 'إلى الحساب المصرفي', amount: 25.00, status: 'pending', time: 'اليوم، الساعة 1:15 مساءً', type: 'payout' },
];

export const MOCK_NOTIFICATIONS = [
  { id: '1', type: 'order', title: 'تم استلام طلب جديد', body: 'الطلب رقم 2452 (قطعتان)', time: 'منذ 5 دقائق', action: 'عرض الطلب' },
  { id: '2', type: 'delivery', title: 'استلم السائق الطلب رقم 2451', body: 'الطلب في طريقه إلى العميل', time: 'قبل 15 دقيقة', action: null },
  { id: '3', type: 'payment', title: 'تم إرسال مبلغ 180.00 ﷼ سعودي الخاص بك', body: 'راجع محفظتك للاطلاع على التفاصيل', time: 'قبل ساعة واحدة', action: 'عرض المحفظة' },
  { id: '4', type: 'order', title: 'تم إتمام الطلب رقم 2448', body: 'قيّم العميل المنتج بخمس نجوم', time: 'قبل ساعتين', action: null },
  { id: '5', type: 'system', title: 'الصيانة الدورية', body: 'سيتعطل التطبيق الساعة الثانية صباحاً الليلة', time: 'قبل 4 ساعات', action: null },
  { id: '6', type: 'payment', title: 'ملخص الأرباح الأسبوعية', body: 'لقد ربحت 1250.00 ريال سعودي هذا الأسبوع', time: 'قبل يوم واحد', action: null },
  { id: '7', type: 'system', title: 'تحديث قائمة الطعام', body: 'يرجى مراجعة عناصر قائمة الطعام الخاصة بك', time: 'قبل يومين', action: null },
];

export const MOCK_REVIEWS = [
  { id: '1', customer: 'سارة جونسون', rating: 5, comment: 'طعام رائع! البرياني كان مطهواً بإتقان، والنكهات أصيلة. سأطلبه بالتأكيد مرة أخرى.', time: 'قبل ساعتين', reply: null },
  { id: '2', customer: 'مايك براون', rating: 5, comment: 'كميات الطعام رائعة والتوصيل سريع. الكباب كان لذيذاً وساخناً عند وصوله.', time: 'قبل يوم واحد', reply: 'شكراً لك على كلماتك اللطيفة! يسعدنا أنك استمتعت بوجبتك 😊' },
  { id: '3', customer: 'إيما ديفيس', rating: 4, comment: 'الطعام جيد عموماً. كان سيستحق خمس نجوم لولا أن السمبوسة كانت باردة بعض الشيء. أما باقي الطعام فكان ممتازاً!', time: 'قبل 3 أيام', reply: null },
];

export const MOCK_PROMOTIONS = [
  { id: '1', code: 'وفر 20 ﷼', type: 'percentage', discount: 20, minOrder: 25, maxDiscount: 100, startDate: null, endDate: '31 ديسمبر', used: 45, total: 100, active: true, timeBased: false },
  { id: '2', code: 'عطلة نهاية الأسبوع 10', type: 'percentage', discount: 20, minOrder: 25, maxDiscount: 100, startDate: null, endDate: '31 ديسمبر', used: 45, total: 100, active: true, timeBased: false },
  { id: '3', code: 'عرض خاص لساعة التخفيضات', type: 'percentage', discount: 15, minOrder: null, maxDiscount: null, startDate: null, endDate: null, used: 0, total: 0, active: false, timeBased: true, timeFrom: '3:00 PM', timeTo: '5:00 PM', note: 'يبدأ غداً الساعة 3:00 مساءً' },
];

export const MOCK_PAYMENT_DETAIL = {
  period: '28 أكتوبر - 5 نوفمبر 2025',
  totalOrders: 127,
  totalSales: 85.50,
  platformFee: -307.40,
  paymentFee: -96.06,
  deliveryFee: -42.00,
  refunds: -25.00,
  netEarnings: 3372.04,
  bankAccount: '**** **** 9268',
  payoutScheduled: true,
};

export const DECLINE_REASONS = [
  'إنتهى من المخزن',
  'تعارض في الوقت/ مشغول للغاية',
  'موقع التسليم بعيد جداً',
];

export const CATEGORIES = ['مطبخ منزلي', 'مخبز منزلي', 'خدمات الطعام', 'آخر'];

export const DAYS = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
