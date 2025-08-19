# REST API Documentation - Agent E-commerce System

## Base URL
```
https://razorpaybackend-wgbh.onrender.com
```

## Authentication
All API requests require proper CORS headers. The API currently supports the following origins:
- https://agent-sigma-livid.vercel.app
- https://drjoints.in
- https://drjoints.vercel.app
- http://localhost:3000

## Content Type
All requests should include:
```
Content-Type: application/json
```

## API Endpoints

### 1. Order Management

#### Create Razorpay Order
```http
POST /create-order
```

**Request Body:**
```json
{
  "amount": 3999,
  "currency": "INR",
  "receipt": "receipt_12345",
  "notes": {
    "key1": "value1",
    "key2": "value2"
  }
}
```

**Response:**
```json
{
  "success": true,
  "order": {
    "id": "order_12345",
    "entity": "order",
    "amount": 399900,
    "amount_paid": 0,
    "amount_due": 399900,
    "currency": "INR",
    "receipt": "receipt_12345",
    "status": "created",
    "created_at": 1642678943
  },
  "key": "rzp_test_1234567890"
}
```

#### Verify Payment
```http
POST /verify-payment
```

**Request Body:**
```json
{
  "razorpay_order_id": "order_12345",
  "razorpay_payment_id": "pay_12345",
  "razorpay_signature": "signature_hash"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment verification successful",
  "orderId": "order_12345",
  "paymentId": "pay_12345"
}
```

### 2. Email Services

#### Send Order Confirmation Email
```http
POST /agent_to_customer
```

**Request Body:**
```json
{
  "customerEmail": "customer@example.com",
  "orderDetails": {
    "orderNumber": "ORD-12345",
    "productName": "Dr. Joints Original Pain Relief Oil",
    "quantity": 2,
    "totalAmount": 3999,
    "currency": "INR",
    "paymentMethod": "Online",
    "paymentId": "pay_12345",
    "products": [
      {
        "name": "Dr. Joints Original Pain Relief Oil",
        "quantity": 2,
        "price": 3999
      }
    ]
  },
  "customerDetails": {
    "firstName": "John",
    "lastName": "Doe",
    "phone": "9876543210",
    "address": "123 Main Street",
    "apartment": "Apt 4B",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zip": "400001",
    "country": "India"
  },
  "productName": "Dr. Joints Original Pain Relief Oil"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Confirmation email sent successfully!"
}
```

#### Send Abandoned Cart Follow-up Email
```http
POST /send-abandoned-cart-email
```

**Request Body:**
```json
{
  "customerEmail": "customer@example.com",
  "orderDetails": {
    "orderNumber": "ORD-12345",
    "productName": "Dr. Joints Original Pain Relief Oil",
    "totalAmount": 3999,
    "currency": "INR"
  },
  "customerDetails": {
    "firstName": "John",
    "lastName": "Doe",
    "phone": "9876543210",
    "address": "123 Main Street",
    "city": "Mumbai",
    "country": "India"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Abandoned order follow-up email sent successfully!"
}
```

### 3. Shipping Integration (Shiprocket)

#### Create Shiprocket Order
```http
POST /shiprocket/create-order
```

**Request Body:**
```json
{
  "order_id": "ORD-12345",
  "order_date": "2024-01-15",
  "pickup_location": "Primary",
  "channel_id": "123456",
  "comment": "Fragile item",
  "billing_customer_name": "John",
  "billing_last_name": "Doe",
  "billing_address": "123 Main Street",
  "billing_address_2": "Apt 4B",
  "billing_city": "Mumbai",
  "billing_pincode": "400001",
  "billing_state": "Maharashtra",
  "billing_country": "India",
  "billing_email": "customer@example.com",
  "billing_phone": "9876543210",
  "shipping_is_billing": true,
  "order_items": [
    {
      "name": "Dr. Joints Original Pain Relief Oil",
      "sku": "DJ001",
      "units": 2,
      "selling_price": 3999,
      "discount": 0,
      "tax": 0,
      "hsn": 30049099
    }
  ],
  "payment_method": "Prepaid",
  "shipping_charges": 0,
  "giftwrap_charges": 0,
  "transaction_charges": 0,
  "total_discount": 0,
  "sub_total": 3999,
  "length": 20,
  "breadth": 15,
  "height": 10,
  "weight": 0.5
}
```

**Response:**
```json
{
  "success": true,
  "order_id": "123456789",
  "shipment_id": "987654321"
}
```

#### Track Shipment
```http
GET /shiprocket/track/:shipmentId
```

