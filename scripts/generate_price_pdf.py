#!/usr/bin/env python3
"""Generate the approved HiHol 152-FZ price sheet in the website palette."""

from __future__ import annotations

import argparse
import html
import sys
from dataclasses import dataclass
from io import BytesIO
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUTS = (
    ROOT / "public" / "price_152fz_hihol.pdf",
    ROOT / "output" / "pdf" / "price_152fz_hihol.pdf",
)

# Current compliance-home palette from app/globals.css.
BG = colors.HexColor("#F4F7F2")
SURFACE = colors.HexColor("#FFFFFF")
SURFACE_2 = colors.HexColor("#EAF0EB")
INK = colors.HexColor("#12211A")
MUTED = colors.HexColor("#56645D")
ACCENT = colors.HexColor("#2BAF69")
ACCENT_STRONG = colors.HexColor("#218A53")
DANGER = colors.HexColor("#B73F43")
BORDER = colors.HexColor("#D6E0D8")
WHITE = colors.white


def find_font(*names: str) -> Path:
    roots = (
        Path("C:/Windows/Fonts"),
        Path("/usr/share/fonts/truetype/dejavu"),
        Path("/usr/share/fonts/truetype/liberation2"),
    )
    for root in roots:
        for name in names:
            candidate = root / name
            if candidate.exists():
                return candidate
    raise FileNotFoundError(f"Не найден шрифт: {', '.join(names)}")


def register_fonts() -> None:
    regular = find_font("arial.ttf", "DejaVuSans.ttf", "LiberationSans-Regular.ttf")
    bold = find_font("arialbd.ttf", "DejaVuSans-Bold.ttf", "LiberationSans-Bold.ttf")
    pdfmetrics.registerFont(TTFont("HiHol", str(regular)))
    pdfmetrics.registerFont(TTFont("HiHol-Bold", str(bold)))
    pdfmetrics.registerFontFamily("HiHol", normal="HiHol", bold="HiHol-Bold")


def esc(text: str) -> str:
    return html.escape(text, quote=True)


def make_styles() -> dict[str, ParagraphStyle]:
    base = getSampleStyleSheet()
    return {
        "body": ParagraphStyle(
            "Body",
            parent=base["BodyText"],
            fontName="HiHol",
            fontSize=8.35,
            leading=10.7,
            textColor=INK,
            spaceAfter=2.2,
        ),
        "small": ParagraphStyle(
            "Small",
            parent=base["BodyText"],
            fontName="HiHol",
            fontSize=7.35,
            leading=9.2,
            textColor=MUTED,
        ),
        "meta": ParagraphStyle(
            "Meta",
            parent=base["BodyText"],
            fontName="HiHol-Bold",
            fontSize=7.4,
            leading=9.2,
            textColor=ACCENT_STRONG,
            uppercase=True,
        ),
        "section": ParagraphStyle(
            "Section",
            parent=base["Heading2"],
            fontName="HiHol-Bold",
            fontSize=11.2,
            leading=13.4,
            textColor=INK,
        ),
        "price": ParagraphStyle(
            "Price",
            parent=base["Heading2"],
            fontName="HiHol-Bold",
            fontSize=12.2,
            leading=13.4,
            alignment=TA_RIGHT,
            textColor=ACCENT_STRONG,
        ),
        "label": ParagraphStyle(
            "Label",
            parent=base["BodyText"],
            fontName="HiHol-Bold",
            fontSize=7.2,
            leading=8.6,
            alignment=TA_CENTER,
            textColor=INK,
        ),
    }


