import type { StaticImageData } from "next/image";
import type { Localized } from "@/i18n/config";

/*
 * Every image below is a real capture of Camilo's work:
 * - live deployments captured in a browser,
 * - local runs of private systems seeded with fictional demo data,
 * - or screenshots already committed to the project's own repository (user manuals, diagrams).
 */

import payrollCover from "./work/payroll-accounting/cover.webp";
import payrollVoucher from "./work/payroll-accounting/voucher.webp";
import payrollOvertime from "./work/payroll-accounting/overtime-modal.webp";
import payrollAccounts from "./work/payroll-accounting/chart-of-accounts.webp";
import payrollParameters from "./work/payroll-accounting/parameters.webp";
import payrollHome from "./work/payroll-accounting/home.webp";
import payrollGoTo from "./work/payroll-accounting/go-to.webp";
import payrollReports from "./work/payroll-accounting/reports.webp";

import hotelCover from "./work/hotel-logistico/cover.webp";
import hotelMobile from "./work/hotel-logistico/mobile.webp";
import hotelRooms from "./work/hotel-logistico/rooms.webp";
import hotelIntro from "./work/hotel-logistico/intro.webp";
import hotelPool from "./work/hotel-logistico/pool.webp";
import hotelGallery from "./work/hotel-logistico/gallery.webp";

import leonsCover from "./work/leons-footwear/cover.webp";
import leonsProducts from "./work/leons-footwear/products.webp";
import leonsLines from "./work/leons-footwear/lines.webp";
import leonsProduct from "./work/leons-footwear/product.webp";
import leonsMobile from "./work/leons-footwear/mobile.webp";
import leonsCollections from "./work/leons-footwear/collections.webp";

import kilnCover from "./work/kiln/cover.webp";
import kilnPerImage from "./work/kiln/per-image.webp";
import kilnDone from "./work/kiln/batch-done.webp";
import kilnHistory from "./work/kiln/history.webp";
import kilnDiagram from "./work/kiln/deployment-diagram.webp";
import kilnDocs from "./work/kiln/docs.webp";

import invCover from "./work/raw-materials-inventory/cover.webp";
import invEntry from "./work/raw-materials-inventory/entry.webp";
import invReport from "./work/raw-materials-inventory/report.webp";
import invSummary from "./work/raw-materials-inventory/summary.webp";
import invCount from "./work/raw-materials-inventory/count.webp";
import invProducts from "./work/raw-materials-inventory/products.webp";
import invPrintable from "./work/raw-materials-inventory/printable.webp";

import planningCover from "./work/leons-planning/cover.webp";
import loulozList from "./work/louloz-inventory/list.webp";
import loulozFilters from "./work/louloz-inventory/filters.webp";
import loulozSizes from "./work/louloz-inventory/sizes.webp";
import groomersCover from "./work/groomers-house/cover.webp";
import progressDashboard from "./work/myprogress/dashboard.webp";
import progressStats from "./work/myprogress/stats.webp";
import progressWeight from "./work/myprogress/bodyweight.webp";
import impostorCover from "./work/impostor/cover.webp";
import preflopCover from "./work/preflop-viewer/cover.webp";
import reconCover from "./work/reconciliation-automations/cover.webp";

export type Shot = {
  src: StaticImageData;
  alt: Localized;
  caption?: Localized;
  /** CSS object-position when the panel crops the image. */
  position?: string;
};

export type PanelRow = {
  /** Aspect ratio of the whole row on wide screens, e.g. "16 / 9". */
  ratio: string;
  /** Aspect ratio used when the row collapses on small screens. */
  mobileRatio?: string;
  items: { shot: Shot; span: number }[];
};

export type StatusTone = "live" | "build" | "academic" | "personal";

export type FeaturedProject = {
  slug: string;
  name: string;
  title: Localized;
  client: Localized;
  kind: Localized;
  year: string;
  status: { tone: StatusTone; label: Localized };
  summary: Localized;
  highlights: Localized[];
  role: Localized;
  stack: string[];
  links: { live?: string; code?: string[] };
  panels: PanelRow[];
  story: {
    brief: Localized[];
    built: Localized[];
    engineering: { title: Localized; body: Localized }[];
    diagram?: "payroll" | "kiln";
    outcome: Localized[];
    note?: Localized;
    gallery: Shot[];
  };
};

export type SideProject = {
  slug: string;
  name: string;
  title: Localized;
  summary: Localized;
  kind: Localized;
  year: string;
  stack: string[];
  links: { live?: string; code?: string };
  cover: Shot;
  /** How the card composes its images: one cover, cover + detail, or a row of phone screens. */
  layout?: "single" | "split" | "phones";
  extra?: Shot[];
};

export type ArchiveItem = {
  year: string;
  name: string;
  what: Localized;
  tech: string[];
  link?: { href: string; label: string };
};

const L = (en: string, es: string): Localized => ({ en, es });

const CLIENT_SYSTEM = L("Client system", "Sistema para cliente");
const CLIENT_SITE = L("Client website", "Sitio para cliente");

