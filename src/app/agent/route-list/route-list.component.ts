import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationdataService } from '../../services/locationdata.service';
import { NotificationService } from '../../services/notification.service';

interface RouteItem {
  id: number;
  source: string;
  destination: string;
}

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.scss']
})
export class RouteListComponent implements OnInit {

  locationList: any[] = [];
  filteredLocations: any[] = [];

  sourceSearch = '';
  showSourceDropdown = false;

  routes: RouteItem[] = [];
  filteredRoutes: RouteItem[] = [];

  isSearching = false;
  isLoadingRoutes = false;

  constructor(
    private router: Router,
    private locationService: LocationdataService,
    private notify: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadLocations();
    this.loadRoutes();
  }

  loadLocations(): void {
    this.locationService.all().subscribe(
      (res) => {
        if (res.status == 1) {
          this.locationList = res.data || [];
          this.filteredLocations = this.locationList.slice(0, 10);
        } else {
          this.notify.notify(
            res.message || 'Unable to load cities.',
            'Error'
          );
        }
      },
      (error) => {
        console.error('Location API error:', error);
        this.notify.notify('Unable to load cities.', 'Error');
      }
    );
  }

  filterSourceCities(): void {
    const term = (this.sourceSearch || '').trim().toLowerCase();

    this.showSourceDropdown = true;

    if (!term) {
      this.filteredLocations = this.locationList.slice(0, 10);
      return;
    }

    this.filteredLocations = this.locationList
      .filter((city: any) => {
        const name = city?.name
          ? String(city.name).toLowerCase()
          : '';

        const synonym = city?.synonym
          ? String(city.synonym).toLowerCase()
          : '';

        return name.includes(term) || synonym.includes(term);
      })
      .slice(0, 10);
  }

  openSourceDropdown(): void {
    this.showSourceDropdown = true;

    if (!this.sourceSearch) {
      this.filteredLocations = this.locationList.slice(0, 10);
    } else {
      this.filterSourceCities();
    }
  }

  selectSourceCity(city: any): void {
    this.sourceSearch = city.name;
    this.showSourceDropdown = false;
  }

  closeSourceDropdown(): void {
    setTimeout(() => {
      this.showSourceDropdown = false;
    }, 120);
  }

  loadRoutes(): void {
    this.isLoadingRoutes = true;

    this.routes = [
      { id: 1, source: 'Delhi', destination: 'Jaipur' },
      { id: 2, source: 'Delhi', destination: 'Lucknow' },
      { id: 3, source: 'Mumbai', destination: 'Pune' },
      { id: 4, source: 'Mumbai', destination: 'Goa' },
      { id: 5, source: 'Bangalore', destination: 'Chennai' },
      { id: 6, source: 'Hyderabad', destination: 'Bangalore' },
      { id: 7, source: 'Ahmedabad', destination: 'Mumbai' },
      { id: 8, source: 'Kolkata', destination: 'Bhubaneswar' }
    ];

    this.filteredRoutes = [...this.routes];
    this.isLoadingRoutes = false;
  }

  searchRoutes(): void {
    const searchTerm = (this.sourceSearch || '').trim().toLowerCase();

    if (!searchTerm) {
      this.filteredRoutes = [...this.routes];
      this.isSearching = false;
      return;
    }

    this.filteredRoutes = this.routes.filter(
      route => route.source.toLowerCase().includes(searchTerm)
    );

    this.isSearching = true;

    if (!this.filteredRoutes.length) {
      this.notify.notify(
        `No routes found for ${this.sourceSearch}.`,
        'Error'
      );
    }
  }

  clearSearch(): void {
    this.sourceSearch = '';
    this.isSearching = false;
    this.showSourceDropdown = false;
    this.filteredLocations = this.locationList.slice(0, 10);
    this.filteredRoutes = [...this.routes];
  }

  openRoute(route: RouteItem): void {
    const sourceLocation = this.findLocation(route.source);
    const destinationLocation = this.findLocation(route.destination);

    if (!sourceLocation) {
      this.notify.notify(
        `Source city "${route.source}" was not found.`,
        'Error'
      );
      return;
    }

    if (!destinationLocation) {
      this.notify.notify(
        `Destination city "${route.destination}" was not found.`,
        'Error'
      );
      return;
    }

    const today = new Date();
    const dd = ('0' + today.getDate()).slice(-2);
    const mm = ('0' + (today.getMonth() + 1)).slice(-2);
    const yyyy = today.getFullYear();

    this.locationService.setSource(sourceLocation);
    this.locationService.setDestination(destinationLocation);
    this.locationService.setDate(`${dd}-${mm}-${yyyy}`);

    this.router.navigate(['agent/listing']);
  }

  findLocation(cityName: string): any {
    if (!cityName || !this.locationList.length) {
      return null;
    }

    const searchName = cityName.trim().toLowerCase();

    return this.locationList.find((city: any) => {
      const name = city?.name
        ? String(city.name).trim().toLowerCase()
        : '';

      const synonym = city?.synonym
        ? String(city.synonym).trim().toLowerCase()
        : '';

      return name === searchName || synonym === searchName;
    }) || null;
  }
}
