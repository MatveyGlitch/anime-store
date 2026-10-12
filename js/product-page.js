// ======================================================
// СТРАНИЦА ТОВАРА
// product.html
// ======================================================


// ------------------------------------------------------
// Получение ID товара из адреса
// product.html?id=1
// ------------------------------------------------------

function getCurrentProductId() {
    const params = new URLSearchParams(window.location.search);

    return Number(params.get("id"));
}


// ------------------------------------------------------
// Получение изображений товара
// Поддерживает как старое поле image,
// так и новое поле images
// ------------------------------------------------------

function getProductImages(product) {
    if (Array.isArray(product.images) && product.images.length > 0) {
        return product.images;
    }

    if (product.image) {
        return [product.image];
    }

    return [];
}


// ------------------------------------------------------
// Название категории
// ------------------------------------------------------

function getCategoryName(product) {
    if (product.categoryName) {
        return product.categoryName;
    }

    switch (product.category) {
        case "figures":
            return "Фигурки";

        case "clothes":
            return "Одежда";

        case "manga":
            return "Манга";

        default:
            return "Товары";
    }
}


// ------------------------------------------------------
// Форматирование цены
// ------------------------------------------------------

function formatProductPrice(price) {
    return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
}


// ------------------------------------------------------
// Описание товара
// ------------------------------------------------------

function getProductDescription(product) {
    if (product.description) {
        return product.description;
    }

    switch (product.category) {
        case "figures":
            return `Коллекционная фигурка персонажа ${product.character || "из популярной серии"} ` +
                `по мотивам ${product.source || "аниме и манги"}. ` +
                `Подойдёт для коллекции, оформления интерьера или в качестве подарка поклоннику.`;

        case "clothes":
            return "Одежда с дизайном по мотивам любимых персонажей и произведений. "
                + "Подходит для повседневной носки.";

        case "manga":
            return "Печатное издание манги для поклонников оригинальной истории. "
                + "Подходит как для чтения, так и для коллекции.";

        default:
            return "Товар из ассортимента ANI STORE.";
    }
}


// ------------------------------------------------------
// Характеристики
// ------------------------------------------------------

function getProductCharacteristics(product) {

    // Если характеристики уже прописаны в products.js
    if (
        Array.isArray(product.characteristics) &&
        product.characteristics.length > 0
    ) {
        return product.characteristics;
    }


    // Стандартные характеристики
    if (product.category === "figures") {
        return [
            {
                name: "Категория",
                value: "Коллекционная фигурка"
            },
            {
                name: "Высота",
                value: product.height || "Не указана"
            },
            {
                name: "Персонаж",
                value: product.character || "Не указан"
            },
            {
                name: "Источник",
                value: product.source || "Не указан"
            },
            {
                name: "Производитель",
                value: product.manufacturer || "Не указан"
            }
        ];
    }


    if (product.category === "clothes") {

        return [
            {
                name: "Категория",
                value: "Одежда"
            },
            {
                name: "Размеры",
                value: product.sizes || "S / M / L / XL"
            },
            {
                name: "Материал",
                value: product.material || "Хлопок"
            }
        ];
    }


    if (product.category === "manga") {

        return [
            {
                name: "Категория",
                value: "Манга"
            },
            {
                name: "Том",
                value: product.volume || "1"
            },
            {
                name: "Язык",
                value: product.language || "Русский"
            }
        ];
    }


    return [
        {
            name: "Категория",
            value: getCategoryName(product)
        }
    ];
}


// ------------------------------------------------------
// Вывод характеристик
// ------------------------------------------------------

function renderProductCharacteristics(product) {

    const container =
        document.getElementById("product-characteristics");

    if (!container) {
        return;
    }


    const characteristics =
        getProductCharacteristics(product);


    container.innerHTML =
        characteristics
            .map(characteristic => {

                return `
                    <div class="product-characteristic">

                        <span class="product-characteristic__name">
                            ${characteristic.name}:
                        </span>

                        <span class="product-characteristic__value">
                            ${characteristic.value}
                        </span>

                    </div>
                `;

            })
            .join("");
}


// ------------------------------------------------------
// Галерея
// ------------------------------------------------------

function renderProductGallery(product) {

    const mainImage =
        document.getElementById("product-main-image");

    const thumbnails =
        document.getElementById("product-thumbnails");


    if (!mainImage || !thumbnails) {
        return;
    }


    const images = getProductImages(product);


    if (images.length === 0) {
        return;
    }


    mainImage.src = images[0];
    mainImage.alt = product.name;


    thumbnails.innerHTML =
        images
            .map((image, index) => {

                return `
                    <button
                        class="product-thumbnail ${index === 0 ? "is-active" : ""}"
                        type="button"
                        data-product-image="${image}"
                        aria-label="Фотография ${index + 1}"
                    >

                        <img
                            src="${image}"
                            alt="${product.name}"
                        >

                    </button>
                `;

            })
            .join("");


    thumbnails
        .querySelectorAll(".product-thumbnail")
        .forEach(button => {

            button.addEventListener("click", () => {

                const image =
                    button.dataset.productImage;


                mainImage.src = image;


                thumbnails
                    .querySelectorAll(".product-thumbnail")
                    .forEach(item => {
                        item.classList.remove("is-active");
                    });


                button.classList.add("is-active");

            });

        });
}


