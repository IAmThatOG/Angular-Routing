import { Component, OnInit } from "@angular/core";

import { Product, ProductResolved } from "./product";
import { ProductService } from "./product.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"]
})
export class ProductDetailComponent implements OnInit {
  pageTitle = "Product Detail";
  product: Product;
  errorMessage: string;

  constructor(
    // private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // const productId = +this.route.snapshot.paramMap.get('productId');

    // let productId: number;
    // this.route.paramMap.subscribe(
    //   paramMap => (productId = +paramMap.get("productId"))
    // );

    // this.getProduct(productId);
    const productResolved: ProductResolved = this.route.snapshot.data['resolvedData'];
    this.errorMessage = productResolved.error;
    this.onProductRetrieved(productResolved.product);
  }

  // getProduct(id: number) {
  //   this.productService
  //     .getProduct(id)
  //     .subscribe(
  //       product => this.onProductRetrieved(product),
  //       error => (this.errorMessage = <any>error)
  //     );
  // }

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = "No product found";
    }
  }
}
