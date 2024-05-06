import * as Handlebars from 'handlebars';
import Router from 'core/Router';
import * as Components from './components';
import * as Pages from './pages';

const router = new Router('#app');
declare global {
    interface Window {
      router: Router;
    }
  }

router
    .use('/', Pages.LoginPage)
    .use('/sign-up', Pages.SignInPage)
    .use('/settings', Pages.ProfilePage)
    .use('/profile-edit', Pages.ProfileEditPage)
    .use('/profile-password', Pages.ProfilePasswordPage)
    .use('/messenger', Pages.ChatPage)
    .use('*', Pages.ClientErrorPage)
    .use('/500', Pages.ServerErrorPage)
    .start();

window.router = router;

Object.entries(Components).forEach(([name, component]) => {
    const template = component as unknown as Handlebars.Template<any>;
    Handlebars.registerPartial(name, template);
});
