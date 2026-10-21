import type { Localized, ServiceContent } from "./types";

/**
 * Six service pages, written from scratch.
 *
 * The structure mirrors the narrative that works in this sector:
 *   1. What the service is + the normative frame that makes it mandatory
 *   2. Why working with an independent senior consultant changes the outcome
 *   3. How it is executed, step by step, with deliverables
 *   4. The objections clients raise most often
 *
 * The claims about credentials mirror the ones already stated in the site's
 * dictionaries (EGE, Lead Auditor ISO 50001, CMVP, ESG). Replace them with
 * your verified certificates before going live.
 */

export const services: Localized<ServiceContent[]> = {
  it: [
    {
      slug: "audit-energetico-e-due-diligence",
      icon: "audit",
      title: "Audit energetico e due diligence",
      eyebrow: "Due diligence",
      shortDescription:
        "Verifiche strutturate su consumi, contratti e asset per valutare rischi e margini di ottimizzazione prima di investire o acquisire.",
      metaDescription:
        "Audit energetico e due diligence energetica per imprese, fondi e investitori: analisi di consumi, contratti e asset con raccomandazioni quantificate e indipendenti.",
      intro: [
        "Un audit energetico non è un rapporto da archiviare: è la fotografia che manca a una decisione d'investimento. Consumi reali, costi marginali, clausole contrattualizzate, asset tecnici e un bilancio energetico che tiene insieme tutto. Il risultato serve a tre domande: quanto possiamo risparmiare, quanto ci costa restare fermi e quale sarà il rendimento dell'intervento nel tempo.",
        "In Italia il perimetro normativo è definito dal D.Lgs. 102/2014 e dalle norme UNI CEI TR 11428 e UNI CEI EN 16247, che stabiliscono il perimetro minimo, la metodologia di raccolta dati e il contenuto del rapporto. Per i soggetti con obbligo periodico — grandi imprese e imprese energivore — la diagnosi energetica non è un'opzione: l'inadempimento comporta sanzioni amministrative pecuniarie. Negli altri casi è comunque la base tecnica che rende comparabili le opportunità di efficientamento.",
      ],
      whyTitle: "Perché affidarsi a un consulente indipendente",
      why: [
        "Indipendenza strutturale: non percepisco commissioni da fornitori, EPC o produttori. Il mio unico tornacento è che il business case regga.",
        "Metodo quantificato: ogni raccomandazione arriva con capex, saving, tempo di ritorno e sensibilità a variazioni di prezzo, non con una lista di desideri.",
        "Esperienza multi-settoriale: operazioni industriali ad alto consumo, portafogli immobiliari e processi di M&A dove la componente energetica pesa sul valore.",
        "Conoscenza delle norme: le pratiche si reggono su UNI CEI EN 16247, UNI CEI 11352, ISO 50001 e sui regimi di incentivazione vigenti, non sulla burocrazia generica.",
      ],
      processTitle: "Come si svolge l'incarico",
      steps: [
        {
          title: "Analisi preliminare e scoping",
          description:
            "Definiamo perimetro, siti, vettori energetici e obiettivo decisionale. Questa fase evita il classico errore di un audit che non conclude nulla.",
        },
        {
          title: "Raccolta dati",
          description:
            "Fatture, contratti, misure, registrazioni di processo e sopralluoghi. Se mancano misure, proponiamo l'installazione di un piano di monitoraggio: senza dati non esiste baseline.",
        },
        {
          title: "Bilancio energetico",
          description:
            "Ricostruiamo i flussi per vettore e per destinazione d'uso, con un profilo orario quando disponibile. È il passaggio che distingue un'analisi da una somma di bollette.",
        },
        {
          title: "Benchmarking e analisi di rischio",
          description:
            "Confrontiamo i consumi con benchmark di settore, verifichiamo l'esposizione a prezzi e volumi e identifichiamo i contratti da rinegoziare o uscire.",
        },
        {
          title: "Business case degli interventi",
          description:
            "Per ciascuna opportunità: investimento, saving annuo, tempo di ritorno, NPV e sensibilità. Le opzioni restano ordinate per rischio e convenienza economica.",
        },
        {
          title: "Deliverable e roadmap",
          description:
            "Rapporto tecnico, presentazione al CdA e una roadmap a 12 mesi con responsabilità, tempi e indicatori di avanzamento.",
        },
      ],
      deliverablesTitle: "Cosa ricevi",
      deliverables: [
        "Rapporto di audit energetico conforme UNI CEI EN 16247, pronto per eventuali adempimenti ENEA",
        "Bilancio energetico per vettore e destinazione d'uso, con base di confronto",
        "Business case degli interventi con capex, saving, payback e sensibilità",
        "Analisi dei contratti di fornitura e delle opzioni di rinegoziazione",
        "Roadmap a 12 mesi con owner, milestone e KPI",
        "Presentazione executive per il CdA, in formato sintetico",
      ],
      faqTitle: "Le domande che mi fanno più spesso",
      faq: [
        {
          question: "Quanto costa e quanto dura?",
          answer:
            "Un audit su un singolo sito industriale di medie dimensioni richiede in genere 4–8 settimane. Il preventivo è a forfait e definito dopo lo scoping, così da coprire il perimetro reale e non una stima standard. Escludo dal preventivo solo i costi di investimento: il piano degli interventi viene valutato separatamente.",
        },
        {
          question: "È la stessa cosa di una diagnosi energetica obbligatoria?",
          answer:
            "Non necessariamente. La diagnosi energetica è un adempimento normativo con un contenuto definito dalla legge; l'audit è un lavoro di analisi decisionale. Posso condurre la diagnosi in modo conforme e, nello stesso tempo, arricchirla con l'analisi economica e la roadmap. È l'opzione che preferisco per i clienti che hanno già una diagnosi valida ma vogliono decidere.",
        },
        {
          question: "Posso usare il rapporto in una due diligence?",
          answer:
            "Sì, ed è uno degli usi più frequenti. Strutturo il rapporto in modo che sia leggibile da un investitore: separo i fatti documentali dalle stime, dichiaro esplicitamente le assunzioni di prezzo e di volume, e segnalo i dati mancanti come gap da colmare. Integrare un audit con la due diligence riduce il tempo di chiusura e fa risparmiare work due diligence.",
        },
        {
          question: "L'audit mi obbliga a fare gli interventi?",
          answer:
            "No. L'audit produce un quadro decisionale. Molti clienti lo usano per selezionare due o tre interventi da finanziare e archiviare il resto. Raccomandare solo ciò che è effettivamente conveniente — anche quando è meno remunerativo per chi consulenza — è il modo più efficace per costruire un rapporto di fiducia.",
        },
      ],
      relatedSlugs: [
        "gestione-dell-energia-e-iso-50001",
        "rinnovabili-e-ppa",
        "acquisto-energia-e-gestione-del-rischio",
      ],
    },
    {
      slug: "gestione-dell-energia-e-iso-50001",
      icon: "management",
      title: "Gestione dell'energia e ISO 50001",
      eyebrow: "Energy management",
      shortDescription:
        "Progettazione del sistema di gestione dell'energia: KPI, responsabilità, monitoraggio e miglioramento continuo certificabile.",
      metaDescription:
        "Progettazione e certificazione ISO 50001: sistema di gestione dell'energia, KPI, ruoli organizzativi, monitoraggio dei consumi e piano di miglioramento continuo.",
      intro: [
        "Un sistema di gestione dell'energia non è un adempimento burocratico: è il passaggio da «gestire il consumo con l'attenzione di chi legge la bolletta» a «gestire l'energia con la disciplina di un processo produttivo». La norma ISO 50001 — insieme alla UNI CEI EN ISO 50001 — chiede esattamente questo: un sistema documentato, misurato, con responsabilità assegnate e miglioramento dimostrabile.",
        "Il punto critico, nella pratica, non è ottenere il certificato: è farlo durare. Un'ISO 50001 che regge tre audit e poi si svuota di significato ha un costo maggiore del beneficio, perché aggiunge un certificato da mostrare senza migliorare nulla. Per questo il mio lavoro parte sempre dalla baseline dei consumi e dalla definizione degli indicatori, e finisce con l'audit interno e il piano di azioni correttive.",
      ],
      whyTitle: "Perché affidarsi a un consulente indipendente",
      why: [
        "Sono Lead Auditor ISO 50001: conosco l'ottica dell'ente di certificazione e costruisco il sistema per resistere a un audit, non per passare un colloquio.",
        "Approccio orientato al dato: senza baseline e senza misure non si certifica nulla, solo opinioni.",
        "Integrazione con il controllo di gestione: gli indicatori energetici entrano nel reporting periodico, non restano in un file separato.",
        "Indipendenza dai fornitori: il sistema descrive i consumi reali dell'impresa, quindi non può essere piegato a favore di un prodotto.",
      ],
      processTitle: "Come si svolge il progetto",
      steps: [
        {
          title: "Gap analysis e baseline",
          description:
            "Confronto tra lo stato dell'arte e i requisiti della norma, costruzione della baseline energetica e individuazione delle aree critiche.",
        },
        {
          title: "Analisi energetica",
          description:
            "Inventario di consumi, vettori e usi finali; selezione degli indicatori di prestazione energetica (EnPI) e definizione della metodologia di misura.",
        },
        {
          title: "Struttura documentale",
          description:
            "Politica energetica, analisi energetica, obiettivi e target energetici, responsabilità, procedure operative e gestione delle opportunità.",
        },
        {
          title: "Ruoli e formazione",
          description:
            "Nomina dell'energy manager, definizione dei compiti del team energetico e formazione degli operatori coinvolti. Un sistema senza persone non funziona.",
        },
        {
          title: "Piano di miglioramento e azioni",
          description:
            "Traduzione degli obiettivi in progetti conOwner, tempi e risorse. È il passaggio che distingue un sistema vivo da uno adempitivo.",
        },
        {
          title: "Verifica interna e supporto alla certificazione",
          description:
            "Audit interno, gestione delle non conformità, piano di azioni correttive e affiancamento all'ente di certificazione.",
        },
        {
          title: "Miglioramento continuo",
          description:
            "Riveduta periodica del sistema, aggiornamento della baseline e verifica dei risparmi. Il sistema evolve con l'organizzazione.",
        },
      ],
      deliverablesTitle: "Cosa ricevi",
      deliverables: [
        "Manuale del sistema di gestione dell'energia e documenti correlati",
        "Analisi energetica e baseline documentata per vettore e destinazione d'uso",
        "Set di KPI energetici (EnPI) con soglie, cadenza e owner",
        "Piano di miglioramento energetico con azioni, responsabilità e priorità",
        "Piano di formazione per energy manager e operatori",
        "Supporto all'audit interno e alla certificazione",
      ],
      faqTitle: "Le domande che mi fanno più spesso",
      faq: [
        {
          question: "ISO 50001 o diagnosi energetica: cosa serve?",
          answer:
            "Dipende dalla vostra situazione. Se l'obbligo di diagnosi non vi riguarda ma volete governare i consumi, la ISO 50001 è lo strumento più completo. Se avete un obbligo periodico, la diagnosi va fatta comunque e il sistema di gestione è ciò che vi evita di rifarla da zero ogni quattro anni con lo stesso approccio manuale. Nella pratica i due percorsi si alimentano.",
        },
        {
          question: "Quanto costa la certificazione?",
          answer:
            "Il costo della certificazione in senso stretto è la fee dell'ente di certificazione, che dipende dal numero di siti e dal perimetro. Il lavoro di progettazione del sistema — analisi energetica, documentazione, formazione, audit interno — è un impegno distinto e va quotato separatamente. Vi fornisco una stima separata per le due voci, così il confronto con l'offerta di un ente è trasparente.",
        },
        {
          question: "Possiamo partire da un solo stabilimento?",
          answer:
            "Sì, ed è la scelta che consiglio. Un sistema circoscritto a un sito critico è più semplice da far funzionare, più facile da certificare e produce risultati visibili in tempi brevi. L'estensione agli altri siti diventa una seconda fase, con una baseline consolidata come base di confronto.",
        },
        {
          question: "Come garantite che i risparmi siano reali?",
          answer:
            "Con la misura. Un risparmio dichiarato senza misura è un'opinione. Definiamo la baseline, l'indicatore di prestazione e il protocollo di verifica — secondo IPMVP — prima di iniziare, e misuriamo dopo. Se la verifica non conferma il risparmio atteso, l'errore è mio e lo correggo.",
        },
      ],
      relatedSlugs: [
        "audit-energetico-e-due-diligence",
        "decarbonizzazione-e-esg",
        "incentivi-e-certificati-bianchi",
      ],
    },
    {
      slug: "rinnovabili-e-ppa",
      icon: "renewables",
      title: "Rinnovabili e PPA",
      eyebrow: "Rinnovabili",
      shortDescription:
        "Scelta tecnologica, modello di sviluppo e struttura contrattuale di PPA e autoconsumo per bloccare il prezzo dell'energia nel tempo.",
      metaDescription:
        "Consulenza su rinnovabili e PPA: selezione tecnologica, modello di sviluppo, autoconsumo, contratti di acquisto energia e strutturazione dei rischi.",
      intro: [
        "La decisione sull'energia rinnovabile non è una scelta tecnica: è una scelta di bilancio. Ogni impianto, comunità energetica o contratto di acquisto sposta rischio, liquidità e capitale immobilizzato su un orizzonte di 15–25 anni. La domanda corretta non è «conviene il fotovoltaico?» — che dipende dalla latitudine — ma «quale combinazione di asset e contratti minimizza il costo energetico a rischio aggiustato sul mio orizzonte di investimento?».",
        "Il quadro regolatorio è in evoluzione continua: autoconsumo collettivo e comunità energetiche, contratti di vendita diretta, criteri di ammissibilità e regimi fiscali si modificano di anno in anno. Un progetto impostato su un quadro superato è un progetto da rifare. Per questo la consulenza non si ferma alla scelta tecnologica: copre lo schema contrattuale, la fiscalità, la connessione in rete e il profilo di rischio residuo.",
      ],
      whyTitle: "Perché affidarsi a un consulente indipendente",
      why: [
        "Nessun legame con produttori o EPC: valuto le tecnologie sulla loro idoneità al vostro caso, non sul margine del fornitore.",
        "Padronanza del quadro regulatorio: autoconsumo, comunità energetiche, contratti di vendita diretta e schemi di incentivazione sono il mio mestiere quotidiano.",
        "Valutazione economica rigorosa: confronto tra PPA, autoconsumo e mercato, con sensibilità a prezzo, WACC e durata.",
        "Attenzione alle execution risk: tempi di connessione, iter amministrativo, grid capacity e copertura in fase di cantiere.",
      ],
      processTitle: "Come si svolge il progetto",
      steps: [
        {
          title: "Analisi del profilo di consumo",
          description:
            "Ricostruiamo il profilo orario e stagionale dei consumi: è il dato che determina la quota autoconsumabile e quindi la scelta tra PPA, autoconsumo e vendita in rete.",
        },
        {
          title: "Scenari di generazione e portfolio",
          description:
            "Valutiamo la capacità installata ottimale, la combinazione tra fonti e il ruolo della storage per l'autoconsumo e per la copertura dei picchi.",
        },
        {
          title: "Confronto degli schemi contrattuali",
          description:
            "PPA on-site, PPA off-site, autoconsumo, vendita diretta e comunità energetica: impatto su bilancio, rischio prezzo e liquidità.",
        },
        {
          title: "Valutazione fiscale e incentivante",
          description:
            "Verifica delle agevolazioni applicabili, delle condizioni di accesso e degli obblighi ricorrenti una volta conclusi i bandi.",
        },
        {
          title: "Valutazione dei rischi tecnici",
          description:
            "Grid capacity, tempi di connessione, rischio di curtailment, copertura durante il cantiere e qualità della controparte.",
        },
        {
          title: "Supporto alla negoziazione",
          description:
            "Definizione del term sheet, revisione della bozza di contratto e supporto nella negoziazione con il fornitore prescelto.",
        },
      ],
      deliverablesTitle: "Cosa ricevi",
      deliverables: [
        "Report di fattibilità con profilo di consumo e capacità installata raccomandata",
        "Confronto economico e di rischio tra gli schemi contrattuali disponibili",
        "Term sheet dei punti chiave per la negoziazione con il fornitore",
        "Checklist tecnica e amministrativa per iter di connessione e incentivi",
        "Matrice dei rischi residui e delle relative mitigazioni",
        "Roadmap di progetto con milestone e responsabilità",
      ],
      faqTitle: "Le domande che mi fanno più spesso",
      faq: [
        {
          question: "PPA on-site o vendita diretta: cosa conviene?",
          answer:
            "Dipende dal rapporto tra il vostro profilo di carico e la produzione. L'on-site è più efficiente quando carico e generazione sono correlati, perché evita la rete e le relative perdite. La vendita diretta offre invece la copertura geografica del PPA tradizionale con un regime fiscalmente definito. La scelta corretta si fa partendo dai dati di consumo, non dalle condizioni offerte dal fornitore.",
        },
        {
          question: "Conviene firmare un PPA oggi?",
          answer:
            "Dipende dal profilo di rischio. Un PPA fissa il prezzo per 10–15 anni: protegge da rialzi, ma blocca anche la possibilità di beneficiare di un mercato in discesa. Ha senso se il vostro obiettivo è la prevedibilità del budget energetico; ha meno senso se il margine operativo non regge un prezzo fisso elevato. È una decisione di bilancio prima che di mercato.",
        },
        {
          question: "Quanto incide l'autoconsumo diretto sul conto?",
          answer:
            "In modo diretto, ma solo nella quota di energia che è contemporaneamente autoconsumata. Per questo il dimensionamento va fatto sul profilo orario reale, non sulla media annua: un impianto dimensionato sulla media annuale produce in eccesso nelle ore centrali e non copre i picchi serali. È l'errore più costoso e più frequente nei progetti fotovoltaici.",
        },
        {
          question: "Posso usare comunità energetiche e autoconsumo collettivo?",
          answer:
            "Sì, se ne ricorrono i presupposti: prossimità fisica, condivisione della stessa cabina e complessità dell'infrastruttura. Verifico preliminarmente la fattibilità e l'iter amministrativo, che è la parte che condiziona i tempi più di quanto faccia l'analisi economica.",
        },
      ],
      relatedSlugs: [
        "acquisto-energia-e-gestione-del-rischio",
        "decarbonizzazione-e-esg",
        "incentivi-e-certificati-bianchi",
      ],
    },
    {
      slug: "acquisto-energia-e-gestione-del-rischio",
      icon: "procurement",
      title: "Acquisto energia e gestione del rischio",
      eyebrow: "Procurement",
      shortDescription:
        "Strategia di procurement, timing di mercato e coperture per ridurre la volatilità e difendere il budget aziendale.",
      metaDescription:
        "Consulenza sull'acquisto di energia elettrica e gas: strategia di procurement, coperture, gestione del rischio di prezzo e revisione dei contratti di fornitura.",
      intro: [
        "Il costo dell'energia è, per la maggior parte delle imprese manifatturiere, il secondo costo operativo dopo la materia prima. E a differenza della materia prima, non lo gestite: lo subite, salvo che qualcuno si metta a guardare i contratti con metodo. Ogni kWh non contrattato in anticipo è un kWh esposto a una variabile che nessuno controlla.",
        "Il punto non è fare trading: è costruire una politica di copertura che protegga il margine operativo senza immobilizzare capitale e senza lasciare il bilancio esposto a un prezzo che potrebbe dimezzarsi. Il perimetro normativo e contrattuale include il mercato spot e forward, il mercato dei gasdotti, i contratti di vendita diretta, le garanzie d'origine e la corretta qualificazione come «cliente non domestico», che cambia le condizioni economiche applicate.",
      ],
      whyTitle: "Perché affidarsi a un consulente indipendente",
      why: [
        "Nessun ritorno da produttori o broker: la scelta del prodotto e il momento dell'operazione non dipendono da commissioni ricevute.",
        "Metodo quantificato: ogni copertura viene valutata su scenario, non su convinzione di mercato.",
        "Competenza contrattuale: analizzo clausole, oneri, sbilanciamenti, penali e costi di transizione, non solo la tariffa.",
        "Continuità: seguo il rapporto nel tempo, con riesami periodici del posizionamento.",
      ],
      processTitle: "Come si svolge il progetto",
      steps: [
        {
          title: "Fotografia dei consumi e dei contratti",
          description:
            "Anno di base, volatilità, stagionalità, clausole in scadenza e adempimenti in corso. Il punto di partenza è quasi sempre una scadenza ravvicinata di cui nessuno si è accorto.",
        },
        {
          title: "Benchmark di mercato",
          description:
            "Valutiamo le condizioni disponibili sul mercato per il periodo di interesse, con scenari di prezzo e analisi delle componenti della tariffa.",
        },
        {
          title: "Definizione della strategia di copertura",
          description:
            "Quota fissa e quota indicizzata, orizzonte temporale, profilo per fasce e, dove pertinente, coperture su gas. Costruiamo lo scenario obiettivo.",
        },
        {
          title: "Analisi dei contratti attivi",
          description:
            "Verifica di clausole, sbilanciamenti, penali, costi di transizione e opportunità di rinegoziazione o uscita anticipata.",
        },
        {
          title: "Selezione e negoziazione",
          description:
            "Confronto tra le offerte sul merito — non sullo sconto nominale — e supporto alla negoziazione dei termini rilevanti.",
        },
        {
          title: "Piano di copertura e monitoraggio",
          description:
            "Calendario di copertura, regole di rientro e monitoraggio mensile con report al CFO. La copertura non è un'operazione singola: è una disciplina.",
        },
      ],
      deliverablesTitle: "Cosa ricevi",
      deliverables: [
        "Report di posizione: consumi, contratti, prezzi, sbilanciamenti e rischi in scadenza",
        "Strategia di copertura con orizzonte, profilo e regole di rientro",
        "Analisi di scenario e di sensibilità del budget energetico",
        "Matrice di valutazione delle offerte su costi, rischio e flessibilità",
        "Elenco delle clausole critiche da negoziare, con proposta di modifica",
        "Report periodico di monitoraggio e calendarizzazione delle prossime scelte",
      ],
      faqTitle: "Le domande che mi fanno più spesso",
      faq: [
        {
          question: "Conviene coprire tutto il fabbisogno?",
          answer:
            "No, non necessariamente. Una copertura totale elimina la volatilità ma immobilizza capitale e vi impedisce di beneficiare di eventuali riduzioni. Il punto ottimale dipende dalla capacità di assorbire variazioni di prezzo nel margine operativo e dalla volatilità storica del vostro carico. Su questo costruisco lo scenario, non su una regola fissa.",
        },
        {
          question: "Che differenza c'è tra fornitore e broker?",
          answer:
            "Il fornitore vende energia e la rende disponibile; il broker opera come consulente che seleziona e gestisce le coperture per conto del cliente. Il broker dovrebbe essere indipendente dalle controparti: se riceve una commissione per la vendita, il suo margine è nella scelta del prodotto, non nel vostro risparmio. È esattamente il motivo per cui il mio incarico è a forfait e senza commissioni.",
        },
        {
          question: "Come gestite i contratti in scadenza?",
          answer:
            "Con un calendario che copre almeno dodici mesi e una revisione trimestrale. La pratica più efficace è anticipare la scadenza di almeno due trimestri: a quel punto il mercato ha incorporato le aspettative e la trattativa parte da condizioni più chiare. È uno dei pochi casi in cui la tempistica vale più della negoziazione.",
        },
        {
          question: "Potete aiutarci anche dopo la firma?",
          answer:
            "Sì, e per me è la parte più utile. Il valore non sta nel singolo contratto, ma nella capacità di gestire il portafoglio nel tempo: monitoraggio, sbilanciamenti, adempimenti e rinegoziazioni quando il mercato si muove. È un incarico continuativo a basso costo che evita errori costosi.",
        },
      ],
      relatedSlugs: [
        "rinnovabili-e-ppa",
        "decarbonizzazione-e-esg",
        "audit-energetico-e-due-diligence",
      ],
    },
    {
      slug: "decarbonizzazione-e-esg",
      icon: "decarbonization",
      title: "Decarbonizzazione e ESG",
      eyebrow: "ESG & Net zero",
      shortDescription:
        "Roadmap verso la neutralità carbonica, contabilità energetica e rendicontazione pronta per investitori e auditor.",
      metaDescription:
        "Consulenza su decarbonizzazione e ESG: piano di neutralità carbonica, Scope 1 2 3, rendicontazione CSRD e supporto ai rating di sostenibilità.",
      intro: [
        "La decarbonizzazione è un problema di allocazione di capitale, non di comunicazione. Un percorso di neutralità carbonica si costruisce guardando la struttura dei costi, la vita residua degli asset e la fattibilità degli interventi: un'azienda che riduce le emissioni di Scope 1 attraverso l'efficientamento pagandola una frazione di quanto costerà sostituire l'energia termica sta facendo il lavoro più difficile, quello che regge nel tempo.",
        "Nel frattempo il perimetro di rendicontazione si è irrigidito: la direttiva CSRD e il regolamento di attuazione hanno introdotto obblighi di rendicontazione per un numero molto ampio di imprese, con standard EFRAG e domanda di dati di terze parti, per il tramite di banche, clienti e assicuratori. Un dato energetico non disponibile non è un dato mancante: diventa un rischio commerciale.",
      ],
      whyTitle: "Perché affidarsi a un consulente indipendente",
      why: [
        "Approccio economico prima che narrativo: il piano di decarbonizzazione parte da capex, saving e rischio, non dalle dichiarazioni.",
        "Competenza di rendicontazione: Scope 1, 2 e 3, market-based accounting, EFRAG e pratiche di assurance.",
        "Indipendenza: i rating ESG pagano chi misura bene, non chi misura quanto bene vuole sembrare.",
        "Collegamento diretto con procurement e asset: il piano deve reggere anche il budget, non solo il report.",
      ],
      processTitle: "Come si svolge il progetto",
      steps: [
        {
          title: "Baseline delle emissioni",
          description:
            "Inventario delle emissioni dirette (Scope 1), indirette (Scope 2) e rilevanti della catena del valore (Scope 3), con il livello di granularità coerente con l'uso che ne farete.",
        },
        {
          title: "Analisi di materialità e stakeholder",
          description:
            "Selezioniamo i temi rilevanti per il vostro settore e il posizionamento degli investitori, così da non investire in disclosure che nessuno valuta.",
        },
        {
          title: "Costi di riduzione e curve di costo",
          description:
            "Curva marginale di decarbonizzazione: per ogni tonnellata risparmiata, quanto costa l'intervento e quando diventa conveniente. È il documento che serve al CdA.",
        },
        {
          title: "Roadmap e target",
          description:
            "Obiettivi intermedi e finali, coerenti con la strategia di decarbonizzazione dell'Unione e con le esigenze dei clienti ESG.",
        },
        {
          title: "Governance e reporting",
          description:
            "Responsabilità, cadenza di monitoraggio e contenuti minimi del reporting, con attenzione alla tracciabilità del dato.",
        },
        {
          title: "Supporto a rating e assurance",
          description:
            "Preparazione del fascicolo di evidenze, risposta alle richieste di assurance e gestione delle richieste di dati di terze parti.",
        },
      ],
      deliverablesTitle: "Cosa ricevi",
      deliverables: [
        "Inventario emissioni Scope 1, 2 e 3 con metodologia e livello di granularità",
        "Curva marginale di decarbonizzazione con capex e saving per intervento",
        "Roadmap di decarbonizzazione con target intermedi e finanziamento",
        "Matrice di materialità e posizionamento sui tempi ESG rilevanti",
        "Template di reporting periodico pronto per l'uso con stakeholder e assicuratori",
        "Supporto operativo alla preparazione delle dichiarazioni di sostenibilità",
      ],
      faqTitle: "Le domande che mi fanno più spesso",
      faq: [
        {
          question: "Siamo davvero obbligati a rendicontare?",
          answer:
            "La risposta dipende da dimensione, paese di quotazione e struttura del gruppo, e nel 2025–2026 il perimetro è stato oggetto di revisione a livello europeo. La cosa sensata è non aspettare la scadenza per capire se si è dentro: si fa una valutazione di adempienza in tre settimane e si ottiene un piano. Se siete fuori perimetro ma avete clienti quotati che chiederanno i dati, il business case lo dimostra da solo.",
        },
        {
          question: "Basta comprare crediti di carbonio?",
          answer:
            "Per Scope 2 sì, con scelte rigorose di qualità e vintage; per Scope 1 no, e sostituire la riduzione con crediti non è accettato dalla normativa di limitazione delle emissioni. Il credito di carbonio non copre la transizione industriale. Serve un piano di riduzione sulle emissioni Scope 1, con i crediti a coprire solo ciò che è oggettivamente irriducibile.",
        },
        {
          question: "Il rating ESG conta davvero per il costo del finanziamento?",
          answer:
            "Sì, ma in modo mediato e cumulativo. Il rating influenza il costo del credito, le condizioni dei finanziamenti sustainability-linked, l'accesso a certaini clienti istituzionali e, in prospettiva, la normativa di due diligence. Il punto pratico: migliorare il rating richiede dati solidi e una narrazione credibile. Migliorare il rating senza migliorare la sostanza non regge alla verifica — e il danno reputazionale è superiore al beneficio.",
        },
        {
          question: "Come si traduce un target di neutralità in budget?",
          answer:
            "In un piano di investimento pluriennale con priorità chiare. Ogni intervento di decarbonizzazione compete per la stessa cassa degli altri progetti, quindi va confrontato con il criterio di ritorno aziendale, non trattato come un canale separato. Il deliverable che uso è proprio questo: la curva dei costi per tonnellata, da cui deriva il piano di investimento.",
        },
      ],
      relatedSlugs: [
        "gestione-dell-energia-e-iso-50001",
        "rinnovabili-e-ppa",
        "acquisto-energia-e-gestione-del-rischio",
      ],
    },
    {
      slug: "incentivi-e-certificati-bianchi",
      icon: "incentives",
      title: "Incentivi e certificati bianchi",
      eyebrow: "Incentivi",
      shortDescription:
        "Individuazione, pratica e rendicontazione di incentivi nazionali ed europei, senza rallentare gli altri progetti.",
      metaDescription:
        "Consulenza su incentivi energetici e certificati bianchi: individuazione delle agevolazioni, pratiche GSE, rendicontazione TEE e verifica delle condizioni di accesso.",
      intro: [
        "Nel nostro Paese esiste un sistema di incentivi all'efficienza energetica tra i più articolati d'Europa: meccanismi di detrazione fiscale, crediti d'imposta per l'autoproduzione, bandi regionali, strumenti del PNRR e il mercato dei Titoli di Efficienza Energetica, che trasforma ogni intervento con risparmio misurabile in un credito negoziabile. Il potenziale è reale. Il problema è che la macchina burocratica è complessa e i termini cambiano.",
        "L'errore più costoso, e più frequente, non è rifiutare un incentivo: è scoprirlo tardi. Quando il cantiere è partito, la finestra per il credito d'imposta o per l'accesso al bando è spesso chiusa, e il progetto si realizza senza il contributo che il business case assumeva. Per questo il lavoro di identificazione degli incentivi non è un adempimento finale: è la prima attività di ogni progetto, e va fatta prima della decisione di investimento.",
      ],
      whyTitle: "Perché affidarsi a un consulente indipendente",
      why: [
        "Neutralità rispetto ai fornitori: molti incentivi vengono promossi da chi installa. Verifico eleggibilità e condizioni reali, non il valore dichiarato.",
        "Competenza tecnico-burocratica: pratiche GSE, bandi regionali, crediti d'imposta e condizioni di accesso sono il mio lavoro quotidiano.",
        "Scadenze sotto controllo: gestisco il calendario delle scadenze come parte del progetto, non come promemoria occasionale.",
        "Verifica dei risultati: il lavoro non si chiude con l'invio, ma con la rendicontazione e la liquidazione.",
      ],
      processTitle: "Come si svolge il progetto",
      steps: [
        {
          title: "Scansione delle opportunità",
          description:
            "Mappiamo incentivi nazionali, regionali e comunali incrociati con l'intervento previsto, verificando requisiti soggettivi e oggettivi di accesso.",
        },
        {
          title: "Verifica di cumulabilità",
          description:
            "Controlliamo se gli strumenti sono cumulabili e con quali limiti. Questo passaggio evita lo spiazzamento: un bando che esclude il credito d'imposta può cambiare la convenienza dell'operazione.",
        },
        {
          title: "Business case con scenario di premio",
          description:
            "Integriamo il valore dell'incentivo nel flusso di cassa dell'intervento, con scenari conservative, base e favorevole.",
        },
        {
          title: "Predisposizione della documentazione",
          description:
            "Calcoli, relazioni, attestazioni e dichiarazioni richieste, preparati per essere verificati da un revisore o da un funzionario GSE.",
        },
        {
          title: "Presentazione e gestione della pratica",
          description:
            "Invio, riscontro alle richieste di integrazione e assistenza fino all'esito. L'errore più comune è proprio la pratica incompleta in fase iniziale.",
        },
        {
          title: "Rendicontazione e verifica",
          description:
            "Chiusura della pratica, supporto ai controlli e valorizzazione del TEE generato, con un dossier completo dell'intervento.",
        },
      ],
      deliverablesTitle: "Cosa ricevi",
      deliverables: [
        "Mappa degli incentivi applicabili all'intervento, con requisiti e scadenze",
        "Verifica di cumulabilità e matrice delle combinazioni praticabili",
        "Business case aggiornato con il premio atteso, per scenario",
        "Dossier tecnico completo, pronto per la trasmissione",
        "Calendario delle scadenze e delle adempimenti successivi",
        "Assistenza completa fino all'esito della pratica e alla rendicontazione",
      ],
      faqTitle: "Le domande che mi fanno più spesso",
      faq: [
        {
          question: "Possiamo cumulare più incentivi?",
          answer:
            "Spesso sì, ma non sempre e non sempre per il totale. Ogni strumento ha regimi di cumulo e limiti specifici: la detrazione fiscale, il credito d'imposta in investimenti, i bandi regionali e il TEE operano con regole diverse. La domanda corretta è sempre quale combinazione massimizza il valore netto dell'intervento, calcolata al netto dell'eventuale anticipo di capitale richiesto.",
        },
        {
          question: "Vale la pena dedicarsi ai certificati bianchi?",
          answer:
            "Dipende dal risparmio. Un intervento con un risparmio energetico misurabile in modorobusto genera TEE che hanno un valore di mercato: non enorme, ma reale e monetizzabile. Nei progetti più grandi diventa una voce di ritorno non trascurabile. In quelli più piccoli, il costo amministrativo può superare il beneficio: meglio rendersene conto prima.",
        },
        {
          question: "I dati del GSE ci scoraggiano: è normale?",
          answer:
            "Sì, ed è il primo punto su cui si guadagna tempo. I portali GSE hanno regole di compilazione severe e scadenze che non si spostano. La gestione efficace è preparare il fascicolo in un formato già allineato ai controlli, prima dell'apertura della pratica: così la pratica passa in una revisione anziché in tre.",
        },
        {
          question: "Quanto costa la consulenza sull'incentivo?",
          answer:
            "Dipende dall'intervento e dal regime. Per pratiche standard la consulenza è a forfait; per operazioni complesse — bandi regionali con graduatoria, credito d'imposta su investimenti significativi, comunità energetiche — viene calcolata una quota percentuale legata al risultato. In entrambi i casi il principio è lo stesso: il mio compenso non deve superare il valore che creo.",
        },
      ],
      relatedSlugs: [
        "audit-energetico-e-due-diligence",
        "rinnovabili-e-ppa",
        "gestione-dell-energia-e-iso-50001",
      ],
    },
  ],
  en: [
    {
      slug: "audit-energetico-e-due-diligence",
      icon: "audit",
      title: "Energy audit and due diligence",
      eyebrow: "Due diligence",
      shortDescription:
        "Structured reviews of consumption, contracts and assets to assess risk and optimisation upside before you invest or acquire.",
      metaDescription:
        "Energy audit and energy due diligence for corporates, funds and investors: consumption, contract and asset analysis with quantified, independent recommendations.",
      intro: [
        "An energy audit is not a report to file away: it is the missing picture behind an investment decision. Real consumption, marginal costs, contracted terms, technical assets and an energy balance that ties them together. The output serves three questions: how much can we save, what does standing still cost us, and what will the return on the investment be over time.",
        "In Italy the regulatory perimeter is set by Legislative Decree 102/2014 and by standards UNI CEI TR 11428 and UNI CEI EN 16247, which define the minimum scope, the data collection methodology and the content of the report. For parties with a periodic obligation — large enterprises and energy-intensive enterprises — the energy audit is not optional: failure to comply carries pecuniary administrative penalties. For everyone else it remains the technical foundation that makes efficiency opportunities comparable.",
      ],
      whyTitle: "Why work with an independent consultant",
      why: [
        "Structural independence: I take no commission from suppliers, EPC contractors or manufacturers. My only incentive is that the business case holds.",
        "Quantified method: every recommendation arrives with capex, saving, payback and price sensitivity — not with a wish list.",
        "Multi-sector experience: high-consumption industrial operations, property portfolios and M&A processes where energy weighs on value.",
        "Regulatory command: the practice stands on UNI CEI EN 16247, UNI CEI 11352 and ISO 50001, not on generic paperwork.",
      ],
      processTitle: "How the engagement runs",
      steps: [
        {
          title: "Preliminary analysis and scoping",
          description:
            "We define perimeter, sites, energy vectors and the decision the work must support. This step avoids the classic audit that concludes nothing.",
        },
        {
          title: "Data collection",
          description:
            "Invoices, contracts, measurements, process records and site visits. Where metering is missing we propose a monitoring plan: without data there is no baseline.",
        },
        {
          title: "Energy balance",
          description:
            "We reconstruct flows by vector and by end use, with an hourly profile where available. This is the step that separates an analysis from a pile of bills.",
        },
        {
          title: "Benchmarking and risk analysis",
          description:
            "We compare consumption against sector benchmarks, test exposure to price and volume, and identify contracts to renegotiate or exit.",
        },
        {
          title: "Investment business case",
          description:
            "For each opportunity: investment, annual saving, payback, NPV and sensitivity. Options stay ranked by risk and economic merit.",
        },
        {
          title: "Deliverables and roadmap",
          description:
            "Technical report, board presentation and a 12-month roadmap with owners, dates and progress indicators.",
        },
      ],
      deliverablesTitle: "What you get",
      deliverables: [
        "Energy audit report compliant with UNI CEI EN 16247, ready for any ENEA filing",
        "Energy balance by vector and end use, with a documented baseline",
        "Investment business case with capex, saving, payback and sensitivity",
        "Supply contract review and renegotiation options",
        "12-month roadmap with owners, milestones and KPIs",
        "Executive summary for the board",
      ],
      faqTitle: "The questions I am asked most",
      faq: [
        {
          question: "What does it cost and how long does it take?",
          answer:
            "An audit of a medium-sized industrial site typically takes 4–8 weeks. The fee is a fixed quote defined after scoping, so it covers the real perimeter rather than a standard estimate. Investment costs are excluded: the intervention plan is evaluated separately.",
        },
        {
          question: "Is this the same as a mandatory energy audit?",
          answer:
            "Not necessarily. A statutory energy audit is a compliance obligation with a legally defined content; an audit is a decision-grade piece of work. I can conduct the audit in a compliant way and, in the same deliverable, add the economic analysis and the roadmap. That is usually the better option for clients who already hold a valid audit but need to decide.",
        },
        {
          question: "Can I use the report in a due diligence?",
          answer:
            "Yes, and it is one of the most common uses. I structure the report so an investor can read it: documented facts are separated from estimates, price and volume assumptions are stated explicitly, and missing data is flagged as a gap to close. Running the audit alongside due diligence shortens the timetable and removes duplicated work.",
        },
        {
          question: "Does the audit oblige me to carry out the measures?",
          answer:
            "No. An audit produces a decision framework. Many clients use it to select two or three measures to fund and shelve the rest. Recommending only what genuinely makes sense — even when that is less lucrative for the consultant — is the most effective way to build a trusted relationship.",
        },
      ],
      relatedSlugs: [
        "gestione-dell-energia-e-iso-50001",
        "rinnovabili-e-ppa",
        "acquisto-energia-e-gestione-del-rischio",
      ],
    },
    {
      slug: "gestione-dell-energia-e-iso-50001",
      icon: "management",
      title: "Energy management and ISO 50001",
      eyebrow: "Energy management",
      shortDescription:
        "Designing an energy management system: KPIs, accountability, monitoring and demonstrable continuous improvement, ready for certification.",
      metaDescription:
        "ISO 50001 design and certification: energy management system, KPIs, organisational roles, consumption monitoring and a continuous improvement plan.",
      intro: [
        "An energy management system is not a compliance chore: it is the shift from 'managing consumption with the attention of someone who reads the bill' to 'managing energy with the discipline of a production process'. ISO 50001 — alongside UNI CEI EN ISO 50001 — asks for exactly that: a documented, measured system with clear accountability and demonstrable improvement.",
        "The hard part in practice is not obtaining the certificate: it is making it last. An ISO 50001 that survives three audits and then empties of meaning costs more than it delivers, because it adds a certificate to show without improving anything. My work therefore always starts from the consumption baseline and the indicator definitions, and ends with the internal audit and the corrective action plan.",
      ],
      whyTitle: "Why work with an independent consultant",
      why: [
        "I am an ISO 50001 Lead Auditor: I know the certification body's perspective and build the system to withstand an audit, not to survive an interview.",
        "Data-led approach: without a baseline and without metering nothing can be certified, only asserted.",
        "Integration with management control: energy indicators enter periodic reporting instead of living in a separate file.",
        "Supplier independence: the system describes your real consumption, so it cannot be bent towards a product.",
      ],
      processTitle: "How the project runs",
      steps: [
        {
          title: "Gap analysis and baseline",
          description:
            "Comparison against the standard's requirements, construction of the energy baseline, and identification of critical areas.",
        },
        {
          title: "Energy analysis",
          description:
            "Inventory of consumption, vectors and end uses; selection of Energy Performance Indicators and definition of the measurement methodology.",
        },
        {
          title: "Documented structure",
          description:
            "Energy policy, energy analysis, energy objectives and targets, roles, operational procedures and management of opportunities.",
        },
        {
          title: "Roles and training",
          description:
            "Appointment of the energy manager, definition of the energy team duties, and training for the operators involved. A system without people does not work.",
        },
        {
          title: "Improvement plan and actions",
          description:
            "Objectives translated into projects with owners, deadlines and resources. This is the step that separates a living system from a compliant one.",
        },
        {
          title: "Internal audit and certification support",
          description:
            "Internal audit, non-conformity handling, corrective action plan and support through the certification body.",
        },
        {
          title: "Continuous improvement",
          description:
            "Periodic system review, baseline update and savings verification. The system evolves with the organisation.",
        },
      ],
      deliverablesTitle: "What you get",
      deliverables: [
        "Energy management system manual and supporting documentation",
        "Documented energy analysis and baseline by vector and end use",
        "Energy performance indicator set with thresholds, cadence and owners",
        "Energy improvement plan with actions, responsibilities and priorities",
        "Training plan for the energy manager and operators",
        "Support through the internal audit and certification",
      ],
      faqTitle: "The questions I am asked most",
      faq: [
        {
          question: "ISO 50001 or energy audit: which do we need?",
          answer:
            "It depends on where you stand. If the statutory audit does not apply to you but you want to govern consumption, ISO 50001 is the more complete instrument. If you do have a periodic obligation, the audit has to be done regardless — and the management system is what stops you rebuilding it from scratch every four years with the same manual effort. In practice the two paths feed each other.",
        },
        {
          question: "How much does certification cost?",
          answer:
            "Certification proper is the certification body's fee, which depends on the number of sites and the perimeter. Designing the system — energy analysis, documentation, training, internal audit — is a separate scope and is quoted separately. I give you two clearly separated figures so the comparison with a certification body's own proposal is transparent.",
        },
        {
          question: "Can we start with a single site?",
          answer:
            "Yes, and it is the option I recommend. A system confined to one critical site is simpler to operate, easier to certify and produces visible results quickly. Extending it to other sites then becomes a second phase, with a consolidated baseline as the comparison point.",
        },
        {
          question: "How do you guarantee the savings are real?",
          answer:
            "By measurement. A claimed saving without measurement is an opinion. We agree the baseline, the performance indicator and the verification protocol — following IPMVP — before we start, and we measure afterwards. If verification does not confirm the expected saving, that is my error and I correct it.",
        },
      ],
      relatedSlugs: [
        "audit-energetico-e-due-diligence",
        "decarbonizzazione-e-esg",
        "incentivi-e-certificati-bianchi",
      ],
    },
    {
      slug: "rinnovabili-e-ppa",
      icon: "renewables",
      title: "Renewables and PPAs",
      eyebrow: "Renewables",
      shortDescription:
        "Technology selection, project structure and PPA and self-consumption contracts that lock in the price of energy over time.",
      metaDescription:
        "Renewables and PPA advisory: technology selection, project development, self-consumption, energy purchase agreements and risk structuring.",
      intro: [
        "The renewables decision is not a technical decision: it is a balance sheet decision. Every plant, energy community or purchase agreement moves risk, liquidity and tied-up capital onto a 15–25 year horizon. The right question is not 'is solar worth it?' — which depends on latitude — but 'which mix of assets and contracts minimises the risk-adjusted cost of energy over my investment horizon?'.",
        "The regulatory framework keeps moving: collective self-consumption and energy communities, direct sale contracts, eligibility criteria and tax regimes change from year to year. A project designed against a superseded framework is a project to be redone. That is why the advisory work does not stop at technology selection: it covers the contractual structure, taxation, grid connection and residual risk profile.",
      ],
      whyTitle: "Why work with an independent consultant",
      why: [
        "No ties to manufacturers or EPC contractors: I assess technologies on their fit for your case, not on a supplier's margin.",
        "Command of the regulatory frame: self-consumption, energy communities, direct sale contracts and incentive schemes are my daily work.",
        "Rigorous economic evaluation: comparison between PPA, self-consumption and the market, with sensitivity to price, WACC and duration.",
        "Attention to execution risk: connection timelines, administrative process, grid capacity and coverage during construction.",
      ],
      processTitle: "How the project runs",
      steps: [
        {
          title: "Consumption profile analysis",
          description:
            "We rebuild the hourly and seasonal consumption profile: this is the data that determines the self-consumable share and therefore the choice between PPA, self-consumption and grid sale.",
        },
        {
          title: "Generation scenarios and portfolio",
          description:
            "We assess optimal installed capacity, the mix of sources, and the role of storage for self-consumption and peak coverage.",
        },
        {
          title: "Contract structure comparison",
          description:
            "On-site PPA, off-site PPA, self-consumption, direct sale and energy communities: impact on accounts, price risk and liquidity.",
        },
        {
          title: "Tax and incentive assessment",
          description:
            "We verify which reliefs apply, what the access conditions are, and what the recurring obligations become once a scheme closes.",
        },
        {
          title: "Technical risk assessment",
          description:
            "Grid capacity, connection timelines, curtailment exposure, cover during construction and counterparty quality.",
        },
        {
          title: "Negotiation support",
          description:
            "Defining the term sheet, reviewing the draft contract and supporting the negotiation with the selected supplier.",
        },
      ],
      deliverablesTitle: "What you get",
      deliverables: [
        "Feasibility report with consumption profile and recommended installed capacity",
        "Economic and risk comparison between the available contractual structures",
        "Term sheet covering the points that matter for negotiation",
        "Technical and administrative checklist for connection and incentive processes",
        "Residual risk matrix with mitigations",
        "Project roadmap with milestones and responsibilities",
      ],
      faqTitle: "The questions I am asked most",
      faq: [
        {
          question: "On-site PPA or direct sale — which is better?",
          answer:
            "It depends on how your load profile correlates with generation. On-site is more efficient when load and output are correlated, because it avoids the network and its losses. Direct sale offers the geographic reach of a traditional PPA within a clearly defined tax framework. The correct choice starts from consumption data, not from the terms a supplier puts on the table.",
        },
        {
          question: "Should we sign a PPA now?",
          answer:
            "That depends on your risk profile. A PPA fixes the price for 10–15 years: it protects against increases but also removes the benefit of any market decline. It makes sense if your objective is budget predictability; it makes less sense if the operating margin cannot carry a high fixed price. It is a balance sheet decision before it is a market decision.",
        },
        {
          question: "How much does self-consumption reduce the bill?",
          answer:
            "Directly — but only on the share of energy that is self-consumed at the same time. That is why sizing must be done against the real hourly profile, not the annual average. A plant sized on the annual average overproduces at midday and misses the evening peak. It is the most expensive and most common mistake in solar projects.",
        },
        {
          question: "Can we use energy communities and collective self-consumption?",
          answer:
            "Yes, if the preconditions hold: physical proximity, shared infrastructure and a manageable level of complexity. I check feasibility and the administrative process up front, because that is the part that determines the timeline more than the economics do.",
        },
      ],
      relatedSlugs: [
        "acquisto-energia-e-gestione-del-rischio",
        "decarbonizzazione-e-esg",
        "incentivi-e-certificati-bianchi",
      ],
    },
    {
      slug: "acquisto-energia-e-gestione-del-rischio",
      icon: "procurement",
      title: "Energy procurement and risk management",
      eyebrow: "Procurement",
      shortDescription:
        "Procurement strategy, market timing and hedging to reduce volatility and defend the corporate energy budget.",
      metaDescription:
        "Electricity and gas procurement advisory: procurement strategy, hedging, price risk management and supply contract review.",
      intro: [
        "For most manufacturing businesses, energy is the second operating cost after raw materials. And unlike raw materials, you do not manage it — you absorb it, unless somebody takes a methodical look at the contracts. Every kWh not hedged in advance is a kWh exposed to a variable nobody controls.",
        "The point is not to trade: it is to build a hedging policy that protects the operating margin without tying up capital and without leaving the accounts exposed to a price that could halve. The contractual and regulatory perimeter includes spot and forward markets, the gas market, direct sale contracts, guarantees of origin and correct qualification as a 'non-domestic customer', which changes the commercial terms applied.",
      ],
      whyTitle: "Why work with an independent consultant",
      why: [
        "No return from producers or brokers: product selection and timing do not depend on commission received.",
        "Quantified method: every hedge is assessed on scenario, not on market conviction.",
        "Contractual command: I review clauses, imbalances, penalties and switching costs — not just the headline tariff.",
        "Continuity: I follow the relationship over time, with periodic reviews of the position.",
      ],
      processTitle: "How the project runs",
      steps: [
        {
          title: "Consumption and contract inventory",
          description:
            "Base year, volatility, seasonality, expiring clauses and pending compliance obligations. The starting point is almost always an imminent deadline nobody noticed.",
        },
        {
          title: "Market benchmark",
          description:
            "We assess the conditions available in the market for the period of interest, with price scenarios and an analysis of tariff components.",
        },
        {
          title: "Hedging strategy definition",
          description:
            "Fixed and indexed share, time horizon, profile by band and, where relevant, gas hedging. We build the target scenario.",
        },
        {
          title: "Review of active contracts",
          description:
            "Verification of clauses, imbalances, penalties, switching costs and opportunities for renegotiation or early exit.",
        },
        {
          title: "Selection and negotiation",
          description:
            "Offers compared on merit — not on nominal discount — with support in negotiating the terms that matter.",
        },
        {
          title: "Coverage plan and monitoring",
          description:
            "Coverage calendar, re-entry rules and monthly monitoring with a report for the CFO. Hedging is not a one-off transaction: it is a discipline.",
        },
      ],
      deliverablesTitle: "What you get",
      deliverables: [
        "Position report: consumption, contracts, prices, imbalances and expiring risks",
        "Hedging strategy with horizon, profile and re-entry rules",
        "Scenario and sensitivity analysis of the energy budget",
        "Offer evaluation matrix across cost, risk and flexibility",
        "List of critical clauses to renegotiate, with proposed wording",
        "Periodic monitoring report and forward calendar of decisions",
      ],
      faqTitle: "The questions I am asked most",
      faq: [
        {
          question: "Should we hedge the entire requirement?",
          answer:
            "Not necessarily. Full hedging removes volatility but ties up capital and prevents you from benefiting from any decline. The optimum depends on how much price movement your operating margin can absorb and on the historical volatility of your load. That is what the scenario analysis is for — there is no fixed rule.",
        },
        {
          question: "What is the difference between a supplier and a broker?",
          answer:
            "A supplier sells energy and makes it available; a broker acts as a consultant that selects and manages hedges on the client's behalf. A broker should be independent of the counterparties: if it earns a commission on the sale, its margin lies in the product choice, not in your savings. That is exactly why my engagement is on a fixed fee with no commission.",
        },
        {
          question: "How do you handle expiring contracts?",
          answer:
            "With a calendar covering at least twelve months and quarterly reviews. The most effective practice is to bring the expiry forward by at least two quarters: the market has then priced in expectations and the negotiation starts from clearer conditions. It is one of the few cases where timing is worth more than negotiation.",
        },
        {
          question: "Can you help after signature?",
          answer:
            "Yes, and for me that is the most valuable part. The value is not in a single contract but in managing the portfolio over time: monitoring, imbalances, compliance and renegotiations as the market moves. It is a low-cost ongoing engagement that prevents expensive mistakes.",
        },
      ],
      relatedSlugs: [
        "rinnovabili-e-ppa",
        "decarbonizzazione-e-esg",
        "audit-energetico-e-due-diligence",
      ],
    },
    {
      slug: "decarbonizzazione-e-esg",
      icon: "decarbonization",
      title: "Decarbonisation and ESG",
      eyebrow: "ESG & net zero",
      shortDescription:
        "Roadmaps towards carbon neutrality, energy accounting and reporting ready for investors and auditors.",
      metaDescription:
        "Decarbonisation and ESG advisory: net zero roadmaps, Scope 1 2 3, CSRD reporting and support on sustainability ratings.",
      intro: [
        "Decarbonisation is a question of capital allocation, not communication. A path to carbon neutrality is built by looking at cost structure, asset residual life and the feasibility of measures: a company cutting Scope 1 through efficiency, at a fraction of the cost of replacing thermal energy, is doing the hard part — the part that holds over time.",
        "At the same time, the reporting perimeter has tightened: the CSRD and its implementing regulations have extended sustainability reporting obligations to a far broader set of companies, with EFRAG standards and demand for third-party data coming through banks, customers and insurers. An energy figure that is not available is not a missing figure: it becomes a commercial risk.",
      ],
      whyTitle: "Why work with an independent consultant",
      why: [
        "Economic before narrative: the decarbonisation plan starts from capex, saving and risk, not from declarations.",
        "Reporting command: Scope 1, 2 and 3, market-based accounting, EFRAG and assurance practice.",
        "Independence: ESG ratings reward accurate measurement, not flattering measurement.",
        "Direct link to procurement and assets: the plan must survive the budget, not only the report.",
      ],
      processTitle: "How the project runs",
      steps: [
        {
          title: "Emissions baseline",
          description:
            "Inventory of direct emissions (Scope 1), indirect emissions (Scope 2) and the relevant parts of the value chain (Scope 3), at a granularity consistent with how the data will be used.",
        },
        {
          title: "Materiality and stakeholder analysis",
          description:
            "We select the topics that matter in your sector and in investors' frameworks, so you do not invest in disclosures nobody assesses.",
        },
        {
          title: "Abatement costs and cost curves",
          description:
            "Marginal abatement curve: for every tonne saved, what does the measure cost and when does it become worthwhile? This is the document the board needs.",
        },
        {
          title: "Roadmap and targets",
          description:
            "Intermediate and final targets, coherent with the EU decarbonisation strategy and with the requirements of your ESG-conscious customers.",
        },
        {
          title: "Governance and reporting",
          description:
            "Accountability, monitoring cadence and minimum reporting content, with attention to data traceability.",
        },
        {
          title: "Rating and assurance support",
          description:
            "Preparing the evidence file, responding to assurance requests and handling third-party data requests.",
        },
      ],
      deliverablesTitle: "What you get",
      deliverables: [
        "Scope 1, 2 and 3 emissions inventory with methodology and granularity",
        "Marginal abatement curve with capex and saving per measure",
        "Decarbonisation roadmap with intermediate targets and funding plan",
        "Materiality matrix and positioning on the ESG topics that matter",
        "Periodic reporting template ready for stakeholders and assurance",
        "Operational support in preparing sustainability statements",
      ],
      faqTitle: "The questions I am asked most",
      faq: [
        {
          question: "Are we actually required to report?",
          answer:
            "It depends on size, country of listing and group structure, and the European perimeter was under revision through 2025–2026. The sensible course is not to wait for a deadline to find out whether you are in scope: a three-week compliance assessment with a plan is enough. If you are out of scope but have listed customers who will ask for the data, the business case makes itself.",
        },
        {
          question: "Is buying carbon credits enough?",
          answer:
            "For Scope 2, yes, with rigorous choices on quality and vintage; for Scope 1, no. Replacing reductions with credits is not accepted under emissions limitation rules. Carbon credits do not deliver the industrial transition. You need a Scope 1 reduction plan, with credits covering only what is genuinely irreducible.",
        },
        {
          question: "Does the ESG rating really affect our cost of capital?",
          answer:
            "Yes, but through a cumulative and mediated channel. The rating affects the cost of credit, the terms of sustainability-linked financing, access to certain institutional clients and, prospectively, due diligence rules. The practical point: improving the rating requires solid data and a credible narrative. Improving it without changing the substance does not survive verification — and the reputational damage exceeds the benefit.",
        },
        {
          question: "How does a net zero target translate into a budget?",
          answer:
            "Into a multi-year investment plan with clear priorities. Every decarbonisation measure competes for the same cash as every other project, so it has to be compared against the company's return criteria rather than treated as a separate channel. The deliverable I use for exactly this is the cost-per-tonne curve, from which the investment plan follows.",
        },
      ],
      relatedSlugs: [
        "gestione-dell-energia-e-iso-50001",
        "rinnovabili-e-ppa",
        "acquisto-energia-e-gestione-del-rischio",
      ],
    },
    {
      slug: "incentivi-e-certificati-bianchi",
      icon: "incentives",
      title: "Incentives and white certificates",
      eyebrow: "Incentives",
      shortDescription:
        "Identifying, applying for and reporting on national and European incentives, without slowing down your other projects.",
      metaDescription:
        "Energy incentive and white certificate advisory: identifying reliefs, GSE applications, TEE reporting and verification of access conditions.",
      intro: [
        "Italy runs one of the most elaborate energy-efficiency incentive systems in Europe: tax deductions, tax credits for self-generation, regional calls, PNRR instruments and the Titoli di Efficienza Energetica market, which turns any intervention with a measurable saving into a tradable certificate. The potential is real. The problem is that the machinery is complex and the rules keep moving.",
        "The most expensive mistake, and the most common one, is not missing an incentive: it is discovering it late. Once construction has started, the window for the tax credit or for the call is often closed, and the project proceeds without the contribution the business case assumed. That is why incentive mapping is not a closing formality: it is the first activity of every project, and it has to happen before the investment decision.",
      ],
      whyTitle: "Why work with an independent consultant",
      why: [
        "Neutrality towards suppliers: many incentives are promoted by the party that installs. I verify eligibility and real conditions, not the headline value.",
        "Technical and administrative command: GSE procedures, regional calls, tax credits and access conditions are my daily work.",
        "Deadlines under control: I manage the calendar of deadlines as part of the project, not as an occasional reminder.",
        "Verified outcomes: the work does not end with submission, but with reporting and settlement.",
      ],
      processTitle: "How the project runs",
      steps: [
        {
          title: "Opportunity scan",
          description:
            "We map national, regional and municipal incentives against the planned measure, checking eligibility on both applicant and asset requirements.",
        },
        {
          title: "Cumulability check",
          description:
            "We check whether instruments can be combined and under which caps. This step prevents the trap: a call that excludes the tax credit can change whether the project makes sense.",
        },
        {
          title: "Business case with incentive scenarios",
          description:
            "We integrate the incentive value into the measure's cash flow, with conservative, base and favourable scenarios.",
        },
        {
          title: "Documentation preparation",
          description:
            "Calculations, reports, attestations and declarations, prepared so they can be checked by an auditor or a GSE officer.",
        },
        {
          title: "Submission and case management",
          description:
            "Filing, response to requests for clarification and support through to outcome. Incomplete documentation at submission is the single most common cause of delay.",
        },
        {
          title: "Reporting and verification",
          description:
            "Case closure, support through controls and monetisation of the generated white certificates, with a complete file for the measure.",
        },
      ],
      deliverablesTitle: "What you get",
      deliverables: [
        "Map of incentives applicable to the measure, with requirements and deadlines",
        "Cumulability check and matrix of practical combinations",
        "Business case updated with the expected incentive, by scenario",
        "Complete technical dossier, ready for submission",
        "Calendar of deadlines and follow-up obligations",
        "Full assistance through to case outcome and reporting",
      ],
      faqTitle: "The questions I am asked most",
      faq: [
        {
          question: "Can we combine several incentives?",
          answer:
            "Often yes, but not always and not usually in full. Each instrument has its own cumulation regime and caps: the tax deduction, the investment tax credit, regional calls and white certificates operate under different rules. The right question is always which combination maximises the net value of the measure, net of any upfront capital it requires.",
        },
        {
          question: "Is it worth pursuing white certificates?",
          answer:
            "It depends on the saving. An intervention with a robustly measurable saving generates white certificates with a real — if modest — market value. On large projects it becomes a meaningful line of return; on small ones the administrative cost can exceed the benefit. Better to establish that before committing.",
        },
        {
          question: "The GSE portals intimidate us — is that normal?",
          answer:
            "Yes, and it is the first place where time is saved. GSE portals have strict validation rules and immovable deadlines. The effective approach is to prepare the file in a format already aligned with the checks before opening the case, so it passes through review once instead of three times.",
        },
        {
          question: "How much does incentive advisory cost?",
          answer:
            "It depends on the measure and the scheme. For standard cases the advisory fee is fixed; for complex operations — ranked regional calls, tax credits on significant investments, energy communities — a percentage fee tied to the outcome is calculated. Either way the principle is the same: my fee should never exceed the value I create.",
        },
      ],
      relatedSlugs: [
        "audit-energetico-e-due-diligence",
        "rinnovabili-e-ppa",
        "gestione-dell-energia-e-iso-50001",
      ],
    },
  ],
};

/** Slugs are locale-independent: they identify the service, not the translation. */
export const serviceSlugs = services.it.map((service) => service.slug);
