import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { DashboardComponent } from './dashboard/dashboard.component'
import { Routes, Router, RouterModule } from '@angular/router';
import { GamingdashboardComponent } from './gamingdashboard.component';
import { DashboardService } from './dashboard.service'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

const routes : Routes = [
  {path: '', component: GamingdashboardComponent,
    children:[
      {path: '', component: DashboardComponent}
    ]
  },
  {path: '**', redirectTo: ''}
]

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers : [ DashboardService],
  declarations: [DashboardComponent, GamingdashboardComponent]
})
export class GamingdashboardModule { }
