import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  public intervalSubs: Subscription;

  constructor() { }


  ngOnInit(): void {

    /**
     * retry sirve para mandar nuevamente la peticion una vez que se haya presentado algun error y es posible 
     * indicar cuantos intentos se desea hacer antes de terminar. 
     * 
     * pipe sirve para concatenar funciones o transformar los valores del observable
     **/
    /*     this.retornaObservable()
          .pipe(retry(1))
          .subscribe(valor => {
            console.log("en la subscripcion:", valor);
          }, (error) => {
            console.warn("Error", error)
          }, () => {
            console.info("Terminado")
          }); */

    /**
     * Como en Java, es posible usar la referencia al método que se quiere llamar, :3
     */

    this.intervalSubs = this.retornaIntervalo().subscribe(console.log);


  }

  ngOnDestroy(): void {
    /**
     * Con esto es posible hacer que el observable deje de emitir valores
     */
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    /**
     * "interval" -> es una funcion de rxjs que emite valores numericos desde cero hasta el infinito, recibe como argumento 
     * el tiempo del intervalo entre cada valor.
     * 
     * "take" -> es otra funcion de rxjs que nos permite limitar los valores que se emiten del observable, en este caso 
     * solo querenos que se emitan 4 valores.
     * 
     * "map" -> permite manipular y convertir los objetos que se reciben del observable para devolver un tipo nuevo o algo, pero ya
     * con algun procesamiento que nosotros le queramos dar.
     * 
     * "filter" -> permite filtrar los valores del observable para evaluar y descartar elementos.
     * 
     * *************** EL ORDEN ES IMPORTANTE AL LLAMAR A ESTOS OPERADORES O FUNCIONES. ***********************
     */


    return interval(100)
      .pipe(
        map(valor => valor + 1),
        filter(valor => valor % 2 === 0),
        /* take(10), */
      );
  }

  retornaObservable(): Observable<number> {

    /**
     *  Por convención cuando es una referencia a un observable que se quiere almacenar se pone el simbolo de dolar al final del 
     *  nombre de la variable.
     */
    let i = -1;

    return new Observable<number>(observer => {
      /* let i = -1; */
      const intervalo = setInterval(() => {
        /**
         * este metodo emite el siguiente valor del flujo de valores a todos los suscriptores.
         */
        observer.next(++i);
        if (i === 4) {
          /**
           * clearInterval es una funnción propia de javascript para eliminar intervalos pero necesitan 
           * la referencia del intervalo a interrumpir, es por eso que se agrega una variable para controlarlo.
           */
          clearInterval(intervalo);
          /**
           * este metodo indica cuando un observable no tiene más valores por emitir.
           */
          observer.complete();
        }
        if (i === 2) {
          /* i = 0; */
          /* clearInterval(intervalo); */
          /**
           * Este metodo se usa cuando existe un error durante el flujo de datos.
           */
          observer.error("i llego al valor de 2");
        }

      }, 1000)
    });
  }

}
