import { createFileRoute } from "@tanstack/react-router";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useMemo, useRef, useState } from "react";

export const Route = createFileRoute("/virtual")({
  component: RouteComponent,
});

/**
 * Примеры использования @tanstack/react-virtual
 *
 * Виртуализация — это техника рендеринга только тех элементов списка,
 * которые видны пользователю в данный момент. Это позволяет работать
 * с большими списками данных без потери производительности.
 */
function RouteComponent() {
  return (
    <div className="p-6 space-y-12">
      <h1 className="text-3xl font-bold mb-6">
        Примеры виртуализации с @tanstack/react-virtual
      </h1>

      {/* Пример 1: Вертикальный список */}
      <VirtualListExample />

      {/* Пример 2: Горизонтальный список */}
      <HorizontalVirtualListExample />

      {/* Пример 3: Виртуализация окна (Window Virtualizer) */}
      <WindowVirtualListExample />

      {/* Пример 4: Сетка с виртуализацией */}
      <VirtualGridExample />
    </div>
  );
}

// ============================================================================
// ПРИМЕР 1: Вертикальный список (наиболее частый случай использования)
// ============================================================================

/**
 * Базовый пример вертикального списка с виртуализацией.
 *
 * Ключевые понятия:
 * - parentRef — ссылка на контейнер, в котором происходит скролл
 * - count — общее количество элементов для рендеринга
 * - estimateSize — предполагаемый размер одного элемента в пикселях
 *   (нужен для расчёта общей высоты до того, как элементы отрендерены)
 */
function VirtualListExample() {
  const rows = useMemo(
    () => Array.from({ length: 10000 }, (_, i) => `Элемент ${i + 1}`),
    [],
  );

  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 5,
  });

  const virtualItems = virtualizer.getVirtualItems();

  const [firstIndex, setFirstIndex] = useState(0);

  useEffect(() => {
    const first = virtualItems[0];

    if (first) {
      setFirstIndex(first.index);
    }
  }, [virtualItems]);

  return (
    <div>
      <div ref={parentRef} className="h-96 overflow-auto border rounded-lg">
        <div
          style={{
            height: virtualizer.getTotalSize(),
            position: "relative",
          }}
        >
          {virtualItems.map((row) => (
            <div
              key={row.key}
              ref={virtualizer.measureElement}
              data-index={row.index}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: row.size,
                transform: `translateY(${row.start}px)`,
              }}
              className="
                flex items-center
                px-4
                border-b
                h-[50px]
              "
            >
              {rows[row.index]}
            </div>
          ))}
        </div>
      </div>

      <div className="text-sm mt-2">
        <p>
          В DOM:
          <b>{virtualItems.length}</b>
        </p>

        <p>
          Сейчас:
          <b>
            {firstIndex}-{virtualItems.at(-1)?.index}
          </b>
        </p>

        <p>
          Скролл:
          <b>{Math.round(virtualizer.scrollOffset ?? 0)}px</b>
        </p>

        <p>
          Всего:
          <b>{rows.length}</b>
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// ПРИМЕР 2: Горизонтальный список
// ============================================================================

/**
 * Пример горизонтальной виртуализации.
 *
 * В новых версиях @tanstack/react-virtual параметр axis удалён.
 * Для горизонтальной виртуализации используется horizontal: true
 */
