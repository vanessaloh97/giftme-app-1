import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ShoppingCartPage } from '../shoppingCart/shoppingCart';
import { ChangePasswordPage } from '../change-password/change-password';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { UserProvider } from '../../providers/user/user';
import { User } from '../../entities/user';

@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html',
})
export class ProfilePage {
	submitted: boolean;
	user: User;
	isLogin: boolean;
	isUpdated: boolean;
	firstName: string;
	lastName: string;
	mobileNum: string;
	email: string;
	password: string;
	errorMessage: string;

	constructor(public navCtrl: NavController,
				public navParams: NavParams,
				public toastCtrl: ToastController,
				public alertCtrl: AlertController, public userProvider: UserProvider) {
		this.submitted = false;
		this.isUpdated = false;
		this.firstName = "";
		this.lastName = "";
		this.mobileNum = "";
		this.email = "";
		this.password = "";
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ProfilePage');
		//if login liao can just update else direct to login page
		if (sessionStorage.getItem("isLogin") === "true") {
			this.isLogin = true;
			this.user = JSON.parse(sessionStorage.getItem("user")).customer;
			this.email = this.user.getEmail();
			this.password = this.user.getPassword();
		} else {
			this.navCtrl.push(LoginPage);
		}
	}

	updateProfile(updateProfileForm: NgForm) {
		this.submitted = true;
		if (updateProfileForm.valid) {
			this.isUpdated = true;
			// this.userProvider.updateCustomer(this.profile).subscribe(
			// 	response => {
			// 		let toast = this.toastCtrl.create(
			// 		{
			// 			message: 'Details Updated',
			// 			cssClass: 'toast',
			// 			duration: 3000
			// 		});
			// 		toast.present();

					// sessionStorage.setItem("user", JSON.stringify({"customer": this.user}));
					// sessionStorage.setItem("firstName", firstName);
					// sessionStorage.setItem("lastName", lastName);
					// sessionStorage.setItem("mobileNum", mobileNum);
					// sessionStorage.setItem("isUpdated", "true");
					// sessionStorage.setItem("user", JSON.stringify({"customer": this.user}));
				}
		// 		error => {
		// 			//this.errorMessage = "HTTP " + error.status + ":" + error.error.message;
		// 			this.navCtrl.push(HomePage);
		// 		}
		// 	);
		// } else {
		// 	let alert = this.alertCtrl.create(
		// 	{
		// 		title: 'Profile',
		// 		subTitle: 'Invalid profile details',
		// 		buttons: ['OK']
		// 	});
		// 	alert.present();
		}

	cartTapped(event, page) {
		this.navCtrl.push(ShoppingCartPage, page);
	}

	buttonTapped(event, page) {
		this.navCtrl.push(ChangePasswordPage, page);
	}

	homeTapped(event, page) {
    this.navCtrl.push(HomePage, page);
  }
}
