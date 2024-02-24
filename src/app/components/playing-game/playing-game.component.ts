import { Component } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Languages } from '../../enum/Language.enum';
import { Category } from '../../interface/Category.interface';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-playing-game',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    SweetAlert2Module
  ],
  templateUrl: './playing-game.component.html',
  styleUrl: './playing-game.component.css'
})
export class PlayingGameComponent {

  categoriesObject: any = {};
  categoryIdentifier: any = -1;
  selectedCategoryId: number = -1;
  translationForm: any;
  correctTranslation: number = 0;
  translationChecked: boolean = false;
  retryLeft: number = 0;

  constructor(
    public CategoryService: CategoryService,
    public router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: { [x: string]: string | number; }) => {
      this.categoryIdentifier = +params['id'];
      if (this.categoryIdentifier) {
        this.categoriesObject = this.CategoryService.getCategoryById(this.categoryIdentifier, 'game-mode/start');
        this.initForm(this.categoriesObject);
        this.retryLeft = this.categoriesObject.words.length;
      }
      else {
        this.router.navigate(['/'])
      }
    });
  }

  private initForm(availableData?: Category): void {
    this.translationForm = this.formBuilder.group({
      words: this.formBuilder.array([], [Validators.required, Validators.minLength(1)])
    })
    if (availableData?.words) {
      availableData?.words.forEach(word => {
        this.addWord(word);
      });
    }
  }

  addWord(wordData?: any): void {
    const wordGroup = this.formBuilder.group({
      sourceLanguage: [wordData?.sourceLanguage || '', Validators.required],
      targetLanguage: ['', Validators.required],
      isCorrect: [null]
    });
    this.words.push(wordGroup);
  }

  selectCategory(id: number) {
    this.selectedCategoryId = id;
  }

  checkTranslation() {
    let wordsArray = this.words.controls;
    let availableWords = this.categoriesObject.words;
    let correctTranslation = 0;

    for (let i = 0; i < wordsArray.length; i++) {
      const targetLanguage = wordsArray[i].get('targetLanguage')?.value;
      if (targetLanguage) {
        if (availableWords[i]?.targetLanguage === targetLanguage) {
          wordsArray[i].get('isCorrect')?.setValue(true);
          correctTranslation = correctTranslation + 1;
        } else {
          wordsArray[i].get('isCorrect')?.setValue(false);
        }
      }
    }

    this.correctTranslation = correctTranslation;
    this.retryLeft = this.retryLeft - 1;
    this.translationChecked = true;

    if (this.correctTranslation == this.categoriesObject.words.length) {
      Swal.fire("Well Done !", `You translated all words correctly.`, 'success');
    }
    else if (this.retryLeft > 0) {
      Swal.fire("Sorry !",
        `You translated ${correctTranslation} out of ${this.categoriesObject.words.length} words correctly. Please try again.`, 'error');
    }
    else if (this.retryLeft == 0) {
      Swal.fire("Out of Retries !",
        `You have used all retry attempts. Please check translation.`, 'error');
    }
  }

  seeTranslation() {
    let wordsArray = this.words.controls;
    let availableWords = this.categoriesObject.words;
    for (let i = 0; i < wordsArray.length; i++) {
      wordsArray[i].get('targetLanguage')?.setValue(availableWords[i]?.targetLanguage);
      wordsArray[i].get('isCorrect')?.setValue(null);
    }
  }

  get words(): FormArray {
    return this.translationForm.get('words') as FormArray;
  }

}
