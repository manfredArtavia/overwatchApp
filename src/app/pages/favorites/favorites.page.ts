import { NavigationService } from '../../services/navigation.service';
import { OnInit } from '@angular/core';
import { HeroeService } from '../../services/heroe.service';
import { Component } from '@angular/core';

@Component({
	selector: 'app-favorites',
	templateUrl: 'favorites.page.html',
	styleUrls: ['favorites.page.scss']
})
export class FavoritesPage implements OnInit {
	public heroes;
	constructor(public heroeService: HeroeService,
		private nagivationService: NavigationService) {}

	ngOnInit () {
		this.heroeService.favoriteHeroes$.subscribe(() => {
			this.getHeroes()
		});
		this.getHeroes();
	}

	getHeroes() {
		this.heroeService.getFavoritesHeroes().subscribe(list => {
			this.heroes = list;
		})
	}

	getHero(id: number) {
		this.nagivationService.go(`details/${id}`);
	}

	removeHero(heroId) {
		this.heroeService.removeFavoriteHero(heroId).subscribe();
	}
}
