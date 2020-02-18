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
- Opprett en IAM-bruker med navn: `terraform` med `Programmatic access` og `Attach existing policies directly` med policy name  `AdministratorAccess` - skip tags, men last ned access-key og secret.
- Installer aws-cli'et på maskinen din, kjør `aws configure`.
sjekk `aws iam get-user` for å se at du er logget inn som en bruker

## Oppstart

Felles mål her er en immutable webapp med to s3-buckets som hoster index.html og kildekode

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
 - key er `<git-sha>/main.js`
* Bygg index.html (`cd src-index; sh index.sh`) og kopier index.html til host-bucket.

Om du nå går på `<bucket_domain_name>/index.html` bør du se `Created at <tidspunkt du kjørte index.sh>`. Henting av assets feiler pga feil url.

### CDN


### Autodeploy av assets

- Deploy til assets automatisk på push (`.github/workflows/nodejs.yml`)
- Krever opprettelse av ny bruker, se `ci-user.tf`

### Autodeploy av host
- Deploy automatisk til testmiljø på push
- sha kan hentes ved environment variabelen GITHUB_SHA 




## Alternativer videre (bruk rekkefølgen som står eller plukk selv om du ønsker noe spesielt)
* Opprett og deploy index.html ved hver push
* Lag et prodmiljø
* Lag og deploy til miljø ved å trigge en lambda
* Lag et eget domene i Route 53 slik at du får tilsvarende adresse
* Trekk ut prodmiljø i en egen account
* Lag en backend
* Bytt til workspaces i stedet for mapper for miljøer



## Naming i terraform

name på ressursser = tf-*
navn i terraform   = se link

Tags
managed_by = terraform
environment = ci/dev/test/prod/common
type/system = tilhørighet


I alle moduler:
Lag en input variabel i alle moduler som heter `tags  , type map(string)`  og så ha en `tags = var.tags` eller vtags = merge(var.tags, { Name = "mytag"})   hvis du trenger å legge til egne
> Det aller viktigste er egentlig at du skriver moduler som du kan sende tags inn i uten å måtte endre hele modulen hvis du senere kommer på en tag som er kjekk å ha


iam:
type   = program/person
