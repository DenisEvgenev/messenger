import { Button, FormGroup } from 'components';
import Block from 'core/Block';
import { connect } from 'utils/connect';
import { UserDTO } from 'api/types';
import {
    fillDisplayName,
    fillEmail, fillFirstName, fillLogin, fillPhone, fillSecondName,
} from 'services/setAutorizationFields';

type Props = {
    userData?: UserDTO
    events?: {
        submit: (e: Event) => void;
    },
    onSubmit: (e: Event) => void
}
class FormEdit extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props,
            events: {
                submit: props.onSubmit,
            },
        });
    }

    init() {
        const {
            email = '',
            second_name: secondName = '',
            first_name: firstName = '',
            display_name: displayName = '',
            login = '',
            phone = '',
        } = this.props.userData || {};

        const FormGroupEmail = new FormGroup({
            className: 'form-group__input',
            type: 'text',
            label: 'Почта',
            text: email,
            name: 'email',
            onBlur: (event: Event) => {
                const target = event.target as HTMLInputElement;
                const inputValue = target.value;
                fillEmail(inputValue);
            },
        });
        const FormGroupLogin = new FormGroup({
            className: 'form-group__input',
            type: 'text',
            label: 'Логин',
            text: login,
            name: 'login',
            onBlur: (event: Event) => {
                const target = event.target as HTMLInputElement;
                const inputValue = target.value;
                fillLogin(inputValue);
            },
        });
        const FormGroupFirstName = new FormGroup({
            className: 'form-group__input',
            type: 'text',
            label: 'Имя',
            text: firstName,
            name: 'first_name',
            onBlur: (event: Event) => {
                const target = event.target as HTMLInputElement;
                const inputValue = target.value;
                fillFirstName(inputValue);
            },
        });
        const FormGroupSecondName = new FormGroup({
            className: 'form-group__input',
            type: 'text',
            label: 'Фамилия',
            text: secondName,
            name: 'second_name',
            onBlur: (event: Event) => {
                const target = event.target as HTMLInputElement;
                const inputValue = target.value;
                fillSecondName(inputValue);
            },
        });
        const FormGroupDisplayName = new FormGroup({
            className: 'form-group__input',
            type: 'text',
            label: 'Имя в чате',
            text: displayName,
            name: 'display_name',
            onBlur: (event: Event) => {
                const target = event.target as HTMLInputElement;
                const inputValue = target.value;
                fillDisplayName(inputValue);
            },
        });
        const FormGroupPhone = new FormGroup({
            className: 'form-group__input',
            type: 'text',
            label: 'Телефон',
            text: phone,
            name: 'phone',
            onBlur: (event: Event) => {
                const target = event.target as HTMLInputElement;
                const inputValue = target.value;
                fillPhone(inputValue);
            },
        });

        const ButtonSave = new Button({
            label: 'Сохранить',
            type: 'submit',
            className: 'main',
            events: {
                click: () => {
                    const focusableElements = document.querySelectorAll('input');

                    focusableElements.forEach((element) => {
                        element.blur();
                    });
                },
            },
        });

        this.children = {
            ...this.children,
            FormGroupEmail,
            FormGroupLogin,
            FormGroupFirstName,
            FormGroupSecondName,
            FormGroupDisplayName,
            FormGroupPhone,
            ButtonSave,
        };
    }

    componentDidUpdate(oldProps: Props, newProps: Props): boolean | { [x: string]: any; } {
        if (oldProps === newProps) {
            return false;
        }

        this.children.FormGroupLogin.setProps({ text: newProps.userData?.login });
        this.children.FormGroupEmail.setProps({ text: newProps.userData?.email });
        this.children.FormGroupFirstName.setProps({ text: newProps.userData?.first_name });
        this.children.FormGroupSecondName.setProps({ text: newProps.userData?.second_name });
        this.children.FormGroupDisplayName.setProps({ text: newProps.userData?.display_name });
        this.children.FormGroupPhone.setProps({ text: newProps.userData?.phone });

        return true;
    }

    render() {
        return (
            `
            <form class="form-edit">
                {{{ FormGroupEmail }}}
                {{{ FormGroupLogin }}}
                {{{ FormGroupFirstName }}}
                {{{ FormGroupSecondName }}}
                {{{ FormGroupDisplayName }}}
                {{{ FormGroupPhone }}}
                <div class=form-edit__space></div>
                {{{ ButtonSave }}}
            </form>
            `
        );
    }
}

const mapStateToProps = ({ userData }: Props) => ({ userData });

export default connect(mapStateToProps)(FormEdit);
