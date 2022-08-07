import { JwtAuth } from "../middleware/JwtAuth";
import { Product, ProductModel } from "../models/ProductModel";
import express from "express";
import { Request, Response } from "express";
export class ProductController {
  private productModel: ProductModel;
  private route_idt: string;
  constructor(route_idt: string = "products") {
    this.productModel = new ProductModel();
    this.route_idt = route_idt;
  }

  public async getAllProducts(req: Request, res: Response, next: Function) {
    await this.productModel
      .getAllProducts()
      .then((products) => {
        res.status(200).json(products);
      })
      .catch((err) => {
        res.status(500).json({ err: err });
      });
  }

  public async getProductById(req: Request, res: Response, next: Function) {
    const id: string = req.params.id;
    console.log(id);
    await this.productModel
      .getProductById(parseInt(id))
      .then((product) => {
        res.status(200).json(product);
      })
      .catch((err) => {
        res.status(500).json({ err: err });
      });
    return;
  }

  public async getProductByCategory(
    req: Request,
    res: Response,
    next: Function
  ) {
    const category: string = req.params.category;
    if (!category) {
      res.status(400).json({ err: "Category Is Required" });
      return;
    }
    await this.productModel
      .getProductByCategory(category)
      .then((products) => {
        res.status(200).json(products);
      })
      .catch((err) => {
        res.status(500).json({ err: err });
      });
  }

  public async getMostFiveProducts(req: Request, res: Response) {
    this.productModel
      .mostFiveProducts()
      .then((products) => {
        res.status(200).json(products);
      })
      .catch((err) => {
        res.status(500).json({ err: err });
      });
    return;
  }

  public async createProduct(req: Request, res: Response, next: Function) {
    const product: Product = req.body as Product;
    if (
      !product.name ||
      !product.price ||
      !product.description ||
      !product.category
    ) {
      res.status(400).json({ err: "All Fields Are Required" });
      return;
    }
    await this.productModel
      .createProduct(product)
      .then((newProduct) => {
        res.status(201).json(newProduct);
      })
      .catch((err) => {
        res.status(500).json({ err: err });
      });
    return;
  }

  public async updateProduct(id: number, product: Product): Promise<Product> {
    const updatedProduct = await this.productModel.updateProduct(id, product);
    return updatedProduct;
  }

  public async deleteProduct(id: number): Promise<Product> {
    const deletedProduct = await this.productModel.deleteProduct(id);
    return deletedProduct;
  }

  public routes() {
    const routes: express.Router = express.Router();
    routes.get(`/${this.route_idt}`, this.getAllProducts.bind(this));
    routes.get(
      `/${this.route_idt}/:id(\\d+)`,
      (req: Request, res: Response, next: Function) => {
        const id: string = req.params.id;
        if (!id && isNaN(Number(id))) {
          res.status(400).json({ err: "id is required" });
          return;
        }
        next();
      },
      this.getProductById.bind(this)
    );
    routes.get(
      `/${this.route_idt}/mostpepoular`,
      this.getMostFiveProducts.bind(this)
    );
    routes.get(
      `/${this.route_idt}/category/:category`,
      this.getProductByCategory.bind(this)
    );
    routes.post(
      `/${this.route_idt}`,
      [JwtAuth.VerifyJwtAuth],
      this.createProduct.bind(this)
    );

    return routes;
  }
}
