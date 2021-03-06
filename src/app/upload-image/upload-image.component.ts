import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { UploadImageService } from '../upload-image.service';
import { IoService } from '../io.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  @ViewChild('inputImage')
  inputImageVariable: any;

  @Output() onGetInfo: EventEmitter<any> = new EventEmitter<any>();

  reader: FileReader = new FileReader();
  form_data: FormData = new FormData();
  img_src: string;
  description;
  file;
  progress;
  connection;
  image_info;
  status;

  constructor(private uploadImageService: UploadImageService, private ioService: IoService) { }

  ngOnInit() {
    this.uploadImageService.progressEvent.subscribe(data => {
      this.progress = data;
    });

    this.connection = this.ioService.getMessages().subscribe(message => {
      switch(message['label']){
        case "image_info":
          this.image_info = message['data'];
          console.log('emitting')
          this.onGetInfo.emit(this.image_info);
          break;
        default:
          break;
      }
    });
  }

  upload() {
    this.form_data.append('image', this.file);
    this.uploadImageService.post(this.form_data)
      .subscribe(result => {
        this.status = result.message;
        this.image_info = result.data;
        this.progress = null;
        this.file = null;
        this.inputImageVariable.nativeElement.value = "";        
      });
  }

  onChange(event) {
    var files = event.target.files || event.srcElement.files;
    if (files && files[0]) {
      this.file = files[0];
    }
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
