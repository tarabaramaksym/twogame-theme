/* eslint-disable new-cap */
import {
    ConfigReducer as SourceConfigReducer,
    getInitialState as sourceGetInitialState,
} from 'SourceStore/Config/Config.reducer';

export * from 'SourceStore/Config/Config.reducer';

/** @namespace Scandipwa/Store/Config/Reducer/getInitialState */
export const getInitialState = () => {
    const { device, ...rest } = sourceGetInitialState();

    return {
        ...rest,
        device: {
            ...device,
            isMobileOrTablet: false,
        },
    };
};

/** @namespace Scandipwa/Store/Config/Reducer/ConfigReducer */
export const ConfigReducer = (
    state = getInitialState(),
    action,
) => SourceConfigReducer(state, action);

export default ConfigReducer;
