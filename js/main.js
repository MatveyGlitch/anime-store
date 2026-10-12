// ======================================================
// ======================================================
// ОСНОВНОЙ JAVASCRIPT САЙТА
// ======================================================
// ======================================================



// ======================================================
// 1. КОРЗИНА
// ======================================================

function getCart() {

    const cart =
        localStorage.getItem('animeStoreCart');

    return cart
        ? JSON.parse(cart)
        : [];
}


function saveCart(cart) {

    localStorage.setItem(
        'animeStoreCart',
        JSON.stringify(cart)
    );
}


// ======================================================
// Счётчик товаров возле корзины
// ======================================================

function updateCartCounter() {

    const cart =
        getCart();


    const count =
        cart.reduce((total, item) => {

            return total + item.quantity;

        }, 0);


    const counter =
        document.querySelector(
            '.cart-link__count'
        );


    if (counter) {

        counter.textContent =
            count;

    }
}



// ======================================================
// 2. ДОБАВЛЕНИЕ ТОВАРА В КОРЗИНУ
// ======================================================

function addToCart(productId) {

    const cart =
        getCart();


    const existingItem =
        cart.find(item => {

            return item.id === productId;

        });


    if (existingItem) {

        existingItem.quantity += 1;

    }
    else {

        cart.push({

            id: productId,
            quantity: 1

        });

    }


    saveCart(cart);

    updateCartCounter();
}



// ======================================================
// 3. ФОРМАТ ЦЕНЫ
// ======================================================

function formatPrice(price) {

    return Number(price)
        .toLocaleString('ru-RU') + ' ₽';
}



// ======================================================
// 4. ПОЛУЧЕНИЕ ГЛАВНОЙ ФОТОГРАФИИ ТОВАРА
// ======================================================

function getProductImage(product) {

    // Новый вариант:
    // images: [...]

    if (
        Array.isArray(product.images) &&
        product.images.length > 0
    ) {

        return product.images[0];

    }


    // Поддержка старого варианта,
    // если где-то ещё осталось image: [...]

    if (Array.isArray(product.image)) {

        return product.image[0] || '';

    }


    // Старое одиночное изображение

    return product.image || '';
}



// ======================================================
// 5. HTML-КАРТОЧКА ТОВАРА
// Используется на Главной и в Каталоге
// ======================================================

function createProductCard(product) {

    const productImage =
        getProductImage(product);


    return `
        <article class="product-card">

            <div class="product-card__image">

                <a href="product.html?id=${product.id}">

                    <img
                        src="${productImage}"
                        alt="${product.name}"
                    >

                </a>


                <div class="product-card__overlay">

                    <button
                        class="product-card__cart"
                        type="button"
                        data-add-to-cart="${product.id}"
                    >
                        🛒 В корзину
                    </button>

                </div>

            </div>


            <div class="product-card__content">

                <span class="product-card__category">
                    ${product.categoryName}
                </span>


                <h3 class="product-card__title">

                    <a href="product.html?id=${product.id}">
                        ${product.name}
                    </a>

                </h3>


                <span class="product-card__price">
                    ${formatPrice(product.price)}
                </span>

            </div>

        </article>
    `;
}



// ======================================================
// ======================================================
// 6. ГЛАВНАЯ СТРАНИЦА
// index.html
// ======================================================
// ======================================================


// ======================================================
// Популярные товары
// ======================================================

function renderFeaturedProducts() {

    const container =
        document.querySelector(
            '#featured-products'
        );


    // Если мы не на Главной странице

    if (!container) {

        return;

    }


    // Выводим первые 8 товаров

    const featuredProducts =
        PRODUCTS.slice(0, 8);


    container.innerHTML =
        featuredProducts
            .map(createProductCard)
            .join('');
}



// ======================================================
// ======================================================
// 7. КАТАЛОГ
// catalog.html
// ======================================================
// ======================================================


// ======================================================
// Настройки каталога
// ======================================================

let catalogCategory = 'all';

let catalogSearch = '';

let catalogSort = 'default';

// Максимальная цена,
// выбранная ползунком

let catalogMaxPrice = Infinity;



// ======================================================
// 7.1 ВЫВОД ТОВАРОВ КАТАЛОГА
// ======================================================

