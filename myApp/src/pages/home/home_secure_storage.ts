import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import {Md5} from 'ts-md5/dist/md5';
import { SecureStorage } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  username:string;
  password:string;
  secureStorage: SecureStorage = new SecureStorage();

  constructor(public alerCtrl: AlertController, public navCtrl: NavController) {

  }

  clickTeste()
  {

      this.secureStorage.create('login')
      .then(
              () => {
                      this.secureStorage.get(this.username)
                      .then(
                            data => {
                                      if(data == Md5.hashStr(this.password).toString())
                                      {
                                        alert('Bem vindo ' + this.username);
                                      }
                                      else
                                      {
                                        alert('Credenciais inválidas');
                                      }
                                    },
                              error => {
                                          var passwordMd5 = Md5.hashStr(this.password).toString();
                                          this.secureStorage.set(this.username, passwordMd5)
                                          .then(
                                                  data => 
                                                  {
                                                    alert('Usuário Cadstrado' + this.username)
                                                  },
                                                  error => 
                                                  {
                                                    alert(error)
                                                  }
                                               );
                                        }
                            );
                    },
                    error => 
                    {
                      alert(error)
                    }
        );
  }
}



