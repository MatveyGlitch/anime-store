function getImages(category, name, count)
{
    return Array.from({ length: count }, (_, i) =>
        `img/products/${category}/${name}-${i + 1}.jpg`
    );
}

// ==================== ФИГУРКИ ====================
const FIGURES = [
    {
        id: 1,
        name: 'Kurumi Tokisaki',
        category: 'figures',
        categoryName: 'Фигурки',
        price: 3250,
        images: getImages('figures', 'kurumi', 6),
        height: "21 см",
        character: "Куруми Токисаки / Kurumi Tokisaki",
        source: "Рандеву с жизнью / Date A Live",
        manufacturer: "Prime 1 Studio"
    },

    {
        id: 2,
        name: 'Reimu Hakurei',
        category: 'figures',
        categoryName: 'Фигурки',
        price: 6190,
        images: getImages('figures', 'reimu', 7),
        height: "40 см",
        character: "Рейму Хакурей / Reimu Hakurei",
        source: "Touhou Project",
        manufacturer: "Prime 1 Studio",
    },

    {
        id: 9,
        name: 'Shelter Bloodfallen: Black Bunny',
        category: 'figures',
        categoryName: 'Фигурки',
        price: 35300,
        images: getImages('figures', 'shelter-bloodfallen', 6),
        height: "28 см",
        character: "Шаллтир Бладфоллен / Shalltear Bloodfallen",
        source: "Повелитель / Overlord",
        manufacturer: "FREEing",
    },

    {
        id: 10,
        name: 'Narberal Gamma: Black Bunny',
        category: 'figures',
        categoryName: 'Фигурки',
        price: 36200,
        images: getImages('figures', 'narberal-gamma', 8),
        height: "32 см",
        character: "Нарберал Гамма / Narberal Gamma",
        source: "Повелитель / Overlord",
        manufacturer: "FREEing",
    },

    {
        id: 11,
        name: 'Nanami',
        category: 'figures',
        categoryName: 'Фигурки',
        price: 6950,
        images: getImages('figures', 'nanami', 10),
        height: "12 см",
        character: "Нанами / Nanami",
        source: "Виртуальный ютубер / Virtual YouTuber",
        manufacturer: "Raise Dream",
    },

    {
        id: 12,
        name: 'Albedo',
        category: 'figures',
        categoryName: 'Фигурки',
        price: 176195,
        images: getImages('figures', 'albedo-1', 9),
        height: "77 см",
        character: "Альбедо / Albedo",
        source: "Повелитель / Overlord",
        manufacturer: "Prime 1 Studio",
    },

    {
        id: 15,
        name: 'Hatsune Miku',
        category: 'figures',
        categoryName: 'Фигурки',
        price: 2585,
        images: getImages('figures', 'miku', 9),
        height: "21 см",
        character: "Хацунэ Мику / Hatsune Miku",
        source: "Вокалоид / Vocaloid",
        manufacturer: "Taito",
    },

    {
        id: 16,
        name: 'Asuka',
        category: 'figures',
        categoryName: 'Фигурки',
        price: 148930,
        images: getImages('figures', 'asuka', 10),
        height: "98 см",
        character: "Аска Лэнгли Сорью / Asuka Langley Souryuu",
        source: "Евангелион / Evangelion",
        manufacturer: "Infinity Studio",
    },

    {
        id: 17,
        name: 'Ruan Mei',
        category: 'figures',
        categoryName: 'Фигурки',
        price: 18875,
        images: getImages('figures', 'ruan-mei', 8),
        height: "17.7 см",
        character: "Ruan Mei",
        source: "Honkai: Star Rail",
        manufacturer: "Prime 1 Studio",
    },

    {
        id: 18,
        name: 'Marin Kitagawa',
        category: 'figures',
        categoryName: 'Фигурки',
        price: 2585,
        images: getImages('figures', 'marin-kitagawa', 7),
        height: "13 см",
        character: "Марин Китагава / Marin Kitagawa",
        source: "Эта фарфоровая кукла влюбилась / Sono Bisque Doll wa Koi wo Suru",
        manufacturer: "TAITO",
    },

    {
        id: 19,
        name: 'Rei Ayanami',
        category: 'figures',
        categoryName: 'Фигурки',
        price: 2550,
        images: getImages('figures', 'rei', 5),
        height: "20 см",
        character: "Рей Аянами / Rei Ayanami",
        source: "Евангелион / Evangelion",
        manufacturer: "TAITO",
    },

    {
        id: 21,
        name: 'Nino Nakano',
        category: 'figures',
        categoryName: 'Фигурки',
        price: 2800,
        images: getImages('figures', 'nino', 5),
        height: "20 см",
        character: "Нино Накано / Nino Nakano",
        source: "Пять Невест / The Quintessential Quintuplets",
        manufacturer: "TAITO",
    },

    {
        id: 22,
        name: 'Gojo Satoru',
        category: 'figures',
        categoryName: 'Фигурки',
        price: 17560,
        images: getImages('figures', 'gojo-satoru-1', 7),
        height: "41 см",
        character: "Сатору Годжо / Satoru Gojou",
        source: "Магическая битва / Jujutsu Kaisen",
        manufacturer: "Six Eyes Studio",
    },

    {
        id: 23,
        name: 'Kurosaki Ichigo: Hell Form',
        category: 'figures',
        categoryName: 'Фигурки',
        price: 26850,
        images: getImages('figures', 'kurosaki-ichigo', 7),
        height: "37 см",
        character: "Куросаки Ичиго / Kurosaki ichigo",
        source: "Блич / Bleach",
        manufacturer: "Mu Zi Studio",
    },

    {
        id: 24,
        name: 'Tsaritsa Anastasya',
        category: 'figures',
        categoryName: 'Фигурки',
        price: 19300,
        images: getImages('figures', 'tsaritsa-anastasya', 6),
        height: "20 см",
        character: "Царица / Tsaritsa",
        source: "Геншин Импакт / Genshin Impact",
        manufacturer: "MiYin Studio",
    },

    {
        id: 25,
        name: 'Gojo Satoru',
        category: 'figures',
        categoryName: 'Фигурки',
        price: 13700,
        images: getImages('figures', 'gojo-satoru-2', 5),
        height: "23 см",
        character: "Сатору Годжо / Satoru Gojou",
        source: "Магическая битва / Jujutsu Kaisen",
        manufacturer: "GO FIGURE Studio",
    },

    {
        id: 30,
        name: 'Louise',
        category: 'figures',
        categoryName: 'Фигурки',
        price: 6650,
        images: getImages('figures', 'louise', 6),
        height: "22 см",
        character: "Луиза / Louise",
        source: "Подручный Луизы-Нулизы / Zero no Tsukaima",
        manufacturer: "POP UP PARADE",
    },

    {
        id: 31,
        name: 'Albedo: Hermes Trismegistus',
        category: 'figures',
        categoryName: 'Фигурки',
        price: 31280,
        images: getImages('figures', 'albedo-2', 8),
        height: "31 см",
        character: "Альбедо / Albedo",
        source: "Повелитель / Overlord",
        manufacturer: "DMM Factory",
    },

];