// ------------------------------------------------------
// Карточка похожего товара
// ------------------------------------------------------

function createRelatedProductCard(product) {

    const images = getProductImages(product);

    const image =
        images.length > 0 ? images[0] : "";


    return `
        <article class="product-card">

            <div class="product-card__image">

                <a href="product.html?id=${product.id}">

                    <img
                        src="${image}"
                        alt="${product.name}"
                    >

                </a>


                <div class="product-card__overlay">

                    <a
                        class="product-card__cart"
                        href="product.html?id=${product.id}"
                    >
                        Подробнее
                    </a>

                </div>

            </div>


            <div class="product-card__content">

                <span class="product-card__category">
                    ${getCategoryName(product)}
                </span>


                <h3 class="product-card__title">

                    <a href="product.html?id=${product.id}">
                        ${product.name}
                    </a>

                </h3>


                <span class="product-card__price">
                    ${formatProductPrice(product.price)}
                </span>

            </div>

        </article>
    `;
}


// ------------------------------------------------------
// Похожие товары
// Только та же категория
// ------------------------------------------------------

function renderRelatedProducts(currentProduct) {

    const container =
        document.getElementById("related-products");


    if (!container) {
        return;
    }


    const relatedProducts =
        PRODUCTS
            .filter(product =>
                product.category === currentProduct.category &&
                product.id !== currentProduct.id
            )
            .slice(0, 4);


    if (relatedProducts.length === 0) {

        container.innerHTML = `
            <p>
                Похожих товаров пока нет.
            </p>
        `;

        return;
    }


    container.innerHTML =
        relatedProducts
            .map(createRelatedProductCard)
            .join("");
}


// ------------------------------------------------------
// Количество товара
// ------------------------------------------------------

function initProductQuantity() {

    const input =
        document.getElementById("product-quantity");

    const minus =
        document.getElementById("quantity-minus");

    const plus =
        document.getElementById("quantity-plus");


    if (!input || !minus || !plus) {
        return;
    }


    minus.addEventListener("click", () => {

        const currentValue =
            Number(input.value) || 1;


        input.value =
            Math.max(1, currentValue - 1);

    });


    plus.addEventListener("click", () => {

        const currentValue =
            Number(input.value) || 1;


        input.value =
            Math.min(99, currentValue + 1);

    });


    input.addEventListener("change", () => {

        let value =
            Number(input.value) || 1;


        value =
            Math.max(1, Math.min(99, value));


        input.value = value;

    });
}


// ------------------------------------------------------
// Кнопка добавления товара в корзину
// ------------------------------------------------------

function initProductAddToCart(product) {

    const button =
        document.getElementById("product-add-cart");

    const quantityInput =
        document.getElementById("product-quantity");


    if (!button || !quantityInput) {
        return;
    }


    button.addEventListener("click", () => {

        const quantity =
            Number(quantityInput.value) || 1;


        // Используем уже существующую функцию
        // из main.js

        if (typeof addToCart === "function") {

            for (let i = 0; i < quantity; i++) {
                addToCart(product.id);
            }

        }

    });
}


// ------------------------------------------------------
// Вывод товара
// ------------------------------------------------------

function renderProductPage() {

    if (typeof PRODUCTS === "undefined" || PRODUCTS.length === 0) {
        return;
    }


    const productId =
        getCurrentProductId();


    let product =
        PRODUCTS.find(item => item.id === productId);


    // Если ID отсутствует или ошибочный,
    // показываем первый товар

    if (!product) {
        product = PRODUCTS[0];
    }


    const categoryName =
        getCategoryName(product);


    // Заголовок вкладки

    document.title =
        `${product.name} — ANI STORE`;

    // SEO-описание страницы товара

    const metaDescription =
        document.querySelector(
            'meta[name="description"]'
        );


    if (metaDescription) {

        metaDescription.content =
            `${product.name} в ANI STORE. Цена ${formatProductPrice(product.price)}. Описание, характеристики и фотографии товара.`;

    }

    // Хлебные крошки

    const breadcrumbCategory =
        document.getElementById("product-breadcrumb-category");

    const breadcrumbName =
        document.getElementById("product-breadcrumb-name");


    breadcrumbCategory.textContent =
        categoryName;

    breadcrumbCategory.href =
        `catalog.html?category=${product.category}`;

    breadcrumbName.textContent =
        product.name;


    // Категория

    document.getElementById("product-category").textContent =
        categoryName;


    // Название

    document.getElementById("product-name").textContent =
        product.name;


    // Описание

    document.getElementById("product-description").textContent =
        getProductDescription(product);


    // Цена

    document.getElementById("product-price").textContent =
        formatProductPrice(product.price);


    // Остальные блоки

    renderProductGallery(product);

    renderProductCharacteristics(product);

    renderRelatedProducts(product);

    initProductQuantity();

    initProductAddToCart(product);
}


// ------------------------------------------------------
// Запуск
// ------------------------------------------------------

document.addEventListener(
    "DOMContentLoaded",
    renderProductPage
);