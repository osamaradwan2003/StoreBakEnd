import cliant from "../Configs/db";

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  created_at: Date;
  updated_at: Date;
};

export class ProductModel {
  public async mostFiveProducts(): Promise<Product[]> {
    return [
      {
        id: 1,
        name: "Product 1",
        price: 100,
        description: "Description 1",
        category: "Category 1",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
  }
  public async getAllProducts(): Promise<Product[]> {
    const products = await cliant.query(
      "SELECT * FROM products ORDER BY id DESC"
    );
    return products.rows;
  }

  public async getProductById(id: number): Promise<Product> {
    const product = await cliant.query("SELECT * FROM products WHERE id = $1", [
      id,
    ]);
    return product.rows[0];
  }
  public async getProductByCategory(category: string): Promise<Product[]> {
    const products = await cliant.query(
      "SELECT * FROM products WHERE category = $1 ORDER BY id DESC",
      [category]
    );
    return products.rows;
  }

  public async createProduct(product: Product): Promise<Product> {
    const newProduct = await cliant.query(
      "INSERT INTO products (name, price, description, category) VALUES ($1, $2, $3, $4) RETURNING *",
      [product.name, product.price, product.description, product.category]
    );
    return newProduct.rows[0];
  }

  public async updateProduct(id: number, product: Product): Promise<Product> {
    const updatedProduct = await cliant.query(
      "UPDATE products SET name = $1, price = $2, description = $3, category = $4 WHERE id = $5 RETURNING *",
      [product.name, product.price, product.description, product.category, id]
    );
    return updatedProduct.rows[0];
  }

  public async deleteProduct(id: number): Promise<Product> {
    const deletedProduct = await cliant.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    );
    return deletedProduct.rows[0];
  }
}
