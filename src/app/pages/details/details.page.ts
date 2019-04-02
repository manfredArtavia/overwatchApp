import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroeService } from 'src/app/services/heroe.service';
import { LoadingController } from '@ionic/angular';

@Component({
	selector: 'app-details',
	templateUrl: './details.page.html',
	styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
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
		private loadingCtrl: LoadingController) { }

	async loadInfo() {
		const heroId = this.activatedRoute.snapshot.paramMap.get('id');
		const loading = await this.loadingCtrl.create({
			message: 'Please wait...',
			spinner: 'crescent'
		});
		loading.present();
		
		this.heroService.getHero(heroId).subscribe(response => {
			this.hero = response;
			this.isLoading = false;
			loading.dismiss();
		});


	}
	ngOnInit() {
		this.loadInfo();
	}
}
