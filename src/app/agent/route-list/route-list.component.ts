import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationdataService } from '../../services/locationdata.service';
import { NotificationService } from '../../services/notification.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Constants } from 'src/app/constant/constant';
import { HttpClient } from '@angular/common/http';

interface RouteItem {
  id: number;
  source: string;
  destination: string;
}

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.scss'],
})
export class RouteListComponent implements OnInit {
  public searchForm!: FormGroup;

  apiUrl = Constants.BASE_URL;

  locationList: any[] = [];
  filteredLocations: any[] = [];

  sourceSearch = '';
  showSourceDropdown = false;

  selectedLocation: any = null;

  routes: any[] = [];
  filteredRoutes: any[] = [];

  isSearching = false;
  isLoadingRoutes = false;

  constructor(
    private router: Router,
    private locationService: LocationdataService,
    private notify: NotificationService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      route_id: [null],
      location_id: [null],
    });

    this.loadLocations();
  }

  loadLocations(): void {
    this.locationService.all().subscribe(
      (res) => {
        if (res.status == 1) {
          this.locationList = res.data || [];
          this.filteredLocations = this.locationList.slice(0, 10);
        } else {
          this.notify.notify(res.message || 'Unable to load cities.', 'Error');
        }
      },
      (error) => {
        console.error('Location API error:', error);
        this.notify.notify('Unable to load cities.', 'Error');
      },
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
        const name = city?.name ? String(city.name).toLowerCase() : '';

        const synonym = city?.synonym ? String(city.synonym).toLowerCase() : '';

        return name.includes(term) || synonym.includes(term);
      })
      .slice(0, 10);
  }

  openSourceDropdown(): void {
    this.showSourceDropdown = true;

    if (!this.sourceSearch) {
      // this.filteredLocations = this.locationList.slice(0, 10);
      this.filteredLocations = this.locationList;
    } else {
      this.filterSourceCities();
    }
  }

  selectSourceCity(city: any): void {
    // console.log('Selected City:', city);

    this.sourceSearch = city.name;

    this.selectedLocation = city;

    // Set selected location ID in form
    this.searchForm.patchValue({
      location_id: city.id,
    });

    this.showSourceDropdown = false;
  }

  onSourceInput(): void {
    this.selectedLocation = null;

    this.searchForm.patchValue({
      location_id: null,
    });

    this.filterSourceCities();
  }

  closeSourceDropdown(): void {
    setTimeout(() => {
      this.showSourceDropdown = false;
    }, 120);
  }

  searchRoutes(): void {
    if (!this.searchForm.value.location_id) {
      this.notify.notify(
        'Please select a source city from the dropdown.',
        'Error',
      );

      return;
    }

    this.isLoadingRoutes = true;

    this.isSearching = true;

    const formData = this.searchForm.value;

    // console.log('Search API Payload:', formData);

    this.http.post(this.apiUrl + '/getlocation', formData).subscribe(
      (res: any) => {

        this.isLoadingRoutes = false;

        if (res && res.data) {
          const apiData = res.data || [];

          // Convert nested array into a normal array
          this.routes = apiData.flat();

          this.filteredRoutes = [...this.routes];

        } else {
          this.routes = [];
          this.filteredRoutes = [];
        }
      },
      (err) => {
        this.isLoadingRoutes = false;

        console.error('API Error:', err);

        this.routes = [];
        this.filteredRoutes = [];
      },
    );
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
        'Error',
      );
      return;
    }

    if (!destinationLocation) {
      this.notify.notify(
        `Destination city "${route.destination}" was not found.`,
        'Error',
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

    return (
      this.locationList.find((city: any) => {
        const name = city?.name ? String(city.name).trim().toLowerCase() : '';

        const synonym = city?.synonym
          ? String(city.synonym).trim().toLowerCase()
          : '';

        return name === searchName || synonym === searchName;
      }) || null
    );
  }
}
