import { Injectable, CanActivate } from '@nestjs/common'

@Injectable()
export class AuthorizeGuard implements CanActivate {
  canActivate() {
    return true
  }
}
