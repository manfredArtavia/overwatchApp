import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject, from  } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Injectable({
	providedIn: "root"
})
export class HeroeService {
	private imgs = 24;
	private _favoriteHeroes$ = new Subject<void>();
	public favoriteHeroesStore: any = {};
	api = 'https://overwatch-api.net/api/v1';
	constructor(private http: HttpClient, private storage: Storage, private toastController: ToastController) {
		// this.storage.clear();
		this.storage.get('favoriteHeroes').then( response => {
			this.favoriteHeroesStore = response;
		});
	}

	get favoriteHeroes$() {
		return this._favoriteHeroes$;
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

	saveFavoriteHero(hero: any): Observable<any> {
		if (this.favoriteHeroesStore[hero.id]) {
			this.presentToaster(`${hero.name} is already a favorite.`, 2000, 'danger');
			return this._favoriteHeroes$;
		}
		
		// set a key/value
		return from (this.storage.set('favoriteHeroes', { ...this.favoriteHeroesStore, [hero.id]: hero }).then((response) => {
			this.favoriteHeroesStore = response; // update the service store
			return this.getFavoritesHeroes();
		})).pipe(
			tap(() => {
				this.presentToaster(`${hero.name} saved on favorites.`, 3000, 'success');
				this._favoriteHeroes$.next();
			})
		);
	}

	private async presentToaster(message, duration, color) {
		const toast = await this.toastController.create({
			message,
			duration,
			color,
			showCloseButton: true
		  });
		  toast.present();
		  return toast;
	}

	getFavoritesHeroes(): Observable<any> {
		return from(this.storage.get('favoriteHeroes').then(response => {
			return response ? Object.values(response) : [];
		}));
	}

	removeFavoriteHero(heroId: string) {
		const { [heroId]: item, ...rest } = this.favoriteHeroesStore;
		return from (this.storage.set('favoriteHeroes', rest).then((response) => {
			this.favoriteHeroesStore = response; // update the service store
			return this.getFavoritesHeroes();
		})).pipe(
			tap(() => {
				this.presentToaster(`Hero removed`, 2000, 'success');
				this._favoriteHeroes$.next();
			})
		);
	}


}
