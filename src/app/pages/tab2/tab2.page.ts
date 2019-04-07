import { NavigationService } from './../../services/navigation.service';
import { Router } from '@angular/router';
import { NativeTransitionOptions, NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';
import { OnInit } from '@angular/core';
import { HeroeService } from './../../services/heroe.service';
import { Component } from '@angular/core';

@Component({
	selector: 'app-tab2',
	templateUrl: 'tab2.page.html',
	styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
	public heroes;
	constructor(public heroeService: HeroeService,
		private nativePageTransitions: NativePageTransitions,
		private router: Router,
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
		this.nagivationService.go(`tabs/tab1/details/${id}`);
	}

	removeHero(heroId) {
		this.heroeService.removeFavoriteHero(heroId).subscribe();
	}
}
