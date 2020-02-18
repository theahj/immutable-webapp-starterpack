'use strict'


process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function(shain) {

  const sha = shain.trim();
  const environment = process.env.TF_ENVIRONMENT || "test";
  const url = `https://${process.env.TF_API_URL || "my-url" }` ;

   process.stdout.write(`<!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <title>Immutable webapp starterpack</title>
      <meta name="description" content="Immutable webapp.">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    </head>
    <body>
         <!-- environment variables -->
         <script>
         env = {
             ENV_NAME: '${environment}',
             GIT_SHA: '${sha}',
             API_URL: '${url}'
         }
         </script>

         <!-- application binding -->
         <app-root></app-root>
         <h3>Created at ${new Date()}</h3>
         <!-- fully-qualified static assets -->
         <script src="${url}/assets/${sha}/main.js" type="text/javascript"></script>


     </body>
  </html>`)

});
