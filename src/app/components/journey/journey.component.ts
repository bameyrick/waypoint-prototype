import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Waypoint } from 'src/app/types/waypoint';
import { getMapExtent } from 'src/app/utils/get-map-extent';
import { MapComponent } from 'ngx-openlayers';
import * as ol from 'openlayers';
import { Projection } from 'src/app/enums/projection.enum';
import { Activity } from 'src/app/enums/activity.enum';
import { LatLon } from 'src/app/types/lat-lon';
import { Color } from 'src/app/enums/color.enum';

interface MapLine {
  coordinates: [[number, number], [number, number]];
  color: string;
}

interface MapPoint extends LatLon {
  color: string;
}

const activityColours = {
  [Activity.InTransit]: Color.Grey,
  [Activity.Searching]: Color.Primary,
  [Activity.Fishing]: Color.Green,
  [Activity.ReturningToPort]: Color.Red,
};

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.scss'],
})
export class JourneyComponent implements AfterViewInit {
  @Input() public journey: Waypoint[];

  @ViewChild('map') private map: MapComponent;

  public readonly Projection = Projection;

  public lines: MapLine[] = [];

  public currentLine: MapLine | null;

  public currentPoint: MapPoint | null;

  public showHighlight = false;

  public currentViewedIndex = -1;

  ngAfterViewInit() {
    setTimeout(() => this.drawMap());

    setInterval(() => this.showHighlight = !this.showHighlight, 500);
  }

  private drawMap(): void {
    this.renderJourneyExtent();

    this.lines = this.journey
      .map((waypoint, index) => {
        const nextWaypoint = this.journey[index + 1];

        if (nextWaypoint) {
          return {
            coordinates: [
              [waypoint.longitude, waypoint.latitude],
              [nextWaypoint.longitude, nextWaypoint.latitude],
            ],
            color: activityColours[waypoint.activity],
          } as MapLine;
        }
      })
      .filter(line => !!line);
  }

  public view(waypointIndex: number): void {
    this.currentViewedIndex = waypointIndex;

    const waypoint = this.journey[waypointIndex];
    const nextWaypoint = this.journey[waypointIndex + 1];

    const map = this.map.instance;
    const view = map.getView();

    const originalCentre = view.getCenter();
    const originalZoom = view.getZoom();

    let extent: ol.Extent;

    if (waypoint && nextWaypoint) {
      extent = getMapExtent([waypoint, nextWaypoint]);

      this.currentLine = {
        coordinates: [
          [waypoint.longitude, waypoint.latitude],
          [nextWaypoint.longitude, nextWaypoint.latitude],
        ],
        color: Color.Green,
      };

      this.currentPoint = null;
    } else {
      extent = getMapExtent([waypoint, waypoint]);

      this.currentLine = null;

      this.currentPoint = { ...waypoint, color: Color.Green };
    }

    view.fit(ol.proj.transformExtent(extent, Projection.LatLon, Projection.WebMercator), { size: map.getSize() });

    const center = view.getCenter();
    const zoom = Math.min(view.getZoom(), 14);

    view.setCenter(originalCentre);
    view.setZoom(originalZoom);

    this.animateTo(center, zoom);
  }

  public reset(): void {
    this.currentLine = null;
    this.currentPoint = null;

    const view = this.map.instance.getView();

    const originalCentre = view.getCenter();
    const originalZoom = view.getZoom();

    this.renderJourneyExtent();

    const center = view.getCenter();
    const zoom = Math.min(view.getZoom(), 14);

    view.setCenter(originalCentre);
    view.setZoom(originalZoom);

    this.animateTo(center, zoom);

    this.currentViewedIndex = -1;
  }

  private renderJourneyExtent(): void {
    const extent = getMapExtent(this.journey);

    const map = this.map.instance;
    const view = map.getView();

    view.fit(ol.proj.transformExtent(extent, Projection.LatLon, Projection.WebMercator), { size: map.getSize() });
  }

  private animateTo(center: [number, number], zoom: number, duration = 1000): void {
    const view = this.map.instance.getView();
    const originalZoom = view.getZoom();
    const lowestZoom = Math.min(zoom, originalZoom);
    const flyZoom = lowestZoom - 0.5;
    const durationMultiplier = 1.5 / (lowestZoom + 1);
    const durationA = Math.abs(duration * durationMultiplier);
    const durationB = duration - durationA;

    view.animate({
      center,
      duration,
      easing: ol.easing.inAndOut,
    });

    view.animate(
      {
        zoom: flyZoom,
        duration: originalZoom < zoom ? durationA : durationB,
        easing: ol.easing.inAndOut,
      },
      {
        zoom,
        duration: originalZoom > zoom ? durationA : durationB,
        easing: ol.easing.inAndOut,
      }
    );
  }
}
