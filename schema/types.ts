// TypeScript interfaces for Agent E-commerce System
// Generated from database schema

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  companyName?: string;
  status: 'active' | 'inactive' | 'blocked';
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  basePrice: number;
  minPrice: number;
  currency: string;
  category?: string;
  status: 'active' | 'inactive' | 'discontinued';
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: number;
  orderNumber: string;
  customerId: number;
  agentId?: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  advanceAmount: number;
  discountPercentage: number;
  discountAmount: number;
  finalAmount: number;
  currency: string;
  paymentMode: 'online' | 'cod' | 'partial';
  paymentStatus: 'pending' | 'partial' | 'paid' | 'failed' | 'refunded';
  orderStatus: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  promoCode?: string;
  isPromoApplied: boolean;
  callNotes?: string;
  customerSource?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  createdAt: Date;
}

export interface CustomerAddress {
  id: number;
  customerId: number;
  type: 'shipping' | 'billing';
  firstName?: string;
  lastName?: string;
  companyName?: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  state?: string;
  pincode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: number;
  orderId: number;
  paymentId: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  amount: number;
  currency: string;
  paymentMethod?: string;
  paymentStatus: 'pending' | 'success' | 'failed' | 'cancelled';
  gatewayResponse?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface Agent {
  id: number;
  name: string;
  email: string;
  phone: string;
  employeeId?: string;
  department?: string;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
  updatedAt: Date;
}

export interface PromoCode {
  id: number;
  code: string;
  description?: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount: number;
  maxDiscountAmount?: number;
  usageLimit?: number;
  usedCount: number;
  validFrom?: Date;
  validUntil?: Date;
  status: 'active' | 'inactive' | 'expired';
  createdAt: Date;
  updatedAt: Date;
}

export interface ShippingDetails {
  id: number;
  orderId: number;
  shiprocketOrderId?: string;
  shipmentId?: string;
  awbNumber?: string;
  courierName?: string;
  trackingUrl?: string;
  shippingStatus: 'pending' | 'processed' | 'shipped' | 'in_transit' | 'delivered' | 'returned';
  shippedAt?: Date;
  deliveredAt?: Date;
  trackingData?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmailLog {
  id: number;
  orderId?: number;
  emailType: 'order_confirmation' | 'shipping_update' | 'delivery_confirmation' | 'abandoned_cart' | 'follow_up';
  recipientEmail: string;
  subject?: string;
  emailBody?: string;
  status: 'sent' | 'failed' | 'bounced';
  sentAt: Date;
  errorMessage?: string;
}

// Form Data Interfaces
export interface AgentFormData {
  firstName: string;
  lastName: string;
  companyName?: string;
  country: string;
  streetAddress: string;
  apartment?: string;
  townCity: string;
  pincode: string;
  phone: string;
  paymentMode: 'online' | 'cod' | 'partial';
}

export interface CustomerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName?: string;
  country: string;
}

export interface AddressFormData {
  streetAddress: string;
  apartment?: string;
  city: string;
  state?: string;
  pincode: string;
  country: string;
}

export interface OrderFormData {
  productId: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  advanceAmount: number;
  paymentMode: 'online' | 'cod' | 'partial';
  promoCode?: string;
  callNotes?: string;
  customerSource?: string;
  agentName?: string;
}

// API Request/Response Interfaces
export interface CreateOrderRequest {
  customerDetails: CustomerFormData;
  addressDetails: AddressFormData;
  orderDetails: OrderFormData;
}

export interface CreateOrderResponse {
  success: boolean;
  orderId?: number;
  orderNumber?: string;
  message?: string;
  error?: string;
}

export interface PaymentVerificationRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface PaymentVerificationResponse {
  success: boolean;
  message: string;
  orderId?: string;
  paymentId?: string;
}

export interface EmailRequest {
  customerEmail: string;
  orderDetails: {
    orderNumber: string;
    productName?: string;
    quantity?: number;
    totalAmount: number;
    currency?: string;
    paymentMethod?: string;
    paymentId?: string;
    products?: Array<{
      name: string;
      quantity: number;
      price: number;
    }>;
  };
  customerDetails: {
    firstName: string;
    lastName: string;
    phone?: string;
    address?: string;
    apartment?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
}

export interface EmailResponse {
  success: boolean;
  message: string;
  error?: string;
}

export interface RazorpayOrderRequest {
  amount: number;
  currency?: string;
  receipt?: string;
  notes?: any;
}

export interface RazorpayOrderResponse {
  success: boolean;
  order?: any;
  key?: string;
  message?: string;
  error?: string;
}

export interface ShiprocketOrderRequest {
  order_id: string;
  order_date: string;
  pickup_location: string;
  channel_id: string;
  comment?: string;
  billing_customer_name: string;
  billing_last_name: string;
  billing_address: string;
  billing_address_2?: string;
  billing_city: string;
  billing_pincode: string;
  billing_state: string;
  billing_country: string;
  billing_email: string;
  billing_phone: string;
  shipping_is_billing: boolean;
  shipping_customer_name?: string;
  shipping_last_name?: string;
  shipping_address?: string;
  shipping_address_2?: string;
  shipping_city?: string;
  shipping_pincode?: string;
  shipping_state?: string;
  shipping_country?: string;
  shipping_email?: string;
  shipping_phone?: string;
  order_items: Array<{
    name: string;
    sku: string;
    units: number;
    selling_price: number;
    discount?: number;
    tax?: number;
    hsn?: number;
  }>;
  payment_method: string;
  shipping_charges?: number;
  giftwrap_charges?: number;
  transaction_charges?: number;
  total_discount?: number;
  sub_total: number;
  length: number;
  breadth: number;
  height: number;
  weight: number;
}

export interface ShiprocketOrderResponse {
  success: boolean;
  order_id?: string;
  shipment_id?: string;
  message?: string;
  error?: string;
}

// Utility Types
export type OrderStatus = Order['orderStatus'];
export type PaymentStatus = Order['paymentStatus'];
export type PaymentMode = Order['paymentMode'];
export type CustomerStatus = Customer['status'];
export type ProductStatus = Product['status'];
export type ShippingStatus = ShippingDetails['shippingStatus'];
export type EmailType = EmailLog['emailType'];
export type EmailStatus = EmailLog['status'];

// Search and Filter Interfaces
export interface OrderSearchParams {
  customerId?: number;
  agentId?: number;
  orderStatus?: OrderStatus;
  paymentStatus?: PaymentStatus;
  startDate?: Date;
  endDate?: Date;
  productId?: string;
  orderNumber?: string;
  customerEmail?: string;
  customerPhone?: string;
  limit?: number;
  offset?: number;
}

export interface CustomerSearchParams {
  email?: string;
  phone?: string;
  status?: CustomerStatus;
  country?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
}

export interface ProductSearchParams {
  category?: string;
  status?: ProductStatus;
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
  offset?: number;
}

// Dashboard and Analytics Interfaces
export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  avgOrderValue: number;
  totalCustomers: number;
  pendingOrders: number;
  completedOrders: number;
  failedPayments: number;
  todayOrders: number;
  todayRevenue: number;
  monthlyGrowth: number;
}

export interface SalesAnalytics {
  period: string;
  totalOrders: number;
  totalRevenue: number;
  avgOrderValue: number;
  topProducts: Array<{
    productId: string;
    productName: string;
    totalSales: number;
    totalRevenue: number;
  }>;
  paymentModeDistribution: Array<{
    paymentMode: PaymentMode;
    count: number;
    percentage: number;
  }>;
  orderStatusDistribution: Array<{
    status: OrderStatus;
    count: number;
    percentage: number;
  }>;
}

// Error Handling
export interface ApiError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

// Configuration
export interface AppConfig {
  razorpayKeyId: string;
  razorpayKeySecret: string;
  shiprocketEmail: string;
  shiprocketPassword: string;
  emailUser: string;
  emailPass: string;
  apiBaseUrl: string;
  defaultCurrency: string;
  minOrderAmount: number;
  minAdvanceAmount: number;
  validPromoCodes: string[];
}

// Constants
export const PRODUCT_OPTIONS = [
  { id: "drjoints-original", name: "Dr. Joints Original Pain Relief Oil" },
  { id: "Beyond Slim", name: "Beyond Slim" },
  { id: "Sampoorn Arogya", name: "Sampoorn Arogya" },
  { id: "Sri Anjaneya Shani Raksha", name: "Sri Anjaneya Shani Raksha" },
  { id: "Sree Astha Laxmi Dhana Akarsha Yantra", name: "Sree Astha Laxmi Dhana Akarsha Yantra" },
  { id: "Dia Free", name: "Dia Free" },
  { id: "Shilajit", name: "Shilajit" },
  { id: "Dr Alco free", name: "Dr. Alco Free" },
  { id: "Dhanalaxmi Yantra", name: "Dhanalaxmi Yantra" }
] as const;

export const COUNTRY_CURRENCY_MAP = {
  'India': { currency: 'INR', symbol: '₹', rate: 1 }
} as const;

export const VALID_PROMO_CODE = "FLASH70" as const;
export const DEFAULT_COUNTRY = "India" as const;
export const API_BASE_URL = "https://razorpaybackend-wgbh.onrender.com" as const;
