const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const ADMIN_PASSWORD = 'Bala@2009';
const PRODUCTS_FILE = path.join(__dirname, 'products.json');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'bogo-secret-key-2024',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true in production with HTTPS
}));

// Serve static files
app.use(express.static('public'));

// Initialize products.json if it doesn't exist
if (!fs.existsSync(PRODUCTS_FILE)) {
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify([], null, 2));
}

// Helper function to read products
function readProducts() {
  try {
    const data = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Helper function to write products
function writeProducts(products) {
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
}

// Admin login route
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    req.session.isAdmin = true;
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.json({ success: false, message: 'Invalid password' });
  }
});

// Admin logout route
app.post('/api/admin/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true, message: 'Logged out successfully' });
});

// Check admin status
app.get('/api/admin/status', (req, res) => {
  res.json({ isAdmin: req.session.isAdmin === true });
});

// Get all products (public)
app.get('/api/products', (req, res) => {
  const products = readProducts();
  res.json(products);
});

// Add product (admin only)
app.post('/api/products', (req, res) => {
  if (!req.session.isAdmin) {
    return res.status(403).json({ success: false, message: 'Unauthorized' });
  }

  const { link, price, image } = req.body;
  
  if (!link || !price || !image) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const products = readProducts();
  const newProduct = {
    id: Date.now().toString(),
    link: link,
    price: price,
    image: image,
    createdAt: new Date().toISOString()
  };

  products.push(newProduct);
  writeProducts(products);

  res.json({ success: true, product: newProduct });
});

// Delete product (admin only)
app.delete('/api/products/:id', (req, res) => {
  if (!req.session.isAdmin) {
    return res.status(403).json({ success: false, message: 'Unauthorized' });
  }

  const products = readProducts();
  const filteredProducts = products.filter(p => p.id !== req.params.id);
  writeProducts(filteredProducts);

  res.json({ success: true, message: 'Product deleted' });
});

// Serve index page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve admin page
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.listen(PORT, () => {
  console.log(`BOGO Affiliate Website running on http://localhost:${PORT}`);
});
