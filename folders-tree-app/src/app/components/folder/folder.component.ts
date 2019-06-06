import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Folder } from 'src/app/interfaces/folder';
import { FolderService } from 'src/app/services/folder.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {
  @Input() folder: Folder;
  folderSelected$: BehaviorSubject<Folder>;
  
  constructor(private folderService: FolderService) {
    this.folderSelected$ = folderService.folderSelected$;
   }

  ngOnInit() {
  }

  onClick(event: Event) {
    event.stopPropagation();
    this.folderSelected$.next(this.folder);
  }

}
