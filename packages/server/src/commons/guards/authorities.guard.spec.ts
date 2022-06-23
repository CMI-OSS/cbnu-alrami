import { AuthoritiesGuard } from './authorities.guard';

describe('AuthoritiesGuard', () => {
  it('should be defined', () => {
    expect(new AuthoritiesGuard()).toBeDefined();
  });
});
