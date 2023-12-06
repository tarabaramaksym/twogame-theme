import { isMobile as sourceIsMobile } from 'SourceUtil/Mobile/isMobile';

export * from 'SourceUtil/Mobile/isMobile';

export const isMobile = {
    ...sourceIsMobile,
    desktop: (): boolean => (
        window.matchMedia('(min-width: 1025px)').matches && window.matchMedia('screen').matches
    ),
};

export default isMobile;
