import { GQLCurrencyEnum } from 'Type/Graphql.type';

export * from 'SourceUtil/Price/Price';

/**
 * Overriden to add a space between the currency and number
 */
/** @namespace Scandipwa/Util/Price/formatPrice */
export const formatPrice = (price, currency = GQLCurrencyEnum.USD) => {
    const language = navigator.languages ? navigator.languages[0] : navigator.language;

    return new Intl.NumberFormat(
        language,
        { style: 'currency', currency }
    ).format(price).replace(/^(\D+)/, '$1 ').replace(/\s+/, ' ');
};
