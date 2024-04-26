import { Title } from 'components/title';
import { REGEXP_LOGIN, REGEXP_PASSWORD } from 'constants/constants';
import Block from 'core/Block';
import { Input } from 'components/input';
import { Button } from 'components/button';

class FormAuth extends Block {
    init() {
        const onChangeLoginBind = this.onChangeLogin.bind(this);
        const onChangePasswordBind = this.onChangePassword.bind(this);
        const onLoginBind = this.onLogin.bind(this);

        const TitleLogin = new Title({ title: 'Вход' });
        const InputLogin = new Input({ type: 'login', label: 'Логин', onBlur: onChangeLoginBind });
        const FormPassword = new Input({
            type: 'password',
            label: 'Пароль',
            onBlur: onChangePasswordBind,
        });
        const ButtonLogin = new Button({
            label: 'Авторизироваться',
            type: 'primary',
            disabled: true,
            onClick: onLoginBind,
            page: 'chat',
        });
        const ButtonCreateAccount = new Button({
            label: 'Нет аккаунта?',
            type: 'link',
            page: 'sign-in',
        });

        this.children = {
            ...this.children,
            ButtonLogin,
            ButtonCreateAccount,
            InputLogin,
            FormPassword,
            TitleLogin,
        };
    }

    onChangeLogin({ target }) {
        const inputValue = target.value;

        if (REGEXP_LOGIN.test(target.value)) {
            this.children.InputLogin.setProps({ error: false, errorText: null });
        } else {
            this.children.InputLogin.setProps({
                error: true,
                errorText: 'Используйте только буквы, начиная с заглавной',
            });
        }

        this.setProps({ login: inputValue });
    }

    onChangePassword({ target }) {
        const inputValue = target.value;

        if (REGEXP_PASSWORD.test(target.value)) {
            this.children.FormPassword.setProps({ error: false, errorText: null });
        } else {
            this.children.FormPassword.setProps({
                error: true,
                errorText: 'Пароль должен быть от 8 до 40 символов, '
                + 'обязательно хотя бы одна заглавная буква и цифра',
            });
        }

        this.setProps({ password: inputValue });
    }

    onLogin() {
        console.log('===== onLogin =====', {
            ...this.props,
        });

        this.setProps({ disabled: false });
        const isCorrectLogin = REGEXP_LOGIN.test(this.props.login);
        const isCorrectPassword = REGEXP_PASSWORD.test(this.props.password);

        if (!isCorrectPassword) {
            this.children.FormPassword.setProps({
                error: true,
                errorText: 'Пароль должен быть от 8 до 40 символов, '
                + 'обязательно хотя бы одна заглавная буква и цифра',
            });
        }

        if (!isCorrectLogin) {
            this.children.InputLogin.setProps({
                error: true,
                errorText: 'Используйте только буквы, начиная с заглавной',
            });
        }

        if (isCorrectLogin && isCorrectPassword) {
            this.children.ButtonLogin.setProps({ disabled: false });
        } else {
            this.children.ButtonLogin.setProps({ disabled: true });
        }
    }

    render() {
        return (`
            <form class="login-form">
                {{{ TitleLogin }}}
                {{{ InputLogin }}}
                {{{ FormPassword }}}
                {{{ ButtonLogin }}}
                {{{ ButtonCreateAccount }}}
            </form>
        `);
    }
}

export default FormAuth;
