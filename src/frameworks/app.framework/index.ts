// angular
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';

// libs
import {provideStore} from '@ngrx/store';
import {routerReducer, routerMiddleware, RouterState} from 'ngrx-store-router';
import {Angulartics2} from 'angulartics2';

// app
import {nameListReducer} from './services/name-list.service';
import {LogService} from '../core.framework/index';
import {MULTILINGUAL_PROVIDERS, MultilingualStateI, multilingualReducer} from '../i18n.framework/index';
import {AnalyticsService} from '../web.framework/index';

// state definition
export interface AppStoreI {
  router: RouterState;
  i18n: MultilingualStateI;
  names: Array<string>;
};

export const APP_PROVIDERS: any[] = [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  LogService,
  Angulartics2,
  AnalyticsService,
  MULTILINGUAL_PROVIDERS,
  provideStore({ 
    router: routerReducer, 
    i18n: multilingualReducer,
    names: nameListReducer
  }),
  routerMiddleware
];

// services
export * from './services/app-config.service';
export * from './services/name-list.service';
