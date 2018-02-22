import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { GamingdashboardModule } from './gamingdashboard/gamingdashboard.module'
import { Routes, RouterModule} from '@angular/router'


import { AppComponent } from './app.component';

const route: Routes = [
    {path:'dashboard', loadChildren:'./gamingdashboard/gamingdashboard.module#GamingdashboardModule'},
    { path: '**', redirectTo:'dashboard'}
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GamingdashboardModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(route)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
