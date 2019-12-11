import { Extent } from 'openlayers';
import { LatLon } from '../types/lat-lon';

export function getMapExtent(points: LatLon[]): Extent {
  const latitudes = points.map(point => point.latitude);
  const longitudes = points.map(point => point.longitude);

  return [Math.min(...longitudes), Math.min(...latitudes), Math.max(...longitudes), Math.max(...latitudes)];
}
