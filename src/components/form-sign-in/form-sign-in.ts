import { Title } from 'components/title';
import { Input } from 'components/input';
import { Button } from 'components/button';
import Block from 'core/Block';
import {
    REGEXP_LOGIN, REGEXP_PASSWORD, REGEXP_NAME, REGEXP_MAIL, REGEXP_PHONE,
} from 'constants/constants';

type Props = {
    login?: string;
    name?: string;
    lastName?: string;
    mail?: string;
    phone?: string;
    password?: string;
    passwordSecond?: string;
}

export default class FormSignIn extends Block<Props> {
    init() {
        const onChangeLoginBind = this.onChangeLogin.bind(this);
        const onChangeNameBind = this.onChangeName.bind(this);
        const onChangeLastNameBind = this.onChangeLastName.bind(this);
        const onChangeMailBind = this.onChangeMail.bind(this);
        const onChangePhoneBind = this.onChangePhone.bind(this);
        const onChangePasswordBind = this.onChangePassword.bind(this);
        const onChangePasswordSecondBind = this.onChangePasswordSecond.bind(this);
        const onRegisterBind = this.onRegister.bind(this);

        const TitleRegister = new Title({ title: 'Регистрация' });
        const InputMail = new Input({ type: 'email', label: 'Почта', onBlur: onChangeMailBind });
        const InputLogin = new Input({ type: 'text', label: 'Логин', onBlur: onChangeLoginBind });
        const InputName = new Input({
            type: 'text',
            label: 'Имя',
            onBlur: onChangeNameBind,
        });
        const InputLastName = new Input({
            type: 'text',
            label: 'Фамилия',
            onBlur: onChangeLastNameBind,
        });
        const InputPhone = new Input({
            type: 'tel',
            label: 'Телефон',
            onBlur: onChangePhoneBind,
        });
        const FormPassword = new Input({
            type: 'password',
            label: 'Пароль',
            onBlur: onChangePasswordBind,
        });
        const FormPasswordSecond = new Input({
            type: 'password',
            label: 'Пароль ещё раз',
            onBlur: onChangePasswordSecondBind,
        });

        const ButtonRegister = new Button({
            label: 'Зарегистрироваться',
            type: 'submit',
            disabled: true,
            events: {
                click: onRegisterBind,
            },
        });
        const ButtonLogin = new Button({
            label: 'Войти', type: 'link', page: 'login',
        });

        this.children = {
            ...this.children,
            ButtonRegister,
            ButtonLogin,
            InputLogin,
            FormPassword,
            InputMail,
            InputName,
            InputLastName,
            InputPhone,
            FormPasswordSecond,
            TitleRegister,
        };
    }

    onChangeName(event: Event) {
        const target = event.target as HTMLInputElement;
        const inputValue = target.value;

        if (REGEXP_NAME.test(target.value)) {
            this.children.InputName.setProps({ error: false, errorText: null });
        } else {
            this.children.InputName.setProps({
                error: true,
                errorText: 'Имя должно быть латиницей или кириллицей, первая буква '
                + 'должна быть заглавной, без пробелов и без цифр, нет спецсимволов',
            });
        }

        this.setProps({ name: inputValue });
    }

    onChangeLastName(event: Event) {
        const target = event.target as HTMLInputElement;
        const inputValue = target.value;

        if (REGEXP_NAME.test(target.value)) {
            this.children.InputLastName.setProps({ error: false, errorText: null });
        } else {
            this.children.InputLastName.setProps({
                error: true,
                errorText: 'Фамилия должна быть латиницей или кириллицей, первая буква '
                + 'должна быть заглавной, без пробелов и без цифр, нет спецсимволов',
            });
        }

        this.setProps({ lastName: inputValue });
    }

    onChangeMail(event: Event) {
        const target = event.target as HTMLInputElement;
        const inputValue = target.value;

        if (REGEXP_MAIL.test(target.value)) {
            this.children.InputMail.setProps({ error: false, errorText: null });
        } else {
            this.children.InputMail.setProps({
                error: true,
                errorText: 'Почта должна иметь следующий вид: латиница, может включать '
                + 'цифры и спецсимволы вроде дефиса и подчёркивания, обязательно должна '
                + 'быть «собака» (@) и точка после неё, но перед точкой обязательно '
                + 'должны быть буквы.',
            });
        }

        this.setProps({ mail: inputValue });
    }

