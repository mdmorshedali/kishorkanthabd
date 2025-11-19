const studentData = [
    {
        registration: "2024",
        class: "4",
        name: "জারিন তাসনিম",
        fatherName: "মোঃ আব্দুল্লাহ আল মামুন",
        school: "শাহ মখদুম কলেজিয়েট স্কুল এন্ড কলেজ রাজশাহী",
        examCenter: "রাজশাহী বিশ্ববিদ্যালয় স্কুল এন্ড কলেজ",
        marks: 89,
        mobile: "01512345678"
    },
    {
        registration: "2025",
        class: "3",
        name: "আরাফাত রহমান",
        fatherName: "মোঃ জাহিদ হাসান",
        school: "রাজশাহী সরকারি প্রাথমিক বিদ্যালয়",
        examCenter: "রাজশাহী মডেল স্কুল এন্ড কলেজ",
        marks: 92,
        mobile: "01512345678"
    }
];

function toBengaliNumber(number) {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return number.toString().replace(/\d/g, digit => bengaliDigits[parseInt(digit)]);
}

function getBengaliClass(classNum) {
    const classNames = {
        '3': '৩য়',
        '4': '৪র্থ',
        '5': '৫ম',
        '6': '৬ষ্ঠ',
        '7': '৭ম',
        '8': '৮ম',
        '9': '৯ম',
        '10': '১০ম'
    };
    return classNames[classNum] || classNum;
}

function validateMobile(mobile) {
    const mobileRegex = /^01[3-9]\d{8}$/;
    return mobileRegex.test(mobile);
}

function validateNumbersOnly(text) {
    const numberRegex = /^\d+$/;
    return numberRegex.test(text);
}