import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LocationdataService } from '../../services/locationdata.service';
import { NotificationService } from '../../services/notification.service';


interface RouteItem {
  id: number;
  source: string;
  destination: string;
  duration: string;
  buses: number;
}


@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.scss']
})
export class RouteListComponent implements OnInit {


  /* ============================================================
     CITY DATA
     ============================================================ */

  locationList: any[] = [];

  filteredLocations: any[] = [];

  sourceSearch = '';

  selectedSource: any = null;

  showSourceDropdown = false;


  /* ============================================================
     ROUTE DATA
     ============================================================ */

  routes: RouteItem[] = [];

  filteredRoutes: RouteItem[] = [];


  isSearching = false;

  isLoadingRoutes = false;


  constructor(
    private router: Router,
    private locationService: LocationdataService,
    private notify: NotificationService
  ) { }


  /* ============================================================
     INIT
     ============================================================ */

  ngOnInit(): void {

    this.loadLocations();

    this.loadRoutes();

  }


  /* ============================================================
     LOAD LOCATIONS
     
     SAME API PATTERN AS BOOKING COMPONENT
     ============================================================ */

  loadLocations(): void {

    this.locationService.all().subscribe(

      (res) => {

        if (res.status == 1) {

          this.locationList = res.data || [];

          this.filteredLocations =
            this.locationList.slice(0, 10);

        } else {

          this.notify.notify(
            res.message || 'Unable to load cities.',
            'Error'
          );

        }

      },

      (error) => {

        console.error(
          'Location API error:',
          error
        );

        this.notify.notify(
          'Unable to load cities.',
          'Error'
        );

      }

    );

  }


  /* ============================================================
     SOURCE CITY SEARCH
     ============================================================ */

  filterSourceCities(): void {

    const term =
      (this.sourceSearch || '')
        .trim()
        .toLowerCase();


    this.showSourceDropdown = true;


    /*
     * User cleared the input.
     */

    if (!term) {

      this.selectedSource = null;

      this.filteredLocations =
        this.locationList.slice(0, 10);

      return;

    }


    /*
     * Search by city name OR synonym.
     */

    this.filteredLocations =
      this.locationList
        .filter((city: any) => {

          const cityName =
            city?.name
              ? String(city.name).toLowerCase()
              : '';


          const synonym =
            city?.synonym
              ? String(city.synonym).toLowerCase()
              : '';


          return (
            cityName.includes(term) ||
            synonym.includes(term)
          );

        })
        .slice(0, 10);

  }


  /* ============================================================
     OPEN SOURCE DROPDOWN
     ============================================================ */

  openSourceDropdown(): void {

    this.showSourceDropdown = true;


    if (!this.sourceSearch) {

      this.filteredLocations =
        this.locationList.slice(0, 10);

    } else {

      this.filterSourceCities();

    }

  }


  /* ============================================================
     SELECT SOURCE CITY
     ============================================================ */

  selectSourceCity(city: any): void {

    this.selectedSource = city;

    this.sourceSearch = city.name;

    this.showSourceDropdown = false;

  }


  /* ============================================================
     CLOSE DROPDOWN
     ============================================================ */

  closeSourceDropdown(): void {

    setTimeout(() => {

      this.showSourceDropdown = false;

    }, 120);

  }


  /* ============================================================
     ROUTE LIST
     
     IMPORTANT:
     
     BookingComponent provided by you contains the LOCATION API,
     but no separate ROUTE API.
     
     These are therefore the current route records used by the
     page design.
     
     Replace ONLY this method when the actual route API is given.
     ============================================================ */

