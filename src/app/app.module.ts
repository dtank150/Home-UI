import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PropertyCardComponent } from './property/property-card/property-card.component';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HousingService } from './service/housing.service';
import { AddPropertyComponent } from './property/add-property/add-property.component';
import { PropertyDetailComponent } from './property/property-detail/property-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { AlertifyService } from './service/alertify.service';
import { AuthService } from './service/auth.service';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'
import { PropertyDetailsResolverService } from './property/property-detail/property-details-resolver.service';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FilterPipe } from './Pipes/filter.pipe';
import { SortPipe } from './Pipes/sort.pipe';
import { HttpErrorInterceptorService } from './service/httperor-interceptor.service';
import { DatePipe } from '@angular/common';
import { PhotoEditorComponent } from './property/photo-editor/photo-editor.component';

const appRoutes: Routes = [
  {path:'',component:PropertyListComponent},
  {path:'rent-property',component:PropertyListComponent},
  {path:'add-property',component:AddPropertyComponent},
  {path:'property-detail/:id',component:PropertyDetailComponent,  resolve: {prp: PropertyDetailsResolverService}},
  {path:'user/login',component:UserLoginComponent},
  {path:'user/register',component:UserRegisterComponent},
  {path:'**',component:PropertyListComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    PropertyCardComponent,
    PropertyListComponent,
    NavBarComponent,
    AddPropertyComponent,
    PropertyDetailComponent,
    UserRegisterComponent,
    UserLoginComponent,
    FilterPipe,
    SortPipe,
    PhotoEditorComponent

   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxGalleryModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true
    },
    DatePipe,
    HousingService,
    AlertifyService,
    AuthService,
    PropertyDetailsResolverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
