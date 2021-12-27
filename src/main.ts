import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
var proxy = require('express-http-proxy');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/proxy', proxy('localhost:3000', {
    proxyReqPathResolver: function(req) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {   // simulate async
          var parts = req.url.split('?');
          var queryString = parts[1];
          var updatedPath = parts[0].replace(/test/, 'tent');
          var resolvedPathValue = updatedPath + (queryString ? '?' + queryString : '');
          resolve(resolvedPathValue);
        }, 200);
      });
    }
  }));
  // global prefix
  // app.setGlobalPrefix('api/v1');
  await app.listen(3000);
}
bootstrap();