export const featured: FeaturedProject[] = [
  {
    slug: "payroll-accounting",
    name: "Sistema Contable + Nómina",
    title: L("Payroll & accounting engine", "Motor de nómina y contabilidad"),
    client: L(
      "Industria Bizcopan Zapatoca — bread manufacturer, ~50 employees",
      "Industria Bizcopan Zapatoca — panificadora, ~50 empleados",
    ),
    kind: CLIENT_SYSTEM,
    year: "2026",
    status: { tone: "build", label: L("In build · go-live Jan 2027", "En construcción · salida en ene. 2027") },
    summary: L(
      "The factory's own replacement for Siesa ERP: Colombian payroll, automatic accounting vouchers, DIAN electronic payroll and PILA social-security files — with snapshots, reversals and an audit trail.",
      "El reemplazo propio del ERP Siesa para la fábrica: nómina colombiana, comprobantes contables automáticos, nómina electrónica DIAN y planillas PILA — con snapshots, reversiones y auditoría.",
    ),
    highlights: [
      L(
        "Reverse-engineered Siesa's payroll documents and wrote down 22 business rules and 18 architecture decisions before the engine existed.",
        "Hice ingeniería inversa de los documentos de nómina de Siesa y dejé por escrito 22 reglas de negocio y 18 decisiones de arquitectura antes de que existiera el motor.",
      ),
      L(
        "Every payroll run becomes balanced accounting vouchers, DIAN UBL XML signed with XAdES, PILA flat files and bank payment batches.",
        "Cada liquidación se convierte en comprobantes contables cuadrados, XML UBL para la DIAN firmado con XAdES, planillas PILA y lotes de pago bancario.",
      ),
      L(
        "569 automated tests — including a golden test that replays January 2026 end to end — behind a nine-stage CI pipeline.",
        "569 pruebas automatizadas — incluida una prueba golden que reproduce enero de 2026 de punta a punta — detrás de un pipeline de CI de nueve etapas.",
      ),
    ],
    role: L(
      "Sole developer: discovery, architecture, back end and front end",
      "Desarrollador único: levantamiento, arquitectura, back end y front end",
    ),
    stack: ["Python", "FastAPI", "SQLAlchemy 2 (async)", "PostgreSQL 16", "Alembic", "Redis + arq", "React 18", "TanStack Query", "Tailwind CSS", "pytest", "GitHub Actions", "Docker"],
    links: {},
    panels: [
      {
        ratio: "16 / 9.6",
        mobileRatio: "4 / 3",
        items: [
          {
            span: 12,
            shot: {
              src: payrollCover,
              position: "left top",
              alt: L(
                "Live draft of the first September fortnight in the ledger-style interface: section rail and tabs, eight employees with hours, earnings, deductions and net pay, one row expanded into its concept lines and the totals pinned at the bottom.",
                "Borrador vivo de la primera quincena de septiembre en la interfaz tipo libro mayor: riel de secciones y pestañas, ocho empleados con horas, devengos, deducciones y neto, una fila desplegada en sus conceptos y los totales fijos abajo.",
              ),
            },
          },
        ],
      },
      {
        ratio: "16 / 6.4",
        mobileRatio: "4 / 3",
        items: [
          {
            span: 7,
            shot: {
              src: payrollVoucher,
              position: "left top",
              alt: L(
                "Accounting vouchers generated by the payroll run, in the dark theme: one open with equal debits and credits and its eight lines.",
                "Comprobantes contables generados por la liquidación, en tema oscuro: uno abierto con débitos y créditos iguales y sus ocho líneas.",
              ),
            },
          },
          {
            span: 5,
            shot: {
              src: payrollOvertime,
              position: "left top",
              alt: L(
                "Dialog to add a novelty to an employee: earnings and deductions tabs, and for overtime the hours, the ordinary hourly rate filled automatically, the surcharge factor and the cost center.",
                "Diálogo para agregar una novedad a un empleado: pestañas de devengos y deducciones y, para horas extras, las horas, el valor de la hora ordinaria calculado, el factor de recargo y el centro de costo.",
              ),
            },
          },
        ],
      },
    ],
    story: {
      brief: [
        L(
          "Bizcopan, a bread factory in Zapatoca (Santander), runs payroll and accounting for about fifty people on Siesa, a commercial ERP. The goal: replace it with a system the company owns, aligned with Colombian labor law and trusted by the accounting team from day one.",
          "Bizcopan, una panificadora de Zapatoca (Santander), liquida la nómina y la contabilidad de unas cincuenta personas en Siesa, un ERP comercial. El objetivo: reemplazarlo por un sistema propio, alineado con la ley laboral colombiana y en el que el equipo contable confíe desde el primer día.",
        ),
        L(
          "Trust is the hard part, so the project started without code: a study of the legal framework, reverse-engineering of Siesa's monthly documents, a questionnaire with the person who runs payroll, and a data model built from what the old system actually produces.",
          "La confianza es lo difícil, así que el proyecto empezó sin código: estudio del marco legal, ingeniería inversa de los documentos mensuales de Siesa, un cuestionario con la persona que liquida la nómina y un modelo de datos construido a partir de lo que el sistema anterior realmente produce.",
        ),
      ],
      built: [
        L("Payroll engine for fortnightly and monthly runs, with monthly snapshots of provisions and contributions", "Motor de nómina quincenal y mensual, con snapshots mensuales de provisiones y aportes"),
        L("Novelties: overtime and surcharges, leave, sick leave, vacations and loan installments", "Novedades: horas extras y recargos, licencias, incapacidades, vacaciones y cuotas de préstamos"),
        L("Automatic accounting vouchers for every payroll, with reversals and a chart-of-accounts tree", "Comprobantes contables automáticos por cada nómina, con reversión y árbol del PUC"),
        L("DIAN electronic payroll: UBL XML, XAdES signature and transmission tracking", "Nómina electrónica DIAN: XML UBL, firma XAdES y seguimiento de transmisiones"),
        L("PILA flat files with integrity hash, payment batches and bank flat files", "Planillas PILA con hash de integridad, lotes de pago y archivos planos bancarios"),
        L("Employee inquiry by period, opening balances imported from Excel, month-end closing", "Consulta de empleado por periodo, saldos iniciales importados desde Excel y cierre mensual"),
        L("A ledger-style interface in light and dark: section rail, tabs, grouped processes and a Ctrl K “Go to…” search", "Una interfaz tipo libro mayor en claro y oscuro: riel de secciones, pestañas, procesos agrupados y buscador «Ir a…» con Ctrl K"),
      ],
      engineering: [
        {
          title: L("Rules before code", "Reglas antes que código"),
          body: L(
            "22 business rules and 18 ADRs were written and reviewed before the first migration. Each module's design names the rules it implements, so a disagreement about a number becomes a conversation about a rule.",
            "22 reglas de negocio y 18 ADR se escribieron y revisaron antes de la primera migración. El diseño de cada módulo nombra las reglas que implementa, así que una diferencia en un número se vuelve una conversación sobre una regla.",
          ),
        },
        {
          title: L("Tests that include the real world", "Pruebas que incluyen el mundo real"),
          body: L(
            "Unit tests for pure calculations, integration tests against a real PostgreSQL started with testcontainers, and a golden test that replays a full month of payroll.",
            "Pruebas unitarias para los cálculos puros, de integración contra un PostgreSQL real levantado con testcontainers y una prueba golden que reproduce un mes completo de nómina.",
          ),
        },
        {
          title: L("CI as a gate", "El CI como puerta"),
          body: L(
            "ruff, mypy --strict, three pytest suites, an Alembic upgrade/downgrade round-trip, the front-end build and a Docker build must pass before staging deploys.",
            "ruff, mypy --strict, tres suites de pytest, un ciclo de upgrade/downgrade de Alembic, el build del front end y un build de Docker deben pasar antes de desplegar a staging.",
          ),
        },
        {
          title: L("Safe to rehearse", "Seguro para ensayar"),
          body: L(
            "A playground mode mocks DIAN and the banks and shows a banner on every screen, so the accounting team can practice without anything leaving the building.",
            "Un modo playground simula la DIAN y los bancos y muestra un aviso en cada pantalla, para que el equipo contable practique sin que nada salga de la empresa.",
          ),
        },
        {
          title: L("Async where it pays", "Asíncrono donde conviene"),
          body: L(
            "SQLAlchemy 2 async on FastAPI for the API, Alembic kept synchronous by decision, and DIAN retries and polling in an arq worker on Redis with backoff.",
            "SQLAlchemy 2 asíncrono sobre FastAPI para la API, Alembic síncrono por decisión, y reintentos y consultas a la DIAN en un worker de arq sobre Redis con backoff.",
          ),
        },
      ],
      diagram: "payroll",
      outcome: [
        L(
          "Payroll, accounting and social-security modules are built and tested. A parallel run against Siesa is planned for October–December 2026, with go-live in January 2027.",
          "Los módulos de nómina, contabilidad y seguridad social están construidos y probados. La marcha en paralelo contra Siesa está planeada para octubre–diciembre de 2026 y la salida a producción para enero de 2027.",
        ),
        L(
          "Multi-company support is in the design from the start — a second company is already on the roadmap.",
          "El soporte multiempresa está en el diseño desde el inicio: ya hay una segunda empresa en la hoja de ruta.",
        ),
      ],
      note: L(
        "Screens show fictional employees created in the system's playground mode. No real payroll data appears on this site.",
        "Las pantallas muestran empleados ficticios creados en el modo playground del sistema. En este sitio no aparece ningún dato real de nómina.",
      ),
      gallery: [
        {
          src: payrollHome,
          alt: L("Home screen in the dark theme: shortcuts to the daily tasks and the seven steps of the month-end route, next to the keyboard shortcuts.", "Pantalla de inicio en tema oscuro: accesos directos a las tareas del día y los siete pasos de la ruta del cierre mensual, junto a los atajos de teclado."),
          caption: L("Home: shortcuts for the day and the month-end route, step by step.", "Inicio: accesos directos del día y la ruta del cierre mensual, paso a paso."),
        },
        {
          src: payrollGoTo,
          alt: L("The “Go to…” palette open over the home screen, listing screens that match the typed letters, each with its section.", "La paleta «Ir a…» abierta sobre el inicio, con las pantallas que coinciden con lo escrito, cada una con su sección."),
          caption: L("Ctrl K: any screen by name or code, as accountants used to in Siesa.", "Ctrl K: cualquier pantalla por nombre o código, como el equipo contable lo hacía en Siesa."),
        },
        {
          src: payrollAccounts,
          alt: L("Chart of accounts as an expandable tree: assets, liabilities, equity, income, expenses and production costs.", "Plan de cuentas como árbol desplegable: activo, pasivo, patrimonio, ingresos, gastos y costos de producción."),
          caption: L("The company's chart of accounts as a navigable tree.", "El PUC de la empresa como un árbol navegable."),
        },
        {
          src: payrollParameters,
          alt: L("Yearly parameters for 2026: health, pension and severance percentages, transport allowance and thresholds.", "Parámetros del año 2026: porcentajes de salud, pensión y cesantías, auxilio de transporte y umbrales."),
          caption: L("Yearly legal parameters live in data, not in code.", "Los parámetros legales del año viven en datos, no en el código."),
        },
        {
          src: payrollReports,
          alt: L("Reports index in the dark theme, grouped into accounting, payroll, controls and reconciliations, and contracts.", "Índice de reportes en tema oscuro, agrupado en contabilidad, nómina, controles y cuadres, y contratos."),
          caption: L("Reports grouped by what they answer: accounting, payroll, controls.", "Reportes agrupados por lo que responden: contabilidad, nómina, controles."),
        },
      ],
    },
  },
  {
    slug: "hotel-logistico",
    name: "Hotel Logístico",
    title: L("A hotel's front door, WhatsApp-first", "La puerta de entrada de un hotel, directo a WhatsApp"),
    client: L("Hotel Logístico — Santa Marta, Colombian Caribbean", "Hotel Logístico — Santa Marta, Caribe colombiano"),
    kind: CLIENT_SITE,
    year: "2026",
    status: { tone: "live", label: L("Live · hotellogistico.com", "En línea · hotellogistico.com") },
    summary: L(
      "A framework-free landing page for a hotel ten minutes from El Rodadero: aerial video, room carousels, a gallery and a booking form that turns into a WhatsApp message.",
      "Una landing sin frameworks para un hotel a diez minutos de El Rodadero: video aéreo, carruseles de habitaciones, galería y un formulario de reserva que se convierte en un mensaje de WhatsApp.",
    ),
    highlights: [
      L(
        "Hand-written HTML, CSS and JavaScript — no framework, no build step — on Vercel with the hotel's own domain.",
        "HTML, CSS y JavaScript escritos a mano — sin framework ni build — en Vercel con el dominio propio del hotel.",
      ),
      L(
        "Infinite room carousels with cloned slides, touch swipe and a guard against racing gestures.",
        "Carruseles infinitos de habitaciones con slides clonados, swipe táctil y una guarda contra gestos simultáneos.",
      ),
      L(
        "One constant controls every WhatsApp link, and the contact form composes the message — no backend needed.",
        "Una sola constante controla todos los enlaces de WhatsApp y el formulario arma el mensaje: no hace falta backend.",
      ),
    ],
    role: L("Design and development", "Diseño y desarrollo"),
    stack: ["HTML", "CSS", "JavaScript", "Google Maps", "Vercel"],
    links: { live: "https://www.hotellogistico.com" },
    panels: [
      {
        ratio: "16 / 7.6",
        mobileRatio: "4 / 3.4",
        items: [
          {
            span: 9,
            shot: {
              src: hotelCover,
              position: "center",
              alt: L(
                "Hotel Logístico home page: aerial video of a Santa Marta beach behind the headline “Hotel en Santa Marta” and a WhatsApp booking button.",
                "Inicio de Hotel Logístico: video aéreo de una playa de Santa Marta detrás del titular «Hotel en Santa Marta» y un botón para reservar por WhatsApp.",
              ),
            },
          },
          {
            span: 3,
            shot: {
              src: hotelMobile,
              position: "center top",
              alt: L("The same hero on a phone.", "El mismo inicio en un teléfono."),
            },
          },
        ],
      },
      {
        ratio: "16 / 5.6",
        mobileRatio: "16 / 9",
        items: [
          {
            span: 12,
            shot: {
              src: hotelPool,
              position: "center",
              alt: L("Pool section: a photo of the pool area next to the heading “Zona de piscina”.", "Sección de piscina: foto del área de piscina junto al título «Zona de piscina»."),
            },
          },
        ],
      },
    ],
    story: {
      brief: [
        L(
          "Hotel Logístico is a small hotel in Bureche, Santa Marta — close to El Rodadero, the historic center and the airport. Bookings happen over WhatsApp, not through a booking engine, so the site had one job: make people want to stay, then start the conversation.",
          "Hotel Logístico es un hotel pequeño en Bureche, Santa Marta, cerca de El Rodadero, el centro histórico y el aeropuerto. Las reservas se hacen por WhatsApp, no con un motor de reservas, así que el sitio tenía un trabajo: dar ganas de quedarse y empezar la conversación.",
        ),
        L(
          "The brief was explicit: minimal, elegant, boutique; no Bootstrap, no libraries; mobile-first on every change.",
          "El encargo era explícito: minimalista, elegante, boutique; sin Bootstrap, sin librerías; primero móvil en cada cambio.",
        ),
      ],
      built: [
        L("Aerial video hero with a single, obvious call to action", "Inicio con video aéreo y una sola llamada a la acción, obvia"),
        L("Four room types with photo carousels and amenity tags", "Cuatro tipos de habitación con carrusel de fotos y etiquetas de servicios"),
        L("Services, pool preview and a gallery with a navigable lightbox", "Servicios, adelanto de la piscina y galería con lightbox navegable"),
        L("Guest reviews, map with travel times, and a two-column FAQ", "Reseñas de huéspedes, mapa con tiempos de desplazamiento y preguntas frecuentes a dos columnas"),
        L("A validated contact form that opens WhatsApp with the message ready", "Formulario de contacto validado que abre WhatsApp con el mensaje listo"),
        L("robots.txt and sitemap.xml for search engines", "robots.txt y sitemap.xml para los buscadores"),
      ],
      engineering: [
        {
          title: L("Carousels that don't stutter", "Carruseles que no tartamudean"),
          body: L(
            "An infinite loop with cloned first and last slides. The snap-back runs on a timer instead of transitionend — unreliable off-screen — with a guard flag against racing swipes.",
            "Un loop infinito con el primer y el último slide clonados. El salto de regreso usa un temporizador en lugar de transitionend — poco fiable fuera de pantalla — con una bandera que evita swipes simultáneos.",
          ),
        },
        {
          title: L("One source of truth", "Una sola fuente de verdad"),
          body: L(
            "The WhatsApp number is defined once; on load, a script rewrites every wa.me link in the page.",
            "El número de WhatsApp se define una vez; al cargar, un script reescribe todos los enlaces wa.me de la página.",
          ),
        },
        {
          title: L("Clean URLs while scrolling", "URLs limpias al navegar"),
          body: L(
            "Navigation uses data attributes and scrolls with the navbar's offset, so the address bar never fills with hashes.",
            "La navegación usa atributos data y hace scroll con el desfase de la barra, así la dirección nunca se llena de hashes.",
          ),
        },
        {
          title: L("Type that sells the room", "Tipografía que vende la habitación"),
          body: L(
            "Cormorant Garamond for display, Inter for text, one gold accent over warm neutrals.",
            "Cormorant Garamond para títulos, Inter para texto y un solo acento dorado sobre neutros cálidos.",
          ),
        },
      ],
      outcome: [
        L("Live at hotellogistico.com, served by Vercel over HTTPS.", "En línea en hotellogistico.com, servido por Vercel con HTTPS."),
      ],
      gallery: [
        {
          src: hotelIntro,
          alt: L("About section with the hotel's façade at night and three quick facts.", "Sección «Sobre nosotros» con la fachada del hotel de noche y tres datos rápidos."),
          caption: L("A refuge, in two sentences and one façade.", "Un refugio, en dos frases y una fachada."),
        },
        {
          src: hotelRooms,
          alt: L("Room cards for single and double rooms, each with photos and amenity tags.", "Tarjetas de habitación sencilla y doble, cada una con fotos y etiquetas de servicios."),
          caption: L("Room cards with swipeable photo carousels.", "Tarjetas de habitación con carruseles de fotos deslizables."),
        },
        {
          src: hotelGallery,
          alt: L("Gallery grid with the lobby, a corridor and the façade.", "Galería con el lobby, un pasillo y la fachada."),
          caption: L("Gallery with a keyboard- and swipe-navigable lightbox.", "Galería con lightbox navegable con teclado y swipe."),
        },
      ],
    },
  },
  {
    slug: "leons-footwear",
    name: "LEONS Footwear",
    title: L("Wholesale catalog for a shoe factory", "Catálogo mayorista para una fábrica de calzado"),
    client: L("Calzado Leons — footwear manufacturer, Bucaramanga", "Calzado Leons — fábrica de calzado, Bucaramanga"),
    kind: CLIENT_SITE,
    year: "2026",
    status: { tone: "live", label: L("Live · calzadoleons.com", "En línea · calzadoleons.com") },
    summary: L(
      "An editorial catalog for a Colombian shoe manufacturer that sells to chains and distributors — plus a Python pipeline that turns raw product photos into one consistent, studio-style catalog.",
      "Un catálogo editorial para una fábrica colombiana que vende a cadenas y distribuidores — con un pipeline en Python que convierte fotos crudas de producto en un catálogo uniforme, estilo estudio.",
    ),
    highlights: [
      L(
        "Next.js App Router with a typed, static catalog: pages are prerendered and there's no database to run.",
        "Next.js con App Router y un catálogo estático tipado: las páginas se prerenderizan y no hay base de datos que mantener.",
      ),
      L(
        "A rembg + Pillow pipeline removes backgrounds, corrects color and contrast, composes every shoe on the same card and regenerates the catalog file.",
        "Un pipeline con rembg y Pillow quita el fondo, corrige color y contraste, compone cada zapato sobre la misma tarjeta y regenera el archivo del catálogo.",
      ),
      L(
        "Filters by gender and line live in the URL, and every product ends in a WhatsApp or email inquiry.",
        "Los filtros por género y línea viven en la URL, y cada producto termina en una consulta por WhatsApp o correo.",
      ),
    ],
    role: L("Design and development", "Diseño y desarrollo"),
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS v4", "Python", "rembg", "Pillow", "Vercel"],
    links: { live: "https://calzadoleons.com" },
    panels: [
      {
        ratio: "16 / 10",
        mobileRatio: "16 / 11",
        items: [
          {
            span: 12,
            shot: {
              src: leonsCover,
              position: "center top",
              alt: L(
                "LEONS Footwear home page: the headline “Calidad que se impone” beside a photo of a man holding a white sneaker.",
                "Inicio de LEONS Footwear: el titular «Calidad que se impone» junto a la foto de un hombre que sostiene una zapatilla blanca.",
              ),
            },
          },
        ],
      },
      {
        ratio: "16 / 7",
        mobileRatio: "4 / 3.6",
        items: [
          {
            span: 8,
            shot: {
              src: leonsProducts,
              position: "center 30%",
              alt: L(
                "Featured products: eight shoes photographed on identical beige cards, the output of the image pipeline.",
                "Productos destacados: ocho zapatos sobre tarjetas beige idénticas, resultado del pipeline de imágenes.",
              ),
            },
          },
          {
            span: 4,
            shot: {
              src: leonsMobile,
              position: "center top",
              alt: L("The home page on a phone.", "El inicio en un teléfono."),
            },
          },
        ],
      },
    ],
    story: {
      brief: [
        L(
          "Calzado Leons has made outdoor, casual and sport shoes in Bucaramanga for more than twenty years, selling wholesale to chains, distributors and stores across Colombia. The site had to make the collection look as good as the product and route every buyer to a conversation.",
          "Calzado Leons fabrica calzado outdoor, casual y deportivo en Bucaramanga hace más de veinte años y vende al por mayor a cadenas, distribuidores y tiendas de todo el país. El sitio tenía que hacer que la colección se viera tan bien como el producto y llevar a cada comprador a una conversación.",
        ),
        L(
          "The hard part wasn't the pages — it was the photos. Product shots taken in different conditions had to look like one catalog.",
          "Lo difícil no eran las páginas, eran las fotos: imágenes de producto tomadas en condiciones distintas tenían que verse como un solo catálogo.",
        ),
      ],
      built: [
        L("Home with featured pieces, collections by gender and eight product lines", "Inicio con piezas destacadas, colecciones por género y ocho líneas de producto"),
        L("Catalog with filters by gender and line, reflected in shareable URLs", "Catálogo con filtros por género y línea, reflejados en URLs compartibles"),
        L("Product pages with gallery, reference data and previous/next navigation", "Páginas de producto con galería, datos de referencia y navegación anterior/siguiente"),
        L("A wholesale section and a WhatsApp or email inquiry on every product", "Sección mayorista y consulta por WhatsApp o correo en cada producto"),
        L("An image pipeline that regenerates the typed catalog from processed photos", "Un pipeline de imágenes que regenera el catálogo tipado a partir de las fotos procesadas"),
      ],
      engineering: [
        {
          title: L("The catalog is data, not a database", "El catálogo es un archivo, no una base de datos"),
          body: L(
            "Products live in a typed TypeScript module and every page is generated at build time. Nothing to patch, nothing to keep awake.",
            "Los productos viven en un módulo TypeScript tipado y cada página se genera en el build. Nada que parchar, nada que mantener encendido.",
          ),
        },
        {
          title: L("A pipeline instead of a photo studio", "Un pipeline en lugar de un estudio fotográfico"),
          body: L(
            "rembg removes the background; Pillow adjusts contrast and color and composes the result on a uniform beige card; the script writes the catalog file the site imports.",
            "rembg quita el fondo; Pillow ajusta contraste y color y compone el resultado sobre una tarjeta beige uniforme; el script escribe el archivo de catálogo que importa el sitio.",
          ),
        },
        {
          title: L("A small brand system", "Un sistema de marca pequeño"),
          body: L(
            "Cormorant Garamond and Poppins through next/font, and a warm cream-and-leather theme defined once in Tailwind CSS v4.",
            "Cormorant Garamond y Poppins con next/font, y un tema cálido de crema y cuero definido una sola vez en Tailwind CSS v4.",
          ),
        },
      ],
      outcome: [
        L(
          "Live at calzadoleons.com. Pushes to main deploy automatically and every pull request gets a preview.",
          "En línea en calzadoleons.com. Cada push a main se despliega solo y cada pull request tiene su vista previa.",
        ),
      ],
      gallery: [
        {
          src: leonsLines,
          alt: L("Grid of eight product lines — boot, casual, sport, outdoor, urban and women's lines — each with a lifestyle photo.", "Grilla de ocho líneas de producto — bota, casual, deportivo, outdoor, urbano y líneas de dama — cada una con una foto de estilo de vida."),
          caption: L("The collection organized by line, each tile a filtered catalog URL.", "La colección organizada por línea; cada tarjeta es una URL de catálogo filtrado."),
        },
        {
          src: leonsProduct,
          alt: L("Product page for the “Miel” boot with gallery, reference data and a WhatsApp inquiry button.", "Página de producto de la bota «Miel» con galería, datos de referencia y botón de consulta por WhatsApp."),
          caption: L("Product detail: gallery, reference and one clear next step.", "Detalle de producto: galería, referencia y un siguiente paso claro."),
        },
        {
          src: leonsCollections,
          alt: L("Men's and women's collections as two large photo cards with reference counts.", "Colecciones de hombre y dama como dos tarjetas grandes con el número de referencias."),
          caption: L("Men's and women's collections.", "Colecciones de hombre y dama."),
        },
      ],
    },
  },
  {
    slug: "kiln",
    name: "Kiln",
    title: L("Distributed image processing", "Procesamiento distribuido de imágenes"),
    client: L("Course project — Universidad Pontificia Bolivariana", "Proyecto de curso — Universidad Pontificia Bolivariana"),
    kind: L("Academic project", "Proyecto académico"),
    year: "2026",
    status: { tone: "academic", label: L("Academic · open source", "Académico · código abierto") },
    summary: L(
      "Upload a batch, define global and per-image transformations, and a pool of worker nodes processes it in parallel through RabbitMQ — with PostgreSQL replication and shared storage across five virtual machines.",
      "Subes un lote, defines transformaciones globales y por imagen, y un grupo de nodos worker lo procesa en paralelo a través de RabbitMQ — con replicación de PostgreSQL y almacenamiento compartido entre cinco máquinas virtuales.",
    ),
    highlights: [
      L(
        "FastAPI publishes one task per image to RabbitMQ; worker nodes with four threads each consume, process and acknowledge them.",
        "FastAPI publica una tarea por imagen en RabbitMQ; nodos worker con cuatro hilos cada uno las consumen, procesan y confirman.",
      ),
      L(
        "A PostgreSQL primary with a streaming-replication standby and NFS for shared files, deployed on five VirtualBox VMs — and on Docker Compose.",
        "Un PostgreSQL primario con réplica por streaming replication y NFS para los archivos compartidos, desplegado en cinco VMs de VirtualBox — y en Docker Compose.",
      ),
      L(
        "Kiln, the web client, is dependency-free JavaScript: batch builder, 11 transformation types, live progress and ZIP download.",
        "Kiln, el cliente web, es JavaScript sin dependencias: constructor de lotes, 11 tipos de transformación, progreso en vivo y descarga en ZIP.",
      ),
    ],
    role: L("Design and implementation", "Diseño e implementación"),
    stack: ["Python", "FastAPI", "RabbitMQ", "PostgreSQL", "NFS", "Docker Compose", "VirtualBox", "Vanilla JS"],
    links: {
      code: ["https://github.com/CratosCamilo/image-processing-system", "https://github.com/CratosCamilo/klin-frontend"],
    },
    panels: [
      {
        ratio: "16 / 10",
        mobileRatio: "16 / 11",
        items: [
          {
            span: 12,
            shot: {
              src: kilnCover,
              position: "center top",
              alt: L(
                "Kiln's batch builder: eight uploaded photos on the left and a stack of global transformations — resize, contrast, sharpen, watermark, convert — on the right.",
                "Constructor de lotes de Kiln: ocho fotos cargadas a la izquierda y una pila de transformaciones globales — resize, contrast, sharpen, watermark, convert — a la derecha.",
              ),
            },
          },
        ],
      },
      {
        ratio: "16 / 6",
        mobileRatio: "4 / 3.2",
        items: [
          {
            span: 7,
            shot: {
              src: kilnDone,
              position: "left top",
              alt: L(
                "Batch detail after processing: 8 of 8 images completed, progress at 100% and a ZIP download button.",
                "Detalle del lote después del proceso: 8 de 8 imágenes completadas, progreso al 100% y botón para descargar el ZIP.",
              ),
            },
          },
          {
            span: 5,
            shot: {
              src: kilnDiagram,
              position: "center 55%",
              alt: L(
                "UML deployment diagram: API server with RabbitMQ and storage, two worker nodes, a primary database and its read-only replica.",
                "Diagrama de despliegue UML: servidor de API con RabbitMQ y almacenamiento, dos nodos worker, una base de datos primaria y su réplica de solo lectura.",
              ),
            },
          },
        ],
      },
    ],
    story: {
      brief: [
        L(
          "A distributed-systems assignment taken past the minimum: a client uploads N images, each with a JSON list of transformations, and the system spreads the work across nodes, tracks every task and hands back a ZIP when the batch is done.",
          "Un proyecto de sistemas distribuidos llevado más allá del mínimo: un cliente sube N imágenes, cada una con una lista JSON de transformaciones, y el sistema reparte el trabajo entre nodos, sigue cada tarea y devuelve un ZIP cuando el lote termina.",
        ),
        L(
          "Real machines instead of one process made it interesting: failures can happen anywhere, and state has to stay consistent while they do.",
          "Usar máquinas reales en lugar de un solo proceso lo volvió interesante: las fallas pueden pasar en cualquier parte y el estado tiene que seguir consistente mientras tanto.",
        ),
      ],
      built: [
        L("REST API to create batches (files or ZIP), query progress and download results", "API REST para crear lotes (archivos o ZIP), consultar el progreso y descargar resultados"),
        L("Worker nodes with configurable thread pools consuming RabbitMQ with ack/nack", "Nodos worker con pools de hilos configurables que consumen RabbitMQ con ack/nack"),
        L("11 transformations: resize, grayscale, rotate, crop, flip, blur, sharpen, brightness, contrast, watermark, format conversion", "11 transformaciones: resize, escala de grises, rotación, recorte, flip, desenfoque, nitidez, brillo, contraste, marca de agua y conversión de formato"),
        L("Batch, task and node state in PostgreSQL, streamed to a read-only replica", "Estado de lotes, tareas y nodos en PostgreSQL, replicado a una réplica de solo lectura"),
        L("Kiln web client: JWT login, global and per-image steps, live JSON preview, polling and ZIP download", "Cliente web Kiln: login con JWT, pasos globales y por imagen, vista previa del JSON, polling y descarga en ZIP"),
        L("Automatic cleanup of inputs after processing and of outputs after download", "Limpieza automática de entradas al procesar y de resultados al descargar"),
      ],
      engineering: [
        {
          title: L("The upload never waits for the queue", "La carga nunca espera a la cola"),
          body: L(
            "The API stores the files, writes the batch and publishes tasks in a background task, so the client gets its batch id immediately.",
            "La API guarda los archivos, registra el lote y publica las tareas en segundo plano, así el cliente recibe el id del lote de inmediato.",
          ),
        },
        {
          title: L("Degrade, don't crash", "Degradar, no caerse"),
          body: L(
            "If RabbitMQ is down, the API still starts and answers new batches with 503 instead of failing at boot.",
            "Si RabbitMQ está caído, la API igual arranca y responde a los lotes nuevos con 503 en lugar de fallar al iniciar.",
          ),
        },
        {
          title: L("State as a catalog", "El estado como catálogo"),
          body: L(
            "Batch, task, result and node states are catalog tables; nodes register themselves, and a batch closes when its last task completes.",
            "Los estados de lote, tarea, resultado y nodo son tablas de catálogo; los nodos se registran solos y un lote se cierra cuando termina su última tarea.",
          ),
        },
        {
          title: L("Replication for reads", "Replicación para lecturas"),
          body: L(
            "WAL streaming replication keeps a hot standby of the database on its own virtual machine.",
            "La replicación por streaming de WAL mantiene una réplica en caliente de la base de datos en su propia máquina virtual.",
          ),
        },
      ],
      diagram: "kiln",
      outcome: [
        L(
          "Deployed on five VirtualBox VMs over a bridged network and reproducible with Docker Compose. The screens on this page come from a local run processing an eight-image batch.",
          "Desplegado en cinco VMs de VirtualBox sobre una red en puente y reproducible con Docker Compose. Las pantallas de esta página vienen de una ejecución local procesando un lote de ocho imágenes.",
        ),
      ],
      gallery: [
        {
          src: kilnPerImage,
          alt: L("Per-image mode: one photo selected with its own rotate and grayscale steps and a JSON preview.", "Modo por imagen: una foto seleccionada con sus propios pasos de rotación y escala de grises y la vista previa del JSON."),
          caption: L("Per-image steps stack on top of the global ones.", "Los pasos por imagen se suman a los globales."),
        },
        {
          src: kilnHistory,
          alt: L("Batch history table with id, image count, date, status and a progress bar.", "Historial de lotes con id, número de imágenes, fecha, estado y barra de progreso."),
          caption: L("Batch history, refreshed against the API.", "Historial de lotes, refrescado contra la API."),
        },
        {
          src: kilnDocs,
          alt: L("Kiln's docs page: the 11 available transformations with their parameters, the recommended order and the API flow.", "Página de documentación de Kiln: las 11 transformaciones disponibles con sus parámetros, el orden recomendado y el flujo de la API."),
          caption: L("Docs rendered live from GET /info: transformations, order and flow.", "Documentación en vivo desde GET /info: transformaciones, orden y flujo."),
        },
      ],
    },
  },
  {
    slug: "raw-materials-inventory",
    name: "Inventario Materia Prima",
    title: L("Raw-material inventory for a bread factory", "Inventario de materia prima para una panificadora"),
    client: L("Industria Bizcopan Zapatoca — bakery and pastry warehouses", "Industria Bizcopan Zapatoca — bodegas de panadería y pastelería"),
    kind: CLIENT_SYSTEM,
    year: "2026",
    status: { tone: "live", label: L("In production", "En producción") },
    summary: L(
      "Real-time stock across the factory's warehouses: purchase entries with VAT per line, validated exits, physical counts, voiding with automatic reversal, a full audit trail and branded Excel and PDF reports.",
      "Stock en tiempo real en las bodegas de la fábrica: entradas con IVA por línea, salidas validadas, conteos físicos, anulaciones con reversión automática, auditoría completa y reportes en Excel y PDF con la marca de la empresa.",
    ),
    highlights: [
      L(
        "Two units per product — how it's bought and how it's counted — with conversion factors, plus weight-based items deducted by the kilo.",
        "Dos unidades por producto — cómo se compra y cómo se cuenta — con factor de conversión, y productos por peso que se descuentan por kilo.",
      ),
      L(
        "Five roles from admin to read-only viewer; admin fixes to past counts apply as deltas so later movements stay intact.",
        "Cinco roles, de administrador a visor de solo lectura; las correcciones del admin a conteos pasados se aplican como deltas para no pisar movimientos posteriores.",
      ),
      L(
        "Warehouses are data: admins create them from the UI, each with its own color palette and per-user access.",
        "Las bodegas son datos: el admin las crea desde la interfaz, cada una con su paleta de color y acceso por usuario.",
      ),
    ],
    role: L("Sole developer", "Desarrollador único"),
    stack: ["Next.js 14", "React 18", "TypeScript", "Drizzle ORM", "Turso (libSQL)", "JWT (jose)", "CSS Modules", "jsPDF", "xlsx-js-style"],
    links: {},
    panels: [
      {
        ratio: "16 / 9",
        mobileRatio: "16 / 10",
        items: [
          {
            span: 12,
            shot: {
              src: invCover,
              position: "left top",
              alt: L(
                "Current-stock screen for the bakery warehouse: totals by state and a table of products with stock, minimum, difference and status.",
                "Pantalla de stock actual de la bodega de panadería: totales por estado y una tabla de productos con stock, mínimo, diferencia y estado.",
              ),
            },
          },
        ],
      },
      {
        ratio: "16 / 6.8",
        mobileRatio: "4 / 3.4",
        items: [
          {
            span: 7,
            shot: {
              src: invEntry,
              position: "left top",
              alt: L(
                "Purchase-entry dialog in detailed mode: invoice number, supplier and product lines with quantity, unit and VAT.",
                "Diálogo de entrada en modo detallado: número de factura, proveedor y líneas de producto con cantidad, unidad e IVA.",
              ),
            },
          },
          {
            span: 5,
            shot: {
              src: invReport,
              position: "center top",
              alt: L("Report result with filters and export buttons for Excel and PDF.", "Resultado de un reporte con filtros y botones para exportar a Excel y PDF."),
            },
          },
        ],
      },
    ],
    story: {
      brief: [
        L(
          "Flour, butter, packaging and everything in between live in two warehouses — bakery and pastry. Entries arrive with supplier invoices; exits go to production, packaging or the point of sale.",
          "Harina, mantequilla, empaques y todo lo que hay en medio viven en dos bodegas: panadería y pastelería. Las entradas llegan con facturas de proveedores; las salidas van a producción, empaque o punto de venta.",
        ),
        L(
          "The system had to be quick to operate on a tablet, strict about stock, and transparent about every correction.",
          "El sistema tenía que ser rápido de operar en una tablet, estricto con el stock y transparente con cada corrección.",
        ),
      ],
      built: [
        L("Current stock with Normal / Low / Critical states and per-product history", "Stock actual con estados Normal / Bajo / Crítico e historial por producto"),
        L("Purchase entries with mandatory invoice number, VAT per line and an edit audit", "Entradas con folio de factura obligatorio, IVA por línea y auditoría de ediciones"),
        L("Exits validated against available stock before they're saved", "Salidas validadas contra el stock disponible antes de guardarse"),
        L("Adjustment batches from physical counts: system → physical → difference", "Ajustes en lote por conteo físico: sistema → físico → diferencia"),
        L("Report catalog with quick periods and Excel/PDF exports with the company letterhead", "Catálogo de reportes con periodos rápidos y exportación a Excel y PDF con membrete"),
        L("Printable blank count sheets and exit forms for manual capture", "Formatos imprimibles en blanco para conteos y salidas a mano"),
      ],
      engineering: [
        {
          title: L("Voiding is a movement, not a delete", "Anular es un movimiento, no un borrado"),
          body: L(
            "Canceling an entry or an exit writes its reversal and restores stock, so history stays complete.",
            "Anular una entrada o una salida registra su reversión y restituye el stock, así el historial queda completo.",
          ),
        },
        {
          title: L("Corrections as deltas", "Correcciones como deltas"),
          body: L(
            "Fixing a mistyped physical count applies the difference and syncs its movement instead of overwriting the stock, so later entries and exits survive.",
            "Corregir un conteo mal digitado aplica la diferencia y sincroniza su movimiento en vez de sobrescribir el stock, así las entradas y salidas posteriores se conservan.",
          ),
        },
        {
          title: L("SQLite in development, Turso in production", "SQLite en desarrollo, Turso en producción"),
          body: L(
            "One Drizzle schema: a local file while building, libSQL at the edge in production.",
            "Un solo esquema de Drizzle: un archivo local mientras se construye y libSQL en el edge en producción.",
          ),
        },
        {
          title: L("Seeded with the real catalog", "Sembrado con el catálogo real"),
          body: L(
            "168 real raw materials were loaded at setup, so the team started from their own product list, not an empty screen.",
            "168 materias primas reales se cargaron al instalar, así el equipo arrancó con su propia lista de productos y no con una pantalla vacía.",
          ),
        },
      ],
      outcome: [
        L(
          "Deployed on Vercel with Turso and documented in a user manual for the warehouse team. Version 2 added warehouses created from the UI and per-user access.",
          "Desplegado en Vercel con Turso y documentado en un manual de usuario para el equipo de bodega. La versión 2 agregó bodegas creadas desde la interfaz y acceso por usuario.",
        ),
      ],
      note: L(
        "Screens come from the system's user manual, captured with demo data.",
        "Las pantallas vienen del manual de usuario del sistema, capturadas con datos de demostración.",
      ),
      gallery: [
        {
          src: invSummary,
          alt: L("Summary dashboard of the warehouse.", "Resumen de la bodega."),
          caption: L("Warehouse summary.", "Resumen de la bodega."),
        },
        {
          src: invCount,
          alt: L("Physical count screen comparing system stock, physical stock and the difference per product.", "Pantalla de conteo físico que compara stock del sistema, stock físico y la diferencia por producto."),
          caption: L("Physical counts: system → physical → difference.", "Conteo físico: sistema → físico → diferencia."),
        },
        {
          src: invProducts,
          alt: L("Product list with category, units and conversion factor.", "Lista de productos con categoría, unidades y factor de conversión."),
          caption: L("Products with visual and base units.", "Productos con unidad visual y unidad base."),
        },
        {
          src: invPrintable,
          alt: L("Printable PDF with empty boxes to write the real stock by hand.", "PDF imprimible con casillas vacías para anotar el stock real a mano."),
          caption: L("A printable count sheet — for the days the tablet stays in the office.", "Un formato de conteo imprimible, para los días en que la tablet se queda en la oficina."),
        },
      ],
    },
  },
];

