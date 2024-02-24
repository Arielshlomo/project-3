import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Category } from '../../interface/Category.interface';
import { DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { CategoryService } from '../../service/category.service';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialog,
} from '@angular/material/dialog';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-category-table',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, DatePipe, MatIcon, RouterLink, RouterLinkActive],
  templateUrl: './category-table.component.html',
  styleUrl: './category-table.component.css'
})
export class CategoryTableComponent implements OnInit {
  displayedColumns: string[] = ['categoryImage', 'categoryName', 'words', 'lastModificationDate', 'action'];
  dataSource!: MatTableDataSource<Category>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public CategoryService: CategoryService, public dialog: MatDialog, public router: Router) {
    // Assign the data to the data source for the table to render
  }

  ngOnInit(): void {
    this.refreshDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  refreshDataSource() {
    this.dataSource = new MatTableDataSource(this.CategoryService.getAllCategories());
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editCategory(identifier: number) {
    this.router.navigate([`/category-form/${identifier}`]);
  }

  deleteCategory(enterAnimationDuration: string, exitAnimationDuration: string, identifier: number): void {
    let dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
      width: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(
      (res) => {
        if (res) {
          this.CategoryService.deleteCategory(identifier);
          this.refreshDataSource();
        }
      }
    )
  }
}


@Component({
  selector: 'dialog-animations-example-dialog',
  template: `
  <h2 mat-dialog-title>Delete Category</h2>
<mat-dialog-content>
  Do you want to delete the category ?
</mat-dialog-content>
<mat-dialog-actions class="dialog-btn-container">
  <button mat-dialog-close class="dialog-cancel-btn dialog-proceed-btn">Cancel</button>
  <button [mat-dialog-close]="true" cdkFocusInitial class="dialog-proceed-btn">Proceed</button>
</mat-dialog-actions>
  `,
  standalone: true,
  styleUrl: './category-table.component.css',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) { }
}