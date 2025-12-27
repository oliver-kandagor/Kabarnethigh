
export const schoolProfile = {
    name: "KABARNET BOYS",
    location: "BARINGO",
    sex: "BOYS",
    category: "REGULAR",
    cluster: "C1",
    subjectBreakdown: [
        { name: "STEM", count: 36, color: "bg-blue-500" },
        { name: "Social Sciences", count: 9, color: "bg-orange-500" },
        { name: "Arts & Sports", count: 8, color: "bg-purple-500" }
    ]
};

export interface SubjectCombination {
    category: string;
    subCategory: string;
    code: string;
    subjects: string[];
    count: number;
}

export const cbcSubjectCombinations: SubjectCombination[] = [
    // ARTS & SPORTS SCIENCE
    { category: "ARTS & SPORTS SCIENCE", subCategory: "SPORTS", code: "AS2009", subjects: ["Biology", "Geography", "Sports & Recreation"], count: 3 },
    { category: "ARTS & SPORTS SCIENCE", subCategory: "ARTS", code: "AS1044", subjects: ["French", "Music & Dance", "Theatre & Film"], count: 3 },
    { category: "ARTS & SPORTS SCIENCE", subCategory: "ARTS", code: "AS1039", subjects: ["Computer Studies", "Music & Dance", "Theatre & Film"], count: 3 },
    { category: "ARTS & SPORTS SCIENCE", subCategory: "SPORTS", code: "AS2002", subjects: ["Biology", "Business Studies", "Sports & Recreation"], count: 3 },
    { category: "ARTS & SPORTS SCIENCE", subCategory: "SPORTS", code: "AS2010", subjects: ["Biology", "German", "Sports & Recreation"], count: 3 },
    { category: "ARTS & SPORTS SCIENCE", subCategory: "SPORTS", code: "AS2008", subjects: ["Biology", "French", "Sports & Recreation"], count: 3 },
    { category: "ARTS & SPORTS SCIENCE", subCategory: "SPORTS", code: "AS2019", subjects: ["Christian Religious Education", "General Science", "Sports & Recreation"], count: 3 },
    { category: "ARTS & SPORTS SCIENCE", subCategory: "ARTS", code: "AS1033", subjects: ["Core Mathematics", "Fine Arts", "Music & Dance"], count: 3 },

    // STEM - Applied Sciences
    { category: "STEM", subCategory: "APPLIED SCIENCES", code: "ST2007", subjects: ["Business Studies", "Computer Studies", "Physics"], count: 3 },
    { category: "STEM", subCategory: "APPLIED SCIENCES", code: "ST2070", subjects: ["Agriculture", "Aviation", "Geography"], count: 3 },
    { category: "STEM", subCategory: "APPLIED SCIENCES", code: "ST2077", subjects: ["Core Mathematics", "Business Studies", "Computer Studies"], count: 3 },
    { category: "STEM", subCategory: "APPLIED SCIENCES", code: "ST2010", subjects: ["Aviation", "Computer Studies", "Geography"], count: 3 },
    { category: "STEM", subCategory: "APPLIED SCIENCES", code: "ST2011", subjects: ["Biology", "Computer Studies", "Geography"], count: 3 },
    { category: "STEM", subCategory: "APPLIED SCIENCES", code: "ST2065", subjects: ["Core Mathematics", "Agriculture", "Computer Studies"], count: 3 },
    { category: "STEM", subCategory: "APPLIED SCIENCES", code: "ST2062", subjects: ["Agriculture", "Computer Studies", "Geography"], count: 3 },
    { category: "STEM", subCategory: "APPLIED SCIENCES", code: "ST2023", subjects: ["Business Studies", "Computer Studies", "Home Science"], count: 3 },
    { category: "STEM", subCategory: "APPLIED SCIENCES", code: "ST2016", subjects: ["Core Mathematics", "Computer Studies", "Geography"], count: 3 },
    { category: "STEM", subCategory: "APPLIED SCIENCES", code: "ST2013", subjects: ["Chemistry", "Computer Studies", "Geography"], count: 3 },
    { category: "STEM", subCategory: "APPLIED SCIENCES", code: "ST2003", subjects: ["Business Studies", "Computer Studies", "Geography"], count: 3 },
    { category: "STEM", subCategory: "APPLIED SCIENCES", code: "ST2041", subjects: ["Core Mathematics", "Biology", "Home Science"], count: 3 },
    { category: "STEM", subCategory: "APPLIED SCIENCES", code: "ST2057", subjects: ["Agriculture", "Biology", "Computer Studies"], count: 3 },
    { category: "STEM", subCategory: "APPLIED SCIENCES", code: "ST2050", subjects: ["Agriculture", "Business Studies", "Geography"], count: 3 },
    { category: "STEM", subCategory: "APPLIED SCIENCES", code: "ST2027", subjects: ["Computer Studies", "Geography", "Home Science"], count: 3 },

    // STEM - Pure Sciences
    { category: "STEM", subCategory: "PURE SCIENCES", code: "ST1042", subjects: ["Agriculture", "Biology", "Chemistry"], count: 3 },
    { category: "STEM", subCategory: "PURE SCIENCES", code: "ST1035", subjects: ["Core Mathematics", "Electricity", "Physics"], count: 3 },
    { category: "STEM", subCategory: "PURE SCIENCES", code: "ST1016", subjects: ["Core Mathematics", "Chemistry", "Geography"], count: 3 },
    { category: "STEM", subCategory: "PURE SCIENCES", code: "ST1015", subjects: ["Core Mathematics", "Chemistry", "Electricity"], count: 3 },
    { category: "STEM", subCategory: "PURE SCIENCES", code: "ST1007", subjects: ["Core Mathematics", "Biology", "Physics"], count: 3 },
    { category: "STEM", subCategory: "PURE SCIENCES", code: "ST1034", subjects: ["Core Mathematics", "Computer Studies", "Physics"], count: 3 },
    { category: "STEM", subCategory: "PURE SCIENCES", code: "ST1011", subjects: ["Core Mathematics", "Aviation", "Chemistry"], count: 3 },
    { category: "STEM", subCategory: "PURE SCIENCES", code: "ST1004", subjects: ["Core Mathematics", "Biology", "Chemistry"], count: 3 },
    { category: "STEM", subCategory: "PURE SCIENCES", code: "ST1031", subjects: ["Core Mathematics", "Aviation", "Physics"], count: 3 },
    { category: "STEM", subCategory: "PURE SCIENCES", code: "ST1012", subjects: ["Core Mathematics", "Building & Construction", "Chemistry"], count: 3 },
    { category: "STEM", subCategory: "PURE SCIENCES", code: "ST1014", subjects: ["Core Mathematics", "Chemistry", "Computer Studies"], count: 3 },
    { category: "STEM", subCategory: "PURE SCIENCES", code: "ST1002", subjects: ["Core Mathematics", "Aviation", "Biology"], count: 3 },
    { category: "STEM", subCategory: "PURE SCIENCES", code: "ST1001", subjects: ["Core Mathematics", "Agriculture", "Biology"], count: 3 },
    { category: "STEM", subCategory: "PURE SCIENCES", code: "ST1046", subjects: ["Biology", "Chemistry", "Computer Studies"], count: 3 },
    { category: "STEM", subCategory: "PURE SCIENCES", code: "ST1032", subjects: ["Core Mathematics", "Building & Construction", "Physics"], count: 3 },
    { category: "STEM", subCategory: "PURE SCIENCES", code: "ST1036", subjects: ["Core Mathematics", "Geography", "Physics"], count: 3 },
    { category: "STEM", subCategory: "PURE SCIENCES", code: "ST1017", subjects: ["Core Mathematics", "Chemistry", "Home Science"], count: 3 },
    { category: "STEM", subCategory: "PURE SCIENCES", code: "ST1020", subjects: ["Core Mathematics", "Chemistry", "Physics"], count: 3 },
    { category: "STEM", subCategory: "PURE SCIENCES", code: "ST1003", subjects: ["Core Mathematics", "Biology", "Business Studies"], count: 3 },

    // STEM - Technical Studies
    { category: "STEM", subCategory: "TECHNICAL STUDIES", code: "ST3024", subjects: ["Core Mathematics", "Electricity", "Geography"], count: 3 },
    { category: "STEM", subCategory: "TECHNICAL STUDIES", code: "ST3026", subjects: ["Electricity", "Geography", "Physics"], count: 3 },

    // SOCIAL SCIENCES
    { category: "SOCIAL SCIENCES", subCategory: "HUMANITIES & BUSINESS STUDIES", code: "SS2112", subjects: ["Business Studies", "Christian Religious Education", "French"], count: 3 },
    { category: "SOCIAL SCIENCES", subCategory: "HUMANITIES & BUSINESS STUDIES", code: "SS2004", subjects: ["Geography", "History & Citizenship", "Literature in English"], count: 3 },
    { category: "SOCIAL SCIENCES", subCategory: "HUMANITIES & BUSINESS STUDIES", code: "SS2079", subjects: ["Christian Religious Education", "German", "History & Citizenship"], count: 3 },
    { category: "SOCIAL SCIENCES", subCategory: "HUMANITIES & BUSINESS STUDIES", code: "SS2066", subjects: ["Business Studies", "Geography", "German"], count: 3 },
    { category: "SOCIAL SCIENCES", subCategory: "HUMANITIES & BUSINESS STUDIES", code: "SS2073", subjects: ["Business Studies", "Fasihi ya Kiswahili", "Geography"], count: 3 },
    { category: "SOCIAL SCIENCES", subCategory: "HUMANITIES & BUSINESS STUDIES", code: "SS2096", subjects: ["Business Studies", "Fasihi ya Kiswahili", "History & Citizenship"], count: 3 },
    { category: "SOCIAL SCIENCES", subCategory: "HUMANITIES & BUSINESS STUDIES", code: "SS2001", subjects: ["Business Studies", "Christian Religious Education", "Geography"], count: 3 },
    { category: "SOCIAL SCIENCES", subCategory: "LANGUAGES & LITERATURE", code: "SS1048", subjects: ["Christian Religious Education", "French", "German"], count: 3 },
    { category: "SOCIAL SCIENCES", subCategory: "HUMANITIES & BUSINESS STUDIES", code: "SS2075", subjects: ["Christian Religious Education", "French", "History & Citizenship"], count: 3 },
];
