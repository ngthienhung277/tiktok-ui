import config from '~/config';

// Layouts
import { HeaderOnly } from '~/layouts';
import { StretchLayout } from '~/layouts';

// Pages
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import Live from '~/pages/Live';
import Coin from '~/pages/Upload'
import Setting from '~/pages/Setting'
import Feedback from '~/pages/Feedback'
// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.live, component: Live },
    { path: config.routes.profile, component: Profile, layout: StretchLayout},
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    { path: config.routes.search, component: Search, layout: null },
    { path: config.routes.coin, component: Coin, layout: HeaderOnly },
    { path: config.routes.setting, component: Setting, layout: HeaderOnly },
    { path: config.routes.feedback, component: Feedback, layout: HeaderOnly },
    { path:config.routes.setting, component: Setting},
    { path: config.routes, component: Feedback, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
