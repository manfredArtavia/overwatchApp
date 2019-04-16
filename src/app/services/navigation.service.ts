import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class NavigationService {
	private prevRoute = '/';
	constructor(private nativePageTransitions: NativePageTransitions, private router: Router) { }

	public go(to: string) {
		this.prevRoute = this.router.url;
		const options: NativeTransitionOptions = {
			direction: 'right',
			duration: 400,
			slowdownfactor: -1,
			iosdelay: 50
		};

		this.nativePageTransitions.fade(options);
		this.router.navigateByUrl(to);
	}

	public getPrevRoute(): string {
		return this.prevRoute;
	}
}
