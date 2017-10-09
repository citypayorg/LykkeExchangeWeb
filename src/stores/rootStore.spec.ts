import {AuthStore, RootStore, WalletStore} from './';

const rootStore = new RootStore();

describe('root store', () => {
  it('should hold strongly typed ref to auth store', () => {
    expect(rootStore).toHaveProperty('authStore');
    expect(rootStore.authStore).toBeDefined();
    expect(rootStore.authStore).toBeInstanceOf(AuthStore);
  });

  it('should hold strongly typed ref to wallet store', () => {
    expect(rootStore).toHaveProperty('walletStore');
    expect(rootStore.walletStore).toBeDefined();
    expect(rootStore.walletStore).toBeInstanceOf(WalletStore);
  });
});