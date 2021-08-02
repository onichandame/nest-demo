import { getBootstrapper } from '@nest-libs/nest';

import { AppModule } from './app.module';

const bootstrap = getBootstrapper({ app: AppModule, gateway: true });

bootstrap();
