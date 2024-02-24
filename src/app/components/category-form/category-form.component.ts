import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { Languages } from '../../enum/Language.enum';
import { Category } from '../../interface/Category.interface';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../service/category.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent implements OnInit {
  categoryForm!: FormGroup;
  languages = Object.values(Languages);
  categoryIdentifier!: number;

  constructor(
    private formBuilder: FormBuilder,
    public CategoryService: CategoryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: { [x: string]: string | number; }) => {
      this.categoryIdentifier = +params['id'];
      if (this.categoryIdentifier) {
        this.initForm(this.CategoryService.getCategoryById(this.categoryIdentifier))
      }
      else {
        this.initForm();
      }
    });
  }

  private initForm(availableData?: Category): void {
    this.categoryForm = this.formBuilder.group({
      categoryName: [availableData?.categoryName || '', Validators.required],
      categoryImage: [availableData?.categoryImage || ''],
      numericIdentifier: [availableData?.numericIdentifier || ''],
      lastModificationDate: [availableData?.lastModificationDate || new Date()],
      sourceLanguage: [availableData?.sourceLanguage || Languages.ENGLISH, Validators.required],
      targetLanguage: [availableData?.targetLanguage || Languages.HEBREW, Validators.required],
      words: this.formBuilder.array([], [Validators.required, Validators.minLength(1)])
    });

    if (availableData?.words) {
      availableData?.words.forEach(word => {
        this.addWord(word);
      });
    }

    this.categoryForm.get('sourceLanguage')?.disable();
    this.categoryForm.get('targetLanguage')?.disable();
  }

  addWord(wordData?: any): void {
    const wordGroup = this.formBuilder.group({
      sourceLanguage: [wordData?.sourceLanguage || '', Validators.required],
      targetLanguage: [wordData?.targetLanguage || '', Validators.required]
    });
    this.words.push(wordGroup);
  }

  removeWord(index: number): void {
    this.words.removeAt(index);
  }

  onSubmit() {
    if (this.categoryForm.invalid) {
      return;
    }
    // Updating Category
    if (this.categoryIdentifier) {
      this.CategoryService.updateCategory(this.categoryForm.value);
    }
    // Adding Category
    else {
      this.CategoryService.addCategory(this.categoryForm.value);
    }
  }

  get words(): FormArray {
    return this.categoryForm.get('words') as FormArray;
  }

  get categoryName(): FormControl {
    return this.categoryForm.get('categoryName') as FormControl;
  }

  get categoryImage(): FormControl {
    return this.categoryForm.get('words') as FormControl;
  }

  get sourceLanguage(): FormControl {
    return this.categoryForm.get('sourceLanguage') as FormControl;
  }

  get targetLanguage(): FormControl {
    return this.categoryForm.get('targetLanguage') as FormControl;
  }
}
