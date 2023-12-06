import PropTypes from 'prop-types';

import { LocationType } from 'Type/Router.type';

export * from 'SourceComponent/Menu/Menu.type';

// Support for compatibility

export const FormattedMenuItemType = PropTypes.shape({
    item_id: PropTypes.string,
    is_active: PropTypes.bool,
    parent_id: PropTypes.number,
    position: PropTypes.number,
    title: PropTypes.string,
    item_class: PropTypes.string,
    icon: PropTypes.element,
    onClick: PropTypes.func,
    url: PropTypes.oneOfType([LocationType, PropTypes.string]),
    cms_page_identifier: PropTypes.string,
    category_id: PropTypes.number,
    // eslint-disable-next-line react/forbid-prop-types
    children: PropTypes.object,
});