def draw_page(canvas, doc) -> None:
    width, height = A4
    canvas.saveState()
    canvas.setFillColor(BG)
    canvas.rect(0, 0, width, height, stroke=0, fill=1)
    if doc.page > 1:
        canvas.setStrokeColor(BORDER)
        canvas.setLineWidth(0.55)
        canvas.line(15 * mm, height - 12.2 * mm, width - 15 * mm, height - 12.2 * mm)
        canvas.setFont("HiHol-Bold", 7.3)
        canvas.setFillColor(INK)
        canvas.drawString(15 * mm, height - 9.5 * mm, "HIHOL  •  ПРАЙС 152-ФЗ")
        canvas.setFont("HiHol", 7.1)
        canvas.setFillColor(MUTED)
        canvas.drawRightString(width - 15 * mm, height - 9.5 * mm, "редакция 15.07.2026")

    canvas.setStrokeColor(BORDER)
    canvas.setLineWidth(0.55)
    canvas.line(15 * mm, 12.5 * mm, width - 15 * mm, 12.5 * mm)
    canvas.setFont("HiHol", 7.2)
    canvas.setFillColor(MUTED)
    canvas.drawString(15 * mm, 8.3 * mm, "hihol.ru  •  Telegram @dmitry_hihol")
    canvas.setFont("HiHol-Bold", 7.2)
    canvas.setFillColor(ACCENT_STRONG)
    canvas.drawRightString(width - 15 * mm, 8.3 * mm, f"{doc.page} / 3")
    canvas.restoreState()


def hero(styles) -> list:
    title = Paragraph(
        "<font size='9' color='#8EE0B2'><b>HIHOL • 152-ФЗ</b></font><br/>"
        "<font size='25' color='#FFFFFF'><b>ПРАЙС-ЛИСТ НА УСЛУГИ</b></font><br/>"
        "<font size='10.5' color='#DDE9E0'>Сайты, чат-боты, мини-аппы и процессы оператора</font>",
        ParagraphStyle(
            "HeroTitle",
            fontName="HiHol",
            leading=22,
            textColor=WHITE,
        ),
    )
    meta = Paragraph(
        "<font color='#8EE0B2'><b>РЕДАКЦИЯ</b></font><br/>"
        "<font size='13' color='#FFFFFF'><b>15.07.2026</b></font><br/>"
        "<font size='7.6' color='#DDE9E0'>Дмитрий Хихол<br/>НПД • без НДС</font>",
        ParagraphStyle(
            "HeroMeta",
            fontName="HiHol",
            alignment=TA_RIGHT,
            leading=13,
        ),
    )
    card = Table([[title, meta]], colWidths=[128 * mm, 44 * mm], rowHeights=[43 * mm])
    card.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), INK),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (0, 0), 9 * mm),
                ("RIGHTPADDING", (0, 0), (0, 0), 4 * mm),
                ("LEFTPADDING", (1, 0), (1, 0), 3 * mm),
                ("RIGHTPADDING", (1, 0), (1, 0), 6 * mm),
                ("TOPPADDING", (0, 0), (-1, -1), 4 * mm),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4 * mm),
                ("LINEBELOW", (0, 0), (-1, 0), 3, ACCENT),
            ]
        )
    )
    return [card, Spacer(1, 5 * mm)]


def level_cards(styles) -> list:
    levels = (
        ("01", "Внешняя проверка", "Публичные и технически наблюдаемые факты"),
        ("02", "Полный веб-аудит", "Тестовые заявки, маршруты данных, сведения владельца"),
        ("03", "Контур оператора", "Сайт, документы, доступы и внутренние процессы"),
    )
    cells = []
    for number, title, text in levels:
        cells.append(
            Paragraph(
                f"<font size='8' color='#218A53'><b>{number}</b></font><br/>"
                f"<font size='9' color='#12211A'><b>{esc(title)}</b></font><br/>"
                f"<font size='7.2' color='#56645D'>{esc(text)}</font>",
                styles["body"],
            )
        )
    table = Table([cells], colWidths=[56.4 * mm] * 3)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), SURFACE),
                ("BOX", (0, 0), (-1, -1), 0.7, BORDER),
                ("INNERGRID", (0, 0), (-1, -1), 0.7, BORDER),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 4 * mm),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4 * mm),
                ("TOPPADDING", (0, 0), (-1, -1), 3.2 * mm),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 3.2 * mm),
            ]
        )
    )
    note = Paragraph(
        "Базовые цены действуют для стандартного объема. Точный состав работ фиксируется до начала проекта.",
        styles["small"],
    )
    return [Paragraph("Три уровня проверки", styles["section"]), Spacer(1, 1.5 * mm), table, Spacer(1, 2.5 * mm), note]


