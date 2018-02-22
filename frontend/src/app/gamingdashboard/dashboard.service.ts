import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from './game'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DashboardService {

  private dataStore:{
    games: Game[]
  }

  private _games: BehaviorSubject<Game[]>

  get getGames(): Observable<Game[]>{
    return this._games.asObservable()
  }

  constructor(private http: HttpClient) { 
    this.dataStore = { games:[]}
    this._games = new BehaviorSubject<Game[]>([])
  }
  
  loadAllGames(){
    const url = 'http://localhost:8080/games'
    return this.http.get<Game[]>(url).subscribe(
        data =>{
          this.dataStore.games = data
          this._games.next(Object.assign({}, this.dataStore).games)
        }, error =>{
          console.log("failed to load games")
        }
    )
  }

}
