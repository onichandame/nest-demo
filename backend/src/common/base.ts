import { Module, DynamicModule } from '@nestjs/common'

import { CommonModule } from './modules'

@Module({})
export class BaseModule {
  static forRoot(module: any): DynamicModule {
    return { imports: [CommonModule, module], module: BaseModule }
  }
}
