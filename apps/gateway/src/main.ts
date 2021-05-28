import { getBootstrapper } from '@kesci/nest';

import { AppModule } from './app.module';

const bootstrap = getBootstrapper({ app: AppModule, gateway: true });
bootstrap();
