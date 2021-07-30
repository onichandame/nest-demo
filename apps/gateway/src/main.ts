import { getBootstrapper } from '@nest-libs/nest';

const bootstrap = getBootstrapper({ gateway: true });
bootstrap();
