
import {Injector, Component} from 'angular2/core';

// libs
import {Angulartics2} from 'angulartics2';
import {Angulartics2Segment} from 'angulartics2/providers/angulartics2-segment';

import {t, TEST_ROUTER_PROVIDERS} from '../../test.framework/index';
import {AnalyticsService} from '../index';

export function main() {
  t.describe('web.framework: AnalyticsService', () => {
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
      t.it('eventTrack', () => {   
        t.spyOn(segment, 'eventTrack');
        analyticsService.eventTrack('click', { category: 'TEST', label: 'Testing' });
        t.e(segment.eventTrack).toHaveBeenCalledWith('click', { category: 'TEST', label: 'Testing' });
      });
      t.it('pageTrack', () => {
        t.spyOn(segment, 'pageTrack');
        analyticsService.pageTrack('/testing', { });
        t.e(segment.pageTrack).toHaveBeenCalledWith('/testing', {});
      });
    });
  });
}

@Component({
  selector: 'test'
})
class TestComponent { }