export const more: SideProject[] = [
  {
    slug: "leons-planning",
    name: "Calzado Leons",
    title: L("Production planning — degree project", "Planeación de producción — trabajo de grado"),
    summary: L(
      "My degree project at UPB: orders, bills of materials versioned by size and color, inventory and direct-cost estimation for a shoe factory, with material requirements saved as snapshots.",
      "Mi trabajo de grado en la UPB: pedidos, fórmulas de materiales versionadas por talla y color, inventario y estimación de costos directos para una fábrica de calzado, con requerimientos guardados como snapshots.",
    ),
    kind: L("Degree project · in progress", "Trabajo de grado · en curso"),
    year: "2026",
    stack: ["Express", "TypeScript", "Prisma", "PostgreSQL", "React", "Vite", "Vitest"],
    links: {},
    cover: {
      src: planningCover,
      position: "left top",
      alt: L(
        "Home screen in the dark theme: orders in progress by status, materials below minimum, latest inventory movements and variants still missing a formula.",
        "Pantalla de inicio en tema oscuro: pedidos en curso por estado, insumos bajo mínimo, últimos movimientos de inventario y variantes que aún no tienen fórmula.",
      ),
    },
  },
  {
    slug: "groomers-house",
    name: "The Groomer's House",
    title: L("Premium grooming salon", "Peluquería canina premium"),
    summary: L(
      "A dog-grooming salon in Floridablanca: dark-and-gold art direction, a before/after slider and booking through WhatsApp.",
      "Una peluquería canina en Floridablanca: dirección de arte en negro y dorado, comparador antes/después y agendamiento por WhatsApp.",
    ),
    kind: CLIENT_SITE,
    year: "2026",
    stack: ["HTML", "CSS", "JavaScript", "Vercel"],
    links: { live: "https://the-groomers-house.vercel.app", code: "https://github.com/CratosCamilo/the-groomers-house" },
    cover: {
      src: groomersCover,
      position: "center",
      alt: L(
        "The Groomer's House home page: a golden retriever in front of a neon sign with the headline “Peluquería canina en Floridablanca”.",
        "Inicio de The Groomer's House: un golden retriever frente a un letrero de neón con el titular «Peluquería canina en Floridablanca».",
      ),
    },

  },
  {
    slug: "louloz-inventory",
    name: "Louloz Inventario",
    title: L("Size-by-size stock for a footwear brand", "Stock talla por talla para una marca de calzado"),
    summary: L(
      "The stock tool of a Colombian footwear brand: every reference read size by size, filters by line, gender and availability, three ways to name the products, and editing behind a PIN — in light and dark.",
      "La herramienta de stock de una marca colombiana de calzado: cada referencia leída talla por talla, filtros por línea, género y disponibilidad, tres formas de nombrar los productos y edición protegida por PIN, en claro y oscuro.",
    ),
    kind: CLIENT_SYSTEM,
    year: "2026",
    stack: ["Next.js 16", "Tailwind v4", "Drizzle", "Turso"],
    links: { live: "https://louloz-inventario.vercel.app" },
    cover: {
      src: loulozList,
      position: "center top",
      alt: L(
        "Inventory list on a phone: each reference with its total pairs and a row of size chips, empty sizes drawn dashed.",
        "Lista de inventario en un teléfono: cada referencia con su total de pares y una fila de tallas, con las tallas vacías punteadas.",
      ),
    },
    layout: "phones",
    extra: [
      {
        src: loulozFilters,
        position: "center bottom",
        alt: L("Filters sheet with line, gender, stock level and the naming mode.", "Panel de filtros con línea, género, nivel de stock y la forma de nombrar."),
      },
      {
        src: loulozSizes,
        position: "center top",
        alt: L("A reference expanded in the dark theme, with the pairs of each size as large tiles.", "Una referencia desplegada en tema oscuro, con los pares de cada talla en fichas grandes."),
      },
    ],
  },
  {
    slug: "impostor",
    name: "Impostor",
    title: L("Real-time party game", "Juego multijugador en tiempo real"),
    summary: L(
      "A social-deduction card game for friends: rooms with six-character codes, secret roles, topics and timed votes, synced over WebSockets.",
      "Un juego de deducción social para jugar con amigos: salas con código de seis caracteres, roles secretos, temas y votaciones con tiempo, sincronizado por WebSockets.",
    ),
    kind: L("Personal project", "Proyecto personal"),
    year: "2025",
    stack: ["React 19", "TypeScript", "Socket.IO", "Express 5", "Vite"],
    links: { live: "https://impostor-client-zeta.vercel.app", code: "https://github.com/CratosCamilo/impostor-client" },
    cover: {
      src: impostorCover,
      position: "center top",
      alt: L(
        "An open vote seen by the impostor: their secret card, the five players in the room and a countdown to choose who to eject.",
        "Una votación abierta vista por el impostor: su carta secreta, los cinco jugadores de la sala y la cuenta regresiva para elegir a quién expulsar.",
      ),
    },
  },
  {
    slug: "myprogress",
    name: "MyProgress",
    title: L("Gym-tracking PWA", "PWA para el gimnasio"),
    summary: L(
      "An installable gym tracker built to feel native on iPhone: streak calendar, flexible sets, routines, body-weight trend and stats, with real accounts and email verification.",
      "Un tracker de gimnasio instalable que se siente nativo en iPhone: calendario de racha, series flexibles, rutinas, tendencia de peso y estadísticas, con cuentas reales y verificación por correo.",
    ),
    kind: L("Personal project · in use", "Proyecto personal · en uso"),
    year: "2026",
    stack: ["Next.js 14", "Drizzle", "Turso", "TanStack Query", "Recharts", "Framer Motion", "Resend"],
    links: { live: "https://my-progress-l65q.vercel.app" },
    cover: {
      src: progressDashboard,
      position: "center top",
      alt: L("Dashboard with the weekly goal and a monthly calendar marking training days.", "Panel con la meta semanal y un calendario mensual que marca los días entrenados."),
    },
    layout: "phones",
    extra: [
      {
        src: progressStats,
        position: "center top",
        alt: L("Stats screen with totals and a bar chart of workouts per week.", "Pantalla de estadísticas con totales y gráfico de barras de entrenos por semana."),
      },
      {
        src: progressWeight,
        position: "center top",
        alt: L("Body-weight screen with a line chart trending down over two months.", "Pantalla de peso corporal con una línea que baja a lo largo de dos meses."),
      },
    ],
  },
  {
    slug: "preflop-viewer",
    name: "Preflop Viewer",
    title: L("Tournament poker ranges", "Rangos de póker de torneo"),
    summary: L(
      "Preflop ranges for tournament play by position, stack depth and spot — a 169-hand grid with mixed-strategy frequencies.",
      "Rangos preflop para torneos por posición, profundidad de stack y situación — una grilla de 169 manos con frecuencias de estrategia mixta.",
    ),
    kind: L("Personal project", "Proyecto personal"),
    year: "2026",
    stack: ["React 19", "Vite"],
    links: { live: "https://poker-viewer-kmi.vercel.app" },
    cover: {
      src: preflopCover,
      position: "center top",
      alt: L(
        "Small-blind open-raise range at 15 big blinds: a 13-by-13 hand grid colored by call and raise frequencies.",
        "Rango de open raise desde la ciega pequeña con 15 ciegas: una grilla de 13 por 13 manos coloreada según frecuencias de call y raise.",
      ),
    },
  },
  {
    slug: "reconciliation-automations",
    name: "Conciliaciones",
    title: L("Bookkeeping automations", "Automatizaciones contables"),
    summary: L(
      "Seven Python tools for a food business's bookkeeping: they cross DIAN e-invoices, Siigo ledgers and bank statements and hand back a clean Excel file.",
      "Siete herramientas en Python para la contabilidad de un negocio de alimentos: cruzan facturas electrónicas de la DIAN, libros de Siigo y extractos bancarios y devuelven un Excel limpio.",
    ),
    kind: CLIENT_SYSTEM,
    year: "2026",
    stack: ["Next.js", "Python", "pandas", "openpyxl", "Vercel Functions"],
    links: {},
    cover: {
      src: reconCover,
      position: "center top",
      alt: L(
        "Grid of automation modules: DIAN vs Siigo, weekly banks, Davivienda fortnightly, savings account, monthly bank statement, DIAN vs inventory and costing.",
        "Grilla de módulos de automatización: DIAN vs Siigo, bancos semanal, Davivienda quincenal, cuenta de ahorros, extracto mensual, DIAN vs inventario y costeo.",
      ),
    },
  },
];