def service_heading(number, title, price, styles, popular=False) -> Table:
    badge = " <font size='6.6' color='#218A53'><b>• ПОПУЛЯРНЫЙ</b></font>" if popular else ""
    left = Paragraph(f"<font color='#218A53'>{number}.</font> {esc(title)}{badge}", styles["section"])
    right = Paragraph(esc(price), styles["price"])
    row = Table([[left, right]], colWidths=[128 * mm, 42 * mm])
    row.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), SURFACE_2),
                ("BOX", (0, 0), (-1, -1), 0.65, BORDER),
                ("LINEBEFORE", (0, 0), (0, 0), 3, ACCENT),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 3.5 * mm),
                ("RIGHTPADDING", (0, 0), (-1, -1), 3.5 * mm),
                ("TOPPADDING", (0, 0), (-1, -1), 2.3 * mm),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 2.3 * mm),
            ]
        )
    )
    return row


def bullet_rows(items: list[str], styles) -> Table:
    rows = []
    for item in items:
        dot = Paragraph("<font color='#2BAF69'><b>•</b></font>", styles["body"])
        rows.append([dot, Paragraph(esc(item), styles["body"])])
    table = Table(rows, colWidths=[4.5 * mm, 165.5 * mm], splitByRow=1, splitInRow=1)
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 1.5 * mm),
                ("TOPPADDING", (0, 0), (-1, -1), 0.2 * mm),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0.45 * mm),
            ]
        )
    )
    return table


@dataclass(frozen=True)
class ServiceSpec:
    number: str
    title: str
    price: str
    intro: str
    bullets: tuple[str, ...]
    note: str | None = None
    popular: bool = False


def service(spec: ServiceSpec, styles) -> list:
    block = [
        service_heading(spec.number, spec.title, spec.price, styles, spec.popular),
        Spacer(1, 1.4 * mm),
    ]
    if spec.intro:
        block.append(Paragraph(esc(spec.intro), styles["body"]))
    block.append(bullet_rows(list(spec.bullets), styles))
    if spec.note:
        block.extend(
            [
                Spacer(1, 0.8 * mm),
                Table(
                    [[Paragraph(f"<font color='#56645D'><b>Граница:</b> {esc(spec.note)}</font>", styles["small"])]],
                    colWidths=[170 * mm],
                    style=TableStyle(
                        [
                            ("BACKGROUND", (0, 0), (-1, -1), SURFACE),
                            ("LINEBEFORE", (0, 0), (0, 0), 2, BORDER),
                            ("LEFTPADDING", (0, 0), (-1, -1), 3 * mm),
                            ("RIGHTPADDING", (0, 0), (-1, -1), 3 * mm),
                            ("TOPPADDING", (0, 0), (-1, -1), 1.6 * mm),
                            ("BOTTOMPADDING", (0, 0), (-1, -1), 1.6 * mm),
                        ]
                    ),
                ),
            ]
        )
    block.append(Spacer(1, 3 * mm))
    return block


