// angular
import {Injectable} from 'angular2/core';

// libs
import {Angulartics2} from 'angulartics2';
import {Angulartics2Segment} from 'angulartics2/src/providers/angulartics2-segment';

// app
import {CoreConfigService, IAnalyticsProperties} from '../../core.framework/index';

@Injectable()
export class AnalyticsService {

  constructor(private angulartics2: Angulartics2, private segment: Angulartics2Segment) {
    // options
    // https://github.com/angulartics/angulartics2/blob/master/src/core/angulartics2.ts#L90-L104
    // angulartics2.virtualPageviews(value: boolean);
    // angulartics2.excludeRoutes(routes: Array<string>);
    // angulartics2.firstPageview(value: boolean);
    // angulartics2.withBase(value: string);

    angulartics2.developerMode(CoreConfigService.IS_DEBUG_MODE());
  }

  public track(action: string, properties: IAnalyticsProperties) {
    this.segment.eventTrack(action, properties);
  }

  /**
   * Called automatically by default with Angular 2 Routing
   * However, that can be turned off and this could be used manually
   **/
  public pageTrack(path: string, location: any) {
    this.segment.pageTrack(path, location);
  }

  /**
   * Identify authenticated users
   **/
  public identify(properties: any) {
    this.segment.setUserProperties(properties);
	}  

}
