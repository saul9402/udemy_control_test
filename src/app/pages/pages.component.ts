import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

/**
 * Al crear una funcion de manera global angular no la reconoce ya que no se encuentra declarada de manera
 * "normal" dentro de su contexto por lo cual con estas lineas de codigo le indicas que tú sabes que la
 * función existe y puede ser usada.
 */
declare function customInitFunction();
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    /**Mandas a llamara una funcion personalizada que se crea 
     * en assets/js/custom.js para lograr que la pagina cargue 
     * con exito todas las veces que se solicite. */
    customInitFunction();
  }

}
