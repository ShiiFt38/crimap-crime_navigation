from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer


ROOT = Path(__file__).resolve().parents[2]
OUTPUT_DIR = ROOT / "output" / "pdf"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
OUTPUT_PATH = OUTPUT_DIR / "crimap-app-summary.pdf"


styles = getSampleStyleSheet()

title_style = ParagraphStyle(
    "TitleCustom",
    parent=styles["Title"],
    fontName="Helvetica-Bold",
    fontSize=18,
    leading=20,
    textColor=colors.HexColor("#1F2937"),
    spaceAfter=5,
)

subtitle_style = ParagraphStyle(
    "SubtitleCustom",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=8.5,
    leading=10,
    textColor=colors.HexColor("#4B5563"),
    spaceAfter=7,
)

heading_style = ParagraphStyle(
    "HeadingCustom",
    parent=styles["Heading2"],
    fontName="Helvetica-Bold",
    fontSize=10,
    leading=12,
    textColor=colors.HexColor("#B05216"),
    spaceBefore=3,
    spaceAfter=3,
)

body_style = ParagraphStyle(
    "BodyCustom",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=8.2,
    leading=10,
    textColor=colors.HexColor("#111827"),
    spaceAfter=2,
)

bullet_style = ParagraphStyle(
    "BulletCustom",
    parent=body_style,
    leftIndent=10,
    firstLineIndent=-6,
    bulletIndent=0,
    spaceAfter=1.5,
)


def p(text: str, style=body_style):
    return Paragraph(text, style)


story = [
    p("Crimap App Summary", title_style),
    p("Repo-based one-page overview generated from code, config, routes, and local data files.", subtitle_style),
    p("What It Is", heading_style),
    p(
        "Crimap is a Next.js safety app focused on South Africa that combines mapped district views, historical crime data, and community-submitted incident reports. "
        "The repo shows a mobile-friendly interface with auth, account settings, emergency actions, district analytics, and report submission workflows."
    ),
    p("Who It’s For", heading_style),
    p(
        "Primary persona: a South African resident or community member who wants to monitor local crime patterns, review nearby district risk, and submit or discuss incidents."
    ),
    p("What It Does", heading_style),
]

feature_bullets = [
    "Shows a South Africa map with district boundaries, click popups, and location search.",
    "Lists districts with computed crime index and risk labels from aggregated crime records.",
    "Provides district detail pages with charts, recent incidents, a map, and safety tips.",
    "Displays community crime reports with offence, location, relative time, media, and upvotes.",
    "Lets signed-in users submit crime reports with time, place, severity, witness, and media fields.",
    "Includes account tools for profile, password, alerts, saved location, and emergency contacts.",
    "Offers an emergency page with quick-call and share-location actions.",
]

for item in feature_bullets:
    story.append(Paragraph(item, bullet_style, bulletText="-"))

story.extend(
    [
        p("How It Works", heading_style),
        Paragraph(
            "UI: Next.js App Router pages in <font name='Helvetica-Bold'>src/app</font> render the map, areas, reports, emergency, auth, and account flows; shared nav and session state come from layout components and <font name='Helvetica-Bold'>SessionProvider</font>.",
            bullet_style,
            bulletText="-",
        ),
        Paragraph(
            "Data flow: client components call internal <font name='Helvetica-Bold'>/api/*</font> routes for districts, crime areas, reports, auth, and account updates, while some server pages query the database directly.",
            bullet_style,
            bulletText="-",
        ),
        Paragraph(
            "Persistence: Drizzle schema in <font name='Helvetica-Bold'>src/lib/schema.ts</font> models users, districts, stations, crime records, real-time reports, media, comments, upvotes, preferences, and emergency contacts.",
            bullet_style,
            bulletText="-",
        ),
        Paragraph(
            "Storage/services: current dev wiring uses <font name='Helvetica-Bold'>better-sqlite3</font> with <font name='Helvetica-Bold'>data/saps_crime_stats.db</font>; a commented Postgres/Supabase path exists in <font name='Helvetica-Bold'>src/lib/drizzle.ts</font>.",
            bullet_style,
            bulletText="-",
        ),
        Paragraph(
            "External/data assets: district geometry comes from <font name='Helvetica-Bold'>data/MDB_District_Municipal_Boundary_2018.geojson</font>; uploads are written to <font name='Helvetica-Bold'>public/uploads</font>; map search hits OpenStreetMap Nominatim.",
            bullet_style,
            bulletText="-",
        ),
        Paragraph(
            "Auth: NextAuth credentials login validates hashed passwords against the <font name='Helvetica-Bold'>user</font> table and enriches session data with stored profile/location fields.",
            bullet_style,
            bulletText="-",
        ),
        p("How To Run", heading_style),
        Paragraph("Install dependencies: <font name='Helvetica-Bold'>npm install</font>.", bullet_style, bulletText="-"),
        Paragraph("Start the dev server: <font name='Helvetica-Bold'>npm run dev</font>.", bullet_style, bulletText="-"),
        Paragraph("Open: <font name='Helvetica-Bold'>http://localhost:3000</font>.", bullet_style, bulletText="-"),
        Paragraph(
            "Setup notes from repo evidence: local dev DB is already pointed at <font name='Helvetica-Bold'>data/saps_crime_stats.db</font>; full env/bootstrap instructions are <font name='Helvetica-Bold'>Not found in repo</font>.",
            bullet_style,
            bulletText="-",
        ),
        Paragraph(
            "Auth env detail: <font name='Helvetica-Bold'>NEXTAUTH_SECRET</font> is referenced in code; complete secret/setup guidance is <font name='Helvetica-Bold'>Not found in repo</font>.",
            bullet_style,
            bulletText="-",
        ),
        Spacer(1, 2),
        p("Evidence basis: README, package.json, src/app pages, src/app/api routes, src/lib schema/db/auth files, and data/ assets.", subtitle_style),
    ]
)


doc = SimpleDocTemplate(
    str(OUTPUT_PATH),
    pagesize=A4,
    leftMargin=12 * mm,
    rightMargin=12 * mm,
    topMargin=11 * mm,
    bottomMargin=9 * mm,
)
doc.build(story)

print(OUTPUT_PATH)
