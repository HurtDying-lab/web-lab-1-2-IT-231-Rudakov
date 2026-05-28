// часы

function startClock() {
    var clockEl = document.getElementById('live-clock');
    if (!clockEl) return;
    function update() {
        var now = new Date();
        var h = String(now.getHours()).padStart(2, '0');
        var m = String(now.getMinutes()).padStart(2, '0');
        var s = String(now.getSeconds()).padStart(2, '0');
        clockEl.textContent = h + ':' + m + ':' + s;
    }
    update();
    setInterval(update, 1000); // таймер: раз в секунду
}

// валидация формы

function validateForm(event) {
    event.preventDefault();
    var errors = [];

    var nameVal = document.getElementById('name').value.trim();
    var phoneVal = document.getElementById('phone').value.trim();
    var emailEl = document.getElementById('email');
    var emailVal = emailEl ? emailEl.value.trim() : null;

    // реегулярные выражения (СТРОГИЕ ТРЕБОВАНИЯ)
    // Телефон: +7, 8 или 7 в начале, затем 10 цифр (допускаются пробелы, дефисы, скобки)
    var rePhone = /^(\+7|8|7)[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;

    // Email: буквы/цифры/точка/дефис в начале, @, домен, ., расширение (только буквы)
    var reEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}$/i;

    var reName = /^[А-ЯЁа-яёA-Za-z\s\-]{2,50}$/;

    clearErrors();

    if (!reName.test(nameVal)) {
        showError('name', 'Введите корректное имя (только буквы, 2–50 символов)');
        errors.push('name');
    }
    if (!rePhone.test(phoneVal)) {
        showError('phone', 'Телефон должен начинаться с +7, 8 или 7 и содержать 10 цифр (ХХХ-ХХХ-ХХ-ХХ)');
        errors.push('phone');
    }
    if (emailVal !== null && emailVal !== '' && !reEmail.test(emailVal)) {
        showError('email', 'Email должен быть формата: ххх@домен.расширение (только буквы в начале и расширении: .ru, .com и т.д.)');
        errors.push('email');
    }

    if (errors.length === 0) {
        var msg = document.getElementById('form-success');
        if (msg) {
            msg.style.display = 'block';
            msg.textContent = 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.';
        }
    }
}

function showError(fieldId, message) {
    var field = document.getElementById(fieldId);
    if (!field) return;
    field.style.borderColor = '#e00';
    field.style.backgroundColor = '#fff0f0';
    var errEl = document.createElement('p');
    errEl.className = 'field-error';
    errEl.style.color = '#e00';
    errEl.style.margin = '2px 0 8px';
    errEl.style.fontSize = '13px';
    errEl.textContent = message;
    field.parentNode.insertBefore(errEl, field.nextSibling);
}

function clearErrors() {
    document.querySelectorAll('.field-error').forEach(function (el) { el.remove(); });
    document.querySelectorAll('input, textarea, select').forEach(function (f) {
        f.style.borderColor = '';
        f.style.backgroundColor = '';
    });
    var msg = document.getElementById('form-success');
    if (msg) msg.style.display = 'none';
}

// hover эффект на карточках (mouseenter / mouseleave)
function initHoverImages() {
    var cards = document.querySelectorAll('.car-card');
    cards.forEach(function (card) {
        var img = card.querySelector('img');
        if (!img) return;
        // mouseenter
        card.addEventListener('mouseenter', function () {
            img.style.opacity = '0.82';
            img.style.transform = 'scale(1.04)';
            img.style.transition = 'all 0.3s ease';
        });
        // mouseleave
        card.addEventListener('mouseleave', function () {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        });
    });
}

// tooltip 
function initTooltips() {
    var elements = document.querySelectorAll('[data-tooltip]');
    elements.forEach(function (el) {
        var tip = document.createElement('span');
        tip.className = 'tooltip-box';
        tip.textContent = el.getAttribute('data-tooltip');
        tip.style.cssText = 'display:none;position:absolute;background:#1c1c1c;color:#fff;' +
            'padding:6px 10px;border-radius:4px;font-size:13px;z-index:9999;white-space:nowrap;' +
            'bottom:100%;left:50%;transform:translateX(-50%);margin-bottom:6px;';
        el.style.position = 'relative';
        el.appendChild(tip);
        el.addEventListener('mouseover', function () { tip.style.display = 'block'; });
        el.addEventListener('mouseout', function () { tip.style.display = 'none'; });
    });
}

// смена заголовка
var originalTitle = document.title;
document.addEventListener('visibilitychange', function () {
    document.title = document.hidden ? '⚡ Вернитесь к нам!' : originalTitle;
});

// анимация скрола
function initScrollReveal() {
    var items = document.querySelectorAll('.reveal-on-scroll');
    function check() {
        items.forEach(function (item) {
            if (item.getBoundingClientRect().top < window.innerHeight - 60) {
                item.classList.add('revealed');
            }
        });
    }
    window.addEventListener('scroll', check);
    check();
}

// счётчик символов инпута
function initCharCounter() {
    var textarea = document.getElementById('comment');
    var counter = document.getElementById('char-counter');
    if (!textarea || !counter) return;
    var maxLen = 300;
    textarea.addEventListener('input', function () {
        var left = maxLen - textarea.value.length;
        counter.textContent = 'Осталось символов: ' + left;
        counter.style.color = left < 20 ? '#e00' : '#555';
    });
}

