// ניהול משתמשים
const initUsers = () => {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }
};

const getDefaultSettings = () => ({
    delay: 3000,
    theme: 'light',
    fontSize: 'medium',
    backgroundMusic: true,
    volume: 0.3
});

const loginOrCreateUser = (username) => {
    let users = JSON.parse(localStorage.getItem('users'));
    let user = users.find(u => u.username === username);
    
    if (!user) {
        // משתמש חדש - יוצרים אותו
        user = { username, settings: getDefaultSettings() };
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    localStorage.setItem('currentUser', username);
    return true;
};

const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        localStorage.setItem('currentUser', username);
        return true;
    }
    return false;
};

const getCurrentUser = () => {
    const username = localStorage.getItem('currentUser');
    if (!username) {
        window.location.href = 'index.html';
        return null;
    }
    const users = JSON.parse(localStorage.getItem('users'));
    return users.find(u => u.username === username);
};

const updateUserSettings = (settings) => {
    const username = localStorage.getItem('currentUser');
    const users = JSON.parse(localStorage.getItem('users'));
    const userIndex = users.findIndex(u => u.username === username);
    users[userIndex].settings = settings;
    localStorage.setItem('users', JSON.stringify(users));
};

const logout = () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
};

// ניהול מתכונים
const initRecipes = () => {
    if (!localStorage.getItem('recipes')) {
        const recipes = [
            // עוגות
            {
                id: 1,
                name: 'עוגת שוקולד פאדג׳',
                category: 'עוגות',
                image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop',
                ingredients: ['2 כוסות קמח', '1.5 כוסות סוכר', '3/4 כוס קקאו', '2 ביצים', '1 כוס חלב', '1/2 כוס שמן', '2 כפיות אבקת אפייה', 'קורט מלח'],
                instructions: ['מחממים תנור ל-180 מעלות', 'מערבבים חומרים יבשים בקערה', 'מוסיפים ביצים חלב ושמן', 'מערבבים היטב עד לקבלת בצק חלק', 'יוצקים לתבנית משומנת', 'אופים 35 עד 40 דקות', 'מצננים לחלוטין ומגישים']
            },
            {
                id: 2,
                name: 'עוגת גבינה אפויה',
                category: 'עוגות',
                image: 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=600&h=400&fit=crop',
                ingredients: ['500 גרם גבינה לבנה', '200 גרם שמנת חמוצה', '3 ביצים', '3/4 כוס סוכר', '1 כף קמח', '1 כפית תמצית וניל', 'בסיס עוגיות פירורים'],
                instructions: ['מכינים בסיס מעוגיות פירורים וחמאה', 'מערבבים גבינה שמנת וסוכר', 'מוסיפים ביצים אחת אחת', 'מוסיפים קמח ווניל', 'יוצקים על הבסיס', 'אופים ב-160 מעלות שעה', 'מקררים לפחות 4 שעות']
            },
            {
                id: 3,
                name: 'עוגת תפוחים וקינמון',
                category: 'עוגות',
                image: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=600&h=400&fit=crop',
                ingredients: ['3 תפוחים חתוכים', '2 כוסות קמח', '1 כוס סוכר', '3 ביצים', '3/4 כוס שמן', '2 כפיות קינמון', '1 כפית אבקת אפייה', '1/2 כפית סודה'],
                instructions: ['מקציפים ביצים וסוכר', 'מוסיפים שמן', 'מערבבים קמח אבקת אפייה וקינמון', 'מוסיפים תפוחים חתוכים', 'יוצקים לתבנית', 'אופים ב-180 מעלות 45 דקות', 'מצננים ומפזרים אבקת סוכר']
            },

            
            // עוגיות
            {
                id: 4,
                name: 'עוגיות שוקולד צ׳יפס',
                category: 'עוגיות',
                image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&h=400&fit=crop',
                ingredients: ['2 כוסות קמח', '1 כוס חמאה רכה', '3/4 כוס סוכר חום', '1/2 כוס סוכר לבן', '2 ביצים', '1 כפית וניל', '1 כפית סודה לשתייה', '2 כוסות שוקולד צ׳יפס'],
                instructions: ['מערבבים חמאה וסוכר עד לקבלת קרם', 'מוסיפים ביצים ווניל', 'מוסיפים קמח וסודה', 'מערבבים שוקולד צ׳יפס', 'יוצרים כדורים על תבנית', 'אופים ב-180 מעלות 12 דקות', 'מצננים על רשת ונהנים']
            },
            {
                id: 5,
                name: 'מאפינס שוקולד',
                category: 'עוגיות',
                image: 'https://images.unsplash.com/photo-1426869884541-df7117556757?w=600&h=400&fit=crop',
                ingredients: ['2 כוסות קמח', '1 כוס סוכר', '1/2 כוס קקאו', '2 ביצים', '1 כוס חלב', '1/2 כוס שמן', '2 כפיות אבקת אפייה', '1 כוס שוקולד צ׳יפס'],
                instructions: ['מערבבים חומרים יבשים', 'מוסיפים ביצים חלב ושמן', 'מערבבים עד אחיד', 'מוסיפים שוקולד צ׳יפס', 'יוצקים לתבניות מאפינס', 'אופים ב-180 מעלות 20 דקות', 'מצננים ומגישים']
            },
            {
                id: 6,
                name: 'עוגיות חמאה',
                category: 'עוגיות',
                image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=400&fit=crop',
                ingredients: ['250 גרם חמאה רכה', '1 כוס אבקת סוכר', '2 כוסות קמח', '1 כפית תמצית וניל', 'קורט מלח'],
                instructions: ['מערבבים חמאה ואבקת סוכר', 'מוסיפים וניל', 'מוסיפים קמח ומלח', 'מערבבים לבצק', 'מעצבים עוגיות', 'אופים ב-170 מעלות 15 דקות', 'מצננים ומקשטים']
            },
            
            // קינוחים
            {
                id: 7,
                name: 'טירמיסו קלאסי',
                category: 'קינוחים',
                image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&h=400&fit=crop',
                ingredients: ['500 גרם גבינת מסקרפונה', '4 ביצים', '1 כוס סוכר', '2 כוסות קפה חזק קר', '2 חבילות ביסקוויטים', 'קקאו להפרדה', '2 כפות ליקר אמרטו'],
                instructions: ['מפרידים חלמונים וחלבונים', 'מקציפים חלמונים עם סוכר', 'מערבבים עם מסקרפונה', 'מקציפים חלבונים ומוסיפים', 'טובלים ביסקוויטים בקפה', 'מניחים שכבות בתבנית', 'מפזרים קקאו ומקררים 4 שעות']
            },
            {
                id: 8,
                name: 'קרם ברולה',
                category: 'קינוחים',
                image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600&h=400&fit=crop',
                ingredients: ['500 מל שמנת מתוקה', '6 חלמונים', '1/2 כוס סוכר', '1 כפית תמצית וניל', 'סוכר חום לקרמול'],
                instructions: ['מחממים שמנת עד רתיחה', 'מקציפים חלמונים עם סוכר', 'מוסיפים שמנת בהדרגה', 'מוסיפים וניל', 'יוצקים לקערות רמקינס', 'אופים במרחץ מים 40 דקות', 'מקררים ומקרמלים סוכר לפני הגשה']
            },
            {
                id: 9,
                name: 'מוס שוקולד',
                category: 'קינוחים',
                image: 'https://images.unsplash.com/photo-1541599468348-e96984315921?w=600&h=400&fit=crop',
                ingredients: ['200 גרם שוקולד מריר', '3 ביצים', '2 כפות סוכר', '250 מל שמנת מתוקה', 'קורט מלח'],
                instructions: ['ממיסים שוקולד במיקרוגל', 'מפרידים חלמונים וחלבונים', 'מערבבים חלמונים עם שוקולד', 'מקציפים שמנת', 'מקציפים חלבונים עם סוכר', 'מערבבים הכל בעדינות', 'מקררים 3 שעות']
            },
            {
                id: 16,
                name: 'רולדת שוקולד מושלמת',
                category: 'קינוחים',
                image: 'https://images.pexels.com/photos/9553735/pexels-photo-9553735.jpeg?w=600&h=400&fit=crop',
                ingredients: ['6 ביצים', '3/4 כוס סוכר', '1/2 כוס קקאו', '1 כפית אבקת אפייה', '300 מל שמנת מתוקה', '200 גרם שוקולד מריר', 'אבקת סוכר לקישוט'],
                instructions: ['מקציפים ביצים וסוכר עד לתפיחה', 'מוסיפים קקאו ואבקת אפייה', 'יוצקים לתבנית רדודה משומנת', 'אופים ב-180 מעלות 12 דקות', 'מגלגלים עם מגבת לחה', 'מכינים קרם משמנת ושוקולד', 'ממרחים ומגלגלים שוב', 'מקררים ומפזרים אבקת סוכר']
            },
            // חלות ולחמניות
            {
                id: 17,
                name: 'חלה קלועה מושלמת',
                category: 'חלות ולחמניות',
                image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop',
                ingredients: ['1 ק"ג קמח לבן', '2 כפות שמרים יבשים', '1/2 כוס סוכר', '2 ביצים', '1/2 כוס שמן', '2 כוסות מים פושרים', '2 כפיות מלח', 'חלמון למריחה', 'שומשום'],
                instructions: ['מערבבים שמרים סוכר ומעט מים', 'ממתינים 10 דקות להתפחה', 'מוסיפים קמח ביצים שמן ומלח', 'לשים 10 דקות עד בצק גמיש', 'מניחים להתפחה שעה וחצי', 'מחלקים ל-3 חלקים וקולעים', 'מניחים להתפחה נוספת 30 דקות', 'מורחים חלמון ומפזרים שומשום', 'אופים ב-180 מעלות 35 דקות']
            },
            {
                id: 18,
                name: 'לחמניות חמאה רכות',
                category: 'חלות ולחמניות',
                image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=600&h=400&fit=crop',
                ingredients: ['500 גרם קמח', '1 כף שמרים', '1/4 כוס סוכר', '1 ביצה', '100 גרם חמאה רכה', '1 כוס חלב פושר', '1 כפית מלח', 'חלמון למריחה'],
                instructions: ['מערבבים שמרים סוכר וחלב', 'מוסיפים קמח ביצה וחמאה', 'לשים 8 דקות', 'מניחים להתפחה שעה', 'מחלקים ל-12 כדורים', 'מניחים בתבנית צמודים', 'מתפיחים 40 דקות', 'מורחים חלמון', 'אופים ב-180 מעלות 20 דקות']
            },
            {
                id: 19,
                name: 'פיתות ביתיות',
                category: 'חלות ולחמניות',
                image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=400&fit=crop',
                ingredients: ['500 גרם קמח', '1 כף שמרים', '1 כפית סוכר', '1.5 כוסות מים פושרים', '2 כפות שמן זית', '1.5 כפיות מלח'],
                instructions: ['מערבבים שמרים סוכר ומים', 'מוסיפים קמח שמן ומלח', 'לשים 5 דקות', 'מניחים להתפחה שעה', 'מחלקים ל-8 כדורים', 'מרדדים לעיגולים', 'אופים בתנור חם 250 מעלות', 'כל פיתה 3-4 דקות עד מתנפחת']
            },
            {
                id: 20,
                name: 'בייגלה ירושלמי',
                category: 'חלות ולחמניות',
                image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&h=400&fit=crop',
                ingredients: ['500 גרם קמח', '1 כף שמרים', '2 כפות סוכר', '1 כוס מים', '3 כפות שמן', '1 כפית מלח', 'שומשום לציפוי'],
                instructions: ['מערבבים את כל החומרים', 'לשים 10 דקות', 'מתפיחים שעה', 'מחלקים ל-8 חלקים', 'מעצבים טבעות', 'טובלים במים ושומשום', 'אופים ב-200 מעלות 25 דקות']
            },
            {
                id: 21,
                name: 'לחם מחמצת ביתי',
                category: 'חלות ולחמניות',
                image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&h=400&fit=crop',
                ingredients: ['400 גרם קמח חיטה מלאה', '100 גרם קמח לבן', '1 כף שמרים', '1.5 כוסות מים פושרים', '2 כפות דבש', '2 כפות שמן זית', '2 כפיות מלח'],
                instructions: ['מערבבים שמרים דבש ומים', 'מוסיפים קמחים שמן ומלח', 'לשים 12 דקות', 'מתפיחים שעתיים', 'מעצבים כיכר', 'מתפיחים עוד 45 דקות', 'חורצים חריצים עליון', 'אופים ב-200 מעלות 40 דקות']
            },
            {
                id: 22,
                name: 'לחמניות שום ועשבי תיבול',
                category: 'חלות ולחמניות',
                image: 'https://images.unsplash.com/photo-1608198399988-841b5a98d18e?w=600&h=400&fit=crop',
                ingredients: ['500 גרם קמח', '1 כף שמרים', '1 כוס מים', '3 כפות שמן זית', '4 שיני שום כתושות', '2 כפות פטרוזיליה קצוצה', '1 כפית מלח', '1 כפית אורגנו'],
                instructions: ['מערבבים שמרים מים וקמח', 'מוסיפים שמן שום ותבלינים', 'לשים 8 דקות', 'מתפיחים שעה', 'מחלקים ל-10 לחמניות', 'מתפיחים 30 דקות', 'מורחים שמן זית ושום', 'אופים ב-190 מעלות 18 דקות']
            },
            {
                id: 10,
                name: 'חומוס ביתי',
                category: 'תוספות',
                image: 'https://images.unsplash.com/photo-1595587637401-f8f5e1e3c9cf?w=600&h=400&fit=crop',
                ingredients: ['2 כוסות חומוס מבושל', '3 כפות טחינה גולמית', '2 שיני שום', 'מיץ לימון', '1/2 כפית כמון', 'מלח', 'מים קרים'],
                instructions: ['שמים חומוס בקערת מעבד', 'מוסיפים טחינה ושום', 'מוסיפים לימון וכמון', 'טוחנים היטב', 'מוסיפים מים עד למרקם רצוי', 'טועמים ומתקנים תיבול', 'מגישים עם שמן זית ופלפל']
            },
            {
                id: 11,
                name: 'סלט ירקות קצוץ',
                category: 'תוספות',
                image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop',
                ingredients: ['2 עגבניות', '2 מלפפונים', '1 פלפל', '1 בצל סגול', 'עלי נענע', 'מיץ לימון', 'שמן זית', 'מלח'],
                instructions: ['חותכים ירקות לקוביות קטנות', 'קוצצים בצל דק', 'קוצצים נענע', 'מערבבים הכל בקערה', 'מוסיפים לימון ושמן', 'מתבלים במלח', 'מערבבים ומגישים']
            },
            {
                id: 12,
                name: 'גוואקמולי',
                category: 'תוספות',
                image: 'https://images.unsplash.com/photo-1604903376466-e010c0d3c8e5?w=600&h=400&fit=crop',
                ingredients: ['3 אבוקדו בשלים', '1 עגבנייה', '1/2 בצל', 'מיץ לימון', 'כוסברה', 'מלח', 'פלפל'],
                instructions: ['מורסים אבוקדו במזלג', 'קוצצים עגבנייה ובצל דק', 'קוצצים כוסברה', 'מערבבים הכל', 'מוסיפים לימון', 'מתבלים במלח ופלפל', 'מגישים מיד']
            },
            
            // פטפורים
            {
                id: 13,
                name: 'בורקס גבינה',
                category: 'פטפורים',
                image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&h=400&fit=crop',
                ingredients: ['חבילת בצק עלים', '250 גרם גבינה לבנה', '200 גרם גבינה בולגרית', '1 ביצה', 'מעט פטרוזיליה', 'חלמון למריחה', 'שומשום'],
                instructions: ['מערבבים גבינות וביצה', 'מוסיפים פטרוזיליה קצוצה', 'חותכים בצק למשולשים', 'ממלאים במילוי', 'מקפלים למשולשים', 'מורחים חלמון ומפזרים שומשום', 'אופים ב-180 מעלות 25 דקות']
            },
            {
                id: 14,
                name: 'מיני פיצות',
                category: 'פטפורים',
                image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop',
                ingredients: ['בצק פיצה', 'רטב עגבניות', 'גבינה מוצרלה', 'זיתים', 'פטריות', 'פלפלים', 'אורגנו'],
                instructions: ['מרדדים בצק לעיגולים קטנים', 'מורחים רטב עגבניות', 'מפזרים גבינה', 'מוסיפים תוספות לבחירה', 'מפזרים אורגנו', 'אופים ב-220 מעלות 12 דקות', 'מגישים חמים']
            },
            {
                id: 15,
                name: 'סמבוסק',
                category: 'פטפורים',
                image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&h=400&fit=crop',
                ingredients: ['בצק פילו', '300 גרם בשר טחון', '1 בצל', 'פטרוזיליה', 'תבלינים', 'מלח ופלפל', 'שמן לטיגון'],
                instructions: ['מטגנים בצל ובשר', 'מתבלים ומוסיפים פטרוזיליה', 'חותכים בצק לריבועים', 'ממלאים ומקפלים למשולשים', 'סוגרים היטב', 'מטגנים בשמן עמוק', 'מסננים ומגישים']
            }
        ];
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }
};

const getRecipes = () => JSON.parse(localStorage.getItem('recipes'));

const getRecipeById = (id) => {
    const recipes = getRecipes();
    return recipes.find(r => r.id === parseInt(id));
};

const addRecipe = (recipe) => {
    const recipes = getRecipes();
    recipe.id = recipes.length > 0 ? Math.max(...recipes.map(r => r.id)) + 1 : 1;
    recipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
};

const removeRecipe = (id) => {
    let recipes = getRecipes();
    recipes = recipes.filter(r => r.id !== id);
    localStorage.setItem('recipes', JSON.stringify(recipes));
};

// אתחול
initUsers();
initRecipes();
