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

## Naming i terraform

name på ressursser = tf-*
navn i terraform   = se link

Tags
resoures:
managed_by = terraform
environment = test/prod

iam:
type   = program/person
