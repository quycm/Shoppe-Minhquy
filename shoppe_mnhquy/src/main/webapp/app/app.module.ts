import './vendor.ts';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AccordionModule } from 'primeng/accordion'; // accordion and accordion tab
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';

const APP_CONTAINERS = [DefaultLayoutComponent];

import { AppAsideModule, AppBreadcrumbModule, AppHeaderModule, AppFooterModule, AppSidebarModule } from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { TimekeeperCoreModule } from './core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordResetInitComponent } from './views/password-reset-init/password-reset-init.component';
import { PasswordResetFinishComponent } from './views/password-reset-finish/password-reset-finish.component';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { PasswordStrengthBarComponent } from './core/password-reset/password-strength-bar.component';
import { RegisterComponent } from 'app/views/login/register/register.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    ConfirmDialogModule,
    HttpClientModule,
    AccordionModule,
    NgSelectModule,
    TimekeeperCoreModule,
    FormsModule,
    ReactiveFormsModule,
    ShowHidePasswordModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    PasswordResetInitComponent,
    PasswordResetFinishComponent,
    PasswordStrengthBarComponent
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    ConfirmationService
  ],
  exports: [PasswordStrengthBarComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
