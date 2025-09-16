document.addEventListener('DOMContentLoaded', () => {
    const processSection = document.getElementById('process-section');
    if (!processSection) return;

    const stepsData = [
      {
        icon: "search",
        title: "Анализ и исследование",
        description: "Изучаем ваш бизнес, целевую аудиторию и конкурентов",
        details: [
          "Анализ текущих продаж и воронки",
          "Исследование целевой аудитории",
          "Конкурентный анализ",
          "Определение болей и потребностей"
        ],
        duration: "1-2 дня"
      },
      {
        icon: "users",
        title: "Поиск и верификация",
        description: "Находим контакты ваших потенциальных клиентов",
        details: [
          "Поиск целевых контактов в базах",
          "Верификация email адресов",
          "Сегментация по критериям",
          "Обогащение данными о компаниях"
        ],
        duration: "2-3 дня"
      },
      {
        icon: "lightbulb",
        title: "Создание контента",
        description: "Разрабатываем персонализированные сообщения",
        details: [
          "Написание цепочек писем",
          "Персонализация под сегменты",
          "A/B тестирование заголовков",
          "Создание лид-магнитов"
        ],
        duration: "3-5 дней"
      },
      {
        icon: "mail",
        title: "Запуск рассылок",
        description: "Настраиваем и запускаем автоматические последовательности",
        details: [
          "Настройка email платформ",
          "Прогрев доменов и ящиков",
          "Постепенное увеличение объемов",
          "Мониторинг доставляемости"
        ],
        duration: "1 день"
      },
      {
        icon: "bar-chart-3",
        title: "Анализ и оптимизация",
        description: "Отслеживаем результаты и улучшаем показатели",
        details: [
          "Еженедельные отчеты",
          "Анализ метрик открытий и кликов",
          "Оптимизация текстов и тайминга",
          "Масштабирование успешных кампаний"
        ],
        duration: "Постоянно"
      },
      {
        icon: "trending-up",
        title: "Рост результатов",
        description: "Получаете стабильный поток качественных лидов",
        details: [
          "Увеличение числа лидов в 3-5 раз",
          "Рост конверсии до 15%",
          "Сокращение цикла продаж",
          "Предсказуемые продажи"
        ],
        duration: "30-60 дней"
      }
    ];

    let activeStep = 0;
    const stepsListContainer = document.getElementById('process-steps-list');
    const stepDetailsContainer = document.getElementById('process-step-details');
    const stepElements = stepsListContainer.querySelectorAll('[data-step-index]');

    function updateDetails(index) {
        const data = stepsData[index];
        if (!data) return;

        const detailsHTML = `
            <div class="flex items-center gap-4 mb-6">
                <div class="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                    <i data-lucide="${data.icon}" class="w-8 h-8 text-white"></i>
                </div>
                <div>
                    <h3 class="text-2xl font-bold text-gray-900">${data.title}</h3>
                    <p class="text-gray-600">Этап ${index + 1} из ${stepsData.length}</p>
                </div>
            </div>
            <p class="text-lg text-gray-700 mb-6">${data.description}</p>
            <div class="space-y-3">
                <h4 class="font-semibold text-gray-900 mb-4">Что включает этот этап:</h4>
                ${data.details.map(detail => `
                    <div class="flex items-center gap-3">
                        <div class="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                        <span class="text-gray-700">${detail}</span>
                    </div>
                `).join('')}
            </div>
            <div class="mt-8 p-4 bg-blue-50 rounded-xl">
                <div class="flex items-center gap-2">
                    <i data-lucide="target" class="w-5 h-5 text-blue-600"></i>
                    <span class="font-medium text-blue-900">Время выполнения: ${data.duration}</span>
                </div>
            </div>
        `;

        const tl = gsap.timeline();
        tl.to(stepDetailsContainer, { opacity: 0, y: 20, duration: 0.2, ease: 'power2.in' })
          .call(() => {
              stepDetailsContainer.innerHTML = detailsHTML;
              if (typeof lucide !== 'undefined') {
                lucide.createIcons();
              }
          })
          .to(stepDetailsContainer, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
    }

    function applyStepStyles(element, isActive) {
        const iconContainer = element.querySelector('.flex-shrink-0');
        const icon = element.querySelector('i[data-lucide]');
        const titleContainer = element.querySelector('.flex-1');
        const durationBadge = titleContainer.querySelector('span');
        const description = titleContainer.querySelector('p');

        element.classList.toggle('bg-blue-600', isActive);
        element.classList.toggle('text-white', isActive);
        element.classList.toggle('shadow-2xl', isActive);
        element.classList.toggle('scale-105', isActive);
        
        element.classList.toggle('bg-white', !isActive);
        element.classList.toggle('hover:bg-gray-50', !isActive);
        element.classList.toggle('shadow-lg', !isActive);
        element.classList.toggle('hover:shadow-xl', !isActive);
        element.classList.toggle('text-gray-900', !isActive);

        iconContainer.classList.toggle('bg-white/20', isActive);
        iconContainer.classList.toggle('bg-blue-100', !isActive);

        icon.classList.toggle('text-white', isActive);
        icon.classList.toggle('text-blue-600', !isActive);

        durationBadge.classList.toggle('bg-white/20', isActive);
        durationBadge.classList.toggle('text-white', isActive);
        durationBadge.classList.toggle('bg-blue-100', !isActive);
        durationBadge.classList.toggle('text-blue-600', !isActive);

        description.classList.toggle('text-blue-100', isActive);
        description.classList.toggle('text-gray-600', !isActive);
    }

    function setActiveStep(index) {
        if (index === activeStep) return;
        activeStep = index;

        stepElements.forEach((el, i) => {
            applyStepStyles(el, i === activeStep);
        });

        updateDetails(activeStep);
    }

    stepsListContainer.addEventListener('click', (e) => {
        const stepEl = e.target.closest('[data-step-index]');
        if (stepEl) {
            const index = parseInt(stepEl.dataset.stepIndex, 10);
            if (!isNaN(index)) {
                setActiveStep(index);
            }
        }
    });
});