export const archive: ArchiveItem[] = [
  {
    year: "2026",
    name: "Colegio Travesuras",
    what: L("Lunch-program management for a kindergarten: daily log, payments, debts and fortnightly closings", "Gestión de loncheras para un jardín infantil: registro diario, pagos, deudas y cierres quincenales"),
    tech: ["Next.js 16", "Turso", "Auth.js"],
  },
  {
    year: "2026",
    name: "Miga",
    what: L("Weekly store settlement for three roles, with autosaved sheets and side-by-side reconciliation", "Liquidación semanal de tienda para tres roles, con hojas de autoguardado y comparación lado a lado"),
    tech: ["Next.js", "libSQL", "Playwright"],
  },
  {
    year: "2026",
    name: "Bizcopan Calidad",
    what: L("Quality-document intranet: versioned files and DOCX-to-PDF technical sheets at the edge", "Intranet documental de calidad: archivos versionados y fichas técnicas de DOCX a PDF en el edge"),
    tech: ["Hono", "Cloudflare Pages", "R2", "Turso"],
  },
  {
    year: "2026",
    name: "LouLoz",
    what: L("Shopify storefront for a Colombian footwear brand", "Tienda en Shopify para una marca colombiana de calzado"),
    tech: ["Shopify"],
    link: { href: "https://louloz.com", label: "louloz.com" },
  },
  {
    year: "2026",
    name: "Facturación e Inventario",
    what: L("Desktop invoicing and inventory with PDF invoices and Excel reports", "Facturación e inventario de escritorio con facturas en PDF y reportes en Excel"),
    tech: ["Electron", "React", "SQLite"],
    link: { href: "https://github.com/CratosCamilo/Facturacion--Inventario-y-Reportes", label: "GitHub" },
  },
  {
    year: "2025",
    name: "MVT Integradores",
    what: L("Server-rendered project catalog with search, pagination and a comments API", "Catálogo de proyectos renderizado en servidor con búsqueda, paginación y API de comentarios"),
    tech: ["Express", "TypeScript", "EJS", "Jest"],
    link: { href: "https://github.com/CratosCamilo/mvt-integradores", label: "GitHub" },
  },
  {
    year: "2025",
    name: "SazónApp",
    what: L("Food-ordering mobile app with real-time order status", "App móvil de pedidos a domicilio con estado del pedido en tiempo real"),
    tech: ["Flutter", "Firebase"],
    link: { href: "https://github.com/CratosCamilo/Saz-nApp", label: "GitHub" },
  },
  {
    year: "2025",
    name: "MercAnalyzer",
    what: L("Mercado Libre price comparison: Python scraper, Next.js API and React client", "Comparador de precios de Mercado Libre: scraper en Python, API en Next.js y cliente en React"),
    tech: ["Python", "Next.js", "React", "SQL Server"],
    link: { href: "https://github.com/CratosCamilo/MercAnalyzer.Client", label: "GitHub" },
  },
];

export function getFeatured(slug: string): FeaturedProject | undefined {
  return featured.find((p) => p.slug === slug);
}