**Response:**
```json
{
  "success": true,
  "tracking": {
    "shipment_id": "987654321",
    "awb_number": "12345678901234",
    "courier_name": "Delhivery",
    "current_status": "In Transit",
    "tracking_data": [
      {
        "date": "2024-01-15T10:00:00Z",
        "status": "Shipped",
        "location": "Mumbai"
      },
      {
        "date": "2024-01-16T14:30:00Z",
        "status": "In Transit",
        "location": "Pune"
      }
    ]
  }
}
```

### 4. YouTube Integration

#### Verify YouTube Subscription
```http
POST /verify-youtube-subscription
```

**Request Body:**
```json
{
  "channelId": "UC1234567890",
  "userToken": "youtube_access_token"
}
```

**Response:**
```json
{
  "success": true,
  "subscribed": true,
  "message": "User is subscribed to the channel"
}
```

### 5. Customer Management

#### Get Customer Details
```http
GET /customer/:customerId
```

**Response:**
```json
{
  "success": true,
  "customer": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "9876543210",
    "country": "India",
    "status": "active",
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z"
  }
}
```

#### Create Customer
```http
POST /customer
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "9876543210",
  "country": "India",
  "companyName": "Acme Corp"
}
```

**Response:**
```json
{
  "success": true,
  "customer": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "9876543210",
    "country": "India",
    "companyName": "Acme Corp",
    "status": "active",
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z"
  }
}
```

### 6. Product Management

#### Get All Products
```http
GET /products
```

**Query Parameters:**
- `status` (optional): Filter by product status (active, inactive, discontinued)
- `category` (optional): Filter by product category
- `limit` (optional): Number of products to return (default: 50)
- `offset` (optional): Number of products to skip (default: 0)

**Response:**
```json
{
  "success": true,
  "products": [
    {
      "id": "drjoints-original",
      "name": "Dr. Joints Original Pain Relief Oil",
      "description": "Effective ayurvedic pain relief oil",
      "basePrice": 3999,
      "minPrice": 2500,
      "currency": "INR",
      "category": "Health & Wellness",
      "status": "active",
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ],
  "total": 9,
  "limit": 50,
  "offset": 0
}
```

#### Get Product Details
```http
GET /products/:productId
```

**Response:**
```json
{
  "success": true,
  "product": {
    "id": "drjoints-original",
    "name": "Dr. Joints Original Pain Relief Oil",
    "description": "Effective ayurvedic pain relief oil",
    "basePrice": 3999,
    "minPrice": 2500,
    "currency": "INR",
    "category": "Health & Wellness",
    "status": "active",
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z"
  }
}
```

### 7. Order Management

#### Get All Orders
```http
GET /orders
```

**Query Parameters:**
- `customerId` (optional): Filter by customer ID
- `agentId` (optional): Filter by agent ID
- `status` (optional): Filter by order status
- `paymentStatus` (optional): Filter by payment status
- `startDate` (optional): Filter orders after this date (ISO format)
- `endDate` (optional): Filter orders before this date (ISO format)
- `limit` (optional): Number of orders to return (default: 50)
- `offset` (optional): Number of orders to skip (default: 0)

**Response:**
```json
{
  "success": true,
  "orders": [
    {
      "id": 1,
      "orderNumber": "ORD-12345",
      "customerId": 1,
      "agentId": 1,
      "productId": "drjoints-original",
      "quantity": 2,
      "unitPrice": 3999,
      "totalAmount": 7998,
      "advanceAmount": 1600,
      "discountPercentage": 10,
      "discountAmount": 799.8,
      "finalAmount": 7198.2,
      "currency": "INR",
      "paymentMode": "online",
      "paymentStatus": "paid",
      "orderStatus": "confirmed",
      "promoCode": "FLASH70",
      "isPromoApplied": true,
      "callNotes": "Customer requested faster delivery",
      "customerSource": "Website",
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ],
  "total": 150,
  "limit": 50,
  "offset": 0
}
```

#### Get Order Details
```http
GET /orders/:orderId
```

**Response:**
```json
{
  "success": true,
  "order": {
    "id": 1,
    "orderNumber": "ORD-12345",
    "customer": {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phone": "9876543210"
    },
    "product": {
      "id": "drjoints-original",
      "name": "Dr. Joints Original Pain Relief Oil",
      "basePrice": 3999
    },
    "quantity": 2,
    "unitPrice": 3999,
    "totalAmount": 7998,
    "advanceAmount": 1600,
    "paymentMode": "online",
    "paymentStatus": "paid",
    "orderStatus": "confirmed",
    "shippingDetails": {
      "awbNumber": "12345678901234",
      "courierName": "Delhivery",
      "trackingUrl": "https://track.delhivery.com/tracking/12345678901234"
    },
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z"
  }
}
```

