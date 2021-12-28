import { Component, OnInit } from '@angular/core';
import { rejects } from 'assert';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: []
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    /* this.getUsuarios(); */
    this.getUsuarios().then(usuarios => {
      console.log(usuarios);
    });

    /* Ejemplo 1 de promesas.
     * 
     * el nombre de "reject" y "resolve" son arbitarios, sin embargo se ponen esos por convencion.
     * En el resolve tú le indicas que es lo que vas a devolver cuando la función que quieres termina de ejecutar y con reject
     * manejas el error en caso de que algo haya fallado, esos valores lo puedes leer al suscribirte a la promesa 
     * por medio del .then() o el .catch().
     */

    /*     const promesa = new Promise((resolve, reject) => {
          if (true) {
            resolve("hola mundo");
          } else {
            reject("algo salio mal");
          }
        });
    
        promesa.then((mensaje) => {
          console.log("terminé " + mensaje);
        }).catch(error => {
          console.log("terminé " + error);
        });
    
        console.log("fin del init"); */

  }

  getUsuarios() {
    /**
     * En este ejemplo se utiliza la función fetch que es propia de typescript para hacer una petición http
     * una vez que se resuelve la petición se usa el metodo then para procesar la info que se devuelve
     * se procesa y se transforma a json para que una vez en json se obtenga el body y de ahi el data
     * que es donde viene el arreglo de datos que nos interesa obtener, todo esto se envuelve dentro de otra
     * promesa para que asi sea más practico el llamado al método, lo unico que queda pendiente es el manejo de error.ks
     */
    return new Promise((resolve) =>
      fetch('https://reqres.in/api/users').then(resp => resp.json()).then(body => resolve(body.data))
    );
  }

}
