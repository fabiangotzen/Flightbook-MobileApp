import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsPageRoutingModule } from './news-routing.module';

import { NewsPage } from './news.page';
import { TranslateModule } from '@ngx-translate/core';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { ExportModule } from 'flightbook-commons-library';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsPageRoutingModule,
    TranslateModule.forChild(),
    ExportModule
  ],
  providers: [
    FileOpener
  ],
  declarations: [NewsPage]
})
export class NewsPageModule {}
