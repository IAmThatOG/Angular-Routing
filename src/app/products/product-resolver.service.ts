import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Product, ProductResolved } from './product';
import { ProductService } from './product.service';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<ProductResolved> {
  constructor(private _product: ProductService) {}

  resolve(
    route: import('@angular/router').ActivatedRouteSnapshot,
    state: import('@angular/router').RouterStateSnapshot
  ):
    | ProductResolved
    | import('rxjs').Observable<ProductResolved>
    | Promise<ProductResolved> {
    // throw new Error('Method not implemented.');
    let productResolved: ProductResolved;

    const productId = route.paramMap.get('productId');
    if (isNaN(+productId)) {
      const errorMsg = `product id wasn't a number: ${productId}`;
      console.log(errorMsg);

      productResolved = { error: errorMsg, product: null };

      return of(productResolved);
    }
    // this._product
    //   .getProduct(+productId)
    //   .subscribe(
    //     product => (productResolved = { error: null, product: product })
    //   );
    //   return productResolved;
    return this._product.getProduct(+productId).pipe(
      map(product => ({product: product})),
      catchError(error => {
        const errorMsg = `Retrieval Error: ${error}`;
        console.error(errorMsg);
        return of({product: null, error: errorMsg});
      })
    );
  }
}
