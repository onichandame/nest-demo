import { getBootstrapper } from '@kesci/nest';
import { AppModule } from './app.module';

const bootstrap = getBootstrapper(AppModule);
bootstrap();
