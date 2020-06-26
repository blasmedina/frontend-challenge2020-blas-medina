import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [LoginComponent, HomeComponent],
  imports: [BrowserModule, ReactiveFormsModule, HttpClientModule],
  exports: [LoginComponent, HomeComponent],
})
export class FrontendChallenge2020BlasMedinaModule {}