// кнпока "наверх"
function initScrollTop() {
    var btn = document.getElementById('scroll-top-btn');
    if (!btn) return;
    window.addEventListener('scroll', function () {
        btn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
    btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// 9. ВЫПАДАЮЩЕЕ МЕНЮ (mouseenter / mouseleave)
function initDropdown() {
    var parent = document.querySelector('.menu-item-dropdown');
    if (!parent) return;
    var sub = parent.querySelector('.submenu');
    if (!sub) return;
    parent.addEventListener('mouseenter', function () { sub.style.display = 'block'; });
    parent.addEventListener('mouseleave', function () { sub.style.display = 'none'; });
}

// двойной клик на лого = приветсвие
function initLogoDblClick() {
    var logo = document.querySelector('.logo');
    if (!logo) return;
    logo.addEventListener('dblclick', function () {
        var today = new Date().toLocaleDateString('ru-RU');
        alert('Добро пожаловать в официальный дилерский центр BMW!\nСегодня: ' + today);
    });
}

// math используется для расчёта мощности в кВт
function calcPower(hp) {
    return Math.round(hp * 0.7355);
}

// ================== СЛАЙДЕР БАННЕРОВ ==================

var bannerState = {
    currentSlide: 0,
    totalSlides: 2
};

function initBannerSlider() {
    var slides = document.querySelectorAll('.banner-slide');
    var bullets = document.querySelectorAll('.bullet');
    var prevBtn = document.getElementById('banner-prev');
    var nextBtn = document.getElementById('banner-next');

    if (slides.length === 0) return;

    bannerState.totalSlides = slides.length;

    // Обработчики кликов на стрелки
    if (prevBtn) {
        prevBtn.addEventListener('click', function () { changeBannerSlide(-1); });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', function () { changeBannerSlide(1); });
    }

    // Обработчики кликов на bullets
    bullets.forEach(function (bullet, index) {
        bullet.addEventListener('click', function () {
            goToBannerSlide(index);
        });
    });

    // Автоматическое переключение каждые 5 секунд
    setInterval(function () {
        changeBannerSlide(1);
    }, 5000);
}

function changeBannerSlide(direction) {
    var newSlide = bannerState.currentSlide + direction;

    if (newSlide < 0) {
        newSlide = bannerState.totalSlides - 1;
    } else if (newSlide >= bannerState.totalSlides) {
        newSlide = 0;
    }

    goToBannerSlide(newSlide);
}

function goToBannerSlide(slideIndex) {
    var slides = document.querySelectorAll('.banner-slide');
    var bullets = document.querySelectorAll('.bullet');

    slides.forEach(function (slide) {
        slide.classList.remove('active');
    });
    bullets.forEach(function (bullet) {
        bullet.classList.remove('active');
    });

    slides[slideIndex].classList.add('active');
    bullets[slideIndex].classList.add('active');

    bannerState.currentSlide = slideIndex;
}

// ================== ЛОКАЛЬНОЕ ХРАНИЛИЩЕ ==================

var DEFAULT_BANNER_TEXTS = {
    '1-1': 'Профессиональное обслуживание и диагностика',
    '1-2': 'Официальная гарантия на все работы',
    '1-3': 'Без очередей и задержек',
    '2-1': 'Кредит под 0% в течение первого года',
    '2-2': 'Решение за 2 часа',
    '2-3': 'Программы лизинга от 12 месяцев'
};

function loadBannerTextsFromStorage() {
    var stored = localStorage.getItem('bannerTexts');
    var texts = stored ? JSON.parse(stored) : DEFAULT_BANNER_TEXTS;

    Object.keys(texts).forEach(function (blockId) {
        var elements = document.querySelectorAll('[data-block-id="' + blockId + '"]');
        elements.forEach(function (el) {
            el.textContent = texts[blockId];
        });
    });
}

function saveBannerTextsToStorage(texts) {
    localStorage.setItem('bannerTexts', JSON.stringify(texts));
}

function initBannerEditor() {
    var inputs = document.querySelectorAll('.editor-input');
    var saveBtn = document.getElementById('save-banner-texts');
    var resetBtn = document.getElementById('reset-banner-texts');

    if (!saveBtn) return;

    // Загрузить текущие значения в форму
    var stored = localStorage.getItem('bannerTexts');
    var texts = stored ? JSON.parse(stored) : DEFAULT_BANNER_TEXTS;

    inputs.forEach(function (input) {
        var blockId = input.getAttribute('data-block-id');
        input.value = texts[blockId] || '';
    });

    // Сохранение
    saveBtn.addEventListener('click', function () {
        var newTexts = {};
        inputs.forEach(function (input) {
            var blockId = input.getAttribute('data-block-id');
            newTexts[blockId] = input.value.trim() || DEFAULT_BANNER_TEXTS[blockId];
        });

        saveBannerTextsToStorage(newTexts);
        loadBannerTextsFromStorage();

        alert('Текст баннеров успешно обновлён!');
    });

    // Сброс на стандартные
    if (resetBtn) {
        resetBtn.addEventListener('click', function () {
            if (confirm('Вы уверены? Все изменения будут отменены.')) {
                localStorage.removeItem('bannerTexts');
                loadBannerTextsFromStorage();

                inputs.forEach(function (input) {
                    var blockId = input.getAttribute('data-block-id');
                    input.value = DEFAULT_BANNER_TEXTS[blockId];
                });

                alert('Текст восстановлен!');
            }
        });
    }
}

// инициализация DOM
document.addEventListener('DOMContentLoaded', function () {
    startClock();
    initHoverImages();
    initTooltips();
    initScrollReveal();
    initCharCounter();
    initScrollTop();
    initDropdown();
    initLogoDblClick();

    // Слайдер баннеров
    initBannerSlider();
    loadBannerTextsFromStorage();
    initBannerEditor();

    var form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', validateForm);
    }
});
