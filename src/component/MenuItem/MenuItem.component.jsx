import PropTypes from 'prop-types';

import ChevronIcon from 'Component/ChevronIcon';
import { Directions } from 'Component/ChevronIcon/ChevronIcon.config';
import Link from 'Component/Link';
import { MenuItemComponent as SourceMenuItemComponent } from 'SourceComponent/MenuItem/MenuItem.component';
import { DeviceType } from 'Type/Device.type';
import { noopFn } from 'Util/Common';

/** @namespace Scandipwa/Component/MenuItem/Component */
export class MenuItemComponent extends SourceMenuItemComponent {
    static propTypes = {
        ...this.propTypes,
        onClick: PropTypes.func,
        device: DeviceType,
        icon: PropTypes.element,
    };

    static defaultProps = {
        ...this.defaultProps,
        onClick: noopFn,
    };

    /**
     * Overridden to render arrow icon instead of plus/minus icons
     */
    renderPlusMinusIcon() {
        const {
            itemMods: { isExpanded, type },
            device: { isDesktop },
        } = this.props;

        const isHorizontal = isDesktop && type === 'subcategory';

        const defaultDirection = isHorizontal ? Directions.RIGHT : Directions.BOTTOM;
        const expandedDirection = isHorizontal ? Directions.RIGHT : Directions.TOP;

        return <ChevronIcon direction={ isExpanded ? expandedDirection : defaultDirection } />;
    }

    /**
     * Overridden to remove mouse handlers
     */
    renderItemLinkContent() {
        const {
            activeMenuItemsStack,
            item,
            itemMods,
            onItemClick,
        } = this.props;

        const {
            url,
            item_id,
        } = item;

        const isHovered = activeMenuItemsStack.includes(item_id);

        return (
            <Link
              to={ url }
              block="Menu"
              elem="Link"
              id={ item_id }
              mods={ { isHovered } }
              onClick={ onItemClick }
            >
                { this.renderItemContent(item, itemMods) }
            </Link>
        );
    }

    renderIcon() {
        const { icon } = this.props;

        if (!icon) {
            return null;
        }

        return (
            <div block="Menu" elem="ItemIcon">
                { icon }
            </div>
        );
    }

    /**
     * Overridden to add mouse handlers
     */
    renderItemContent(item, itemMods) {
        const {
            onClick,
            handleCategoryHover,
            handleLinkLeave,
        } = this.props;
        const { title } = item;

        return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
            <figcaption
              block="Menu"
              elem="ItemCaption"
              mods={ itemMods }
              onMouseEnter={ handleCategoryHover }
              onMouseLeave={ handleLinkLeave }
              onClick={ onClick }
            >
                <span block="Menu" elem="ItemContent">
                    { this.renderIcon() }
                    { title }
                </span>
                { this.renderExpandButton() }
            </figcaption>
        );
    }
}

export default MenuItemComponent;
