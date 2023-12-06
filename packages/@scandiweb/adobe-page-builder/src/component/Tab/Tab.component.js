/**
 * Adobe page builder compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import classNames from 'classnames';
import { PureComponent } from 'react';

import { PagebuilderElementType } from '../../type/Elements.type';

/** @namespace Scandiweb/AdobePageBuilder/Component/Tab/Component */
export class TabComponent extends PureComponent {
    static propTypes = {
        elements: PagebuilderElementType.isRequired,
    };

    __construct(props) {
        super.__construct(props);

        this.state = {
            activeIdx: 0,
        };
    }

    onClickTabMenu = (e, idx) => {
        e.stopPropagation();
        e.preventDefault();
        this.setState({ activeIdx: idx });
    };

    renderTabContent = () => {
        const {
            elements: {
                TabContent,
                TabItem,
            },
        } = this.props;

        if (!TabContent) {
            return null;
        }

        const { activeIdx } = this.state;

        return (
            <TabContent.Ele>
                { TabItem.propsBag.map((props, idx) => activeIdx === idx && (
                    <TabItem.Ele
                      // vvv There is nothing else known to index the tab
                      // eslint-disable-next-line react/no-array-index-key
                      key={ `tab-content-item-${idx}` }
                      { ...props }
                    >
                        { TabItem.childEleBag[idx] }
                    </TabItem.Ele>
                )) }
            </TabContent.Ele>
        );
    };

    renderTabMenu = () => {
        const {
            elements: {
                TabMenu,
                TabMenuHeader,
                TabMenuLink,
                TabMenuTitle,
            },
        } = this.props;

        if (!TabMenu) {
            return null;
        }

        const { activeIdx } = this.state;

        return (
            <TabMenu.Ele
              className={ [
                  'tabs-navigation',
                  'ui-tabs-nav',
                  'ui-helper-reset',
                  'ui-helper-clearfix',
                  'ui-widget-header',
                  'ui-corner-all',
              ].join(' ') }
            >
                { TabMenuHeader.propsBag.map((props, idx) => (
                    <TabMenuHeader.Ele
                      { ...props }
                      // vvv There is nothing else known to index the tab
                      // eslint-disable-next-line react/no-array-index-key
                      key={ `tab-menu-${idx}` }
                      className={ classNames(
                          'tab-header ui-state-default ui-corner-top',
                          { 'ui-tabs-active ui-state-active': activeIdx === idx }
                      ) }
                      // vvv Needed to avoid creating child components
                      // eslint-disable-next-line react/jsx-no-bind
                      onClick={ (e) => this.onClickTabMenu(e, idx) }
                    >
                        { TabMenuLink && (
                            <TabMenuLink.Ele { ...TabMenuLink.propsBag[idx] }>
                            { TabMenuTitle && <TabMenuTitle.Ele>{ TabMenuTitle.childData[idx] }</TabMenuTitle.Ele> }
                            </TabMenuLink.Ele>
                        ) }
                    </TabMenuHeader.Ele>
                )) }
            </TabMenu.Ele>
        );
    };

    render() {
        const {
            elements: {
                BaseTabs,
            },
        } = this.props;

        return (
            <BaseTabs.Ele>
                { this.renderTabMenu() }
                { this.renderTabContent() }
            </BaseTabs.Ele>
        );
    }
}

export default TabComponent;
