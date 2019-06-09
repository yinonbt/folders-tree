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
  folderSelected$: Observable<Folder>;

  foldersFormGroup = this.formBuilder.group({
    formControlFolderName: [null, Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private folderService: FolderService
  ) {
    this.folderList$ = this.folderService.folderList$;
    this.folderSelected$ = this.folderService.folderSelected$
  }

  ngOnInit() {
    this.folderService.getAll();
  }

  addFolder() {
    const newFolderName = this.foldersFormGroup.get('formControlFolderName')
      .value;
    this.folderService.addFolder(newFolderName);
    this.foldersFormGroup.reset();
  }

  deleteFolder() {
    this.folderService.deleteFolder();
  }

  clearSelection() {
    console.log('clearSelection');
    this.folderService.folderSelected$.next(null);
  }

  saveAll() {
    this.folderService.saveAll();
  }
}
