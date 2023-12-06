## Features
### Supported content types:

The following content-types are supported:

* Row
* Column
* Tabs
* Text
* Heading
* Buttons
* Divider
* HTML code
* Image
* Video
* Banner
* Slider
* Map
* Block
* Products

### Not supported features:

The following features are not supported:

* **Slider** option of products is not supported
* **Infinite** and **Fade** slider options are not supported
## Configuration

Please note that this extension requires the original Page Builder extension to function. It comes pre-installed with Magento 2. To configure the page builder, follow the [official instructions](https://docs.magento.com/user-guide/cms/page-builder-setup.html).
## Development

To add new page builder content type support, declare a plugin for **Component/Html/Component** property **rules**. Add a new rule, with a **query** field matching desired content type, i.e. **query: { dataContentType: tabs’ }**, and **replace** function to transform the domNode (coming from **html-react-parser** package, so not real DOM node) to React component. Follow the examples located in the **src/plugin/content-type** folder.

The **replace** function may utilize the built-in **toReactElements** function. It takes the **domNode** and an **expected skeleton** as an argument. Skeleton represents the expected structure of the HTML elements that might be necessary to construct a desired component. For example, the skeleton of a button is **[{ name: 'BaseButtons', type: 'div' }]**.

The parsing of DOM nodes also continues down from PageBuilder elements to normal replacement declared in the HTML component. This means that the links, scripts, style elements will be properly replaced.

The widgets are handled as normal, using the **WidgetFactory** component. Please declare your custom widget implementations there.
