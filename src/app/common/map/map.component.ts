import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { MapService } from './map.service';

@Component({
  selector: 'bookwithme-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  isPositionError: boolean = false;
  @Input() location: string;

  lat: number;
  lng: number;

  constructor(private mapService: MapService,
              private ref: ChangeDetectorRef) { }

  mapReadyHandler() {
    this.mapService.getGeoLocation(this.location).subscribe(
    (coordinates) => {
      this.lat = coordinates.lat;
      this.lng = coordinates.lng;
      this.ref.detectChanges();
    }, () => {
      this.isPositionError = true;
      this.ref.detectChanges();
    });
  }
}
