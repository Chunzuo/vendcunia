import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Helpers } from '../../shared/utils/helpers';
import { ScriptLoaderService } from '../../shared/services/script-loader.service';

@Component({
  selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
  templateUrl: './theme.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ThemeComponent implements OnInit {

  constructor(
    private _script: ScriptLoaderService,
    private _router: Router
  ) {
    console.log('admin -> theme.component.ts file, constructor()');
  }

  ngOnInit() {
    console.log('admin -> theme.component.ts file, ngOnInit() function');
  }

}
