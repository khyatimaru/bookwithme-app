import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';

import { MapComponent } from './map.component';

import { MapService } from './map.service';

import { CamelizePipe } from 'ngx-pipes';

@NgModule({
  declarations: [
    MapComponent
  ],
  exports: [
    MapComponent
  ],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDbuZcwbpGyGP9JdgXJmk28sJMgYWOVFv8'
    })
  ],
  providers: [
    MapService,
    CamelizePipe
  ]
})
export class MapModule { }
