const { translations } = require('./src/lib/translations.js');
console.log('Translations loaded successfully');
console.log('Available languages:', Object.keys(translations));
Object.keys(translations).forEach(lang => {
    console.log(`Checking ${lang}...`);
    const t = translations[lang];
    if (!t.nav) throw new Error(`${lang}.nav missing`);
    if (!t.hero) throw new Error(`${lang}.hero missing`);
    if (!t.footer) throw new Error(`${lang}.footer missing`);
    if (!t.whySection) throw new Error(`${lang}.whySection missing`);
    if (!t.whoIsItFor) throw new Error(`${lang}.whoIsItFor missing`);
    if (!t.pricing) throw new Error(`${lang}.pricing missing`);
    if (!t.masonry) throw new Error(`${lang}.masonry missing`);
    if (!t.carousel) throw new Error(`${lang}.carousel missing`);
    if (!t.social) throw new Error(`${lang}.social missing`);
    if (!t.auth) throw new Error(`${lang}.auth missing`);
});
console.log('All checks passed!');
