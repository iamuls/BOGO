# BOGO - Amazon Affiliate Website

A colorful and modern Amazon affiliate website where you can manage and display products with affiliate links.

## Features

- 🛍️ Beautiful, colorful product display
- 🔐 Admin login system (Password: Bala@2009)
- ➕ Add products with Amazon links, prices, and images
- 🗑️ Delete products (admin only)
- 💾 Products stored in JSON file (no database required)
- 📱 Responsive design

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Server**
   ```bash
   npm start
   ```

3. **Access the Website**
   - Main site: http://localhost:3000
   - Admin panel: http://localhost:3000/admin

## Admin Access

- **Password**: Bala@2009
- Click the "Admin" button in the navigation or go to `/admin`
- Login to add or delete products

## Adding Products

1. Login to the admin panel
2. Fill in the form:
   - **Amazon Product Link**: Your affiliate link
   - **Price**: Product price (e.g., $99.99)
   - **Image URL**: Direct image URL from Amazon
3. Click "Add Product"

## Product Storage

Products are stored in `products.json` file. No separate database is required. The file is automatically updated when you add or delete products.

## Technologies Used

- Node.js
- Express.js
- HTML/CSS/JavaScript
- JSON file storage

Enjoy managing your affiliate products! 🎉