function HorizontalVirtualListExample() {
  // Генерируем 1000 элементов для горизонтального списка
  const columns = useMemo(
    () => Array.from({ length: 1000 }, (_, i) => `Колонка ${i + 1}`),
    [],
  );

  const parentRef = useRef<HTMLDivElement>(null);

  /**
   * useVirtualizer с параметром horizontal: true
   *
   * Параметры:
   * - count: количество элементов
   * - getScrollElement: элемент для скролла
   * - estimateSize: предполагаемая ширина элемента (px)
   * - overscan: запас элементов
   * - horizontal: true — включает горизонтальный режим
   */
  const virtualizer = useVirtualizer({
    count: columns.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 150, // Предполагаемая ширина элемента (px)
    overscan: 3,
    horizontal: true, // Горизонтальное направление
  });

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">
        2. Горизонтальный список (1 000 элементов)
      </h2>
      <p className="text-gray-600 mb-4">
        Пример горизонтальной виртуализации с параметром{" "}
        <code>horizontal: true</code>. Полезно для горизонтальных каруселей и
        таблиц с большим количеством колонок.
      </p>

      {/*
        Горизонтальный контейнер с фиксированной шириной.
        overflow-x: auto — горизонтальный скролл
      */}
      <div
        ref={parentRef}
        className="w-full overflow-x-auto border border-gray-300 rounded-lg"
      >
        <div
          style={{
            width: `${virtualizer.getTotalSize()}px`,
            position: "relative",
            height: "120px",
          }}
        >
          {virtualItems.map((virtualColumn) => (
            <div
              key={virtualColumn.key}
              ref={virtualizer.measureElement}
              data-index={virtualColumn.index}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: `${virtualColumn.size}px`,
                transform: `translateX(${virtualColumn.start}px)`,
              }}
              className="flex items-center justify-center px-4 border-r border-gray-200 bg-gradient-to-br from-blue-100 to-purple-100"
            >
              <span className="text-sm font-medium">
                {columns[virtualColumn.index]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2 text-sm text-gray-500">
        <p>
          В DOM:
          <strong>{virtualItems.length}</strong>
        </p>

        <p>
          Видимый диапазон:
          <strong>
            {virtualItems[0]?.index} - {virtualItems.at(-1)?.index}
          </strong>
        </p>

        <p>
          Всего:
          <strong>{columns.length}</strong>
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// ПРИМЕР 3: Виртуализация с динамическими размерами элементов
// ============================================================================

/**
 * Пример виртуализации с элементами разной высоты.
 *
 * useVirtualizer автоматически измеряет элементы после рендеринга
 * и корректирует их позиции. Это важно, когда высота элементов
 * неизвестна заранее или может меняться.
 */
function WindowVirtualListExample() {
  // Элементы с разной высотой (имитация контента разной длины)
  const rows = useMemo(
    () =>
      Array.from({ length: 1000 }, (_, i) => {
        const type = i % 3; // 0, 1, 2 — три типа высоты
        return {
          id: i,
          title: `Заголовок элемента ${i + 1}`,
          description: `Описание для элемента ${i + 1}. ${
            type === 0
              ? "Это длинное описание, которое занимает больше места и показывает, как виртуализация работает с элементами разной высоты. Добавьте ещё текста для наглядности."
              : type === 1
                ? "Среднее описание — немного текста."
                : "Короткое."
          }`,
          // Тип элемента для стилизации
          type,
        };
      }),
    [],
  );

  const parentRef = useRef<HTMLDivElement>(null);

  /**
   * useVirtualizer с динамическими размерами.
   *
   * Ключевой момент: ref={virtualizer.measureElement} автоматически
   * измеряет реальный размер элемента после рендеринга и обновляет позиции.
   *
   * Параметры:
   * - count: количество элементов
   * - estimateSize: начальная оценка размера (будет переопределена)
   * - overscan: запас элементов
   */
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80, // Начальная оценка (будет уточнена после измерения)
    overscan: 5,
  });

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">
        3. Элементы разной высоты (Dynamic Sizes)
      </h2>
      <p className="text-gray-600 mb-4">
        Пример виртуализации с элементами разной высоты. Функция{" "}
        <code>measureElement</code> автоматически измеряет реальные размеры
        элементов и корректирует позиции остальных.
      </p>

      <div
        ref={parentRef}
        className="h-96 overflow-auto border border-gray-300 rounded-lg"
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            position: "relative",
            width: "100%",
          }}
        >
          {virtualItems.map((virtualRow) => {
            const row = rows[virtualRow.index];
            // Разная высота в зависимости от типа элемента
            const minHeight = row.type === 0 ? 100 : row.type === 1 ? 70 : 45;

            return (
              <div
                key={virtualRow.key}
                ref={virtualizer.measureElement}
                data-index={virtualRow.index}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  minHeight: `${minHeight}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                className={`flex flex-col justify-center px-6 border-b border-gray-200 hover:bg-green-50 ${
                  row.type === 0
                    ? "bg-green-50"
                    : row.type === 1
                      ? "bg-blue-50"
                      : "bg-yellow-50"
                }`}
              >
                <span className="font-medium text-gray-900">
                  {row.title} (тип:{" "}
                  {row.type === 0
                    ? "высокий"
                    : row.type === 1
                      ? "средний"
                      : "низкий"}
                  )
                </span>
                <span className="text-sm text-gray-500 mt-1">
                  {row.description}
                </span>
                <span className="text-xs text-gray-400 mt-2">
                  Индекс: {virtualRow.index} | Реальный размер:{" "}
                  {virtualRow.size}px
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-2 text-sm text-gray-500">
        <p>
          В DOM:
          <strong>{virtualItems.length}</strong>
        </p>

        <p>
          Видимый диапазон:
          <strong>
            {virtualItems[0]?.index} - {virtualItems.at(-1)?.index}
          </strong>
        </p>

        <p>
          Всего:
          <strong>{rows.length}</strong>
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// ПРИМЕР 4: Сетка с виртуализацией (Grid)
// ============================================================================

/**
 * Пример виртуализации сетки (grid).
 *
 * Для сетки используется тот же useVirtualizer, но с настройками:
 * - estimateSize: возвращает объект { width, height }
 * - items: вычисляются на основе количества колонок
 */
function VirtualGridExample() {
  // 1000 элементов для сетки
  const items = useMemo(
    () =>
      Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        name: `Товар ${i + 1}`,
        price: i * 100 + 500,
      })),
    [],
  );

  const parentRef = useRef<HTMLDivElement>(null);

  // Количество колонок в сетке
  const columnCount = 4;

  /**
   * Для сетки важно правильно рассчитать количество строк:
   * rowCount = Math.ceil(items.length / columnCount)
   */
  const rowCount = Math.ceil(items.length / columnCount);

  const virtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 140, // Высота строки (карточки + отступы)
    overscan: 2,
  });

  const virtualRows = virtualizer.getVirtualItems();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">
        4. Сетка с виртуализацией (Grid)
      </h2>
      <p className="text-gray-600 mb-4">
        Пример виртуализации сетки. Виртуализируются строки, каждая из которых
        содержит несколько элементов (колонок).
      </p>

      <div
        ref={parentRef}
        className="h-96 overflow-auto border border-gray-300 rounded-lg"
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            position: "relative",
            width: "100%",
          }}
        >
          {virtualRows.map((virtualRow) => {
            // Вычисляем элементы для текущей строки
            const startIndex = virtualRow.index * columnCount;
            const rowItems = items.slice(startIndex, startIndex + columnCount);

            return (
              <div
                key={virtualRow.key}
                ref={virtualizer.measureElement}
                data-index={virtualRow.index}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                className="grid grid-cols-4 gap-2 p-2"
              >
                {rowItems.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-lg p-3 bg-gradient-to-br from-orange-50 to-yellow-50 hover:shadow-md transition-shadow"
                  >
                    <p className="font-medium text-sm text-gray-800">
                      {item.name}
                    </p>
                    <p className="text-lg font-bold text-orange-600">
                      {item.price.toLocaleString("ru-RU")} ₽
                    </p>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-2 text-sm text-gray-500">
        <p>
          В DOM:
          <strong>{virtualRows.length}</strong>
        </p>

        <p>
          Видимый диапазон:
          <strong>
            {virtualRows[0]?.index} - {virtualRows.at(-1)?.index}
          </strong>
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// ДОПОЛНИТЕЛЬНЫЕ ПАРАМЕТРЫ useVirtualizer (справочник)
// ============================================================================

/**
 * Полный список параметров useVirtualizer:
 *
 * {
 *   count: number;                    // Количество элементов (обязательно)
 *   getScrollElement: () => Element;  // Функция, возвращающая элемент скролла
 *   estimateSize: (index: number) => number;  // Предполагаемый размер элемента
 *   overscan?: number;                // Запас элементов за пределами видимости
 *   axis?: 'vertical' | 'horizontal'; // Направление скролла
 *   paddingStart?: number;            // Отступ в начале списка (px)
 *   paddingEnd?: number;              // Отступ в конце списка (px)
 *   scrollMargin?: number;            // Отступ скролла (учитывается при расчёте)
 *   gap?: number;                     // Расстояние между элементами (px)
 *   rangeExtractor?: (range: VirtualizerRange) => number[];  // Кастомная логика выбора диапазона
 *   measureElement?: (element: Element) => number;  // Кастомное измерение элемента
 *   initialRect?: { width: number, height: number }; // Начальные размеры контейнера
 *   enabled?: boolean;                // Включена ли виртуализация
 *   isScrollingResetDelay?: number;   // Задержка перед сбросом состояния скролла
 *   useIsScrolling?: () => boolean;   // Кастомный хук для определения скролла
 *   scrollBehavior?: 'auto' | 'smooth'; // Поведение скролла
 * }
 *
 * Полезные методы виртуализатора:
 *
 * - scrollToIndex(index, options)  // Прокрутить к индексу
 * - scrollToOffset(offset)         // Прокрутить к позиции (px)
 * - getTotalSize()                 // Общий размер всех элементов
 * - getVirtualItems()              // Получить виртуальные элементы
 * - measure()                      // Переизмерить контейнер
 */