  loadRoutes(): void {

    this.isLoadingRoutes = true;


    this.routes = [

      {
        id: 1,
        source: 'Delhi',
        destination: 'Jaipur',
        duration: '5h 30m',
        buses: 28
      },

      {
        id: 2,
        source: 'Delhi',
        destination: 'Lucknow',
        duration: '8h 15m',
        buses: 19
      },

      {
        id: 3,
        source: 'Mumbai',
        destination: 'Pune',
        duration: '3h 30m',
        buses: 35
      },

      {
        id: 4,
        source: 'Mumbai',
        destination: 'Goa',
        duration: '11h 00m',
        buses: 16
      },

      {
        id: 5,
        source: 'Bangalore',
        destination: 'Chennai',
        duration: '6h 00m',
        buses: 24
      },

      {
        id: 6,
        source: 'Hyderabad',
        destination: 'Bangalore',
        duration: '8h 30m',
        buses: 21
      },

      {
        id: 7,
        source: 'Ahmedabad',
        destination: 'Mumbai',
        duration: '9h 00m',
        buses: 14
      },

      {
        id: 8,
        source: 'Kolkata',
        destination: 'Bhubaneswar',
        duration: '7h 30m',
        buses: 12
      }

    ];


    this.filteredRoutes = [...this.routes];

    this.isLoadingRoutes = false;

  }


  /* ============================================================
     SEARCH ROUTES
     ============================================================ */

  searchRoutes(): void {

    const searchTerm =
      (this.sourceSearch || '')
        .trim()
        .toLowerCase();


    /*
     * Nothing entered:
     * show all routes.
     */

    if (!searchTerm) {

      this.filteredRoutes =
        [...this.routes];

      this.isSearching = false;

      return;

    }


    /*
     * Filter by source.
     */

    this.filteredRoutes =
      this.routes.filter(
        (route: RouteItem) => {

          return route.source
            .toLowerCase()
            .includes(searchTerm);

        }
      );


    this.isSearching = true;


    if (this.filteredRoutes.length === 0) {

      this.notify.notify(
        'No routes found for ' +
        this.sourceSearch +
        '.',
        'Error'
      );

    }

  }


  /* ============================================================
     CLEAR SEARCH
     ============================================================ */

  clearSearch(): void {

    this.sourceSearch = '';

    this.selectedSource = null;

    this.isSearching = false;

    this.showSourceDropdown = false;

    this.filteredLocations =
      this.locationList.slice(0, 10);

    this.filteredRoutes =
      [...this.routes];

  }


  /* ============================================================
     ROUTE CARD CLICK
     
     ENTIRE CARD USES THIS METHOD.
     
     This follows the same flow used by BookingComponent:
     
     setSource()
     setDestination()
     setDate()
     navigate('agent/listing')
     ============================================================ */

  openRoute(route: RouteItem): void {

    /*
     * Find actual location objects from the location API.
     */

    const sourceLocation =
      this.findLocation(route.source);


    const destinationLocation =
      this.findLocation(route.destination);


    /*
     * If API location data is not available,
     * do not navigate with incomplete objects.
     */

    if (!sourceLocation) {

      this.notify.notify(
        'Source city "' +
        route.source +
        '" was not found.',
        'Error'
      );

      return;

    }


    if (!destinationLocation) {

      this.notify.notify(
        'Destination city "' +
        route.destination +
        '" was not found.',
        'Error'
      );

      return;

    }


    /*
     * Today's date in DD-MM-YYYY format.
     *
     * Same date format expected by BookingComponent.
     */

    const today = new Date();

    const dd =
      ('0' + today.getDate()).slice(-2);

    const mm =
      ('0' + (today.getMonth() + 1)).slice(-2);

    const yyyy =
      today.getFullYear();


    const journeyDate =
      `${dd}-${mm}-${yyyy}`;


    /*
     * SAME EXISTING BOOKING FLOW
     */

    this.locationService
      .setSource(sourceLocation);


    this.locationService
      .setDestination(destinationLocation);


    this.locationService
      .setDate(journeyDate);


    /*
     * Navigate to bus listing.
     */

    this.router.navigate([
      'agent/listing'
    ]);

  }


  /* ============================================================
     FIND LOCATION OBJECT
     ============================================================ */

  findLocation(cityName: string): any {

    if (!cityName || !this.locationList?.length) {

      return null;

    }


    const searchName =
      cityName
        .trim()
        .toLowerCase();


    return this.locationList.find(
      (city: any) => {

        const name =
          city?.name
            ? String(city.name)
              .trim()
              .toLowerCase()
            : '';


        const synonym =
          city?.synonym
            ? String(city.synonym)
              .trim()
              .toLowerCase()
            : '';


        return (
          name === searchName ||
          synonym === searchName
        );

      }
    ) || null;

  }


}