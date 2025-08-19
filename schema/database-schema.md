# Database Schema for Agent E-commerce System

## Overview
This document defines the database schema for the Agent E-commerce system, which handles order management, product catalog, customer data, and payment processing.

## Core Tables

### 1. Customers Table
```sql
CREATE TABLE customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(15) NOT NULL,
    country VARCHAR(100) DEFAULT 'India',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status ENUM('active', 'inactive', 'blocked') DEFAULT 'active'
);
```

### 2. Products Table
```sql
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    base_price DECIMAL(10, 2) NOT NULL,
    min_price DECIMAL(10, 2) NOT NULL DEFAULT 2500.00,
    currency VARCHAR(3) DEFAULT 'INR',
    status ENUM('active', 'inactive', 'discontinued') DEFAULT 'active',
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 3. Orders Table
```sql
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    customer_id INT,
    agent_id INT,
    product_id INT,
    quantity INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    advance_amount DECIMAL(10, 2) NOT NULL,
    discount_percentage DECIMAL(5, 2) DEFAULT 0,
    discount_amount DECIMAL(10, 2) DEFAULT 0,
    final_amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'INR',
    payment_mode ENUM('online', 'cod', 'partial') NOT NULL,
    payment_status ENUM('pending', 'partial', 'paid', 'failed', 'refunded') DEFAULT 'pending',
    order_status ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    promo_code VARCHAR(50),
    is_promo_applied BOOLEAN DEFAULT FALSE,
    call_notes TEXT,
    customer_source VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (agent_id) REFERENCES agents(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```

### 4. Order Items Table (for multi-product orders)
```sql
CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```

### 5. Customer Addresses Table
```sql
CREATE TABLE customer_addresses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    type ENUM('shipping', 'billing') NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    company_name VARCHAR(255),
    street_address TEXT NOT NULL,
    apartment VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    pincode VARCHAR(10) NOT NULL,
    country VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);
```

### 6. Payments Table
```sql
CREATE TABLE payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    payment_id VARCHAR(255) UNIQUE NOT NULL,
    razorpay_order_id VARCHAR(255),
    razorpay_payment_id VARCHAR(255),
    razorpay_signature VARCHAR(255),
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'INR',
    payment_method VARCHAR(50),
    payment_status ENUM('pending', 'success', 'failed', 'cancelled') DEFAULT 'pending',
    gateway_response TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);
```

### 7. Agents Table
```sql
CREATE TABLE agents (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(15) NOT NULL,
    employee_id VARCHAR(50) UNIQUE,
    department VARCHAR(100),
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 8. Promo Codes Table
```sql
CREATE TABLE promo_codes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    discount_type ENUM('percentage', 'fixed') NOT NULL,
    discount_value DECIMAL(10, 2) NOT NULL,
    min_order_amount DECIMAL(10, 2) DEFAULT 0,
    max_discount_amount DECIMAL(10, 2),
    usage_limit INT,
    used_count INT DEFAULT 0,
    valid_from DATE,
    valid_until DATE,
    status ENUM('active', 'inactive', 'expired') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 9. Shipping Details Table
```sql
CREATE TABLE shipping_details (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    shiprocket_order_id VARCHAR(255),
    shipment_id VARCHAR(255),
    awb_number VARCHAR(255),
    courier_name VARCHAR(100),
    tracking_url TEXT,
    shipping_status ENUM('pending', 'processed', 'shipped', 'in_transit', 'delivered', 'returned') DEFAULT 'pending',
    shipped_at TIMESTAMP NULL,
    delivered_at TIMESTAMP NULL,
    tracking_data JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);
```

### 10. Email Logs Table
```sql
CREATE TABLE email_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    email_type ENUM('order_confirmation', 'shipping_update', 'delivery_confirmation', 'abandoned_cart', 'follow_up') NOT NULL,
    recipient_email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    email_body TEXT,
    status ENUM('sent', 'failed', 'bounced') DEFAULT 'sent',
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    error_message TEXT,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);
```

## Indexes for Performance

```sql
-- Customer indexes
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_phone ON customers(phone);
CREATE INDEX idx_customers_created_at ON customers(created_at);

-- Order indexes
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_agent_id ON orders(agent_id);
CREATE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_order_status ON orders(order_status);
CREATE INDEX idx_orders_created_at ON orders(created_at);

-- Payment indexes
CREATE INDEX idx_payments_order_id ON payments(order_id);
CREATE INDEX idx_payments_payment_id ON payments(payment_id);
CREATE INDEX idx_payments_razorpay_order_id ON payments(razorpay_order_id);
CREATE INDEX idx_payments_payment_status ON payments(payment_status);

