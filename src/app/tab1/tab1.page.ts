import { Component } from '@angular/core';
import * as L from 'leaflet';

import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-icon-2x.png";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  private homeIcon: L.Icon;

  private map: L.Map;
  private centerLatitude: number = 25.3791924;
  private centerLongitude: number = 55.4765436;
  private homeMarker: L.Marker;

  constructor() { }

  ngOnInit() {
    this.initializeIcon();

    this.map = L.map('map', {
      center: [this.centerLatitude, this.centerLongitude],
      zoom: 15,
      renderer: L.canvas()
    });

    this.setCurrentPosition();

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(this.map);

    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);
  }

  private setHomeMarker(latitude: number, longitude: number, popupText: string = null) {
    var latLon = L.latLng(latitude, longitude);

    const isFirstTime = !this.homeMarker;

    if (isFirstTime) {
      this.homeMarker = L.marker(latLon, { icon: this.homeIcon });
    } else {
      this.homeMarker.setLatLng(latLon);
    }

    if (popupText) {
      this.homeMarker.bindPopup(popupText, {
        closeButton: true
      });
    }

    if (isFirstTime) {
      this.homeMarker.addTo(this.map);
    }
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.setHomeMarker(latitude, longitude, 'My location');

        var latLon = L.latLng(latitude, longitude);
        this.map.panTo(latLon);
      });
    }
  }

  private initializeIcon() {
    this.homeIcon = L.icon({
      iconUrl: 'assets/home.png',
      iconSize: [32, 32]
    });
  }
}
