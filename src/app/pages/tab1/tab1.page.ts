import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { HeroeService } from './../../services/heroe.service';
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
	selector: "app-tab1",
	templateUrl: "tab1.page.html",
	styleUrls: ["tab1.page.scss"]
})
export class Tab1Page implements OnInit {
	heroes = [];
	constructor(private heroeService: HeroeService, private router: Router, private nativePageTransitions: NativePageTransitions) {
		
	}

	ngOnInit() {
		this.heroeService.getHerores().subscribe(response => {
			console.log(response, '<---');
			this.heroes = response;
		});
	}

	getHero(id: number) {
		const options: NativeTransitionOptions = {
			direction: 'right',
			duration: 400,
			slowdownfactor: -1,
			iosdelay: 50
		};

		this.nativePageTransitions.fade(null);
		this.router.navigateByUrl(`tabs/tab1/details/${id}`);
	}
 }
