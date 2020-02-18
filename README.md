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
- Opprett en IAM-bruker med navn: `terraform` følgende rettigheter TODO ``
- Installer aws-cli'et på maskinen din, sjekk `aws iam get-user` for å se at du er logget inn som en bruker

## Oppstart

Felles mål her er en immutable webapp med to s3-buckets som hoster index.html og kildekode

* Opprett to buckets opprettes fra terraform
* Deploy kan skje via aws-cli fra egen maskin (Husk å sette rett cacheing-flagg for filene ved opprettelse)

- Deploy til assets automatisk på push (`.github/workflows/nodejs.yml`)
 - Krever opprettelse av ny bruker, se `ci-user.tf`

- Legg til cloudfront

- Deploy automatisk til testmiljø på push



## Alternativer videre (bruk rekkefølgen som står eller plukk selv om du ønsker noe spesielt)
* Opprett og deploy index.html ved hver push
* Lag et prodmiljø
* Lag og deploy til miljø ved å trigge en lambda
* Lag et eget domene i Route 53 slik at du får tilsvarende adresse
* Opprett et


## Naming i terraform

name på ressursser = tf-*
navn i terraform   = se link

Tags
resoures:
managed_by = terraform
environment = test/prod

iam:
type   = program/person
