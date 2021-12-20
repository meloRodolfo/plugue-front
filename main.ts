import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './src/app/app.module';
import { environment } from './src/environments/environment';

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './src/aws-config';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