def conditions_table(styles) -> Table:
    rows = [
        ("Оплата", "Предоплата 50%, остаток — после сдачи отчета или выполненных работ."),
        ("Разрешение", "Тестовые заявки, прохождение ботов и работа с внутренними скриншотами выполняются только с подтверждением владельца."),
        ("Объем", "В цену входит стандартный сайт до 3 форм. Самописные CMS, сложные интеграции, миграция хостинга и доработка CRM оцениваются отдельно."),
        ("Правовая оценка", "Часть КоАП и возможная санкция указываются только при достаточных доказательствах и после ручной квалификации. Штрафы не складываются автоматически."),
        ("Статус отчета", "Внешняя проверка фиксирует только публичные факты. Полный веб-аудит завершается после закрытия всех пунктов выбранного объема."),
        ("Исполнитель", "Самозанятый (НПД): договор, чек, без НДС."),
    ]
    data = [[
        Paragraph("<font color='#FFFFFF'><b>Параметр</b></font>", styles["label"]),
        Paragraph("<font color='#FFFFFF'><b>Условие</b></font>", styles["label"]),
    ]]
    data += [[Paragraph(esc(key), styles["meta"]), Paragraph(esc(value), styles["small"])] for key, value in rows]
    table = Table(data, colWidths=[38 * mm, 132 * mm], repeatRows=1)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), INK),
                ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
                ("BACKGROUND", (0, 1), (-1, -1), SURFACE),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [SURFACE, SURFACE_2]),
                ("GRID", (0, 0), (-1, -1), 0.55, BORDER),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 3 * mm),
                ("RIGHTPADDING", (0, 0), (-1, -1), 3 * mm),
                ("TOPPADDING", (0, 0), (-1, -1), 2.1 * mm),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 2.1 * mm),
            ]
        )
    )
    return table


