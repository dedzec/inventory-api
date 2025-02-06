import { pool } from '../config/database';

async function runMigrations() {
  const createCategoriesTable = `
    CREATE TABLE IF NOT EXISTS categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

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

  await pool.query(createCategoriesTable);
  await pool.query(createProductsTable);
  console.log('Migrations executed');
  process.exit(0);
}

runMigrations().catch(error => {
  console.error('Migration error: ', error);
  process.exit(1);
});
