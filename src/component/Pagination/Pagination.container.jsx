import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
    mapDispatchToProps,
    mapStateToProps,
    PaginationContainer as SourcePaginationContainer,
} from 'SourceComponent/Pagination/Pagination.container';

export {
    mapStateToProps,
    mapDispatchToProps,
};

/** @namespace Scandipwa/Component/Pagination/Container */
export class PaginationContainer extends SourcePaginationContainer {
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(
        PaginationContainer,
    ),
);
