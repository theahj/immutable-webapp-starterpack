# Immutable-webapp
En implementasjon av stukturen fra https://immutablewebapps.org/



## Gode sky-prinsipper
* Infrastruktur som kode
* Deploy av kode og infrastruktur skal skje fra ci
* Utviklere skal ha rettigheter som ikke stopper dem fra å teste og utforske
* Prod skal ha annen tilgangsstyring enn test
* Bygget kode skal kunne deployes til alle miljøer - config skal leve et annet sted
* Den eneste hemmeligheten utenfor infrastrukturen skal egentlig være access-keys
* Gjør deg kjent med verktøyene i skyplattformen, deres styrker og svakheter, følg med på nyheter :)
* Om to produkter kan løse samme oppgaven, velg den som gir minst vedlikeholdsarbeide

## Før du starter

- Opprett en AWS-konto (OBS: du legger inn betalingskort, så vær klar over at du betaler for enkelte tjenester)
- jeg har valgt region Stockholm / eu-north-1
- Opprett en IAM-bruker med navn: `terraform` med `Programmatic access` og `Attach existing policies directly` med policy name  `AdministratorAccess` - legg til tagg "system=terraform" og last ned access-key og secret.
- Installer aws-cli'et på maskinen din, kjør `aws configure`.
sjekk `aws iam get-user` for å se at du er logget inn som en bruker

Om du allerede nå ser at du vil lage noe under et eget domene, anbefaler jeg å gå inn på AWS Route 53 og opprettet et billig et med en gang. Selv om det sikkert går mye fortere, advarere Amazon om at det kan ta opp til 3 dager.

## Min første immutable webapp

Felles mål her er en immutable webapp med to s3-buckets og et cdn foran som hoster index.html og kildekode.

Om du ikke er veldig kjent i aws-konsollen fra før, anbefaler jeg å sjekke ut https://console.aws.amazon.com/<s3|cloudfront|route53> underveis!

### Testmiljø med buckets

Opprett to buckets (asset og host) opprettes fra terraform (acl=public-read) : https://www.terraform.io/docs/providers/aws/r/s3_bucket.html

Output:
* bucket_domain_name for bucket som skal hoste index.html
* id på begge buckets

### Deploy av filer

Opplasting av filer skjer med `aws cp`, [docs](https://docs.aws.amazon.com/cli/latest/reference/s3/cp.html)
Generelt
- Husk å sette rett cache-flagg for filene ved opprettelse
- Filopplastingen spesifisere tilgang via flagget `acl`. `public-read` funker bra i vårt tilfelle og gir åoen lesetilgang på nett
- S3Uri er på formatet `s3://<bucket-name>/<key>` hvor key er mappestruktur og filnavn


* Bygg assets manuelt (`npm run build`) og last opp fila i asset-bucketen på under navnet git-sha/main.js. .
 - `git rev-parse HEAD` gir deg siste commit på din branch
 - bruk følgende key `assets/<git-sha>/main.js`
* Bygg index.html (`cd src-index; sh index.sh`) og kopier index.html til host-bucket.

Om du nå går på `<bucket_domain_name>/index.html` bør du se `Created at <tidspunkt du kjørte index.sh>`. Henting av assets feiler pga feil url.

### CDN

AWS CloudFront er Amazon sin CDN-provider, se [terraform-docs](https://www.terraform.io/docs/providers/aws/r/cloudfront_distribution.html).

*Vi tar en felles gjennomgang av CloudFront - si i fra når du er kommet hit!*

Test ut endringer i `App.jsx` og deploy ny versjon av assets og index for å sjekke caching og endringer.
- OBS: Nå kan du bruke `domain_name` outputen fra cloudfront som erstatning for `my-url` i `src-index/main.js`

### Autodeploy av assets fra Github Actions

- Deploy til assets automatisk på push, se (`.github/workflows/nodejs.yml`)
- sha kan hentes ved environment variabelen GITHUB_SHA
- Krever opprettelse av ny bruker , se `ci-user.tf`

### Autodeploy til host
- Utvid push (`.github/workflows/nodejs.yml`) til også å lage og laste opp index.html


## Alternativer videre (bruk rekkefølgen som står eller plukk selv om du ønsker noe spesielt)
* Ta i bruk remote state
* Lag et prodmiljø
* Trekk ut til en felles terraform-modul
* Lag og deploy til miljø ved å trigge en lambda
* Lag et eget domene i Route 53 slik at du får tilsvarende adresse
* Trekk ut prodmiljø i en egen account
* Lag en backend
* Bytt til workspaces i stedet for mapper for miljøer
* Bruk moduler fra https://github.com/cloudposse/, feks https://github.com/cloudposse/terraform-aws-cloudfront-cdn



## Naming i terraform

name på ressursser = tf-*
navn i terraform   = se link

Tags
managed_by = terraform
environment = ci/dev/test/prod/common
system = tilhørighet


I alle moduler:
Lag en input variabel i alle moduler som heter `tags  , type map(string)`  og så ha en `tags = var.tags` eller vtags = merge(var.tags, { Name = "mytag"})   hvis du trenger å legge til egne
> Det aller viktigste er egentlig at du skriver moduler som du kan sende tags inn i uten å måtte endre hele modulen hvis du senere kommer på en tag som er kjekk å ha

iam:
type   = program/person