    onChangePhone(event: Event) {
        const target = event.target as HTMLInputElement;
        const inputValue = target.value;

        if (REGEXP_PHONE.test(target.value)) {
            this.children.InputPhone.setProps({ error: false, errorText: null });
        } else {
            this.children.InputPhone.setProps({
                error: true,
                errorText: 'Номер телефона должен быть от 10 до 15 символов, '
                + 'состоять из цифр, может начинается с плюса.',
            });
        }

        this.setProps({ phone: inputValue });
    }

    onChangeLogin(event: Event) {
        const target = event.target as HTMLInputElement;
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

    onChangePassword(event: Event) {
        const target = event.target as HTMLInputElement;
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

    onChangePasswordSecond(event: Event) {
        const target = event.target as HTMLInputElement;
        const inputValue = target.value;

        if (REGEXP_PASSWORD.test(target.value)) {
            this.children.FormPasswordSecond.setProps({ error: false, errorText: null });
        } else {
            this.children.FormPasswordSecond.setProps({
                error: true,
                errorText: 'Пароль должен быть от 8 до 40 символов, '
                + 'обязательно хотя бы одна заглавная буква и цифра'
                + ' и пароли должны совпадать',
            });
        }

        this.setProps({ passwordSecond: inputValue });
    }

    onRegister() {
        console.log('===== onRegister =====', { ...this.props });

        const isCorrectLogin = REGEXP_LOGIN.test(this.props.login || '');
        const isCorrectName = REGEXP_NAME.test(this.props.name || '');
        const isCorrectLastName = REGEXP_NAME.test(this.props.lastName || '');
        const isCorrectMail = REGEXP_MAIL.test(this.props.mail || '');
        const isCorrectPhone = REGEXP_PHONE.test(this.props.phone || '');
        const isCorrectPassword = REGEXP_PASSWORD.test(this.props.password || '')
            && this.props.passwordSecond === this.props.password;

        if (!isCorrectPassword) {
            this.children.FormPassword.setProps({
                error: true,
                errorText: 'Пароль должен быть от 8 до 40 символов, '
                + 'обязательно хотя бы одна заглавная буква и цифра',
            });
            this.children.FormPasswordSecond.setProps({
                error: true,
                errorText: 'Пароль должен быть от 8 до 40 символов, '
                + 'обязательно хотя бы одна заглавная буква и цифра'
                + ' и пароли должны совпадать',
            });
        }

        if (!isCorrectLogin) {
            this.children.InputLogin.setProps({
                error: true,
                errorText: 'Используйте только буквы, начиная с заглавной',
            });
        }

        if (!isCorrectName) {
            this.children.InputName.setProps({
                error: true,
                errorText: 'Используйте только буквы, начиная с заглавной',
            });
        }

        if (!isCorrectLogin) {
            this.children.InputLastName.setProps({
                error: true,
                errorText: 'Используйте только буквы, начиная с заглавной',
            });
        }

        if (!isCorrectMail) {
            this.children.InputMail.setProps({
                error: true,
                errorText: 'Почта должна иметь следующий вид: латиница, может включать '
                + 'цифры и спецсимволы вроде дефиса и подчёркивания, обязательно должна '
                + 'быть «собака» (@) и точка после неё, но перед точкой обязательно '
                + 'должны быть буквы.',
            });
        }

        if (!isCorrectPhone) {
            this.children.InputPhone.setProps({
                error: true,
                errorText: 'Номер телефона должен быть от 10 до 15 символов, '
                + 'состоять из цифр, может начинается с плюса.',
            });
        }

        if (isCorrectLogin
            && isCorrectPassword
            && isCorrectName
            && isCorrectLastName
            && isCorrectMail
            && isCorrectPhone
        ) {
            this.children.ButtonRegister.setProps({ disabled: false });
        } else {
            this.children.ButtonRegister.setProps({ disabled: true });
        }
    }

    render() {
        return (`
            <form class="sign-in-form">
                {{{ Title }}}
                {{{ InputMail }}}
                {{{ InputLogin }}}
                {{{ InputName }}}
                {{{ InputLastName }}}
                {{{ InputPhone }}}
                {{{ FormPassword }}}
                {{{ FormPasswordSecond }}}
                {{{ ButtonRegister }}}
                {{{ ButtonLogin }}}
            </form>
        `);
    }
}
