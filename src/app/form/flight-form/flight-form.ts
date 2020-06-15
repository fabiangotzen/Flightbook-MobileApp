import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Flight } from '../../flight/flight';
import { Glider } from 'src/app/glider/glider';
import { Place } from 'src/app/place/place';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'flight-form',
  templateUrl: 'flight-form.html'
})
export class FlightFormComponent implements OnInit {
  @Input()
  flight: Flight;
  @Input()
  gliders: Glider[];
  @Output()
  saveFlight = new EventEmitter<Flight>();

  glider: string
  searchStart: string;
  searchLanding: string;

  constructor(
    private alertController: AlertController,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    if (this.flight.glider.brand && this.flight.glider.name) {
      this.glider = `${this.flight.glider.brand} ${this.flight.glider.name}`
    }
    if (!this.flight.start) {
      this.flight.start = new Place();
    }
    if (!this.flight.landing) {
      this.flight.landing = new Place();
    }
  }

  onSelectChange(selectedValue: any) {
    this.flight.glider = this.gliders.find(glider => glider.id === +selectedValue.detail.value);
    this.glider = `${this.flight.glider.brand} ${this.flight.glider.name}`
  }

  async saveElement(loginForm: any) {
    if (loginForm.valid) {
      this.saveFlight.emit(this.flight);
    } else {
      const alert = await this.alertController.create({
        header: this.translate.instant('message.errortitle'),
        message: this.translate.instant('message.mendatoryFields'),
        buttons: [this.translate.instant('buttons.done')]
      });
      await alert.present();
    }
  }

  setDefaultTime() {
    if (!this.flight.time) {
      const time = new Date(0);
      time.setHours(0);
      this.flight.time = time.toISOString();
    }
  }

  cancelButton() {
    this.flight.time = null;
  }

  setFilteredStart(event: any) {
    this.searchStart = event.target.value;
  }

  setFilteredLanding(event: any) {
    this.searchLanding = event.target.value;
  }

  setStartInput(event: any) {
    this.flight.start.name = event.name;
  }

  setLandingInput(event: any) {
    this.flight.landing.name = event.name;
  }

}
