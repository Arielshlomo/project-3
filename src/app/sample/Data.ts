import { Languages } from "../enum/Language.enum";
import { Category } from "../interface/Category.interface";

export const sampleCategory: Category[] = [
    {
        categoryName: 'Fruits',
        categoryImage: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg',
        lastModificationDate: new Date(),
        numericIdentifier: 1,
        sourceLanguage: Languages.ENGLISH,
        targetLanguage: Languages.HEBREW,
        words: [
            {
                sourceLanguage: 'Apple',
                targetLanguage: 'apple'
            },
            {
                sourceLanguage: 'Banana',
                targetLanguage: 'banana'
            },
            {
                sourceLanguage: 'Mango',
                targetLanguage: 'mango'
            }
        ]
    },
    {
        categoryName: 'Vegetables',
        categoryImage: 'https://cdn.britannica.com/17/196817-050-6A15DAC3/vegetables.jpg',
        lastModificationDate: new Date(),
        numericIdentifier: 2,
        sourceLanguage: Languages.ENGLISH,
        targetLanguage: Languages.HEBREW,
        words: [
            {
                sourceLanguage: 'Carrot',
                targetLanguage: 'carrot'
            },
            {
                sourceLanguage: 'Mango',
                targetLanguage: 'mango'
            },
            {
                sourceLanguage: 'Tomato',
                targetLanguage: 'tomato'
            }
        ]
    },
    {
        categoryName: 'Cars',
        categoryImage: 'https://robbreport.com/wp-content/uploads/2023/09/RR_50_Most_Expensive_Cars_You_Can_Buy_Right_Now_Cadillac_Celestiq.jpg',
        lastModificationDate: new Date(),
        numericIdentifier: 3,
        sourceLanguage: Languages.ENGLISH,
        targetLanguage: Languages.HEBREW,
        words: [
            {
                sourceLanguage: 'BMW',
                targetLanguage: 'BMW'
            },
            {
                sourceLanguage: 'Audi',
                targetLanguage: 'audi'
            }
        ]
    },
]