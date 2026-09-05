# Com'è messa la vetrina — rapporto del 2026-09-05

Questo documento risponde alla domanda da cui è nato tutto: *la vetrina del design system funziona?*
È scritto per essere letto senza conoscere il codice.

---

## Il verdetto in breve

**La vetrina ora funziona, e stavolta lo sappiamo perché l'abbiamo guardata tutta.** Non un campione:
tutte e 504 le voci, una per una, in entrambi i temi.

Il difetto che avevi segnalato — *il tema scuro non si vede* — era reale, aveva una causa precisa, ed
è stato corretto. Le voci che sembravano vuote sono state controllate a una a una: nessuna era rotta.

Restano due debiti veri, misurati e non nascosti: **l'accessibilità** e **109 controlli che non fanno
niente**. Nessuno dei due si chiude in questo ciclo, ed entrambi hanno adesso un numero e un piano.

## I numeri

| Cosa è stato verificato | Esito |
|---|---|
| Ogni voce si apre e mostra qualcosa | **504 su 504** |
| Ogni voce cambia aspetto fra tema chiaro e scuro | **504 su 504** |
| Le voci elencate nel menu corrispondono a quelle esistenti | **504 su 504**, una a una |
| Il testo colorato si legge sul proprio sfondo | **54 combinazioni su 54** |
| La suite completa, due volte di fila | **507 e 507**, zero fallimenti |
| I controlli di modifica producono un effetto | **434 su 568** — 109 no |
| Violazioni di accessibilità trovate | **441**, di cui 76 gravissime e 269 gravi |

## Che cosa era rotto davvero

**Il tema scuro non arrivava a schermo.** Il meccanismo funzionava — il tema veniva applicato, i
colori cambiavano nei calcoli — ma nessuno dipingeva lo sfondo della finestra in cui i componenti
vengono mostrati. Restava il bianco predefinito del browser, sempre. Corretto: ora lo sfondo prende i
colori del tema, e la prova è che tutte le 504 voci cambiano davvero aspetto.

**Alcuni colori non esistevano.** In dodici file il nome del colore veniva costruito pezzo per pezzo
mentre il programma girava. Lo strumento che genera i colori legge il testo del codice, non lo esegue:
un nome costruito a pezzi non viene mai prodotto. Risultato: l'avatar dell'utente nell'header restava
senza sfondo, e la stessa cosa in altri undici punti. Ventidue casi, tutti corretti.

**Il testo colorato non si leggeva.** In tema chiaro, 26 combinazioni su 27 stavano sotto la soglia di
leggibilità: la peggiore a 1,85 contro il 4,5 richiesto. Corrette tutte, verificate una per una.

**La vetrina pubblicata poteva essere incompleta.** Il comando che costruisce la versione da
pubblicare riusava una copia vecchia senza accorgersene: produceva **25 voci in meno su 380** — fra
cui l'intero gruppo dell'header — senza un solo avviso. Sarebbe finita online così. Corretto: ora la
costruzione riparte sempre da zero.

**Un comando di pulizia non aveva mai funzionato.** Chiamava uno strumento che nel progetto non è
installato. Nessuno se n'era accorto perché nessuno lo lanciava. Riscritto.

## Che cosa sembrava rotto e non lo era

Tre voci risultavano in errore nel primo giro completo. Controllate una a una: **nessuna era un
difetto**.

- `LottiePlayer › Placeholder While Loading` punta di proposito a un file inesistente, per mostrare
  cosa succede quando un'animazione non si carica. L'errore *è* l'argomento della voce.
- `DataTable › With Mocked Error` simula di proposito un guasto del server, per mostrare come la
  tabella reagisce.
- `MobileNav › With Badges` è invisibile sullo schermo largo perché è il menu per telefono.

Ognuna è ora dichiarata per iscritto con la sua ragione, così la prossima volta non fa perdere tempo a
nessuno. Le voci che non hanno una ragione dichiarata continuano a far fallire il controllo: l'elenco
delle eccezioni è corto e motivato, non un tappeto sotto cui spingere i problemi.

## I due debiti che restano

### 1. Accessibilità — 441 problemi

