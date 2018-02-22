import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { PageEvent, MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';
import { Game } from '../game';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns = ['position', 'title', 'url', 'platform','score', 'editors_choice', 'release_year'];
  gameDatabase : GameHttpDAO | null
  dataSource = new MatTableDataSource()

  resultLength = 0
  isLoadingResults = true

  @ViewChild(MatPaginator)paginator: MatPaginator
  @ViewChild(MatSort) sort : MatSort
  constructor(private http:HttpClient) {
    
  }
  
  ngOnInit(): void {
    this.gameDatabase = new GameHttpDAO(this.http)
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.gameDatabase!.getGames();
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;

          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource.data = data);

  }

}

export class GameHttpDAO{
  constructor(private http:HttpClient){

  }

  getGames(){
    return this.http.get<Game[]>("http://localhost:8080/games")
  }
}

