// angular
import {provide} from 'angular2/core';

// libs
import {Store} from '@ngrx/store';
import {Angulartics2} from 'angulartics2';
import {Angulartics2Segment} from 'angulartics2/src/providers/angulartics2-segment';

// app
import {WindowService, ConsoleService, LogService, AnalyticsService} from '../../core.framework/index';

// mocks
import {WindowMock} from '../mocks/window.mock';
import {StoreMock} from '../mocks/@ngrx/store.mock';

export function TEST_COMMON_PROVIDERS(options?: any): any[] {
  // options:
  // Window: token = custom window mock (mainly for changing out language)
  // state:        = needs Store (via ngrx/store)
  
  let providers = [
    provide(ConsoleService, { useValue: console }),
    provide(WindowService, { useClass: (options && options.Window) || WindowMock }),
    LogService,
    Angulartics2,
    Angulartics2Segment,
    AnalyticsService
  ];

  if (options) {
    if (options.state) {
      providers.push(provide(Store, { useClass: StoreMock }));
    }
  }  
  
  return providers;
}
