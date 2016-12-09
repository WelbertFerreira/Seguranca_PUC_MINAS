import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import {Md5} from 'ts-md5/dist/md5';
import { SQLite } from 'ionic-native';
import { SecureStorage } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  username:string;
  password:string;
  public database:SQLite;
  secureStorage:SecureStorage;

  constructor(public alerCtrl: AlertController, public navCtrl: NavController) {
  }

/*----------- Inicio Click Sqlite -----------*/
  clickSqlLite()
  {
    this.database = new SQLite();
    this.database.openDatabase({name: "login.db", location: "default"})
    .then(
          () => {
                  this.database.executeSql('create table if not exists users(user VARCHAR(30), password varchar(255))', {}).then(() => {
                  }, (error) => {
                    alert('Falha ao criar tabela: ' + error);
                  });
                }, 
          (error) => { alert("Erro ao criar base de dados: " + error); }
        );

    var query = "SELECT password FROM users WHERE user = ? ";
    var values = [this.username];

    this.database.openDatabase({name: "login.db", location: "default"})
    .then(() => {
                  this.database.executeSql(query, values)
                  .then((res) =>{
                                  if (res.rows.length > 0)
                                  {
                                    if(Md5.hashStr(this.password).toString() != res.rows.item(0).password)
                                    {
                                      alert('Credenciais invalidas');  
                                    }
                                    else
                                    {
                                      alert('Bem vindo ' + this.username);
                                    }        
                                  }
                                  else
                                  {
                                    var sql = "insert into users(user, password) values (?, ?)";
                                    var values = [this.username, Md5.hashStr(this.password).toString()];
                                    this.database.executeSql(sql, values)
                                    .then(
                                            (res) => {alert('Usuário cadastrado.');}, 
                                            (error) =>{alert('Erro ao cadastrar usuário ' + error);}
                                         );
                                  }
                                }, (error) =>{alert('Erro ao buscar usuário: ' + error);}
                      );
                }
        );
  }

/*----------- Inicio Click SecureStorage -----------*/
  clickSecureStorage()
  {
    this.secureStorage = new SecureStorage();
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
                                      alert('Credenciais invalidas');
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
                                                  alert('Erro ao inserir usuário:' + error)
                                                }
                                             );
                                      }
                          );
                  },
                  error => 
                  {
                    alert('Erro ao carregar informações: ' + error)
                  }
        );
  }

/*----------- Fim Click Local Storage -----------*/
  clickLocalStorage()
  {
    var passwordMd5 = localStorage.getItem(this.username);

    if(passwordMd5 == null)
    {
      localStorage.setItem(this.username, Md5.hashStr(this.password).toString());
      alert('Usuário Cadstrado ' + this.username)
    }
    else
    {
      if(passwordMd5 == Md5.hashStr(this.password).toString())
      {
        alert('Bem vindo ' + this.username);
      }
      else
      {
        alert('Credenciais invalidas');
      }
    }
  }
}



