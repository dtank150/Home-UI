import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs'; // Import the 'of' function
import { catchError } from 'rxjs/operators';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/service/housing.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailsResolverService implements Resolve<Property> {

  constructor(private service: HousingService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Property | Property> {
    const propId = route.params['id'];
    return this.service.getProperty(+propId).pipe(
      catchError((_error: any): Observable<Property | null> => {
        this.router.navigate(['/']);
        return of(null);
      }) as any
    );
  }
}

// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, Resolve, Route, Router, RouterStateSnapshot } from '@angular/router';
// import { Observable, catchError } from 'rxjs';
// import { Property } from 'src/app/model/property';
// import { HousingService } from 'src/app/service/housing.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class PropertyDetailsResolverService implements Resolve<Property> {

// constructor(private service:HousingService, private router:Router) { }
//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Property> | Property {
//     const propId = route.params['id']
//    return this.service.getProperty(+propId).pipe(
//     catchError((error: any): Observable<Property> => {
//       this.router.navigate(['/']);
//       return of(null);
//     })
//    );
//   }

// }