-- Product indexes
CREATE INDEX idx_products_product_id ON products(product_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_category ON products(category);

-- Address indexes
CREATE INDEX idx_customer_addresses_customer_id ON customer_addresses(customer_id);
CREATE INDEX idx_customer_addresses_type ON customer_addresses(type);

-- Shipping indexes
CREATE INDEX idx_shipping_details_order_id ON shipping_details(order_id);
CREATE INDEX idx_shipping_details_shiprocket_order_id ON shipping_details(shiprocket_order_id);
CREATE INDEX idx_shipping_details_awb_number ON shipping_details(awb_number);

-- Email logs indexes
CREATE INDEX idx_email_logs_order_id ON email_logs(order_id);
CREATE INDEX idx_email_logs_email_type ON email_logs(email_type);
CREATE INDEX idx_email_logs_sent_at ON email_logs(sent_at);
```

## Sample Data Insertion

```sql
-- Insert sample products
INSERT INTO products (product_id, name, description, base_price, min_price, category) VALUES
('drjoints-original', 'Dr. Joints Original Pain Relief Oil', 'Effective ayurvedic pain relief oil', 3999.00, 2500.00, 'Health & Wellness'),
('beyond-slim', 'Beyond Slim', 'Weight management supplement', 4999.00, 3000.00, 'Health & Wellness'),
('sampoorn-arogya', 'Sampoorn Arogya', 'Complete health supplement', 5999.00, 3500.00, 'Health & Wellness'),
('shilajit', 'Shilajit', 'Pure Himalayan Shilajit', 2999.00, 1800.00, 'Health & Wellness'),
('dia-free', 'Dia Free', 'Diabetes management supplement', 4499.00, 2800.00, 'Health & Wellness'),
('dr-alco-free', 'Dr. Alco Free', 'Alcohol de-addiction supplement', 3499.00, 2200.00, 'Health & Wellness');

-- Insert sample promo codes
INSERT INTO promo_codes (code, description, discount_type, discount_value, min_order_amount, valid_from, valid_until) VALUES
('FLASH70', 'Flash Sale 70% off', 'percentage', 70.00, 1000.00, '2024-01-01', '2024-12-31'),
('SAVE10', 'Save 10% on orders', 'percentage', 10.00, 500.00, '2024-01-01', '2024-12-31'),
('FLAT500', 'Flat 500 off', 'fixed', 500.00, 2000.00, '2024-01-01', '2024-12-31');

-- Insert sample agent
INSERT INTO agents (name, email, phone, employee_id, department) VALUES
('Default Agent', 'agent@example.com', '1234567890', 'AG001', 'Sales');
```

## Views for Common Queries

```sql
-- Order summary view
CREATE VIEW order_summary AS
SELECT 
    o.id,
    o.order_number,
    CONCAT(c.first_name, ' ', c.last_name) as customer_name,
    c.email as customer_email,
    c.phone as customer_phone,
    p.name as product_name,
    o.quantity,
    o.total_amount,
    o.payment_status,
    o.order_status,
    o.created_at
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN products p ON o.product_id = p.id;

-- Monthly sales report view
CREATE VIEW monthly_sales AS
SELECT 
    DATE_FORMAT(created_at, '%Y-%m') as month,
    COUNT(*) as total_orders,
    SUM(total_amount) as total_revenue,
    AVG(total_amount) as avg_order_value,
    COUNT(CASE WHEN payment_status = 'paid' THEN 1 END) as paid_orders,
    COUNT(CASE WHEN order_status = 'delivered' THEN 1 END) as delivered_orders
FROM orders
GROUP BY DATE_FORMAT(created_at, '%Y-%m')
ORDER BY month DESC;

-- Product performance view
CREATE VIEW product_performance AS
SELECT 
    p.name as product_name,
    COUNT(o.id) as total_orders,
    SUM(o.quantity) as total_quantity_sold,
    SUM(o.total_amount) as total_revenue,
    AVG(o.unit_price) as avg_selling_price,
    COUNT(CASE WHEN o.order_status = 'delivered' THEN 1 END) as delivered_orders
FROM products p
LEFT JOIN orders o ON p.id = o.product_id
GROUP BY p.id, p.name
ORDER BY total_revenue DESC;
```

This schema provides a comprehensive foundation for the Agent E-commerce system, covering all major entities and relationships identified in the codebase.
