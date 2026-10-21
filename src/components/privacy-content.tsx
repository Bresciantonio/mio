import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { Icon } from "./icons";

interface PrivacySection {
  heading: string;
  body: string[];
}

interface PrivacyContent {
  title: string;
  updated: string;
  intro: string;
  sections: PrivacySection[];
  contactHeading: string;
  contactBody: string[];
}

/** The full address is not published until it is confirmed: the city is. */
const seat = site.address.full || site.address.city;

const content: Record<Locale, PrivacyContent> = {
  it: {
    title: "Privacy policy",
    updated: "Ultimo aggiornamento: ottobre 2026",
    intro:
      "La presente informativa descrive come raccogliamo, utilizziamo e proteggiamo i dati personali degli utenti che visitano questo sito, in conformità al Regolamento (UE) 2016/679 (GDPR) e al D.Lgs. 196/2003 come modificato dal D.Lgs. 101/2018.",
    sections: [
      {
        heading: "1. Titolare del trattamento",
        body: [
          `Titolare del trattamento è ${site.legalName}, con sede a ${seat}. Per qualsiasi esercizio dei diritti è possibile scrivere a ${site.email}.`,
        ],
      },
      {
        heading: "2. Dati raccolti e fonte",
        body: [
          "I dati personali sono forniti direttamente dall'interessato tramite il modulo di contatto (nome, email, eventuale telefono, azienda e contenuto del messaggio). Non vengono raccolti dati di navigazione a fini di profilazione.",
          "Il sito può raccogliere dati di navigazione aggregati e anonimi (es. pagine visitate, durata della sessione) tramite strumenti di analytics anonimizzati, qualora attivati.",
        ],
      },
      {
        heading: "3. Finalità e base giuridica",
        body: [
          "I dati sono trattati per: (a) rispondere alle richieste di contatto e predisporre una proposta di consulenza; (b) adempiere a obblighi di legge e di natura contrattuale; (c) tutelare i legittimi interessi del Titolare.",
          "L'invio del modulo richiede il consenso al trattamento, raccolto tramite apposita casella di spunta.",
        ],
      },
      {
        heading: "4. Conservazione",
        body: [
          "I dati di contatto sono conservati per il tempo strettamente necessario a gestire la richiesta e, in caso di avvio di una collaborazione, per la durata del rapportio e per i successivi obblighi di legge (fino a 10 anni per adempimenti fiscali e contabili).",
        ],
      },
      {
        heading: "5. Destinatari e trasferimenti",
        body: [
          "I dati non vengono ceduti a terzi a fini commerciali. Possono essere accessibili a fornitori di servizi tecnici (hosting, invio email) nominati responsabili del trattamento ai sensi dell'art. 28 GDPR. Eventuali trasferimenti extra-UE avvengono nel rispetto delle garanzie previste dagli artt. 44 e ss. GDPR.",
        ],
      },
      {
        heading: "6. Diritti dell'interessato",
        body: [
          "L'interessato ha diritto di ottenere l'accesso, la rettifica, la cancellazione, la limitazione, la portabilità e l'opposizione al trattamento dei propri dati, nonché di proporre reclamo al Garante per la protezione dei dati personali (www.garanteprivacy.it).",
        ],
      },
    ],
    contactHeading: "7. Come esercitare i tuoi diritti",
    contactBody: [
      `Scrivi a ${site.email} indicando l'oggetto della richiesta. Risponderemo entro 30 giorni.`,
    ],
  },
  en: {
    title: "Privacy policy",
    updated: "Last updated: October 2026",
    intro:
      "This policy describes how we collect, use and protect the personal data of visitors to this site, in accordance with Regulation (EU) 2016/679 (GDPR) and the Italian Data Protection Code.",
    sections: [
      {
        heading: "1. Data controller",
        body: [
          `The data controller is ${site.legalName}, based in ${seat}. To exercise any of your rights you can write to ${site.email}.`,
        ],
      },
      {
        heading: "2. Data collected and source",
        body: [
          "Personal data is provided directly by the data subject through the contact form (name, email, optional phone, company and message content). No browsing data is collected for profiling purposes.",
          "The site may collect aggregated, anonymised browsing data (e.g. pages visited, session duration) through anonymised analytics tools, where enabled.",
        ],
      },
      {
        heading: "3. Purposes and legal basis",
        body: [
          "Data is processed to: (a) respond to contact requests and prepare a consulting proposal; (b) fulfil legal and contractual obligations; (c) protect the legitimate interests of the controller.",
          "Submitting the form requires consent to processing, collected via a specific checkbox.",
        ],
      },
      {
        heading: "4. Retention",
        body: [
          "Contact data is kept for the time strictly necessary to handle the request and, if a collaboration begins, for the duration of the engagement and subsequent legal obligations (up to 10 years for tax and accounting purposes).",
        ],
      },
      {
        heading: "5. Recipients and transfers",
        body: [
          "Data is not sold to third parties for commercial purposes. It may be accessible to technical service providers (hosting, email delivery) appointed as data processors under Art. 28 GDPR. Any extra-EU transfers comply with Arts. 44 and following of the GDPR.",
        ],
      },
      {
        heading: "6. Your rights",
        body: [
          "You have the right to access, rectify, erase, restrict, port and object to the processing of your data, and to lodge a complaint with the Italian Data Protection Authority (www.garanteprivacy.it).",
        ],
      },
    ],
    contactHeading: "7. How to exercise your rights",
    contactBody: [
      `Write to ${site.email} stating the subject of your request. We will respond within 30 days.`,
    ],
  },
};

interface PrivacyContentProps {
  locale: Locale;
}

export function PrivacyContent({ locale }: PrivacyContentProps) {
  const data = content[locale];

  return (
    <article className="mx-auto max-w-3xl">
      <p className="text-small text-ink-600">{data.updated}</p>
      <p className="mt-5 text-lead leading-relaxed text-ink-800">{data.intro}</p>

      <div className="mt-8 space-y-8">
        {data.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-subtitle font-semibold text-ink-950">
              {section.heading}
            </h2>
            {section.body.map((paragraph, index) => (
              <p
                key={index}
                className="mt-3 text-body leading-relaxed text-ink-800"
              >
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>

      <div className="mt-10 bg-paper p-6">
        <h2 className="flex items-center gap-2 text-subtitle font-semibold text-ink-950">
          <Icon name="mail" className="size-5 text-brand-600" />
          {data.contactHeading}
        </h2>
        {data.contactBody.map((paragraph, index) => (
          <p key={index} className="mt-3 text-body leading-relaxed text-ink-800">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
