import { Languages } from "../enum/Language.enum";
import { TranslatedWord } from "./TranslatedWord.interface";

export interface Category {
    categoryName: string;
    categoryImage?: string;
    numericIdentifier: number;
    lastModificationDate: Date;
    sourceLanguage: Languages;
    targetLanguage: Languages;
    words: TranslatedWord[];
}