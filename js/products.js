const PRODUCTS = [
    {
        id: 1,
        name: 'Kurumi Tokisaki',
        category: 'figures',
        categoryName: 'Фигурки',
        price: 3250,
        images: [
            'img/products/figures/kurumi-1.jpg',
            'img/products/figures/kurumi-2.jpg',
            'img/products/figures/kurumi-3.jpg',
            'img/products/figures/kurumi-4.jpg',
            'img/products/figures/kurumi-5.jpg',
            'img/products/figures/kurumi-6.jpg',
        ],
        height: "21 см",
        character: "Куруми Токисаки / Kurumi Tokisaki",
        source: "Рандеву с жизнью / Date A Live",
        manufacturer: "Prime 1 Studio",
    },

    {
        id: 2,
        name: 'Reimu Hakurei',
        category: 'figures',
        categoryName: 'Фигурки',
        price: 6190,

        images: [
            'img/products/figures/reimu-1.jpg',
            'img/products/figures/reimu-2.jpg',
            'img/products/figures/reimu-3.jpg',
            'img/products/figures/reimu-4.jpg',
            'img/products/figures/reimu-5.jpg',
            'img/products/figures/reimu-6.jpg',
            'img/products/figures/reimu-7.jpg',
        ],
        height: "40 см",
        character: "Рейму Хакурей / Reimu Hakurei",
        source: "Touhou Project",
        manufacturer: "Prime 1 Studio",
    },

    {
        id: 3,
        name: 'Худи Alucard',
        category: 'clothes',
        categoryName: 'Одежда',
        price: 12490,
        images: [
            'img/products/clothes/hoodie-alucard-1.jpg',
            'img/products/clothes/hoodie-alucard-2.jpg',
            'img/products/clothes/hoodie-alucard-3.jpg',
            'img/products/clothes/hoodie-alucard-4.jpg'
        ]
    },

    {
        id: 4,
        name: 'Футболка Chainsaw Man',
        category: 'clothes',
        categoryName: 'Одежда',
        price: 3590,
        images: [
            'img/products/clothes/t-shirt-chainsawman-1.jpg',
            'img/products/clothes/t-shirt-chainsawman-2.jpg',
        ]
    },

    {
        id: 5,
        name: 'Манга Berserk. Том 1',
        category: 'manga',
        categoryName: 'Манга',
        price: 1690,
        images: [
            'img/products/manga/manga-1.jpg'
        ]
    },

    {
        id: 6,
        name: 'Рубашка King Of Curses',
        category: 'clothes',
        categoryName: 'Одежда',
        price: 11990,
        images: [
            'img/products/clothes/shirt-kingofcurses-1.jpg',
            'img/products/clothes/shirt-kingofcurses-2.jpg',
        ]
    },

    {
        id: 7,
        name: 'Манга Naruto. Том 1',
        category: 'manga',
        categoryName: 'Манга',
        price: 1290,
        images: [
            'img/products/manga/manga-2.jpg'
        ]
    },

    {
        id: 8,
        name: 'Джинсы Mermaids',
        category: 'clothes',
        categoryName: 'Одежда',
        price: 6925,
        images: [
            'img/products/clothes/jeans-mermaids-1.jpg',
            'img/products/clothes/jeans-mermaids-2.jpg',
        ]
    },

        <!-- ============================================================================== -->


    {
        id: 9,
        name: 'Shelter Bloodfallen: Black Bunny',
        category: 'figures',
        categoryName: 'Фигурки',
        price: 35300,
        images: [
            'img/products/figures/shelter-bloodfallen-1.jpg',
            'img/products/figures/shelter-bloodfallen-2.jpg',
            'img/products/figures/shelter-bloodfallen-3.jpg',
            'img/products/figures/shelter-bloodfallen-4.jpg',
            'img/products/figures/shelter-bloodfallen-5.jpg',
            'img/products/figures/shelter-bloodfallen-6.jpg'
        ],
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
        images: [
            'img/products/figures/narberal-gamma-1.jpg',
            'img/products/figures/narberal-gamma-2.jpg',
            'img/products/figures/narberal-gamma-3.jpg',
            'img/products/figures/narberal-gamma-4.jpg',
            'img/products/figures/narberal-gamma-5.jpg',
            'img/products/figures/narberal-gamma-6.jpg',
            'img/products/figures/narberal-gamma-7.jpg',
            'img/products/figures/narberal-gamma-8.jpg',
        ],
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
        images: [
            'img/products/figures/nanami-1.jpg',
            'img/products/figures/nanami-2.jpg',
            'img/products/figures/nanami-3.jpg',
            'img/products/figures/nanami-4.jpg',
            'img/products/figures/nanami-5.jpg',
            'img/products/figures/nanami-6.jpg',
            'img/products/figures/nanami-7.jpg',
            'img/products/figures/nanami-8.jpg',
            'img/products/figures/nanami-9.jpg',
            'img/products/figures/nanami-10.jpg',
        ],
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
        images: [
            'img/products/figures/albedo-1.jpg',
            'img/products/figures/albedo-2.jpg',
            'img/products/figures/albedo-3.jpg',
            'img/products/figures/albedo-4.jpg',
            'img/products/figures/albedo-5.jpg',
            'img/products/figures/albedo-6.jpg',
            'img/products/figures/albedo-7.jpg',
            'img/products/figures/albedo-8.jpg',
            'img/products/figures/albedo-9.jpg',
        ],
        height: "77 см",
        character: "Альбедо / Albedo",
        source: "Повелитель / Overlord",
        manufacturer: "Prime 1 Studio",
    },

    {
        id: 13,
        name: 'Худи Dark Naruto',
        category: 'clothes',
        categoryName: 'Одежда',
        price: 13990,
        images: [
            'img/products/clothes/hoodie-darknaruto-1.jpg',
            'img/products/clothes/hoodie-darknaruto-2.jpg',
            'img/products/clothes/hoodie-darknaruto-3.jpg',
            'img/products/clothes/hoodie-darknaruto-4.jpg',
        ]
    },

    {
        id: 14,
        name: 'Топ Neo Tokyo Rider',
        category: 'clothes',
        categoryName: 'Одежда',
        price: 3790,
        images: [
            'img/products/clothes/top-neotokyorider-1.jpg',
            'img/products/clothes/top-neotokyorider-2.jpg',
        ]
    },

    {
        id: 15,
        name: 'Hatsune Miku',
        category: 'figures',
        categoryName: 'Фигурки',
        price: 2585,
        images: [
            'img/products/figures/miku-1.jpg',
            'img/products/figures/miku-2.jpg',
            'img/products/figures/miku-3.jpg',
            'img/products/figures/miku-4.jpg',
            'img/products/figures/miku-5.jpg',
            'img/products/figures/miku-6.jpg',
            'img/products/figures/miku-7.jpg',
            'img/products/figures/miku-8.jpg',
            'img/products/figures/miku-9.jpg',
        ],
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
        images: [
            'img/products/figures/asuka-1.jpg',
            'img/products/figures/asuka-2.jpg',
            'img/products/figures/asuka-3.jpg',
            'img/products/figures/asuka-4.jpg',
            'img/products/figures/asuka-5.jpg',
            'img/products/figures/asuka-6.jpg',
            'img/products/figures/asuka-7.jpg',
            'img/products/figures/asuka-8.jpg',
            'img/products/figures/asuka-9.jpg',
            'img/products/figures/asuka-10.jpg',
        ],
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
        images: [
            'img/products/figures/ruan-mei-1.jpg',
            'img/products/figures/ruan-mei-2.jpg',
            'img/products/figures/ruan-mei-3.jpg',
            'img/products/figures/ruan-mei-4.jpg',
            'img/products/figures/ruan-mei-5.jpg',
            'img/products/figures/ruan-mei-6.jpg',
            'img/products/figures/ruan-mei-7.jpg',
            'img/products/figures/ruan-mei-8.jpg'
        ],
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

        images: [
            'img/products/figures/marin-kitagawa-1.jpg',
            'img/products/figures/marin-kitagawa-2.jpg',
            'img/products/figures/marin-kitagawa-3.jpg',
            'img/products/figures/marin-kitagawa-4.jpg',
            'img/products/figures/marin-kitagawa-5.jpg',
            'img/products/figures/marin-kitagawa-6.jpg',
            'img/products/figures/marin-kitagawa-7.jpg'
        ],
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

        images: [
            'img/products/figures/rei-1.jpg',
            'img/products/figures/rei-2.jpg',
            'img/products/figures/rei-3.jpg',
            'img/products/figures/rei-4.jpg',
            'img/products/figures/rei-5.jpg',
        ],
        height: "20 см",
        character: "Рей Аянами / Rei Ayanami",
        source: "Евангелион / Evangelion",
        manufacturer: "TAITO",
    },

    {
        id: 20,
        name: 'Nino Nakano',
        category: 'figures',
        categoryName: 'Фигурки',
        price: 2800,

        images: [
            'img/products/figures/nino-1.jpg',
            'img/products/figures/nino-2.jpg',
            'img/products/figures/nino-3.jpg',
            'img/products/figures/nino-4.jpg',
            'img/products/figures/nino-5.jpg',
        ],
        height: "20 см",
        character: "Нино Накано / Nino Nakano",
        source: "Пять Невест / The Quintessential Quintuplets",
        manufacturer: "TAITO",

        description: "Prime 1 Studio"
    },






















];