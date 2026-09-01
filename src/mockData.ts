/**
 * @file mockData.ts
 * Hardcoded dataset for the Navar grocery-planning agent prototype.
 * Contains Ukrainian copy for the 5 explanatory pitch sections and all mobile screen state.
 * Adheres strictly to Ukrainian retail language rules (no dieting/shaming terms, no em dashes in UI copy).
 */

export interface PitchSection {
  id: number;
  stepNumber: string;
  badge: string;
  headline: string;
  paragraphs: string[];
  annotations: {
    label: string;
    text: string;
  }[];
}

export interface DishItem {
  id: string;
  name: string;
  cookTime: string;
  price: number;
  protein: number;
  isPromo?: boolean;
  tag?: string;
  description: string;
}

export interface CartProduct {
  id: string;
  name: string;
  packSize: string;
  quantity: number;
  price: number;
  originalPrice?: number;
  isPromo?: boolean;
  isReplacement?: boolean;
  replacementNote?: string;
  replacementOriginal?: string;
}

export const PITCH_SECTIONS: PitchSection[] = [
  {
    id: 1,
    stepNumber: "01",
    badge: "Вхідна точка",
    headline: "Один алгоритм, два набори обмежень",
    paragraphs: [
      "• **Єдиний алгоритм, два режими**: оптимізує кошик без розбивки на окремі додатки.",
      "• **«Форма» як головний шлях**: жорсткі межі білка та калорійного коридору рахуються синхронно з чеком супермаркету.",
      "• **Швидкий старт**: гість робить вибір в 1 клік без тривалого онбордингу та опитувальників."
    ],
    annotations: [
      {
        label: "Вибір цілі",
        text: "Дві зрозумілі картки без спортивного пафосу, які одразу перемикають логіку підбору страв."
      },
      {
        label: "Швидкий старт",
        text: "Гість робить вибір в один клік без тривалого онбордингу та складних опитувальників."
      },
      {
        label: "Передвстановлений вибір",
        text: "«Форма» активна за замовчуванням для наочності розрахунку нутрієнтів."
      }
    ]
  },
  {
    id: 2,
    stepNumber: "02",
    badge: "Параметри",
    headline: "Ніяких ручних калорій: система рахує коридор",
    paragraphs: [
      "• **Автоматичний розрахунок**: гість вводить базові фізичні дані — система сама формує безпечний коридор (±15%).",
      "• **Прозора ціль**: миттєва нижня планка білка та комфортні калорії без культу жорсткого дефіциту.",
      "• **Гнучкість бюджету**: точне введення суми вручну або плавне регулювання тактильним повзунком."
    ],
    annotations: [
      {
        label: "Повзунок бюджету",
        text: "Реалістичний щотижневий бюджет у гривнях, який виступає головним фінансовим обмеженням."
      },
      {
        label: "Картка «Ваша ціль»",
        text: "Головний фокус екрана: нижня планка білка 135 г/добу та м'який коридор калорій без культу дефіциту."
      },
      {
        label: "Посилання «Скоригувати»",
        text: "Дає повний контроль досвідченим користувачам змінити прораховані значення в один дотик."
      }
    ]
  },
  {
    id: 3,
    stepNumber: "03",
    badge: "Персоналізація",
    headline: "Передзаповнено з реальної історії чеків",
    paragraphs: [
      "• **Передзаповнено з чеків**: аналіз програми лояльності усуває потребу в порожніх рядках пошуку.",
      "• **Швидке редагування**: викреслення небажаного в 1 клік та легке повернення рідкісних продуктів.",
      "• **Контрастний блок безпеки**: надійне виключення алергенів (лактоза тощо) на рівні всіх рецептів."
    ],
    annotations: [
      {
        label: "Часті покупки",
        text: "Готові чіпси з реальних чеків з кнопкою швидкого видалення (×)."
      },
      {
        label: "Рідкісні позиції",
        text: "Продукти, які гість зазвичай оминає, з можливістю легко повернути їх у меню (+)."
      },
      {
        label: "Блок обмежень",
        text: "Контрастна зона для алергенів та непереносимостей (наприклад, лактоза)."
      }
    ]
  },
  {
    id: 4,
    stepNumber: "04",
    badge: "Головний результат",
    headline: "Меню під бюджет і акції з чесними компромісами",
    paragraphs: [
      "• **5-денний план вечерь**: точний баланс білка (137–148 г/день) та бюджету з урахуванням знижок ритейлера.",
      "• **Чесні компроміси**: прозоре повідомлення у разі конфлікту між ціною та нутрієнтною планкою.",
      "• **Миттєва оптимізація**: дія «Дешевше на 300 ₴» для миттєвого перерахунку кошика."
    ],
    annotations: [
      {
        label: "Підсумкова картка",
        text: "Великі цифри бюджету (2 340 ₴ з 2 400 ₴), економія на акціях (310 ₴) та гарантія білка (137–148 г)."
      },
      {
        label: "Чесне повідомлення",
        text: "Прозоре інформування про невелике відхилення від бюджету заради досягнення білкової межі."
      },
      {
        label: "Швидка дія «Дешевше на 300 ₴»",
        text: "Можливість одразу перерахувати меню в бік ще більшої економії без втрати структури."
      }
    ]
  },
  {
    id: 5,
    stepNumber: "05",
    badge: "Кошик і чек",
    headline: "Агент готує замовлення, гість лише підтверджує",
    paragraphs: [
      "• **Автоматичний підбір SKU**: розкладка страв на вигідні фасування та свіжі позиції на полиці магазину.",
      "• **Розумні аналоги**: чітке кольорове попередження про заміну товару, якщо його немає в наявності.",
      "• **Інтеграція лояльності**: інтерактивне списання балобонусів та безшовна оплата в додатку «Сільпо»."
    ],
    annotations: [
      {
        label: "Попередження про заміну",
        text: "М'який жовтий бейдж для відсутніх позицій з назвою запропонованого аналога."
      },
      {
        label: "Списання балобонусів",
        text: "Інтерактивний перемикач лояльності для миттєвого зменшення фінальної суми до сплати."
      },
      {
        label: "Перехід до «Сільпо»",
        text: "Гість залишається в безпечному контурі звичного ритейлера."
      }
    ]
  }
];

