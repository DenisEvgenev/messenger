import * as Handlebars from 'handlebars';
import Router from 'core/Router';
import Store from 'core/Store';
import middlewares from 'utils/middlewares';
import * as Components from './components';
import * as Pages from './pages';

const router = new Router('#app');
declare global {
    interface Window {
      router: Router;
      store: Store;
    }
  }

window.router = router;

const store = new Store({
    isLoading: false,
    loginError: null,
    messages: [],
    user: null,
    selectedCard: null,
});

window.store = store;

Object.entries(Components).forEach(([name, component]) => {
    const template = component as unknown as Handlebars.Template<any>;
    Handlebars.registerPartial(name, template);
});

router
    .use('/', Pages.LoginPage, middlewares)
    .use('/sign-up', Pages.SignInPage, middlewares)
    .use('/settings', Pages.ProfilePage, middlewares)
    .use('/profile-edit', Pages.ProfileEditPage, middlewares)
    .use('/profile-password', Pages.ProfilePasswordPage, middlewares)
    .use('/messenger', Pages.ChatPage, middlewares)
    .use('*', Pages.ClientErrorPage, {})
    .use('/500', Pages.ServerErrorPage, {})
    .start();
