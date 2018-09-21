import {inject, observer} from 'mobx-react';
import * as React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {RootStoreProps} from '../../App';
import {
  ROUTE_SECURITY,
  ROUTE_WALLETS_HFT,
  ROUTE_WALLETS_TRADING
} from '../../constants/routes';
import {Feature, FeatureFlag} from '../../utils/launchDarkly';
import {APPSTORE_LINK, GOOGLEPLAY_LINK} from '../Apps';
import {Banner} from '../Banner';
import {TabPane} from '../Tabs';
import HftContent from './HftContent';
import './style.css';

interface WalletTabsProps {
  activeTabRoute?: string;
  show2faBanner?: boolean;
  showBetaBanner?: boolean;
  showKycBanner?: boolean;
  handleHideBetaBannerClick?: () => void;
  onCreateNewWallet?: () => void;
}

export class WalletTabs extends React.Component<WalletTabsProps> {
  render() {
    return (
      <div className="wallet-tabs">
        <Banner
          show={this.props.showBetaBanner}
          className="beta-banner"
          title="Information"
          text="The web trading wallet is currently under active development. It will be improved in the coming weeks, to eventually offer the same functionalities as our mobile Lykke Wallet. In the meantime, please use our mobile application to access all fund management functionalities."
          footer={
            <div>
              <a
                href={APPSTORE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="app-link"
              >
                <img
                  src={`${process.env.PUBLIC_URL}/images/apple-icn.svg`}
                  alt="App Store"
                />
                Download for iOS
              </a>
              <a
                href={GOOGLEPLAY_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="app-link"
              >
                <img
                  src={`${process.env.PUBLIC_URL}/images/google-play-icn.svg`}
                  alt="Google Play"
                />
                Download for Android
              </a>
              <a
                className="hide-button"
                onClick={this.props.handleHideBetaBannerClick}
              >
                Don't show again
              </a>
            </div>
          }
        />
        <TabPane to={ROUTE_WALLETS_TRADING}>
          <Banner
            show={this.props.showKycBanner}
            warning
            className="kyc-banner"
            title="KYC incomplete"
            text="In order to deposit funds using credit card, please complete KYC procedure using the Lykke Wallet mobile application."
            footer={
              <div>
                <a
                  href={APPSTORE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="app-link"
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/images/apple-icn.svg`}
                    alt="App Store"
                  />
                  Download for iOS
                </a>
                <a
                  href={GOOGLEPLAY_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="app-link"
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/images/google-play-icn.svg`}
                    alt="Google Play"
                  />
                  Download for Android
                </a>
              </div>
            }
          />
          <FeatureFlag
            flagKey={Feature.TwoFactorAuthentication}
            // tslint:disable-next-line:jsx-no-lambda
            renderFeatureCallback={() => (
              <Banner
                show={this.props.show2faBanner}
                className="tfa-banner"
                title="Two-Factor Authentication"
                text={
                  <span>
                    To ensure the security of withdrawals from Lykke, you need
                    to turn on Two-Factor Authentication. Find out more about it{' '}
                    <Link to={ROUTE_SECURITY}>here</Link>.
                  </span>
                }
              />
            )}
          />
        </TabPane>
        <TabPane to={ROUTE_WALLETS_HFT}>
          <HftContent />
        </TabPane>
      </div>
    );
  }
}

export default withRouter(
  inject(({rootStore}: RootStoreProps) => ({
    handleHideBetaBannerClick: rootStore!.uiStore.hideBetaBanner,
    onCreateNewWallet: rootStore!.uiStore.toggleWalletDrawer,
    show2faBanner: !rootStore!.profileStore.is2faEnabled,
    showBetaBanner: rootStore!.uiStore.showBetaBanner,
    showKycBanner: !rootStore!.profileStore.isKycPassed
  }))(observer(WalletTabs))
);
