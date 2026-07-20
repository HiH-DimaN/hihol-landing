#!/usr/bin/env python3
"""Generate the deterministic four-page HiHol 152-FZ report sample."""

from __future__ import annotations

import argparse
import html
import re
import sys
from io import BytesIO
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


ROOT = Path(__file__).resolve().parents[1]
OUTPUTS = (
    ROOT / "public" / "report_sample_152fz_hihol.pdf",
    ROOT / "output" / "pdf" / "report_sample_152fz_hihol.pdf",
)
EXPECTED_PAGES = 4

BG = colors.HexColor("#F4F7F2")
SURFACE = colors.white
SURFACE_2 = colors.HexColor("#EAF0EB")
INK = colors.HexColor("#12211A")
MUTED = colors.HexColor("#56645D")
ACCENT = colors.HexColor("#2BAF69")
ACCENT_STRONG = colors.HexColor("#218A53")
DANGER = colors.HexColor("#B73F43")
BORDER = colors.HexColor("#D6E0D8")


def find_font(*names: str) -> Path:
    roots = (
        Path("C:/Windows/Fonts"),
        Path("/mnt/c/Windows/Fonts"),
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


def esc(value: str) -> str:
    return html.escape(value, quote=True)


def make_styles() -> dict[str, ParagraphStyle]:
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle("Title", parent=base["Title"], fontName="HiHol-Bold", fontSize=25, leading=29, textColor=INK, alignment=TA_LEFT),
        "h1": ParagraphStyle("H1", parent=base["Heading1"], fontName="HiHol-Bold", fontSize=18, leading=22, textColor=INK, spaceAfter=5),
        "h2": ParagraphStyle("H2", parent=base["Heading2"], fontName="HiHol-Bold", fontSize=11, leading=13, textColor=ACCENT_STRONG),
        "body": ParagraphStyle("Body", parent=base["BodyText"], fontName="HiHol", fontSize=9.2, leading=12.6, textColor=INK, spaceAfter=4),
        "small": ParagraphStyle("Small", parent=base["BodyText"], fontName="HiHol", fontSize=7.7, leading=10, textColor=MUTED),
        "label": ParagraphStyle("Label", parent=base["BodyText"], fontName="HiHol-Bold", fontSize=7.2, leading=9, textColor=ACCENT_STRONG),
        "center": ParagraphStyle("Center", parent=base["BodyText"], fontName="HiHol-Bold", fontSize=9, leading=12, textColor=INK, alignment=TA_CENTER),
    }


def draw_page(canvas, doc) -> None:
    width, height = A4
    canvas.saveState()
    canvas.setFillColor(BG)
    canvas.rect(0, 0, width, height, stroke=0, fill=1)
    canvas.setStrokeColor(BORDER)
    canvas.line(18 * mm, 14 * mm, width - 18 * mm, 14 * mm)
    canvas.setFont("HiHol", 7.4)
    canvas.setFillColor(MUTED)
    canvas.drawString(18 * mm, 9.5 * mm, "HIHOL.RU - ДЕМОНСТРАЦИОННЫЙ МАТЕРИАЛ")
    canvas.drawRightString(width - 18 * mm, 9.5 * mm, f"{doc.page} / {EXPECTED_PAGES}")
    canvas.restoreState()


def note_box(text: str, styles, accent=ACCENT) -> Table:
    box = Table([[Paragraph(esc(text), styles["body"])]], colWidths=[164 * mm])
    box.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), SURFACE),
        ("BOX", (0, 0), (-1, -1), 0.7, BORDER),
        ("LINEBEFORE", (0, 0), (0, -1), 3, accent),
        ("LEFTPADDING", (0, 0), (-1, -1), 4 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 3 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3 * mm),
    ]))
    return box


def field_rows(fields: list[tuple[str, str]], styles) -> Table:
    data = [[Paragraph(esc(label).upper(), styles["label"]), Paragraph(esc(text), styles["body"])] for label, text in fields]
    table = Table(data, colWidths=[36 * mm, 128 * mm])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, -1), SURFACE_2),
        ("BACKGROUND", (1, 0), (1, -1), SURFACE),
        ("GRID", (0, 0), (-1, -1), 0.55, BORDER),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 3 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 3 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 2.5 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2.5 * mm),
    ]))
    return table


def cover(styles) -> list:
    steps = ["Факт", "Доказательство", "Риск", "Что исправить", "Повторная проверка"]
    step_cells = [[Paragraph(f"{index + 1:02d}<br/><b>{esc(step)}</b>", styles["center"]) for index, step in enumerate(steps)]]
    step_table = Table(step_cells, colWidths=[32.8 * mm] * 5)
    step_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), SURFACE_2),
        ("BOX", (0, 0), (-1, -1), 0.7, BORDER),
        ("INNERGRID", (0, 0), (-1, -1), 0.55, BORDER),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 4 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4 * mm),
    ]))
    return [
        Spacer(1, 18 * mm),
        Paragraph("ДЕМОНСТРАЦИОННЫЙ МАТЕРИАЛ", styles["label"]),
        Spacer(1, 4 * mm),
        Paragraph("Как выглядит результат технического аудита сайта по 152-ФЗ", styles["title"]),
        Spacer(1, 5 * mm),
        Paragraph("Четыре страницы с двумя условными наблюдениями, доказательной логикой и планом повторной проверки.", styles["body"]),
        Spacer(1, 9 * mm),
        step_table,
        Spacer(1, 9 * mm),
        note_box("Это учебный образец без данных заказчика. Условный адрес example.ru и описанные сценарии показывают формат выдачи, а не результат проверки конкретного сайта.", styles),
        Spacer(1, 7 * mm),
        field_rows([
            ("Тип", "Демонстрационный фрагмент внешней технической проверки"),
            ("Статус", "Образец структуры - не клиентский отчет"),
            ("Границы", "Без тестовых отправок, внутренних доступов и окончательной юридической квалификации"),
            ("Методика", "Публичные страницы, документы, cookie и пассивный Network"),
        ], styles),
    ]


