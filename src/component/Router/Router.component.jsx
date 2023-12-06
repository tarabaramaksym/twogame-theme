/* eslint-disable @scandipwa/scandipwa-guidelines/no-jsx-variables */
import {
    Breadcrumbs,
    CartPage,
    Checkout,
    CmsPage,
    ConfirmAccountPage,
    ContactPage,
    CookiePopup,
    CreateAccountPage,
    DemoNotice,
    Footer,
    ForgotPasswordPage,
    Header,
    HomePage,
    LoginAccountPage,
    MenuPage,
    MyAccount,
    NavigationTabs,
    NewVersionPopup,
    NotificationList,
    OfflineNotice,
    OrderPrintPage,
    PasswordChangePage,
    ProductComparePage,
    RouterComponent as SourceRouterComponent,
    SearchPage,
    SendConfirmationPage,
    SomethingWentWrong,
    StyleGuidePage,
    WishlistShared,
    withStoreRegex,
} from 'SourceComponent/Router/Router.component';
import {
    RouterBeforeItemType,
    RouterItemType,
} from 'SourceComponent/Router/Router.config';

export {
    CartPage,
    Checkout,
    CmsPage,
    HomePage,
    MyAccount,
    PasswordChangePage,
    SearchPage,
    SendConfirmationPage,
    ConfirmAccountPage,
    MenuPage,
    WishlistShared,
    ContactPage,
    ProductComparePage,
    CreateAccountPage,
    LoginAccountPage,
    ForgotPasswordPage,
    StyleGuidePage,
    OrderPrintPage,
    Header,
    NavigationTabs,
    Footer,
    NewVersionPopup,
    NotificationList,
    OfflineNotice,
    CookiePopup,
    DemoNotice,
    SomethingWentWrong,
    Breadcrumbs,
    withStoreRegex,
};

/** @namespace Scandiweb/TwogameTheme/Component/Router/Component */
export class RouterComponent extends SourceRouterComponent {
    [RouterItemType.BEFORE_ITEMS_TYPE] = [
        {
            component: <NotificationList />,
            position: 10,
            name: RouterBeforeItemType.NOTIFICATION_LIST,
        },
        {
            component: <DemoNotice />,
            position: 15,
            name: RouterBeforeItemType.DEMO_NOTICE,
        },
        {
            component: <Header />,
            position: 20,
            name: RouterBeforeItemType.HEADER,
        },
        {
            component: <Breadcrumbs />,
            position: 30,
            name: RouterBeforeItemType.BREADCRUMBS,
        },
        {
            component: <NewVersionPopup />,
            position: 35,
            name: RouterBeforeItemType.NEW_VERSION_POPUP,
        },
    ];
}

export default RouterComponent;