export const MOCK_GOAL_CARDS = [
  {
    id: "routine",
    title: "Рутина",
    subtitle: "Меню й закупівля для родини",
    description: "Збалансовані вечері на весь тиждень з урахуванням смаків кожного члена сім'ї та бюджету."
  },
  {
    id: "form",
    title: "Форма",
    subtitle: "Меню під нутрієнтну ціль",
    description: "Точний розрахунок білка та калорійного коридору з простих продуктів без зайвих витрат."
  }
];

export const MOCK_NUMBERS_FORM = {
  budget: 2400,
  budgetMin: 1200,
  budgetMax: 6000,
  gender: "Ч",
  age: 34,
  weight: 78,
  height: 181,
  activity: "Середня",
  direction: "Утримання",
  computedProtein: 135,
  computedCalories: 2250,
  caloriesVariance: "±15%"
};

export const MOCK_TASTES = {
  oftenBought: [
    "Куряче філе",
    "Гречка",
    "Сир кисломолочний",
    "Яйця",
    "Броколі",
    "Йогурт"
  ],
  rarelyBought: [
    "Риба",
    "Печінка",
    "Гриби"
  ],
  allergies: [
    "Лактоза"
  ]
};

export const MOCK_PLAN_DATA = {
  totalSpent: 2340,
  totalBudget: 2400,
  savedPromo: 310,
  proteinRange: "137–148 г щодня",
  conflictNotice: "На 240 ₴ більше за бюджет, інакше не набирається 135 г білка. Показали найближчий варіант.",
  days: [
    { key: "mon", label: "Пн", active: true },
    { key: "tue", label: "Вт", active: false },
    { key: "wed", label: "Ср", active: false },
    { key: "thu", label: "Чт", active: false },
    { key: "fri", label: "Пт", active: false }
  ],
  dishes: [
    {
      id: "d1",
      name: "Курка з гречкою та броколі",
      cookTime: "25 хв",
      price: 410,
      protein: 142,
      isPromo: true,
      tag: "Акція",
      description: "Соковите філе на пару з цільнозерновою гречкою та свіжими суцвіттями."
    },
    {
      id: "d2",
      name: "Запечена індичка з булгуром",
      cookTime: "35 хв",
      price: 490,
      protein: 146,
      isPromo: false,
      description: "Ароматне стегно індички з пряними травами та відвареним булгуром."
    },
    {
      id: "d3",
      name: "Сирники з йогуртом і горіхами",
      cookTime: "20 хв",
      price: 360,
      protein: 138,
      isPromo: true,
      tag: "Акція",
      description: "Ніжний кисломолочний сир 5% із грецьким йогуртом і волоським горіхом."
    },
    {
      id: "d4",
      name: "Тушкована квасоля з яловичиною",
      cookTime: "40 хв",
      price: 580,
      protein: 148,
      isPromo: false,
      description: "Червона квасоля в томатному соусі з відбірною нежирною яловичиною."
    },
    {
      id: "d5",
      name: "Омлет з тунцем і шпинатом",
      cookTime: "15 хв",
      price: 500,
      protein: 139,
      isPromo: false,
      description: "Легка білкова вечеря зі свіжим молодим листям шпинату та тунцем у власному соку."
    }
  ]
};

export const MOCK_CART_ITEMS: CartProduct[] = [
  {
    id: "p1",
    name: "Філе куряче охолоджене «Наша Ряба»",
    packSize: "850 г",
    quantity: 2,
    price: 318,
    originalPrice: 380,
    isPromo: true
  },
  {
    id: "p2",
    name: "Крупа гречана ядриця «Премія»",
    packSize: "1 кг",
    quantity: 1,
    price: 58,
    isPromo: false
  },
  {
    id: "p3",
    name: "Сир кисломолочний 5% «Яготинський»",
    packSize: "400 г",
    quantity: 3,
    price: 264,
    originalPrice: 310,
    isPromo: true
  },
  {
    id: "p4",
    name: "Капуста броколі свіжа вагове",
    packSize: "700 г",
    quantity: 1,
    price: 112,
    isPromo: false
  },
  {
    id: "p5",
    name: "Стейк яловичий огузок «Сільпо»",
    packSize: "600 г",
    quantity: 1,
    price: 390,
    isPromo: false
  },
  {
    id: "p6",
    name: "Філе тунця у власному соку «Rio Mare»",
    packSize: "160 г",
    quantity: 2,
    price: 248,
    isReplacement: true,
    replacementNote: "Немає в наявності, замінили на схоже",
    replacementOriginal: "Замість Calvo у власному соку 160 г"
  },
  {
    id: "p7",
    name: "Яйця курячі С0 «Ясенсвіт»",
    packSize: "10 шт",
    quantity: 2,
    price: 130,
    isPromo: false
  }
];

export const MOCK_CART_SUMMARY = {
  subtotal: 2340,
  bonuses: 120,
  finalPrice: 2220,
  retailerNotice: "Оформлення відбудеться в застосунку «Сільпо»"
};
