import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Category } from '../../interface/Category.interface';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-start-game',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, RouterLink, RouterLinkActive],
  templateUrl: './start-game.component.html',
  styleUrl: './start-game.component.css'
})
export class StartGameComponent {

  categoriesData: Category[] = [];
  selectedCategoryId: number = -1;

  constructor(public CategoryService: CategoryService, public router: Router) { }

  ngOnInit(): void {
    this.categoriesData = this.CategoryService.getAllCategories();
  }

  selectCategory(id: number) {
    this.selectedCategoryId = id;
  }

  startGame() {
    if (this.selectedCategoryId > -1) {
      this.router.navigate([`/game-mode/playing/${this.selectedCategoryId}`]);
    }
  }

}
