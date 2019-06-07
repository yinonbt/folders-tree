import { FolderService } from './../../services/folder.service';
import { Component, OnInit } from '@angular/core';
import { Folder } from 'src/app/interfaces/folder';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-folders-root',
  templateUrl: './folders-root.component.html',
  styleUrls: ['./folders-root.component.scss']
})
export class FoldersRootComponent implements OnInit {
  folderList$: Observable<Folder[]>;

  foldersFormGroup = this.formBuilder.group({
    formControlFolderName: [null, Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private folderService: FolderService
  ) {
    this.folderList$ = this.folderService.folderList$;
  }

  ngOnInit() {}

  addFolder() {
    const newFolderName = this.foldersFormGroup.get('formControlFolderName')
      .value;
    this.folderService.addFolder(newFolderName);
    this.foldersFormGroup.reset();
  }

  clearSelection() {
    console.log('clearSelection');
    this.folderService.folderSelected$.next(null);
  }
}