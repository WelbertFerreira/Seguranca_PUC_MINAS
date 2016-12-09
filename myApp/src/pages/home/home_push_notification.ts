import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import {Md5} from 'ts-md5/dist/md5';
import { SQLite } from 'ionic-native';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  username:string;
  password:string;
  db: SQLite = new SQLite(); 
 
  constructor(public alerCtrl: AlertController, public navCtrl: NavController) {

    /*this.db.openDatabase({
      name:'datateste.db',
      location:'default'
    }).then(() => {this.db.executeSql('create table user (username char(20), password char(200))',{})}, 
                (err) => {console.error('Erro executar sql',err)});*/
  }
  

  clickTeste(){
      this.validadeUser();
  }

   validadeUser(){
    if(this.username = '')
    {
      alert('Usuário não informado')
      return;
    }

    if(this.password = '')
    {
      alert('Senha não informada')
      return;
    }

    
    /*db.executeSql("Select * from user WHERE username = '" + this.username + "'","", function(db, res){
      if(res.rows.length > 0)
      {
         if(res.rows(0).password == this.password)
        {
          alert("Bem vindo! " + this.username);  
        }     
        else
        {
          alert("Acesso negado");
        }
      }
      else
      {
        db.executeSql("Insert into user (username, password) values (" + this.username + "'," + this.password + "')","", function()
        {
          alert('Usuário cadastrado com sucesso!');
        });  
      }  
    */
    }
  }

