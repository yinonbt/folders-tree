import { Component, OnInit, Input } from '@angular/core';
import { Folder } from 'src/app/interfaces/folder';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {
  @Input() folder: Folder;
  
  constructor() { }

  ngOnInit() {
  }

}
