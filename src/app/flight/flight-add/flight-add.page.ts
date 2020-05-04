import { Component, OnInit, OnDestroy } from '@angular/core';
import { Flight } from '../flight';
import { Glider } from '../../glider/glider';
import { Place } from '../../place/place';
import { Subject } from 'rxjs';
import { FlightService } from '../flight.service';
import { GliderService } from 'src/app/glider/glider.service';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-add',
  templateUrl: './flight-add.page.html',
  styleUrls: ['./flight-add.page.scss'],
})
export class FlightAddPage implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  private flight: Flight;
  private gliders: Glider[] = [];

  constructor(
    private router: Router,
    private flightService: FlightService,
    private gliderService: GliderService
    ) {
    this.flight = new Flight();
    this.flight.date = new Date().toISOString();
    this.flight.glider = new Glider();
    this.flight.start = new Place();
    this.flight.landing = new Place();

    if (this.gliderService.isGliderlistComplete) {
      this.gliders = this.gliderService.getValue();
      this.flight.glider = this.gliders[0];
    } else {
      this.gliderService.getGliders().pipe(takeUntil(this.unsubscribe$)).subscribe((resp: Glider[]) => {
        this.gliderService.isGliderlistComplete = true;
        this.gliders = this.gliderService.getValue();
        this.flight.glider = this.gliders[0];
      });
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  saveFlight(flight: Flight) {
    this.flightService.postFlight(flight).pipe(takeUntil(this.unsubscribe$)).subscribe((res: Flight) => {
      // TODO hide loading
      this.router.navigate(['/flights'], { replaceUrl: true });
    });
  }

}
