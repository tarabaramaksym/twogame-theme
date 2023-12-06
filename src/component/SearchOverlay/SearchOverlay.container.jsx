import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    mapDispatchToProps,
    mapStateToProps,
    SearchOverlayContainer as SourceSearchOverlayContainer,
} from 'SourceComponent/SearchOverlay/SearchOverlay.container';
import SearchBarReducer from 'Store/SearchBar/SearchBar.reducer';
import { withReducers } from 'Util/DynamicReducer';

export {
    mapStateToProps,
    mapDispatchToProps,
};

/** @namespace Scandipwa/Component/SearchOverlay/Container */
export class SearchOverlayContainer extends SourceSearchOverlayContainer {
    static propTypes = {
        onViewAllPress: PropTypes.func.isRequired,
        beforeItemClick: PropTypes.func.isRequired,
    };

    containerFunctions = {
        ...this.containerFunctions,
        onViewAllPress: this.onViewAllPress.bind(this),
    };

    /**
     * New method to handle onViewAllPress
     */
    onViewAllPress() {
        const { onViewAllPress } = this.props;

        onViewAllPress({}, true);
    }

    containerProps() {
        const { beforeItemClick } = this.props;

        return {
            ...super.containerProps(),
            beforeItemClick,
        };
    }
}

export default withReducers({
    SearchBarReducer,
})(connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchOverlayContainer));
