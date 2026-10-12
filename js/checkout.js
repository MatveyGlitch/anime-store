// ======================================================
// СТРАНИЦА ОФОРМЛЕНИЯ ЗАКАЗА
// checkout.html
// ======================================================

(() => {

    const CART_KEY = "animeStoreCart";


    // ==================================================
    // Получение корзины
    // ==================================================

    function getCheckoutCart() {

        try {

            const storedCart =
                JSON.parse(
                    localStorage.getItem(CART_KEY)
                ) || [];


            if (!Array.isArray(storedCart)) {
                return [];
            }


            const normalizedCart = [];


            storedCart.forEach(item => {

                // Старый вариант:
                // в корзине хранится только ID

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


                // Нормальный объект корзины

                if (item && typeof item === "object") {

                    normalizedCart.push({

                        id: Number(
                            item.id ??
                            item.productId
                        ),

                        quantity: Math.max(
                            1,
                            Number(
                                item.quantity ??
                                item.qty ??
                                1
                            )
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
    // Поиск товара
    // ==================================================

    function findCheckoutProduct(productId) {

        if (typeof PRODUCTS === "undefined") {
            return null;
        }


        return PRODUCTS.find(
            product =>
                product.id === productId
        ) || null;
    }


    // ==================================================
    // Изображение товара
    // ==================================================

    function getCheckoutProductImage(product) {

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

    function formatCheckoutPrice(price) {

        return new Intl.NumberFormat("ru-RU")
            .format(price) + " ₽";
    }


    // ==================================================
    // Счётчик корзины в Header
    // ==================================================

    function updateCheckoutCartCounter() {

        const cart =
            getCheckoutCart();


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
    // Общая сумма заказа
    // ==================================================

    function calculateCheckoutTotal(cart) {

        return cart.reduce(
            (total, item) => {

                const product =
                    findCheckoutProduct(item.id);


                if (!product) {
                    return total;
                }


                return total +
                    product.price *
                    item.quantity;

            },
            0
        );
    }


    // ==================================================
    // Карточка товара в проверке заказа
    // ==================================================

    function createCheckoutOrderItem(
        product,
        quantity
    ) {

        const image =
            getCheckoutProductImage(product);


        const total =
            product.price * quantity;


        return `
            <article class="checkout-order-item">

                <a
                    class="checkout-order-item__image"
                    href="product.html?id=${product.id}"
                >

                    <img
                        src="${image}"
                        alt="${product.name}"
                    >

                </a>


                <div class="checkout-order-item__info">

                    <h3>

                        <a href="product.html?id=${product.id}">
                            ${product.name}
                        </a>

                    </h3>


                    <p>
                        ${product.categoryName || ""}
                        ·
                        Количество: ${quantity}
                    </p>

                </div>


                <div class="checkout-order-item__price">
                    ${formatCheckoutPrice(total)}
                </div>

            </article>
        `;
    }


    // ==================================================
    // Вывод заказа
    // ==================================================

    function renderCheckoutOrder() {

        const form =
            document.getElementById(
                "checkout-form"
            );

        const empty =
            document.getElementById(
                "checkout-empty"
            );

        const success =
            document.getElementById(
                "checkout-success"
            );

        const orderContainer =
            document.getElementById(
                "checkout-order"
            );


        if (!form || !empty || !orderContainer) {
            return;
        }


        let cart =
            getCheckoutCart();


        // Удаляем несуществующие товары

        cart =
            cart.filter(item =>
                Boolean(
                    findCheckoutProduct(item.id)
                )
            );


        // Пустая корзина

        if (cart.length === 0) {

            form.hidden = true;

            empty.hidden = false;


            if (success) {
                success.hidden = true;
            }


            updateCheckoutCartCounter();

            return;
        }


        form.hidden = false;

        empty.hidden = true;


        if (success) {
            success.hidden = true;
        }


        orderContainer.innerHTML =
            cart
                .map(item => {

                    const product =
                        findCheckoutProduct(
                            item.id
                        );


                    return createCheckoutOrderItem(
                        product,
                        item.quantity
                    );

                })
                .join("");


        const total =
            calculateCheckoutTotal(cart);


        const subtotalElement =
            document.getElementById(
                "checkout-subtotal"
            );

        const totalElement =
            document.getElementById(
                "checkout-total"
            );


        if (subtotalElement) {

            subtotalElement.textContent =
                formatCheckoutPrice(total);

        }


        if (totalElement) {

            totalElement.textContent =
                formatCheckoutPrice(total);

        }


        updateCheckoutCartCounter();
    }


    // ==================================================
    // Получатель
    // ==================================================

    function initRecipientToggle() {

        const checkbox =
            document.getElementById(
                "same-recipient"
            );

        const recipient =
            document.getElementById(
                "checkout-recipient"
            );

        const recipientName =
            document.getElementById(
                "recipient-name"
            );

        const recipientPhone =
            document.getElementById(
                "recipient-phone"
            );


        if (
            !checkbox ||
            !recipient ||
            !recipientName ||
            !recipientPhone
        ) {
            return;
        }


        function updateRecipient() {

            const sameRecipient =
                checkbox.checked;


            recipient.hidden =
                sameRecipient;


            recipientName.required =
                !sameRecipient;

            recipientPhone.required =
                !sameRecipient;


            // Скрытые поля отключаем,
            // чтобы браузер не пытался
            // их валидировать

            recipientName.disabled =
                sameRecipient;

            recipientPhone.disabled =
                sameRecipient;
        }


        checkbox.addEventListener(
            "change",
            updateRecipient
        );


        updateRecipient();
    }


    // ==================================================
    // Автоматически раскрываем раздел,
    // в котором находится поле с ошибкой
    // ==================================================

    function initValidationSteps() {

        const form =
            document.getElementById(
                "checkout-form"
            );


        if (!form) {
            return;
        }


        form.addEventListener(
            "invalid",
            event => {

                const step =
                    event.target.closest(
                        ".checkout-step"
                    );


                if (step) {
                    step.open = true;
                }

            },
            true
        );
    }


    // ==================================================
    // Формирование номера заказа
    // ==================================================

    function createOrderNumber() {

        const now = Date.now()
            .toString()
            .slice(-6);


        const random =
            Math.floor(
                10 + Math.random() * 90
            );


        return `#${now}${random}`;
    }


    // ==================================================
    // Оформление заказа
    // ==================================================

    function initCheckoutSubmit() {

        const form =
            document.getElementById(
                "checkout-form"
            );

        const success =
            document.getElementById(
                "checkout-success"
            );

        const orderNumber =
            document.getElementById(
                "checkout-order-number"
            );


        if (!form || !success || !orderNumber) {
            return;
        }


        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const cart =
                    getCheckoutCart();


                if (cart.length === 0) {
                    return;
                }


                // Если всё прошло validation HTML5,
                // оформляем учебный заказ

                const number =
                    createOrderNumber();


                orderNumber.textContent =
                    number;


                // Очищаем корзину

                localStorage.removeItem(
                    CART_KEY
                );


                // Прячем форму

                form.hidden = true;


                // Показываем сообщение

                success.hidden = false;


                // Обновляем счётчик корзины

                updateCheckoutCartCounter();


                // Прокручиваем страницу
                // к сообщению

                success.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }
        );
    }


    // ==================================================
    // Запуск страницы
    // ==================================================

    document.addEventListener(
        "DOMContentLoaded",
        () => {

            renderCheckoutOrder();

            initRecipientToggle();

            initValidationSteps();

            initCheckoutSubmit();

            updateCheckoutCartCounter();

        }
    );

})();