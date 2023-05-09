import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import { UserEditComponent } from './user-edit/user-edit.component';
import { RoleComponent } from './role/role.component';
import { RoleModalComponent as RoleModalComponent } from './role/role-modal/role-modal.component';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserEditModalComponent } from './user-edit/user-edit-modal/user-edit-modal.component';
import {MatSelect, MatSelectModule} from '@angular/material/select';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    RoleComponent,
    UserEditComponent,
    UserEditModalComponent,
    RoleModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
