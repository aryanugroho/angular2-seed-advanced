
import {Injector, Component} from 'angular2/core';

// libs
import {Angulartics2} from 'angulartics2';
import {Angulartics2Segment} from 'angulartics2/src/providers/angulartics2-segment';

import {t, TEST_ROUTER_PROVIDERS} from '../../test.framework/index';
import {AnalyticsService} from '../index';

export function main() {
  t.describe('core.framework: AnalyticsService', () => {
    let analyticsService: AnalyticsService;
    let segment: Angulartics2Segment;

    t.be(() => {
      let injector = Injector.resolveAndCreate([
        // Angulartics2 relies on router for virtual page view tracking
        TEST_ROUTER_PROVIDERS({ router: { primary: TestComponent } }),
        Angulartics2, Angulartics2Segment, AnalyticsService
      ]);
      analyticsService = injector.get(AnalyticsService);
      segment = injector.get(Angulartics2Segment);
    });

    t.describe('api works', () => {
      t.it('track', () => {   
        t.spyOn(segment, 'eventTrack');
        analyticsService.track('click', { category: 'TEST', label: 'Testing' });
        t.e(segment.eventTrack).toHaveBeenCalledWith('click', { category: 'TEST', label: 'Testing' });
      });
      t.it('pageTrack', () => {
        t.spyOn(segment, 'pageTrack');
        analyticsService.pageTrack('/testing', { });
        t.e(segment.pageTrack).toHaveBeenCalledWith('/testing', {});
      });
      t.it('pageTrack', () => {
        t.spyOn(segment, 'setUserProperties');
        analyticsService.identify({ userId: 1, name: 'Test', email: 'name@domain.com' });
        t.e(segment.setUserProperties).toHaveBeenCalledWith({ userId: 1, name: 'Test', email: 'name@domain.com' });
      });
    });
  });
}

@Component({
  selector: 'test'
})
class TestComponent { }
