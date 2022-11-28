import { TestBed } from '@angular/core/testing';

import { UserInfoInterceptor } from './user-info.interceptor';

describe('UserInfoInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      UserInfoInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: UserInfoInterceptor = TestBed.inject(UserInfoInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
