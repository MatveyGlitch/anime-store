// ======================================================
// СТРАНИЦА КОРЗИНЫ
// cart.html
// ======================================================

(() => {

    const CART_KEY = "animeStoreCart";

    let discountRate = 0;


    // ==================================================
    // Получение корзины
    // ==================================================

    function getCartItems() {

        try {

            const storedCart =
                JSON.parse(localStorage.getItem(CART_KEY)) || [];

            if (!Array.isArray(storedCart)) {
                return [];
            }


            const normalizedCart = [];


            storedCart.forEach(item => {

                // Если когда-либо в корзине хранился просто ID
                if (
                    typeof item === "number" ||
                    typeof item === "string"
                ) {

                    normalizedCart.push({
                        id: Number(item),
                        quantity: 1
                    });

                    return;
                }


                // Нормальный вариант
                if (item && typeof item === "object") {

                    normalizedCart.push({
                        id: Number(item.id ?? item.productId),
                        quantity: Math.max(
                            1,
                            Number(item.quantity ?? item.qty ?? 1)
                        )
                    });
                }

            });


            // Объединяем одинаковые товары

            const combined = new Map();


            normalizedCart.forEach(item => {

                if (!Number.isFinite(item.id)) {
                    return;
                }


                const currentQuantity =
                    combined.get(item.id) || 0;


                combined.set(
                    item.id,
                    currentQuantity + item.quantity
                );

            });


            return Array.from(
                combined,
                ([id, quantity]) => ({
                    id,
                    quantity
                })
            );

        }
        catch (error) {

            console.error(
                "Ошибка чтения корзины:",
                error
            );

            return [];
        }
    }


    // ==================================================
    // Сохранение корзины
    // ==================================================

    function saveCartItems(cart) {

        localStorage.setItem(
            CART_KEY,
            JSON.stringify(cart)
        );


        updateCartCounter();
    }


    // ==================================================
    // Поиск товара
    // ==================================================

    function findProduct(productId) {

        if (typeof PRODUCTS === "undefined") {
            return null;
        }


        return PRODUCTS.find(
            product => product.id === productId
        ) || null;
    }


    // ==================================================
    // Главное изображение товара
    // ==================================================

    function getProductImage(product) {

        if (
            Array.isArray(product.images) &&
            product.images.length > 0
        ) {
            return product.images[0];
        }


        if (Array.isArray(product.image)) {
            return product.image[0] || "";
        }


        return product.image || "";
    }


    // ==================================================
    // Форматирование цены
    // ==================================================

    function formatCartPrice(price) {

        return new Intl.NumberFormat("ru-RU")
            .format(price) + " ₽";
    }


    // ==================================================
    // Счётчик корзины в Header
    // ==================================================

    function updateCartCounter() {

        const cart =
            getCartItems();


        const count =
            cart.reduce(
                (sum, item) =>
                    sum + item.quantity,
                0
            );


        document
            .querySelectorAll(".cart-link__count")
            .forEach(counter => {

                counter.textContent = count;

            });
    }


    // ==================================================
    // Создание строки товара
    // ==================================================

    function createCartRow(product, quantity) {

        const image =
            getProductImage(product);


        const itemTotal =
            product.price * quantity;


        return `
            <tr data-cart-row="${product.id}">

                <td>

                    <div class="cart-product">

                        <a
                            class="cart-product__image"
                            href="product.html?id=${product.id}"
                        >

                            <img
                                src="${image}"
                                alt="${product.name}"
                            >

                        </a>


                        <div class="cart-product__info">

                            <h2>

                                <a href="product.html?id=${product.id}">
                                    ${product.name}
                                </a>

                            </h2>


                            <p>
                                ${product.categoryName || ""}
                            </p>

                        </div>

                    </div>

                </td>


                <td class="cart-item-price">
                    ${formatCartPrice(product.price)}
                </td>


                <td>

                    <div class="cart-quantity">

                        <button
                            class="cart-quantity__button"
                            type="button"
                            data-cart-action="minus"
                            data-product-id="${product.id}"
                            aria-label="Уменьшить количество"
                        >
                            −
                        </button>


                        <input
                            class="cart-quantity__input"
                            type="number"
                            min="1"
                            max="99"
                            value="${quantity}"
                            data-cart-quantity="${product.id}"
                            aria-label="Количество товара"
                        >


                        <button
                            class="cart-quantity__button"
                            type="button"
                            data-cart-action="plus"
                            data-product-id="${product.id}"
                            aria-label="Увеличить количество"
                        >
                            +
                        </button>

                    </div>

                </td>


                <td class="cart-shipping">
                    Бесплатно
                </td>


                <td class="cart-item-total">
                    ${formatCartPrice(itemTotal)}
                </td>


                <td>

                    <button
                        class="cart-remove"
                        type="button"
                        data-cart-remove="${product.id}"
                        aria-label="Удалить ${product.name}"
                    >
                        ×
                    </button>

                </td>

            </tr>
        `;
    }


    // ==================================================
    // Подсчёт стоимости
    // ==================================================

    function calculateSubtotal(cart) {

        return cart.reduce(
            (total, item) => {

                const product =
                    findProduct(item.id);


                if (!product) {
                    return total;
                }


                return total +
                    product.price * item.quantity;

            },
            0
        );
    }


    // ==================================================
    // Обновление итогов
    // ==================================================

    function updateCartTotals(cart) {

        const subtotal =
            calculateSubtotal(cart);


        const discount =
            Math.round(
                subtotal * discountRate
            );


        const total =
            subtotal - discount;


        const subtotalElement =
            document.getElementById(
                "cart-subtotal"
            );

        const discountElement =
            document.getElementById(
                "cart-discount"
            );

        const totalElement =
            document.getElementById(
                "cart-total"
            );


        if (subtotalElement) {
            subtotalElement.textContent =
                formatCartPrice(subtotal);
        }


        if (discountElement) {
            discountElement.textContent =
                discount > 0
                    ? "− " + formatCartPrice(discount)
                    : "0 ₽";
        }


        if (totalElement) {
            totalElement.textContent =
                formatCartPrice(total);
        }
    }


    // ==================================================
    // Отрисовка корзины
    // ==================================================

    function renderCart() {

        const container =
            document.getElementById("cart-items");

        const emptyBlock =
            document.getElementById("cart-empty");

        const tableWrapper =
            document.querySelector(
                ".cart-table-wrapper"
            );

        const cartActions =
            document.querySelector(
                ".cart-actions"
            );

        const summary =
            document.querySelector(
                ".cart-summary-grid"
            );

        const checkoutButton =
            document.getElementById(
                "cart-checkout"
            );


        if (!container) {
            return;
        }


        let cart =
            getCartItems();


        // Удаляем из корзины ID товаров,
        // которых больше нет в products.js

        cart =
            cart.filter(item =>
                Boolean(findProduct(item.id))
            );


        saveCartItems(cart);


        // Пустая корзина

        if (cart.length === 0) {

            container.innerHTML = "";


            if (tableWrapper) {
                tableWrapper.hidden = true;
            }

            if (emptyBlock) {
                emptyBlock.hidden = false;
            }

            if (cartActions) {
                cartActions.hidden = true;
            }

            if (summary) {
                summary.hidden = true;
            }

            if (checkoutButton) {
                checkoutButton.classList.add(
                    "is-disabled"
                );
            }


            updateCartTotals([]);

            return;
        }


        // Есть товары

        if (tableWrapper) {
            tableWrapper.hidden = false;
        }

        if (emptyBlock) {
            emptyBlock.hidden = true;
        }

        if (cartActions) {
            cartActions.hidden = false;
        }

        if (summary) {
            summary.hidden = false;
        }

        if (checkoutButton) {
            checkoutButton.classList.remove(
                "is-disabled"
            );
        }


        container.innerHTML =
            cart
                .map(item => {

                    const product =
                        findProduct(item.id);


                    return createCartRow(
                        product,
                        item.quantity
                    );

                })
                .join("");


        updateCartTotals(cart);
    }


    // ==================================================
    // Изменение количества
    // ==================================================

    function changeQuantity(
        productId,
        difference
    ) {

        const cart =
            getCartItems();


        const item =
            cart.find(
                cartItem =>
                    cartItem.id === productId
            );


        if (!item) {
            return;
        }


        item.quantity =
            Math.max(
                1,
                Math.min(
                    99,
                    item.quantity + difference
                )
            );


        saveCartItems(cart);

        renderCart();
    }


    // ==================================================
    // Установка количества вручную
    // ==================================================

    function setQuantity(
        productId,
        quantity
    ) {

        const cart =
            getCartItems();


        const item =
            cart.find(
                cartItem =>
                    cartItem.id === productId
            );


        if (!item) {
            return;
        }


        item.quantity =
            Math.max(
                1,
                Math.min(
                    99,
                    Number(quantity) || 1
                )
            );


        saveCartItems(cart);

        renderCart();
    }


    // ==================================================
    // Удаление товара
    // ==================================================

    function removeFromCart(productId) {

        const cart =
            getCartItems()
                .filter(
                    item =>
                        item.id !== productId
                );


        saveCartItems(cart);

        renderCart();
    }


    // ==================================================
    // События таблицы
    // ==================================================

    function initCartEvents() {

        const container =
            document.getElementById(
                "cart-items"
            );


        if (!container) {
            return;
        }


        // Кнопки + / − / удалить

        container.addEventListener(
            "click",
            event => {

                const actionButton =
                    event.target.closest(
                        "[data-cart-action]"
                    );


                if (actionButton) {

                    const productId =
                        Number(
                            actionButton.dataset
                                .productId
                        );


                    const action =
                        actionButton.dataset
                            .cartAction;


                    if (action === "plus") {

                        changeQuantity(
                            productId,
                            1
                        );

                    }


                    if (action === "minus") {

                        changeQuantity(
                            productId,
                            -1
                        );

                    }

                    return;
                }


                const removeButton =
                    event.target.closest(
                        "[data-cart-remove]"
                    );


                if (removeButton) {

                    const productId =
                        Number(
                            removeButton.dataset
                                .cartRemove
                        );


                    removeFromCart(
                        productId
                    );
                }

            }
        );


        // Ручной ввод количества

        container.addEventListener(
            "change",
            event => {

                const input =
                    event.target.closest(
                        "[data-cart-quantity]"
                    );


                if (!input) {
                    return;
                }


                const productId =
                    Number(
                        input.dataset
                            .cartQuantity
                    );


                setQuantity(
                    productId,
                    input.value
                );

            }
        );
    }


    // ==================================================
    // Очистка всей корзины
    // ==================================================

    function initClearCart() {

        const button =
            document.getElementById(
                "cart-clear"
            );


        if (!button) {
            return;
        }


        button.addEventListener(
            "click",
            () => {

                localStorage.removeItem(
                    CART_KEY
                );


                discountRate = 0;

                renderCart();

            }
        );
    }


    // ==================================================
    // Промокод
    // ==================================================

    function initCoupon() {

        const form =
            document.getElementById(
                "coupon-form"
            );

        const input =
            document.getElementById(
                "coupon-code"
            );

        const message =
            document.getElementById(
                "coupon-message"
            );


        if (!form || !input || !message) {
            return;
        }


        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const code =
                    input.value
                        .trim()
                        .toUpperCase();


                message.classList.remove(
                    "is-success",
                    "is-error"
                );


                // Учебный промокод
                // Скидка 10%

                if (code === "ANIME10") {

                    discountRate = 0.10;

                    message.textContent =
                        "Промокод применён. Скидка 10%.";

                    message.classList.add(
                        "is-success"
                    );

                }
                else {

                    discountRate = 0;

                    message.textContent =
                        "Промокод не найден.";

                    message.classList.add(
                        "is-error"
                    );
                }


                updateCartTotals(
                    getCartItems()
                );

            }
        );
    }


    // ==================================================
    // Форма расчёта доставки
    // Пока демонстрационная
    // ==================================================

    function initShippingForm() {

        const form =
            document.querySelector(
                ".shipping-form"
            );


        if (!form) {
            return;
        }


        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();

            }
        );
    }


    // ==================================================
    // Запуск
    // ==================================================

    document.addEventListener(
        "DOMContentLoaded",
        () => {

            renderCart();

            initCartEvents();

            initClearCart();

            initCoupon();

            initShippingForm();

            updateCartCounter();

        }
    );

})();