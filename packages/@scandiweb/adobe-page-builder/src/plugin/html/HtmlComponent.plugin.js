/**
 * Adobe page builder compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import he from 'he';
import parser from 'html-react-parser';
import domToReact from 'html-react-parser/lib/dom-to-react';
import { createElement, forwardRef } from 'react';

import { replaceSpecialDomAttrs } from '../../util/dom';

import '../../source-style/_module';

const addContentTypeParsing = (originalMember, instance) => ({
    trim: true,
    replace: (domNode) => {
        if (
            domNode.data
            && !domNode.data.replace(/\u21b5/g, '').replace(/\s/g, '').length
            && !domNode.data === '\n'
        ) {
            // eslint-disable-next-line react/jsx-no-useless-fragment
            return <></>;
        }

        const newDomNode = replaceSpecialDomAttrs(domNode);
        const { attribs: domAttrs } = newDomNode;

        const rule = instance.rules.find((rule) => {
            const { query: { dataContentType } } = rule;

            return (
                dataContentType
                && domAttrs
                && domAttrs['data-content-type'] === dataContentType
            );
        });

        if (rule) {
            const { replace } = rule;
            return replace.call(instance, newDomNode);
        }

        return originalMember.replace(newDomNode);
    }
});

const addToReactElementsFunction = (args, _callback, instance) => {
    const [domNodes, skeleton, options = {}, res = {}] = args;
    // ^^^ options obj: { allowedTypes: ('tag'|'script'|'style')[] }.

    /**
     * The idea is:
     * - For individual element, we create a React Element and store all of its props.
     * - For in-loop elements (data.map(() => <div />). We create just the first element
     * then store all of its sibling's props to a bag.
     *
     * The result is we will have the same HTML structure in React Element. So that we can
     * use React to manipulate these elements freely
     */

    const {
        isInLoop,
        allowedTypes = ['tag']
        // ^^^ Sometimes, page-builder html code contains un-sanitize chars from script
        // or style tags, which makes our parser run incorrectly. Most of the time,
        // we don't need them so that it is limited to "tag" by default
    } = options;

    // eslint-disable-next-line fp/no-let
    let skeletonIndex = 0; // Index to help mapping current domNode with our skeleton config

    return domNodes.reduce((acc, domNode) => {
        const { type: nType } = domNode;

        if (allowedTypes.indexOf(nType) === -1) {
            return acc;
        }

        const processedNode = replaceSpecialDomAttrs(domNode);
        const {
            attribs: nAttribs,
            name: nName,
            children: nChildren
        } = processedNode;

        const config = skeleton[skeletonIndex] || skeleton[0];
        const {
            name: cName,
            children: cChildren,
            isLoopParent
        } = config;

        skeletonIndex++;

        const orgProps = instance.attributesToProps(nAttribs || {});

        if (!acc[cName]) {
            const element = forwardRef(
                // eslint-disable-next-line react/prop-types
                ({ children, ...rest }, ref) => createElement(
                    nName,
                    { ...(!isInLoop && orgProps), ...rest, ref },
                    children
                )
            );

            acc[cName] = {
                Ele: element,
                propsBag: [],
                childData: [],
                childEleBag: []
            };
        }

        acc[cName].childEleBag.push(domToReact(nChildren, instance.parserOptions));

        if (isInLoop || isLoopParent) {
            acc[cName].childData.push(nChildren.map(({ data }) => data));
        }

        acc[cName].propsBag.push(orgProps);

        if (nChildren && cChildren) {
            const childRes = instance.toReactElements(
                nChildren,
                cChildren,
                {
                    isInLoop: isInLoop || isLoopParent,
                    allowedTypes
                },
                acc
            );

            return { ...acc, ...childRes };
        }

        return acc;
    }, res);
};

const addIdToBody = () => {
    document.body.id = 'html-body';
};

// eslint-disable-next-line no-unused-vars
const removeImageRule = (originalMember) =>
    // We filter out img tag and implement it separately
    // because its behavior is different from usual in page-builder
    // eslint-disable-next-line implicit-arrow-linebreak
    originalMember.filter((i) => !(i.query && i.query.name && i.query.name[0] === 'img'));

const processRawHtmlBeforeRender = (_args, _callback, instance) => {
    const { content } = instance.props;

    // vvv For safty reasons, let's only process strings
    if (typeof content !== 'string') {
        return null;
    }

    // vvv Create a new div to lookup the HTML content
    const newDiv = document.createElement('div');
    newDiv.innerHTML = content;
    const htmlContents = newDiv.querySelectorAll('[data-content-type="html"]');

    Array.from(htmlContents).forEach((htmlContent) => {
        // vvv Decode the HTML content, as it is HTML encoded (&amp, etc.)
        const htmlUnescaped = he.decode(htmlContent.innerHTML);
        // eslint-disable-next-line no-param-reassign
        htmlContent.innerHTML = htmlUnescaped;
    });

    const newContent = newDiv.innerHTML;
    newDiv.remove();
    // ^^^ cleanup the new div

    return parser(newContent, instance.parserOptions);
};

export default {
    'Component/Html/Component': {
        'member-property': {
            // Override is disabled as it is causing issues from CMS pages.
            // As main content is prioritized over header/footer and other components, we first wait for all
            // content images(and similar content) to be loaded. This plugin removes <img /> HTML to <Image /> react
            // conversion which makes react to wait for content loading infinitely (<Suspense />).
            // Specifically it's `onImageLoad={ setLoadedFlag }` in HtmlComponent::replaceImages().
            //
            // rules: removeImageRule,
            parserOptions: addContentTypeParsing
        },
        'member-function': {
            componentDidMount: addIdToBody,
            toReactElements: addToReactElementsFunction,
            render: processRawHtmlBeforeRender
        }
    }
};
