import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { DialogAnimationsExampleDialog } from '../../components/category-table/category-table.component';

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'alert-modal.component.html',
  standalone: true,
  styleUrl: './alert-modal.component.css',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class AlertModalComponent implements OnInit {
  
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) { }

  ngOnInit(): void {
    console.log("Dialog Ref : ", this.dialogRef)
  }

}