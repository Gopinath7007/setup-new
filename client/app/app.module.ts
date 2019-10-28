// Angular
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
// Modules
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
// Services
import { CatService } from './services/cat.service';
import { WorkService } from './services/work.service';
import { ChannelService } from './services/channel.service';
import { UserService } from './services/user.service';
import { BillService } from './services/bill.service';
import { SpareService } from './services/spare.service';
import { AuthService } from './services/auth.service';
import { VehicleService } from './services/vehicle.service';

import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
// Components
import { AppComponent } from './app.component';
import { CatsComponent } from './cats/cats.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { WorkComponent } from './work/work.component';
import { BillingComponent } from './billing/billing.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { SparesComponent } from './spares/spares.component';
import { ChannnelsComponent } from './channnels/channnels.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    CatsComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    AccountComponent,
    AdminComponent,
    NotFoundComponent,
    WorkComponent,
    BillingComponent,
    VehicleComponent,
    SparesComponent,
    ChannnelsComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        // whitelistedDomains: ['localhost:3000', 'localhost:4200']
      }
    })
  ],
  providers: [
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    CatService,
    UserService,
    WorkService,
    ChannelService,
    BillService,
    SpareService,
    VehicleService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
