import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '@services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const user = inject(AuthService).getUser()
  if (!user) return false
  if (!(route.data['roles'] as string[]).includes(user.role)) return false

  return true
};
