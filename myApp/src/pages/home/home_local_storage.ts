import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Md5 } from 'ts-md5/dist/md5';
import { SecureStorage } from 'ionic-native';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  password :'';
  username :'';
  constructor(public navCtrl: NavController) {}

  clickTeste(){
	 let secureStorage: SecureStorage = new SecureStorage();
	 secureStorage.create('home_store')
	 .then(() => console.log('Storage is ready!'),error => console.log(error));

  	//var userStorage = localStorage.getItem(this.username);

	 var userStorage = secureStorage.get(this.username)
	 .then(
	   data => console.log(data),
	   error => console.log(error)
	).toString();

	var pwdCrip = Md5.hashStr(this.password).toString();	

  	if(userStorage == null)
  	{
  		//localStorage.setItem(this.username, pwdCrip);

		secureStorage.set(this.username, pwdCrip)
		 .then(
		   data => console.log(data),
		   error => console.log(error)
		);

  		alert("Usuário Cadastrado com sucesso");
  	}
  	else
  	{
  		if(userStorage != pwdCrip)
  			alert("Acesso negado");	
		else
			alert("Bem vindo " + this.username);	  			
  	}
  }
}