### 8. Analytics and Reports

#### Get Dashboard Statistics
```http
GET /dashboard/stats
```

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalOrders": 1250,
    "totalRevenue": 4987500,
    "avgOrderValue": 3990,
    "totalCustomers": 890,
    "pendingOrders": 45,
    "completedOrders": 1150,
    "failedPayments": 55,
    "todayOrders": 25,
    "todayRevenue": 99750,
    "monthlyGrowth": 15.5
  }
}
```

#### Get Sales Analytics
```http
GET /analytics/sales
```

**Query Parameters:**
- `startDate` (required): Start date for analytics (ISO format)
- `endDate` (required): End date for analytics (ISO format)
- `groupBy` (optional): Group by period (day, week, month, year)

**Response:**
```json
{
  "success": true,
  "analytics": {
    "period": "2024-01",
    "totalOrders": 325,
    "totalRevenue": 1296750,
    "avgOrderValue": 3990,
    "topProducts": [
      {
        "productId": "drjoints-original",
        "productName": "Dr. Joints Original Pain Relief Oil",
        "totalSales": 180,
        "totalRevenue": 718200
      },
      {
        "productId": "beyond-slim",
        "productName": "Beyond Slim",
        "totalSales": 95,
        "totalRevenue": 474500
      }
    ],
    "paymentModeDistribution": [
      {
        "paymentMode": "online",
        "count": 260,
        "percentage": 80
      },
      {
        "paymentMode": "cod",
        "count": 65,
        "percentage": 20
      }
    ],
    "orderStatusDistribution": [
      {
        "status": "delivered",
        "count": 280,
        "percentage": 86.2
      },
      {
        "status": "shipped",
        "count": 25,
        "percentage": 7.7
      },
      {
        "status": "processing",
        "count": 15,
        "percentage": 4.6
      },
      {
        "status": "cancelled",
        "count": 5,
        "percentage": 1.5
      }
    ]
  }
}
```

## Error Responses

### Standard Error Format
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message",
  "code": "ERROR_CODE"
}
```

### Common Error Codes
- `VALIDATION_ERROR`: Request validation failed
- `PAYMENT_FAILED`: Payment processing failed
- `ORDER_NOT_FOUND`: Order not found
- `CUSTOMER_NOT_FOUND`: Customer not found
- `PRODUCT_NOT_FOUND`: Product not found
- `INSUFFICIENT_STOCK`: Product out of stock
- `INVALID_PROMO_CODE`: Invalid or expired promo code
- `EMAIL_SEND_FAILED`: Email sending failed
- `SHIPPING_ERROR`: Shipping integration error
- `UNAUTHORIZED`: Authentication failed
- `FORBIDDEN`: Access denied
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `INTERNAL_ERROR`: Server error

### HTTP Status Codes
- `200 OK`: Success
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Access denied
- `404 Not Found`: Resource not found
- `409 Conflict`: Resource conflict
- `422 Unprocessable Entity`: Validation error
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error
- `503 Service Unavailable`: Service temporarily unavailable

## Rate Limiting
- Maximum 100 requests per minute per IP
- Maximum 1000 requests per hour per IP
- Payment verification: Maximum 5 requests per minute per IP

## Webhook Events
The system supports webhooks for real-time notifications:

### Order Events
- `order.created`
- `order.updated`
- `order.cancelled`
- `order.shipped`
- `order.delivered`

### Payment Events
- `payment.successful`
- `payment.failed`
- `payment.refunded`

### Email Events
- `email.sent`
- `email.failed`
- `email.bounced`

## Testing
For testing purposes, you can use the following test data:

### Test Credit Card Numbers (Razorpay)
- `4111111111111111` (Visa)
- `5555555555554444` (Mastercard)
- `378282246310005` (American Express)

### Test UPI ID
- `test@razorpay`

### Test Phone Numbers
- `9876543210` (Valid)
- `1234567890` (Invalid format)

### Test Email Addresses
- `test@example.com` (Valid)
- `invalid-email` (Invalid format)

## SDK and Libraries
- **Node.js**: `razorpay` npm package
- **JavaScript**: Razorpay Checkout.js
- **React**: `@razorpay/react-checkout`
- **PHP**: `razorpay/razorpay` composer package
- **Python**: `razorpay` pip package
