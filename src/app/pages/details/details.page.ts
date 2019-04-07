import { NavigationService } from './../../services/navigation.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroeService } from 'src/app/services/heroe.service';
import { LoadingController, Platform } from '@ionic/angular';

@Component({
	selector: 'app-details',
	templateUrl: './details.page.html',
	styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
	public msg: boolean;
	public isLoading = true;
	public hero: any;
	public personalFields = 
	[
		{
			name: 'real_name',
			label: 'Real Name'
		}, {
			name: 'age',
			label: 'Age'
		}, {
			name: 'height',
			label: 'Height'
		}, {
			name: 'affiliation',
			label: 'Afiliation'
		}
	];

	public personalStatFields = [
		{
			name: 'health',
			label: 'Health'
		},
		{
			name: 'armour',
			label: 'Armour'
		},
		{
			name: 'shield',
			label: 'Shield'
		}
	];

	constructor(
		private heroService: HeroeService,
		private activatedRoute: ActivatedRoute,
		private loadingCtrl: LoadingController,
		private platForm: Platform,
		public navigationService: NavigationService) { }

	async loadInfo() {
		this.msg = this.platForm.is('mobile');
		const heroId = this.activatedRoute.snapshot.paramMap.get('id');
		const loading = await this.loadingCtrl.create({
			message: 'Please wait...',
			spinner: 'crescent'
		});
		loading.present();
		
		this.heroService.getHero(heroId).subscribe(response => {
			this.hero = response;
			console.log('this.hero: ', this.hero);
			this.isLoading = false;
			loading.dismiss();
		});


	}
	ngOnInit() {
		this.loadInfo();
	}
}
