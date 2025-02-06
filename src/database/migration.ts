import { pool } from '../config/database';

async function runMigrations() {
  // Tabela de Usuários
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role ENUM('admin', 'operator') NOT NULL DEFAULT 'operator',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  // Tabela de Categorias
  const createCategoriesTable = `
    CREATE TABLE IF NOT EXISTS categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  // Tabela de Produtos
  const createProductsTable = `
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      quantity INT NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      category_id INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
    )
  `;

  // Tabela de fornecedores
  const createSuppliersTable = `
    CREATE TABLE IF NOT EXISTS suppliers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      contact_info TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  // Tabela de pedidos
  const createOrdersTable = `
    CREATE TABLE IF NOT EXISTS orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      supplier_id INT NOT NULL,
      order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      status ENUM('pending', 'completed', 'canceled') DEFAULT 'pending',
      FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE CASCADE
    )
  `;

  // Tabela de movimentações de estoque
  const createMovementsTable = `
    CREATE TABLE IF NOT EXISTS movements (
      id INT AUTO_INCREMENT PRIMARY KEY,
      product_id INT NOT NULL,
      type ENUM('in', 'out', 'adjustment') NOT NULL,
      quantity INT NOT NULL,
      reason VARCHAR(255),
      movement_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    )
  `;

  await pool.query(createUsersTable);
  await pool.query(createCategoriesTable);
  await pool.query(createProductsTable);
  await pool.query(createSuppliersTable);
  await pool.query(createOrdersTable);
  await pool.query(createMovementsTable);
  console.log('Migrations executed');
  process.exit(0);
}

runMigrations().catch(error => {
  console.error('Migration error: ', error);
  process.exit(1);
});
