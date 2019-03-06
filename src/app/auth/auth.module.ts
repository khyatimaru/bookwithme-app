import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AuthService } from './shared/auth.service';
import { AuthGuard } from './shared/auth.guard';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TokenInterceptor } from './shared/token.interceptor';


@NgModule({
  declarations: [
    AuthComponent,
    RegisterComponent,
    LoginComponent
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  imports: [
    AuthRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ]

})
export class AuthModule { }
