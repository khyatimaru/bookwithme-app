import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CamelizePipe } from 'ngx-pipes';
import { of } from 'rxjs';


@Injectable()
export class MapService {

  private geoCoder;
  private locationCache: any  = {};

  constructor(private camelizePipe: CamelizePipe) {}

  private cacheLocation(location: string, coordinates: any) {
    this.locationCache[this.camelize(location)] = coordinates;
  }

  private camelize(value: string): string {
    return this.camelizePipe.transform(value);
  }

  private isLocationCached(location: string): boolean {
    return this.locationCache[this.camelize(location)];
  }

  private geocodeLocation(location: string): Observable<any> {
    if(!this.geoCoder) {
      this.geoCoder = new (<any>window).google.maps.Geocoder();
    }
    return new Observable((observer) => {

      this.geoCoder.geocode({address: location}, (result, status) => {
        if(status ==='OK'){

          const geometry = result[0].geometry.location;
          const coordinates = {lat: geometry.lat(), lng: geometry.lng()};
          this.cacheLocation(location, coordinates);
          observer.next(coordinates);
        }
        else {
          observer.error('location could not be geocoded');
        }
      });
    });
  }
  public getGeoLocation(location: string): Observable<any> {

     if (this.isLocationCached(location)) {
        return of(this.locationCache[this.camelize(location)]);
      }
     else {
        return this.geocodeLocation(location);
     }
  }
}
