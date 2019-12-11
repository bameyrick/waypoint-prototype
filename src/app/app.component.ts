import { Component } from '@angular/core';
import { Waypoint } from './types/waypoint';
import { Activity } from './enums/activity.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public journey: Waypoint[] = [
    {
      latitude: 51.677433,
      longitude: -5.164637,
      timestamp: 1575990641000,
      activity: Activity.InTransit,
    },
    {
      latitude: 51.674389,
      longitude: -5.199010,
      timestamp: 1575990732000,
      activity: Activity.Searching,
    },
    {
      latitude: 51.701213,
      longitude: -5.212309,
      timestamp: 1575990807000,
      activity: Activity.Fishing,
    },
    {
      latitude: 51.702589,
      longitude: -5.252385,
      timestamp: 1575990859000,
      activity: Activity.InTransit,
    },
    {
      latitude: 51.694900,
      longitude: -5.255590,
      timestamp: 1575990965000,
      activity: Activity.Searching,
    },
    {
      latitude: 51.698858,
      longitude: -5.227589,
      timestamp: 1575991036000,
      activity: Activity.Fishing,
    },
    {
      latitude: 51.670966,
      longitude: -5.188656,
      timestamp: 1575991089000,
      activity: Activity.ReturningToPort,
    },
    {
      latitude: 51.711877,
      longitude: -5.042707,
      timestamp: 1575991151000,
      activity: Activity.Transhipment,
    }
  ]
}