def finding_page(number: str, title: str, fields: list[tuple[str, str]], styles) -> list:
    return [
        Paragraph(f"НАБЛЮДЕНИЕ {number}", styles["label"]),
        Spacer(1, 2 * mm),
        Paragraph(esc(title), styles["h1"]),
        Spacer(1, 4 * mm),
        field_rows(fields, styles),
        Spacer(1, 6 * mm),
        note_box("Граница вывода: технический факт и предварительный риск не равны установленному составу административного правонарушения. При необходимости окончательную правовую оценку дает профильный юрист.", styles, DANGER),
    ]


def final_page(styles) -> list:
    plan = field_rows([
        ("P0", "Остановить запуск необязательной аналитики до выбора посетителя; повторить Network-тест в новом профиле."),
        ("P1", "Синхронизировать политику с фактическим маршрутом формы; проверить текст, интерфейс и POST вместе."),
        ("P2", "Зафиксировать дату проверки, URL, сценарий и ID доказательств; сохранить результат до/после."),
    ], styles)
    verification = field_rows([
        ("V-01", "До выбора нет запросов аналитики; после отказа выбор сохраняется."),
        ("V-02", "Политика называет фактическую форму, цели, состав данных, получателей и сроки."),
        ("V-03", "Каждая находка закрыта новым скриншотом или Network-логом с датой и URL."),
    ], styles)
    return [
        Paragraph("ПЛАН И ПОВТОРНАЯ ПРОВЕРКА", styles["label"]),
        Spacer(1, 2 * mm),
        Paragraph("Исправление считается завершенным только после нового доказательства", styles["h1"]),
        Paragraph("Отчет не заканчивается рекомендацией: для каждого приоритета заранее задается проверяемый критерий приемки.", styles["body"]),
        Spacer(1, 4 * mm),
        Paragraph("План действий", styles["h2"]),
        Spacer(1, 2 * mm),
        plan,
        Spacer(1, 6 * mm),
        Paragraph("Контрольные тесты", styles["h2"]),
        Spacer(1, 2 * mm),
        verification,
        Spacer(1, 7 * mm),
        note_box("В полном отчете к каждому пункту прикладываются фактические доказательства, ограничения и статус повторной проверки. Отчет не обещает полного соответствия деятельности оператора одной услугой.", styles),
        Spacer(1, 6 * mm),
        Paragraph("Следующий шаг: согласовать объем проверки и перечень разрешенных активных действий. Telegram: @dmitry_hihol", styles["center"]),
    ]


def build_story(styles) -> list:
    finding_one = finding_page("01", "Счетчик аналитики запускается до выбора посетителя", [
        ("Факт", "При первом открытии example.ru браузер обращается к домену счетчика до выбора в cookie-интерфейсе."),
        ("Доказательство", "Network-лог E-C4-01: запрос зафиксирован до нажатия кнопки; дата, URL и чистый профиль браузера указаны в карточке доказательства."),
        ("Риск", "Фактический запуск расходится с заявленной логикой согласия. Применимое основание и состав передаваемых данных требуют отдельной проверки."),
        ("Что исправить", "Не запускать необязательную аналитику до выбора и сохранять версию, дату и результат этого выбора."),
        ("Повторная проверка", "Открыть сайт в новом профиле, проверить сценарии до выбора, принятия и отказа; приложить новый Network-лог."),
    ], styles)
    finding_two = finding_page("02", "Политика описывает не тот маршрут формы", [
        ("Факт", "В условной политике указана внешняя форма, а интерфейс отправляет данные на собственный адрес /api/leads."),
        ("Доказательство", "Сопоставлены текст политики P-03 и POST-запрос E-F5-02; получатель и первичное место записи требуют подтверждения владельца."),
        ("Риск", "Документ может не отражать фактические операции, получателей и сроки хранения. Окончательный вывод зависит от схемы обработки."),
        ("Что исправить", "Обновить политику по фактической форме: цели, данные, операции, получатели, место хранения, сроки и порядок удаления."),
        ("Повторная проверка", "Повторить отправку с разрешения владельца, сверить POST и место записи с новой редакцией политики."),
    ], styles)
    return [*cover(styles), PageBreak(), *finding_one, PageBreak(), *finding_two, PageBreak(), *final_page(styles)]


def generate_pdf() -> bytes:
    register_fonts()
    styles = make_styles()
    buffer = BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        leftMargin=23 * mm,
        rightMargin=23 * mm,
        topMargin=20 * mm,
        bottomMargin=20 * mm,
        title="HiHol - демонстрационный отчет по аудиту 152-ФЗ",
        author="Дмитрий Хихол",
        subject="Демонстрационный четырехстраничный образец отчета",
        creator="HiHol deterministic report sample generator",
        invariant=1,
        pageCompression=1,
    )
    doc.build(build_story(styles), onFirstPage=draw_page, onLaterPages=draw_page)
    pdf = buffer.getvalue()
    pages = len(re.findall(rb"/Type\s*/Page\b", pdf))
    if pages != EXPECTED_PAGES:
        raise RuntimeError(f"EXPECTED_{EXPECTED_PAGES}_PAGES_GOT_{pages}")
    return pdf


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
        print(f"REPORT_PDF_OK pages={EXPECTED_PAGES} bytes={len(pdf)} outputs={len(OUTPUTS)}")
        return 0

    for path in OUTPUTS:
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(pdf)
        print(f"wrote {path.relative_to(ROOT)} ({len(pdf)} bytes)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
