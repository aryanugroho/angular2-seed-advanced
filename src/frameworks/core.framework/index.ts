// angular
import {provide} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';

// libs
import {Angulartics2} from 'angulartics2';
import {Angulartics2Segment} from 'angulartics2/src/providers/angulartics2-segment';

// app
import {AnalyticsService} from './services/analytics.service';
import {ConsoleService} from './services/console.service';
import {WindowService} from './services/window.service';
import {LogService} from './services/log.service';

export const CORE_PROVIDERS: any[] = [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(WindowService, { useValue: window }),
  provide(ConsoleService, { useValue: console }),
  LogService,
  Angulartics2,
  Angulartics2Segment,
  AnalyticsService
];

// services
export * from './services/analytics.service';

// decorators
export * from './decorators/base.component';
export * from './decorators/form.component';
export * from './decorators/route.component';

// interfaces
export * from './interfaces/ianalytics';
export * from './interfaces/iconsole';
export * from './interfaces/iwindow';
export * from './interfaces/ilang';

// services
export * from './services/core-config.service';
export * from './services/console.service';
export * from './services/log.service';
export * from './services/view-broker.service';
export * from './services/window.service';
