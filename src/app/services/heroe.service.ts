import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: "root"
})
export class HeroeService {
	private imgs = 4;
	api = 'https://overwatch-api.net/api/v1';
	constructor(private http: HttpClient) {
		
	}

	public getHerores(): Observable<any> {
		return this.http.get(`${this.api}/hero`).pipe(map(({ data }: any) => {
			return data.map(hero => ({
				...hero,
				imgAvailable: hero.id <= this.imgs
			}));
		}));
	}

	getHero(id) {
		return this.http.get(`${this.api}/hero/${id}`).pipe(map((data: any) => {
			return {
				...data,
				imgAvailable: data.id < this.imgs
			};
		}));
	}

}
