import { NavigationService } from '../../services/navigation.service';
import { HeroeService } from '../../services/heroe.service';
import { Component, OnInit } from "@angular/core";
import { ItemSliding } from 'ionic-angular';

@Component({
	selector: "app-heroes",
	templateUrl: "heroes.page.html",
	styleUrls: ["heroes.page.scss"]
})
export class HeroesPage implements OnInit {
	heroes = [];
	constructor(public heroeService: HeroeService, private navigationService: NavigationService) {
		
	}

	ngOnInit() {
		this.heroeService.getHerores().subscribe(response => {
			this.heroes = response;
		});
	}

	getHero(id: number) {
		this.navigationService.go(`details/${id}`);
	}

	saveFavorite(hero, slidingItem: ItemSliding) {
		this.heroeService.saveFavoriteHero(hero).subscribe();
		slidingItem.close();
	}
 }
