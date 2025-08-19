# Agent E-commerce System - Schema Documentation

This directory contains comprehensive schema definitions for the Agent E-commerce system, providing a complete data structure foundation for the project.

## 📁 Schema Files Overview

### 1. `database-schema.md`
**Complete SQL Database Schema**
- MySQL/PostgreSQL compatible table definitions
- Primary keys, foreign keys, and relationships
- Indexes for performance optimization
- Sample data insertion scripts
- Utility views for common queries
- Covers all entities: Orders, Customers, Products, Payments, Shipping, etc.

### 2. `schemas.json`
**JSON Schema Definitions**
- Validation schemas for all data structures
- API request/response validation
- Form data validation
- Follows JSON Schema Draft 07 specification
- Can be used with libraries like Ajv for validation

### 3. `types.ts`
**TypeScript Type Definitions**
- Complete TypeScript interfaces
- Type-safe development support
- Enums for status values
- Utility types and constants
- API request/response types
- Form data types

### 4. `schema.graphql`
**GraphQL Schema Definition**
- Complete GraphQL type system
- Queries, mutations, and subscriptions
- Input types and filters
- Pagination support
- Real-time updates via subscriptions
- Analytics and reporting queries

### 5. `api-documentation.md`
**REST API Documentation**
- Complete API endpoint documentation
- Request/response examples
- Authentication requirements
- Error handling
- Rate limiting information
- Webhook specifications

## 🗄️ Database Structure

The system uses a normalized database design with the following core entities:

### Core Tables
- **customers**: Customer information and contact details
- **products**: Product catalog with pricing and status
- **orders**: Order management with status tracking
- **order_items**: Multi-product order support
- **customer_addresses**: Shipping and billing addresses
- **payments**: Payment processing and tracking
- **agents**: Sales agents and representatives
- **promo_codes**: Discount codes and promotions
- **shipping_details**: Shipping and tracking information
- **email_logs**: Email communication history

### Key Relationships
- `customers` → `orders` (one-to-many)
- `orders` → `order_items` (one-to-many)
- `orders` → `payments` (one-to-many)
- `orders` → `shipping_details` (one-to-one)
- `customers` → `customer_addresses` (one-to-many)
- `agents` → `orders` (one-to-many)

## 🎯 Key Features Supported

### Order Management
- Single and multi-product orders
- Dynamic pricing with minimum price validation
- Promo code support
- Advance payment tracking
- Order status lifecycle

### Payment Processing
- Razorpay integration
- Multiple payment modes (online, COD, partial)
- Payment verification and tracking
- Refund management

### Customer Management
- Customer profiles and addresses
- Order history tracking
- Communication preferences
- Address management

### Shipping Integration
- Shiprocket API integration
- Tracking number management
- Delivery status updates
- Multi-courier support

### Communication
- Automated email notifications
- Email template management
- Delivery confirmations
- Abandoned cart recovery

## 🔧 Usage Examples

### TypeScript Usage
```typescript
import { Order, Customer, CreateOrderRequest } from './schema/types';

const createOrder = async (request: CreateOrderRequest): Promise<Order> => {
  // Type-safe order creation
  const order = await orderService.create(request);
  return order;
};
```

### JSON Schema Validation
```javascript
const Ajv = require('ajv');
const schemas = require('./schema/schemas.json');

const ajv = new Ajv();
const validateOrder = ajv.compile(schemas.schemas.Order);

const isValid = validateOrder(orderData);
if (!isValid) {
  console.log(validateOrder.errors);
}
```

### GraphQL Query Example
```graphql
query GetOrderWithDetails($orderId: ID!) {
  order(id: $orderId) {
    id
    orderNumber
    totalAmount
    orderStatus
    customer {
      firstName
      lastName
      email
    }
    product {
      name
      basePrice
    }
    shippingDetails {
      awbNumber
      courierName
      trackingUrl
    }
  }
}
```

### Database Query Example
```sql
-- Get order summary with customer and product details
SELECT 
    o.order_number,
    CONCAT(c.first_name, ' ', c.last_name) as customer_name,
    p.name as product_name,
    o.total_amount,
    o.order_status,
    o.created_at
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN products p ON o.product_id = p.id
WHERE o.order_status = 'pending'
ORDER BY o.created_at DESC;
```

## 📊 Analytics and Reporting

The schema supports comprehensive analytics with pre-built views:

### Monthly Sales Report
```sql
SELECT * FROM monthly_sales 
WHERE month >= '2024-01' 
ORDER BY month DESC;
```

### Product Performance
```sql
SELECT * FROM product_performance 
ORDER BY total_revenue DESC 
LIMIT 10;
```

### Order Summary
```sql
SELECT * FROM order_summary 
WHERE customer_email = 'customer@example.com';
```

## 🚀 Implementation Guidelines

### 1. Database Setup
1. Create database and user
2. Run the SQL schema from `database-schema.md`
3. Insert sample data for testing
4. Create indexes for performance

### 2. API Development
1. Use TypeScript interfaces from `types.ts`
2. Implement JSON schema validation
3. Follow REST API patterns from documentation
4. Add proper error handling

### 3. Frontend Integration
1. Use TypeScript types for type safety
2. Implement form validation with JSON schemas
3. Handle API responses properly
4. Add proper error states

### 4. Testing
1. Use sample data for unit tests
2. Test all API endpoints
3. Validate schema compliance
4. Test error scenarios

## 🔐 Security Considerations

### Data Protection
- Encrypt sensitive customer data
- Use secure payment processing
- Implement proper authentication
- Add rate limiting

### Validation
- Validate all inputs using JSON schemas
- Sanitize user inputs
- Implement proper error handling
- Add audit logging

### Access Control
- Implement role-based access
- Secure API endpoints
- Use proper authentication tokens
- Log all administrative actions

## 📈 Performance Optimization

### Database Optimization
- Use provided indexes
- Implement query optimization
- Add caching where appropriate
- Monitor slow queries

### API Optimization
- Implement pagination
- Use proper caching headers
- Add response compression
- Monitor API performance

## 🛠️ Maintenance

### Regular Tasks
- Monitor database performance
- Update indexes as needed
- Review and optimize queries
- Update schema documentation

### Backup Strategy
- Regular database backups
- Version control schema changes
- Test backup restoration
- Document recovery procedures

## 📞 Support

For questions or issues with the schema:
1. Check the documentation files
2. Review the TypeScript types
3. Validate against JSON schemas
4. Test with sample data

## 🔄 Version History

### v1.0.0 (Current)
- Initial schema design
- Core entity definitions
- Basic relationships
- Sample data and queries

### Future Enhancements
- Multi-currency support
- Advanced analytics
- Inventory management
- Subscription support
- Mobile app integration

---

This schema provides a solid foundation for a scalable e-commerce system with comprehensive order management, payment processing, and customer relationship features.
