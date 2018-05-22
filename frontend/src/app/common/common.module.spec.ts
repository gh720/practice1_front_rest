import { common_module_c } from './common.module';

describe('common_module_c', () => {
  let commonModule: common_module_c;

  beforeEach(() => {
    commonModule = new common_module_c();
  });

  it('should create an instance', () => {
    expect(commonModule).toBeTruthy();
  });
});
