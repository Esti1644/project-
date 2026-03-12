# 📸 מדריך להוספת תמונות למתכונים

## איך להוסיף תמונות משלך?

### אופציה 1: תמונות מהמחשב (מומלץ)

1. **צור תיקיית תמונות:**
   - צור תיקייה בשם `images` בתוך `recipe-app`
   - שים בה את כל התמונות שלך

2. **שנה את הקישורים ב-storage.js:**
   ```javascript
   image: 'images/chocolate-cake.jpg'
   ```

3. **שמות מומלצים לתמונות:**
   - `chocolate-cake.jpg`
   - `cheesecake.jpg`
   - `chocolate-cookies.jpg`
   - וכו'

### אופציה 2: תמונות מהאינטרנט (קל יותר)

**אתרים עם תמונות חינמיות ויפות:**

1. **Unsplash** (https://unsplash.com)
   - חפשי: "chocolate cake", "cookies", "dessert"
   - לחצי ימין על התמונה → Copy Image Address
   - הדביקי את הקישור ב-storage.js

2. **Pexels** (https://pexels.com)
   - תמונות איכותיות בחינם
   - חפשי לפי סוג המתכון

3. **Pixabay** (https://pixabay.com)
   - תמונות חינמיות ללא זכויות יוצרים

### איך לשנות תמונה למתכון קיים?

1. פתחי את `storage.js`
2. מצאי את המתכון (לפי id או name)
3. שני את השורה:
   ```javascript
   image: 'הקישור החדש כאן'
   ```

### דוגמה מלאה:

```javascript
{
    id: 1,
    name: 'עוגת שוקולד פאדג׳',
    category: 'עוגות',
    image: 'images/my-chocolate-cake.jpg', // או קישור מהאינטרנט
    ingredients: [...],
    instructions: [...]
}
```

## 💡 טיפים לתמונות מקצועיות:

1. **גודל מומלץ:** 800x600 פיקסלים
2. **פורמט:** JPG או PNG
3. **איכות:** תמונות ברורות ומוארות היטב
4. **זווית:** תמונות מלמעלה או מהצד נראות הכי טוב
5. **רקע:** רקע נקי ופשוט

## 🎨 המלצות לחיפוש תמונות:

### עוגות:
- "chocolate cake top view"
- "cheesecake slice"
- "apple cinnamon cake"

### עוגיות:
- "chocolate chip cookies"
- "butter cookies"
- "chocolate muffins"

### קינוחים:
- "tiramisu dessert"
- "creme brulee"
- "chocolate mousse"

### תוספות:
- "hummus bowl"
- "fresh salad"
- "guacamole dip"

### פטפורים:
- "cheese bourekas"
- "mini pizza"
- "sambusak pastry"

## 🚀 אחרי שהוספת תמונות:

1. שמרי את הקובץ storage.js
2. רענני את הדפדפן (F5)
3. נקי את ה-localStorage (אם צריך):
   - פתחי Console (F12)
   - הקלידי: `localStorage.clear()`
   - רענני שוב

---

**זקוקה לעזרה?** פתחי את test.html לאיפוס המערכת!
