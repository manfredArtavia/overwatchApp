import { NavigationService } from './../../services/navigation.service';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { HeroeService } from './../../services/heroe.service';
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { ItemSliding } from 'ionic-angular';

@Component({
	selector: "app-tab1",
	templateUrl: "tab1.page.html",
	styleUrls: ["tab1.page.scss"]
})
export class Tab1Page implements OnInit {
	heroes = [];
	constructor(public heroeService: HeroeService, private router: Router, private nativePageTransitions: NativePageTransitions, private navigationService: NavigationService) {
		
	}

	ngOnInit() {
		this.heroeService.getHerores().subscribe(response => {
			console.log(response, '<---');
			this.heroes = response;
		});
	}

	getHero(id: number) {
		// const options: NativeTransitionOptions = {
		// 	direction: 'right',
		// 	duration: 400,
		// 	slowdownfactor: -1,
		// 	iosdelay: 50
		// };

		// this.nativePageTransitions.fade(options);
		// this.router.navigateByUrl(`tabs/tab1/details/${id}`);
		this.navigationService.go(`tabs/tab1/details/${id}`);
	}

	saveFavorite(hero, slidingItem: ItemSliding) {
		slidingItem.close();
		this.heroeService.saveFavoriteHero(hero).subscribe();
	}
 }
