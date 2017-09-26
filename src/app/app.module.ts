import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IoService } from './io.service';
import { AppComponent } from './app.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { UploadImageService } from './upload-image.service';
import { HttpModule } from '@angular/http';
import { ProgressHttpModule } from "angular-progress-http";
import { 
  MatProgressBarModule, 
  MdButtonModule, 
  MdGridListModule, 
  MdIconModule, 
  MdToolbarModule, 
  MdCardModule, 
  MdMenuModule 
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    UploadImageComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ProgressHttpModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdMenuModule,
    MdCardModule,
    MdToolbarModule,
    MdIconModule
  ],
  providers: [
    IoService,
    UploadImageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