SERVICES = (
    ServiceSpec(
        "1", "Внешняя экспресс-проверка сайта", "23 900 руб.",
        "Срок: 24–48 часов. Проверяются только публичные и технически наблюдаемые факты.",
        (
            "Инвентаризация публичных форм, квизов, виджетов, внешних форм и иных точек сбора данных.",
            "Проверка интерфейсов согласия: ссылки, предотметки, раздельность целей и корректность формулировок.",
            "Анализ политики по 14 контрольным элементам внутренней модели аудита.",
            "Пассивная техническая проверка: Network, cookie, localStorage, внешние домены, аналитика и рекламные технологии до выбора пользователя.",
            "Проверка HTTPS, публичных реквизитов оператора и записи в реестре Роскомнадзора.",
            "Отчет с доказательствами, подтвержденными несоответствиями, правовыми рисками, границами проверки и планом действий.",
            "Разбор отчета по видеосвязи — 30 минут.",
        ),
        "Не входит: тестовая отправка форм, проверка CRM/БД/почты, места первичной записи, AI/LLM-провайдеров, договоров и внутренних процессов.",
    ),
    ServiceSpec(
        "2", "Полный веб-аудит с участием владельца", "39 900 руб.",
        "Срок: 3–5 рабочих дней. Финальный отчет формируется после закрытия всех пунктов выбранного объема.",
        (
            "Все из внешней экспресс-проверки.",
            "Тестовая отправка каждой формы с пометкой «ТЕСТ-АУДИТ» и фиксацией POST, payload и ответа backend.",
            "Проверка маршрута данных: форма — почта — CRM — таблица — БД — AI/LLM — резервная копия.",
            "Установление места первичной записи и проверка заявлений о локализации.",
            "Проверка логирования согласий: дата, версия текста, источник, выбранные цели и возможность выгрузки.",
            "Интервью владельца 45–60 минут и проверка предоставленных скриншотов инфраструктуры.",
            "Финальный отчет: каждый пункт подтвержден, опровергнут или документированно исключен из услуги.",
        ),
        "От владельца потребуются: разрешение на тестовые действия, схема сервисов, сведения о CRM/БД/почте, хостинге, AI-провайдерах и записи в реестре.",
        True,
    ),
    ServiceSpec(
        "3", "Модуль «Чат-бот / мини-апп»", "+9 900 руб.",
        "К полному веб-аудиту. Отдельно — 17 900 руб.",
        (
            "Прохождение всех сценариев Telegram- или MAX-бота и webview мини-аппа.",
            "Проверка момента сбора имени, телефона, Telegram ID, файлов, голосовых и данных из кнопки «Поделиться контактом».",
            "Проверка основания и информирования до сбора, ссылки на политику и доказуемости согласия.",
            "Установление маршрута данных: бот — интеграция — CRM/таблица/облако/AI — место хранения и страны.",
            "Сверка бота и мини-аппа с политикой и матрицей обработки; отдельный раздел в отчете.",
        ),
    ),
    ServiceSpec(
        "4", "Полный веб-аудит + исправление под ключ", "59 900 руб.",
        "Срок: 5–10 рабочих дней. Стандартный объем: до 3 форм, без сложной CRM-разработки.",
        (
            "Полный веб-аудит с участием владельца по услуге 2.",
            "Публичная политика обработки ПДн для сайта и тексты согласий, синхронизированные с фактическими процессами.",
            "Раздельные механизмы для основной обработки и рекламных коммуникаций, где это требуется.",
            "Cookie-интерфейс с реальной технической логикой: необязательные трекеры запускаются только после выбора пользователя.",
            "Замена Google Forms и аналогичных внешних форм собственной формой на согласованной инфраструктуре в РФ — до 3 форм.",
            "Подготовка уведомления в Роскомнадзор при установленной обязанности и достаточных исходных данных.",
            "Повторная проверка, отчет «до / после» и гарантийные правки в течение 14 дней.",
        ),
        "Не входит: миграция хостинга, доработка CRM и учетных систем, сложная backend-разработка, внутренние документы оператора. Эти работы оцениваются отдельно.",
        True,
    ),
    ServiceSpec(
        "5", "Пакет документов оператора ПДн", "37 900 руб.",
        "Срок: 3–5 рабочих дней. Вместе с услугой 4 — доплата 19 900 руб.",
        (
            "Публичная и внутренняя политика обработки персональных данных.",
            "Формы согласий для фактических сценариев: сайт, клиенты, рассылка, cookie и иные применимые цели.",
            "Приказ о назначении ответственного и положение об обработке персональных данных.",
            "Инструкция по уведомлению Роскомнадзора и перечень исходных данных для подачи.",
            "Интервью 30–40 минут и настройка документов под реальные процессы, а не шаблонная замена реквизитов.",
        ),
        "Услуга подходит, когда документы отсутствуют, неполны или не соответствуют фактическим процессам. Старая дата документа сама по себе не означает несоответствие.",
    ),
    ServiceSpec(
        "6", "Сопровождение", "5 900 руб./мес",
        "Или 59 900 руб./год — примерно 2 месяца без дополнительной оплаты.",
        (
            "Контрольная веб-проверка раз в квартал с коротким отчетом.",
            "Актуализация политики, согласий и матрицы при изменении форм, сервисов, ботов, CRM или инфраструктуры.",
            "Мониторинг изменений законодательства и практики проверок.",
            "Консультации до 2 часов в месяц.",
            "Приоритетный разбор писем и запросов Роскомнадзора.",
        ),
    ),
    ServiceSpec(
        "7", "Полный контур оператора ПДн", "от 149 000 руб.",
        "Для компаний от 30 сотрудников. Оценка после полного веб-аудита и интервью по внутренним процессам.",
        (
            "Веб-аудит и исправление сайта плюс полный пакет документов оператора.",
            "Журналы учета, регламенты доступа, обязательства сотрудников и договорные документы поручения.",
            "Проверка ролей доступа, MFA, резервных копий, сроков хранения, удаления и реагирования на инциденты.",
            "Базовая модель угроз и определение применимых требований защиты.",
            "Обучение сотрудников: вебинар и памятки.",
            "Подготовка к проверке или профилактическому визиту Роскомнадзора.",
        ),
    ),
    ServiceSpec(
        "8", "Партнерам: веб-студии и агентства", "−30% от прайса",
        "White-label при согласованном потоке и SLA.",
        (
            "Работа под брендом партнера, обезличенная коммуникация и единый формат сдачи.",
            "Партнер определяет конечную цену клиенту; состав работ и сроки фиксируются до старта.",
            "Для регулярного потока согласуются SLA, шаблон входных данных и порядок приемки.",
        ),
    ),
)

