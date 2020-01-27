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
import { TaxService } from './services/tax.service';
import { AuthService } from './services/auth.service';
import { VehicleService } from './services/vehicle.service';
import { PdfService } from './services/pdf.service';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatSliderModule } from '@angular/material/slider';
// import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import {
  MatNativeDateModule, 
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule 
} from "@angular/material";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import stock from 'highcharts/modules/stock.src';
import more from 'highcharts/highcharts-more.src';

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

// import { MatDatepickerModule, NativeDateAdapter  } from "@angular/material";
import { FormsModule } from '@angular/forms';
import { TaxComponent } from './tax/tax.component';
import { NoDataFoundComponent } from './no-data-found/no-data-found.component';
export function highchartsModules() {
  // apply Highcharts Modules to this array
  return [stock, more];
}

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
    ChannnelsComponent,
    TaxComponent,
    NoDataFoundComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    ChartModule,
    MatSliderModule,
    FormsModule,
    MatNativeDateModule, 
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatPaginatorModule,   
    NgxEchartsModule,  
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
    TaxService,
    PdfService,
    VehicleService,
    MatDatepickerModule,
      { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules } 
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
