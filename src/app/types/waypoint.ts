import { LatLon } from './lat-lon';
import { Activity } from '../enums/activity.enum';

export interface Waypoint extends LatLon {
  timestamp: number;
  activity: Activity;
}
