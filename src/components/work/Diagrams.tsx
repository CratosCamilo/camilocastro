import type { Locale } from "@/i18n/config";
import styles from "./Diagrams.module.css";

type L = { en: string; es: string };
const x = (l: L, locale: Locale) => l[locale];

/** How a payroll run flows through the system, and the CI gate every change passes. */
export function PayrollDiagram({ locale }: { locale: Locale }) {
  const inputs: { t: L; s: L }[] = [
    { t: { en: "Employees & contracts", es: "Empleados y contratos" }, s: { en: "salary · EPS · pension · ARL", es: "salario · EPS · pensión · ARL" } },
    { t: { en: "Novelties", es: "Novedades" }, s: { en: "overtime · leave · loans", es: "horas extras · licencias · préstamos" } },
    { t: { en: "Yearly parameters", es: "Parámetros del año" }, s: { en: "minimum wage · rates · thresholds", es: "SMMLV · tasas · umbrales" } },
  ];
  const outputs: { t: L; s: L }[] = [
    { t: { en: "Accounting vouchers", es: "Comprobantes contables" }, s: { en: "balanced · reversible", es: "cuadrados · reversibles" } },
    { t: { en: "DIAN e-payroll", es: "Nómina electrónica DIAN" }, s: { en: "UBL XML · XAdES signature", es: "XML UBL · firma XAdES" } },
    { t: { en: "PILA file", es: "Planilla PILA" }, s: { en: "flat file · hash · status", es: "archivo plano · hash · estados" } },
    { t: { en: "Payment batches", es: "Lotes de pago" }, s: { en: "bank flat files", es: "archivos planos bancarios" } },
  ];
  const ci = ["ruff", "mypy --strict", "pytest unit", "pytest integration", "pytest golden", "alembic ↑↓", "front-end build", "docker build", "deploy staging"];

  return (
    <figure className={styles.figure}>
      <div className={styles.flow}>
        <ol role="list" className={`${styles.row} ${styles.three}`}>
          {inputs.map((b) => (
            <li key={b.t.en} className={styles.box}>
              <span className={styles.boxTitle}>{x(b.t, locale)}</span>
              <span className={styles.boxSub}>{x(b.s, locale)}</span>
            </li>
          ))}
        </ol>
        <div className={styles.join} aria-hidden="true" />
        <div className={`${styles.box} ${styles.core}`}>
          <span className={styles.boxTitle}>{locale === "es" ? "Motor de nómina" : "Payroll engine"}</span>
          <span className={styles.boxSub}>
            {locale === "es" ? "quincena / mes · 22 reglas · snapshots mensuales" : "fortnight / month · 22 rules · monthly snapshots"}
          </span>
        </div>
        <div className={styles.split} aria-hidden="true" />
        <ol role="list" className={`${styles.row} ${styles.four}`}>
          {outputs.map((b) => (
            <li key={b.t.en} className={styles.box}>
              <span className={styles.boxTitle}>{x(b.t, locale)}</span>
              <span className={styles.boxSub}>{x(b.s, locale)}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.ci}>
        <p className="mono muted">{locale === "es" ? "Cada cambio pasa por" : "Every change passes"}</p>
        <ol role="list" className={styles.ciList}>
          {ci.map((step, i) => (
            <li key={step} className={styles.ciStep}>
              <span className={styles.ciNo}>{i + 1}</span>
              <span className={styles.ciName}>{step}</span>
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="visually-hidden">
        {locale === "es"
          ? "Diagrama: empleados, novedades y parámetros alimentan el motor de nómina, que produce comprobantes contables, nómina electrónica DIAN, planillas PILA y lotes de pago. Debajo, las nueve etapas del CI."
          : "Diagram: employees, novelties and parameters feed the payroll engine, which produces accounting vouchers, DIAN e-payroll, PILA files and payment batches. Below, the nine CI stages."}
      </figcaption>
    </figure>
  );
}

/** Kiln's topology: client, API, broker, worker pool, replicated database and shared storage. */
export function KilnDiagram({ locale }: { locale: Locale }) {
  const es = locale === "es";
  return (
    <figure className={styles.figure}>
      <div className={styles.topo}>
        <div className={`${styles.box} ${styles.a}`}>
          <span className={styles.boxTitle}>Kiln</span>
          <span className={styles.boxSub}>{es ? "cliente web · JWT" : "web client · JWT"}</span>
        </div>
        <span className={`${styles.edge} ${styles.e1}`}>REST</span>
        <div className={`${styles.box} ${styles.core} ${styles.b}`}>
          <span className={styles.boxTitle}>FastAPI</span>
          <span className={styles.boxSub}>vm-api · uvicorn</span>
        </div>
        <span className={`${styles.edge} ${styles.e2}`}>AMQP</span>
        <div className={`${styles.box} ${styles.c}`}>
          <span className={styles.boxTitle}>RabbitMQ</span>
          <span className={styles.boxSub}>{es ? "una tarea por imagen" : "one task per image"}</span>
        </div>
        <span className={`${styles.edge} ${styles.e3}`}>{es ? "tareas" : "tasks"}</span>
        <div className={`${styles.stack} ${styles.d}`}>
          {[1, 2].map((n) => (
            <div key={n} className={styles.box}>
              <span className={styles.boxTitle}>Worker {n}</span>
              <span className={styles.boxSub}>{es ? "4 hilos" : "4 threads"}</span>
            </div>
          ))}
        </div>

        <span className={`${styles.edge} ${styles.edgeV} ${styles.e4}`}>SQL · NFS</span>
        <span className={`${styles.edge} ${styles.edgeV} ${styles.e5}`}>SQL · NFS</span>

        <div className={`${styles.box} ${styles.f}`}>
          <span className={styles.boxTitle}>PostgreSQL</span>
          <span className={styles.boxSub}>{es ? "primario · vm-db" : "primary · vm-db"}</span>
        </div>
        <span className={`${styles.edge} ${styles.e6}`}>WAL</span>
        <div className={`${styles.box} ${styles.g}`}>
          <span className={styles.boxTitle}>{es ? "Réplica" : "Replica"}</span>
          <span className={styles.boxSub}>{es ? "solo lectura" : "read-only standby"}</span>
        </div>
        <div className={`${styles.box} ${styles.h}`}>
          <span className={styles.boxTitle}>NFS</span>
          <span className={styles.boxSub}>{es ? "almacenamiento compartido" : "shared storage"}</span>
        </div>
      </div>
      <figcaption className="visually-hidden">
        {es
          ? "Diagrama: el cliente Kiln llama por REST a FastAPI, que publica tareas en RabbitMQ; dos workers de cuatro hilos las consumen. API y workers usan PostgreSQL, replicado por WAL a una réplica de solo lectura, y almacenamiento compartido por NFS."
          : "Diagram: the Kiln client calls FastAPI over REST, which publishes tasks to RabbitMQ; two four-thread workers consume them. API and workers use PostgreSQL, replicated over WAL to a read-only standby, and NFS shared storage."}
      </figcaption>
    </figure>
  );
}
