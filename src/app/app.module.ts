import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { RegisterComponent } from './register/register.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatMenuModule} from '@angular/material/menu'; 
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog'; 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { HeaderComponent } from './header/header.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AuthInterceptor } from './auth.interceptor';
import { NgxCaptchaModule } from 'ngx-captcha';
import {MatIconModule} from '@angular/material/icon'; 
import { DialogComponent } from './dialog/dialog.component';
import { PersonalComponent } from './personal/personal.component';
import { PersonalAvatarComponent } from './personal-avatar/personal-avatar.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { PostPageComponent } from './post-page/post-page.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PostComponent,
    HeaderComponent,
    DialogComponent,
    PersonalComponent,
    PersonalAvatarComponent,
    CreatePostComponent,
    PersonalInfoComponent,
    PostPageComponent,
    ChangePasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    InfiniteScrollModule,
    MatMenuModule,
    MatDialogModule,
    MatIconModule,
    NgxCaptchaModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true,
    },
    {
      provide: MatDialogRef,
      useValue: {},
    },
    {
      provide: MatDialog,
    }
  ],
  entryComponents:[DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