function renderCatalogProducts() {

    const container =
        document.querySelector(
            '#catalog-products'
        );


    // Если мы не на странице Каталога

    if (!container) {

        return;

    }


    // Создаём копию массива,
    // чтобы сортировка не меняла PRODUCTS

    let products =
        [...PRODUCTS];



    // --------------------------------------------------
    // ФИЛЬТР ПО КАТЕГОРИИ
    // --------------------------------------------------

    if (catalogCategory !== 'all') {

        products =
            products.filter(product => {

                return (
                    product.category ===
                    catalogCategory
                );

            });

    }



    // --------------------------------------------------
    // ФИЛЬТР ПО ПОИСКУ
    // --------------------------------------------------

    if (catalogSearch !== '') {

        const search =
            catalogSearch.toLowerCase();


        products =
            products.filter(product => {

                return product.name
                    .toLowerCase()
                    .includes(search);

            });

    }



    // --------------------------------------------------
    // ФИЛЬТР ПО ЦЕНЕ
    // --------------------------------------------------

    products =
        products.filter(product => {

            return (
                Number(product.price) <=
                catalogMaxPrice
            );

        });



    // --------------------------------------------------
    // СОРТИРОВКА
    // --------------------------------------------------

    if (catalogSort === 'price-asc') {

        products.sort((a, b) => {

            return a.price - b.price;

        });

    }


    if (catalogSort === 'price-desc') {

        products.sort((a, b) => {

            return b.price - a.price;

        });

    }


    if (catalogSort === 'name-asc') {

        products.sort((a, b) => {

            return a.name.localeCompare(
                b.name,
                'ru'
            );

        });

    }



    // --------------------------------------------------
    // СОЗДАЁМ КАРТОЧКИ
    // --------------------------------------------------

    container.innerHTML =
        products
            .map(createProductCard)
            .join('');



    // --------------------------------------------------
    // КОЛИЧЕСТВО НАЙДЕННЫХ ТОВАРОВ
    // --------------------------------------------------

    const counter =
        document.querySelector(
            '#catalog-count'
        );


    if (counter) {

        counter.textContent =
            products.length;

    }



    // --------------------------------------------------
    // ЕСЛИ НИЧЕГО НЕ НАЙДЕНО
    // --------------------------------------------------

    const emptyMessage =
        document.querySelector(
            '#catalog-empty'
        );


    if (emptyMessage) {

        emptyMessage.hidden =
            products.length !== 0;

    }
}



// ======================================================
// 7.2 ЧТЕНИЕ ПАРАМЕТРОВ ИЗ URL
// ======================================================

function loadCatalogParameters() {

    const catalog =
        document.querySelector(
            '#catalog-products'
        );


    if (!catalog) {

        return;

    }


    const params =
        new URLSearchParams(
            window.location.search
        );


    const category =
        params.get('category');

    const search =
        params.get('search');



    // --------------------------------------------------
    // Категория
    // --------------------------------------------------

    const allowedCategories = [

        'figures',
        'clothes',
        'manga'

    ];


    if (
        category &&
        allowedCategories.includes(category)
    ) {

        catalogCategory =
            category;

    }



    // --------------------------------------------------
    // Поиск из шапки
    // --------------------------------------------------

    if (search) {

        catalogSearch =
            search;


        const searchInput =
            document.querySelector(
                '#catalog-search'
            );


        if (searchInput) {

            searchInput.value =
                search;

        }

    }



    // --------------------------------------------------
    // Выделяем активную категорию
    // --------------------------------------------------

    const filters =
        document.querySelectorAll(
            '[data-category-filter]'
        );


    filters.forEach(button => {

        const buttonCategory =
            button.dataset.categoryFilter;


        button.classList.toggle(

            'is-active',

            buttonCategory ===
            catalogCategory

        );

    });
}



// ======================================================
// 7.3 КНОПКИ "В КОРЗИНУ"
// ======================================================

function initCartButtons() {

    document.addEventListener(
        'click',
        event => {

            const button =
                event.target.closest(
                    '[data-add-to-cart]'
                );


            if (!button) {

                return;

            }


            const productId =
                Number(
                    button.dataset.addToCart
                );


            addToCart(productId);



            // Небольшой визуальный отклик

            const originalText =
                button.textContent;


            button.textContent =
                'Добавлено';


            setTimeout(() => {

                button.textContent =
                    originalText;

            }, 1000);

        }
    );
}



// ======================================================
// 7.4 ФИЛЬТР КАТЕГОРИЙ
// ======================================================

function initCatalogFilters() {

    document.addEventListener(
        'click',
        event => {

            const filter =
                event.target.closest(
                    '[data-category-filter]'
                );


            if (!filter) {

                return;

            }


            catalogCategory =
                filter.dataset.categoryFilter;



            const filters =
                document.querySelectorAll(
                    '[data-category-filter]'
                );


            filters.forEach(button => {

                button.classList.remove(
                    'is-active'
                );

            });


            filter.classList.add(
                'is-active'
            );


            renderCatalogProducts();

        }
    );
}