REQUIREMENTS = (
    "Подтверждение на тестовые отправки форм и прохождение ботов без нагрузочного тестирования и поиска уязвимостей.",
    "Интервью владельца или технического специалиста 45–60 минут.",
    "Скриншоты хостинга, CRM, БД, почты, резервных копий и логов согласия — только релевантные поля.",
    "Перечень аналитики, рекламных технологий, AI/LLM, мессенджеров и подрядчиков.",
    "Карточка оператора в реестре Роскомнадзора и сведения об уведомлении о трансграничной передаче, если применимо.",
)


def closing_sections(styles) -> list:
    legal = Paragraph(
        "<font color='#B73F43'><b>ВАЖНО</b></font><br/>"
        "Отчет носит характер экспертного аудита и не является юридическим заключением или юридической консультацией. "
        "Аудит публичной веб-части не подтверждает полное соответствие деятельности оператора требованиям 152-ФЗ.",
        styles["body"],
    )
    legal_box = Table([[legal]], colWidths=[170 * mm])
    legal_box.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#FFF7F5")),
        ("BOX", (0, 0), (-1, -1), 0.7, colors.HexColor("#E7C7C5")),
        ("LINEBEFORE", (0, 0), (0, 0), 3, DANGER),
        ("LEFTPADDING", (0, 0), (-1, -1), 4 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 3 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3 * mm),
    ]))
    contact = Paragraph(
        "<font size='8' color='#8EE0B2'><b>ЗАЯВКА НА ПРОВЕРКУ</b></font><br/>"
        "<font size='15' color='#FFFFFF'><b>Telegram @dmitry_hihol</b></font><br/>"
        "<font size='8' color='#DDE9E0'>hihol.ru • договор • чек • без НДС</font>",
        ParagraphStyle("Contact", fontName="HiHol", leading=15, alignment=TA_LEFT),
    )
    contact_box = Table([[contact]], colWidths=[170 * mm], rowHeights=[27 * mm])
    contact_box.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), INK),
        ("LINEBELOW", (0, 0), (-1, -1), 3, ACCENT),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 6 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6 * mm),
    ]))
    return [
        Paragraph("Условия и границы", styles["section"]), Spacer(1, 1.5 * mm),
        conditions_table(styles), Spacer(1, 4 * mm),
        Paragraph("Что требуется для полного веб-аудита", styles["section"]), Spacer(1, 1.2 * mm),
        bullet_rows(list(REQUIREMENTS), styles), Spacer(1, 3 * mm),
        legal_box, Spacer(1, 3.5 * mm), contact_box,
    ]


def build_story(styles) -> list:
    story = [*hero(styles), *level_cards(styles), Spacer(1, 2 * mm)]
    page_ranges = ((0, 2), (2, 6), (6, 8))
    for page_index, (start, end) in enumerate(page_ranges):
        if page_index:
            story.append(PageBreak())
        for spec in SERVICES[start:end]:
            story.extend(service(spec, styles))
        if page_index == 2:
            story.extend(closing_sections(styles))
    return story


def generate_pdf() -> bytes:
    register_fonts()
    styles = make_styles()
    buffer = BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        leftMargin=20 * mm,
        rightMargin=20 * mm,
        topMargin=16 * mm,
        bottomMargin=17 * mm,
        title="HiHol — прайс на услуги по 152-ФЗ",
        author="Дмитрий Хихол",
        subject="Редакция от 15.07.2026",
        creator="HiHol deterministic PDF generator",
        invariant=1,
        pageCompression=1,
    )
    doc.build(build_story(styles), onFirstPage=draw_page, onLaterPages=draw_page)
    return buffer.getvalue()


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Fail if committed PDF copies are stale")
    args = parser.parse_args()
    pdf = generate_pdf()

    if args.check:
        stale = [str(path) for path in OUTPUTS if not path.exists() or path.read_bytes() != pdf]
        if stale:
            print("STALE_PDF: " + ", ".join(stale), file=sys.stderr)
            return 1
        print(f"PDF_OK bytes={len(pdf)} outputs={len(OUTPUTS)}")
        return 0

    for path in OUTPUTS:
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(pdf)
        print(f"wrote {path.relative_to(ROOT)} ({len(pdf)} bytes)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