// ==================== ОДЕЖДА ====================
const CLOTHES = [
    {
        id: 3,
        name: 'Худи Alucard',
        category: 'clothes',
        categoryName: 'Одежда',
        price: 12490,
        images: getImages('clothes', 'hoodie-alucard', 4)
    },

    {
        id: 4,
        name: 'Футболка Chainsaw Man',
        category: 'clothes',
        categoryName: 'Одежда',
        price: 3590,
        images: getImages('clothes', 't-shirt-chainsawman', 2)
    },

    {
        id: 6,
        name: 'Рубашка King Of Curses',
        category: 'clothes',
        categoryName: 'Одежда',
        price: 11990,
        images: getImages('clothes', 'shirt-kingofcurses', 2)
    },

    {
        id: 8,
        name: 'Джинсы Mermaids',
        category: 'clothes',
        categoryName: 'Одежда',
        price: 6925,
        images: getImages('clothes', 'jeans-mermaids', 2)
    },

    {
        id: 13,
        name: 'Худи Dark Naruto',
        category: 'clothes',
        categoryName: 'Одежда',
        price: 13990,
        images: getImages('clothes', 'hoodie-darknaruto', 4)
    },

    {
        id: 14,
        name: 'Топ Neo Tokyo Rider',
        category: 'clothes',
        categoryName: 'Одежда',
        price: 3790,
        images: getImages('clothes', 'top-neotokyorider', 2)
    },

    {
        id: 26,
        name: 'Худи Satoru',
        category: 'clothes',
        categoryName: 'Одежда',
        price: 13990,
        images: getImages('clothes', 'hoodie-satoru', 4)
    },

    {
        id: 27,
        name: 'Лонгслив Malevolent Curse',
        category: 'clothes',
        categoryName: 'Одежда',
        price: 8690,
        images: getImages('clothes', 'longshliv-malevolent-curse', 2)
    },

    {
        id: 28,
        name: 'Джинсы Ascendance',
        category: 'clothes',
        categoryName: 'Одежда',
        price: 6925,
        images: getImages('clothes', 'jeans-ascendance', 2)
    },

    {
        id: 29,
        name: 'Футболка Quiet Possession',
        category: 'clothes',
        categoryName: 'Одежда',
        price: 4490,
        images: getImages('clothes', 't-shirt-quiet-possession', 4)
    },

];

// ==================== МАНГА ====================
const MANGA = [
    {
        id: 5,
        name: 'Манга Berserk. Том 1',
        category: 'manga',
        categoryName: 'Манга',
        price: 1690,
        images: ['img/products/manga/manga-1.jpg']
    },

    {
        id: 7,
        name: 'Манга Naruto. Том 1',
        category: 'manga',
        categoryName: 'Манга',
        price: 1290,
        images: ['img/products/manga/manga-2.jpg']
    },
];


// ==================== ВСЕ ТОВАРЫ ====================
const PRODUCTS = [
    ...FIGURES,
    ...CLOTHES,
    ...MANGA
].sort((a, b) => a.id - b.id);