// ======================================================
// 7.5 ПОИСК В КАТАЛОГЕ
// ======================================================

function initCatalogSearch() {

    const input =
        document.querySelector(
            '#catalog-search'
        );


    // Сейчас отдельного поля поиска
    // внутри Каталога может не быть.
    // Тогда функция просто ничего не делает.

    if (!input) {

        return;

    }


    input.addEventListener(
        'input',
        event => {

            catalogSearch =
                event.target.value.trim();


            renderCatalogProducts();

        }
    );
}



// ======================================================
// 7.6 СОРТИРОВКА
// ======================================================

function initCatalogSort() {

    const select =
        document.querySelector(
            '#catalog-sort'
        );


    if (!select) {

        return;

    }


    select.addEventListener(
        'change',
        event => {

            catalogSort =
                event.target.value;


            renderCatalogProducts();

        }
    );
}



// ======================================================
// 7.7 ФИЛЬТР ПО МАКСИМАЛЬНОЙ ЦЕНЕ
// ======================================================

function initCatalogPriceFilter() {

    // Поддерживаем как новый ID,
    // так и уже существующий класс

    const range =
        document.querySelector(
            '#catalog-price-range, .price-range'
        );


    if (!range) {

        return;

    }


    if (
        typeof PRODUCTS === 'undefined' ||
        PRODUCTS.length === 0
    ) {

        return;

    }



    // --------------------------------------------------
    // Находим самый дорогой товар
    // --------------------------------------------------

    const maxProductPrice =
        Math.max(
            ...PRODUCTS.map(product => {

                return Number(product.price);

            })
        );



    // --------------------------------------------------
    // Округляем максимум вверх
    //
    // Например:
    // 176 195 ₽ → 176 500 ₽
    // --------------------------------------------------

    const rangeMax =
        Math.ceil(
            maxProductPrice / 500
        ) * 500;



    // --------------------------------------------------
    // Минимум
    //
    // Если в HTML уже стоит 500,
    // оставляем его.
    // --------------------------------------------------

    let rangeMin =
        Number(range.min);


    if (
        !Number.isFinite(rangeMin) ||
        rangeMin < 0
    ) {

        rangeMin = 0;

    }



    // --------------------------------------------------
    // Настраиваем ползунок
    // --------------------------------------------------

    range.min =
        String(rangeMin);

    range.max =
        String(rangeMax);

    range.value =
        String(rangeMax);


    catalogMaxPrice =
        rangeMax;



    // --------------------------------------------------
    // Ищем подписи под ползунком
    // --------------------------------------------------

    const valuesContainer =
        range.parentElement
            ?.querySelector(
                '.price-range__values'
            );


    const minLabel =
        document.querySelector(
            '#catalog-price-min'
        )
        ||
        valuesContainer
            ?.querySelector(
                'span:first-child'
            );


    const currentLabel =
        document.querySelector(
            '#catalog-price-current'
        )
        ||
        valuesContainer
            ?.querySelector(
                'span:last-child'
            );



    // --------------------------------------------------
    // Показываем значения
    // --------------------------------------------------

    if (minLabel) {

        minLabel.textContent =
            formatPrice(rangeMin);

    }


    if (currentLabel) {

        currentLabel.textContent =
            formatPrice(rangeMax);

    }



    // --------------------------------------------------
    // Движение ползунка
    // --------------------------------------------------

    range.addEventListener(
        'input',
        () => {

            catalogMaxPrice =
                Number(range.value);


            if (currentLabel) {

                currentLabel.textContent =
                    formatPrice(
                        catalogMaxPrice
                    );

            }


            // Обновляем каталог сразу,
            // пока пользователь двигает ползунок

            renderCatalogProducts();

        }
    );
}



// ======================================================
// ======================================================
// 8. ЗАПУСК САЙТА
// ======================================================
// ======================================================

document.addEventListener(
    'DOMContentLoaded',
    () => {


        // ==================================================
        // Корзина
        // ==================================================

        updateCartCounter();

        initCartButtons();



        // ==================================================
        // Главная страница
        // ==================================================

        renderFeaturedProducts();



        // ==================================================
        // Каталог
        // ==================================================

        loadCatalogParameters();


        // Сначала настраиваем ползунок,
        // чтобы до первого вывода товаров
        // уже была известна максимальная цена.

        initCatalogPriceFilter();


        // После этого выводим товары

        renderCatalogProducts();


        // Остальные элементы каталога

        initCatalogFilters();

        initCatalogSearch();

        initCatalogSort();

    }
);