Sono problemi di leggibilità e di struttura che rendono la vetrina difficile da usare per chi ha
difficoltà visive o naviga da tastiera. Il più frequente è ancora il contrasto (217 casi), ma di una
famiglia diversa da quella già corretta: 138 riguardano il tema scuro e 93 le pagine di
documentazione, che esistono solo da ieri e non erano mai state guardate.

**Non sono una regressione**: sono debito che c'era già e che nessuno aveva misurato.

Il piano è: correggerli in un ciclo dedicato, partendo da `KanbanBoard` che da solo ne raccoglie 32, e
**solo dopo** accendere il controllo automatico che li blocca. Accenderlo adesso renderebbe ogni
verifica rossa in permanenza, e nessuno distinguerebbe più un problema nuovo da uno vecchio.

### 2. Centonove controlli che non fanno niente

Nella vetrina ogni componente ha dei comandi per provarne le varianti — cambia il colore, cambia la
dimensione. **Centonove di questi non producono alcun effetto.** Chi li prova non ha modo di capire se
sia il comando a essere finto o il componente a essere rotto.

Quattordici sono corretti così (le pagine che mostrano *tutte* le varianti insieme non possono
obbedire a un comando che ne sceglie una). Gli altri 95 no.

La correzione è caso per caso e vale un ciclo a sé.

## Quello che è anche migliorato, senza che fosse chiesto

- **La verifica completa dura la metà**: da 6,5 minuti a 3,3, e soprattutto **non fallisce più a
  caso**. Prima capitava che una voce risultasse rotta senza esserlo, semplicemente perché il
  computer era sotto sforzo: nove volte in questo ciclo. Ora la vetrina viene costruita prima e poi
  verificata, e il problema è sparito alla radice.
- **Quando qualcosa si rompe, adesso lo dice.** Prima un fallimento riportava «previsto diverso da 0,
  ricevuto 0», che non significa niente. Ora riporta il motivo vero.
- **Le pagine di documentazione ora esistono.** Il codice le dichiarava ovunque, i piani le davano per
  scontate, ma mancava il componente che le genera: erano zero. Ora sono **124**, una per componente,
  con la tabella delle proprietà.
- **Il menu è più leggibile**: i gruppi principali scendono da 19 a 17, l'header non è più un gruppo a
  sé ma sta dentro il guscio di pagina insieme a sidebar e footer, e l'ordinamento — che elencava tre
  gruppi inesistenti ed era di fatto casuale — ora segue un ordine pensato.

## Sulla velocità: nessun intervento, e perché

I file più pesanti sono stati misurati. Il più grosso dopo i grafici è il misuratore di robustezza
delle password, 804 KB: pesa così perché include un dizionario di parole comuni, che è il suo modo di
funzionare. Non è un difetto da correggere — cambiarlo significherebbe cambiare libreria, che è una
decisione di prodotto e non un'ottimizzazione.

Gli altri file pesanti sono i grafici e le scene 3D, e **vengono caricati solo quando si apre quella
voce**: il peso totale non è ciò che scarica chi visita la vetrina.

Il piano chiedeva di intervenire *solo dove i numeri indicano*. I numeri non indicano niente da fare,
quindi non è stato fatto niente.

## Cosa non è stato guardato

- **Come si comporta con uno screen reader**, che è la prova vera dell'accessibilità. Lo strumento
  automatico trova gli errori di forma, non se il contenuto abbia senso letto ad alta voce.
- **Gli stati che si vedono solo interagendo**: menu aperti, finestre di dialogo, campi con il fuoco.
- **Se l'effetto di un comando sia quello giusto**: si è verificato che qualcosa cambi, non che cambi
  correttamente.
- **Il comportamento su schermo di telefono**: tutto è stato verificato su una finestra da computer.

## Dove sono i dettagli

- Contrasto dei colori: `2026-09-04-contrasto-toni.md`
- Velocità e stabilità: `2026-09-04-prestazioni-vetrina.md`
- Struttura del design system: `2026-09-04-struttura-design-system.md`
- Accessibilità: `2026-09-05-inventario-accessibilita.md`
- Comandi della vetrina: `2026-09-05-inventario-controls.md`

Gli schermi di ogni singola voce, presi durante il giro completo, stanno in
`ui/test-results/qa-sweep/`: servono a ricontrollare a occhio senza rifare il giro.
