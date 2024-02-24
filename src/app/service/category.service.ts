import { Injectable } from '@angular/core';
import { Category } from '../interface/Category.interface';
import { sampleCategory } from '../sample/Data';
import { Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { config } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly storageKey = 'categories';

  constructor(public router: Router, private _snackBar: MatSnackBar) {
    const categoriesFromStorage = localStorage.getItem(this.storageKey);
    if (!categoriesFromStorage) {
      this.setCategoriesInLocalStorage = sampleCategory;
    }
  }

  // Local Storage Get Set Method
  private get getAllCategoriesFromLocalStorage(): Category[] {
    const categoriesString = localStorage.getItem(this.storageKey);
    return categoriesString ? JSON.parse(categoriesString) : [];
  }

  private set setCategoriesInLocalStorage(categoriesData: Category[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(categoriesData));
  }
  //

  addCategory(category: Category): void {
    const categories = this.getAllCategoriesFromLocalStorage;
    category.numericIdentifier = this.generateNumericIdentifier();
    category.lastModificationDate = new Date();
    categories.push(category);
    this.setCategoriesInLocalStorage = categories;
    this.router.navigate(['/category']);
    this.openSnackBar("Category Added Successfully !", 'snackbar-green');
  }

  deleteCategory(numericIdentifier: number): void {
    let categories = this.getAllCategoriesFromLocalStorage;
    categories = categories.filter(cat => cat.numericIdentifier !== numericIdentifier);
    this.setCategoriesInLocalStorage = categories;
    this.openSnackBar('Category Deleted Successfully !', 'snackbar-green');
  }

  updateCategory(category: Category): void {
    let categories = this.getAllCategoriesFromLocalStorage;
    const index = categories.findIndex(cat => cat.numericIdentifier === category.numericIdentifier);
    if (index !== -1) {
      category.lastModificationDate = new Date();
      categories[index] = category;
      this.setCategoriesInLocalStorage = categories;
    }
    this.router.navigate(['/category']);
    this.openSnackBar('Category Updated Successfully !', 'snackbar-green');
  }

  getAllCategories(): Category[] {
    return this.getAllCategoriesFromLocalStorage;
  }

  getCategoryById(numericIdentifier: number, route?: string): Category | undefined {
    const categories = this.getAllCategoriesFromLocalStorage;
    const selectedCategory = categories.find(cat => cat.numericIdentifier === numericIdentifier);
    if (selectedCategory) {
      return selectedCategory;
    }
    this.openSnackBar("Category With Id Doesn't Exist ! ", "snackbar-red");
    this.router.navigate([!route ? '/category' : '/' + route]);
    throw new Error("Category With Id Doesn't Exist !");
  }

  openSnackBar(message: string, className?: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
      panelClass: className
    });
  }

  private generateNumericIdentifier(): number {
    return Math.floor(Math.random() * 1000);
  }
}