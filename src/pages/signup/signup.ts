import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { ShoppingCartPage } from '../shoppingCart/shoppingCart';
import { Customer } from '../../entities/user';
import { EmailDirective } from '../../providers/validator/validator';
import { NgForm, PatternValidator, FormGroup, FormBuilder, Validators, EmailValidator} from "@angular/forms";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  submitted: boolean;
  newUser: Customer;
  register: FormGroup;
  registerErrorMessage: string;
  mobnumPattern: string;
  emailPattern: any;


  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController, public userProvider: UserProvider, public alertCtrl: AlertController, private frmBuilder: FormBuilder, public loadingCtrl: LoadingController) {
    this.submitted = false;
    this.newUser = new Customer();
    this.mobnumPattern = "^((\\+91-?)|0)?[0-9]{8}$";
    this.emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }

  ionViewDidLoad() {
		console.log('ionViewDidLoad SignupPage');
	}

  get firstName() {
    return this.register.get("firstName");
  }
  get lastName() {
    return this.register.get("lastName");
  }
  get mobileNumber() {
    return this.register.get("mobileNumber");
  }
  get email() {
    return this.register.get("email");
  }
  get password() {
    return this.register.get("password");
  }
  get verify() {
    return this.register.get("verify");
  }

  ngOnInit() {
    this.register = this.frmBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      mobileNumber: [
        "",
        [Validators.required, Validators.pattern(this.mobnumPattern)]
      ],
      email: ["", [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ["", [Validators.required]],
      verify: ["", [Validators.required]]
    });

    this.registerErrorMessage = "";
  }

  signup() {
    this.submitted = true;
    delete this.register["verify"];
    console.log(this.register.value);
    if (this.register.valid) {
      if (this.register.value.password !== this.register.value.verify) { //password mismatch
        let alert = this.alertCtrl.create(
        {
          title: 'Password Mismatch',
          subTitle: 'Password and verify must be the same',
          buttons: ['OK']
        });
        alert.present();
      } else { //password match
        let loading = this.loadingCtrl.create({
          content: 'Signing you up, Please wait...',
          spinner: 'bubbles'
        });
        loading.present();

        console.log("form is valid");
        this.userProvider.createCustomer(this.register.value).subscribe (
          response => {
            loading.dismiss();
            sessionStorage.setItem("user", JSON.stringify({"customer": this.newUser}));
            let toast = this.toastCtrl.create({
              message: 'Sign up is Successful!',
              cssClass: 'toast',
              duration: 3000,
            });
            toast.present();
            this.navCtrl.push(LoginPage);
            console.log(this.newUser + " successful");
          },
          error => {
            console.log(this.newUser.email + " this doesn't work");
            let alert = this.alertCtrl.create(
      			{
      				title: 'Register',
      				subTitle: 'Invalid details',
      				buttons: ['OK']
      			});
      			alert.present();
          }
        )
      }
    }
  }
}
