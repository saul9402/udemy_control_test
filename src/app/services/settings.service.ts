import { Injectable } from '@angular/core';
import { GlobalCSSAtributtesConstants } from '../shared/constants/GlobalCSSAtributtesConstants';
import { GlobalPropertiesConstants } from '../shared/constants/GlobalPropertiesConstants';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector(GlobalCSSAtributtesConstants.ID_THEME);
  private readonly defaultTheme = `${GlobalCSSAtributtesConstants.PATH_ASSETS_CSS_COLORS}/${GlobalCSSAtributtesConstants.DEFAULT_THEME}${GlobalCSSAtributtesConstants.CSS_EXTENSION}`;

  constructor() {
    const themeFromLocalStorage = localStorage.getItem(GlobalPropertiesConstants.LS_THEME);
    const url: string = themeFromLocalStorage ? themeFromLocalStorage : this.defaultTheme;
    this.linkTheme.setAttribute(GlobalPropertiesConstants.PROPERTY_HREF, url);
  }

  changeTheme(theme: string) {
    const url = `${GlobalCSSAtributtesConstants.PATH_ASSETS_CSS_COLORS}/${theme}${GlobalCSSAtributtesConstants.CSS_EXTENSION}`;
    this.linkTheme.setAttribute(GlobalPropertiesConstants.PROPERTY_HREF, url);
    localStorage.setItem(GlobalPropertiesConstants.LS_THEME, url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    const links: NodeListOf<Element> = document.querySelectorAll(GlobalCSSAtributtesConstants.SELECTOR_CLASS_SELECTOR);

    links.forEach(element => {
      element.classList.remove(GlobalCSSAtributtesConstants.CLASS_WORKING);

      const btnTheme = element.getAttribute(GlobalCSSAtributtesConstants.ATTRIBUTE_DATA_THEME);

      const btnThemeUrl = `${GlobalCSSAtributtesConstants.PATH_ASSETS_CSS_COLORS}/${btnTheme}${GlobalCSSAtributtesConstants.CSS_EXTENSION}`;

      const currentTheme = this.linkTheme.getAttribute(GlobalPropertiesConstants.PROPERTY_HREF);

      if (btnThemeUrl === currentTheme) {
        element.classList.add(GlobalCSSAtributtesConstants.CLASS_WORKING);
      }
    });

  }
}
