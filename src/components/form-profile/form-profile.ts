import { Button, FormGroup } from 'components';
import Block from 'core/Block';
import { connect } from 'utils/connect';
import { logout } from 'services/auth';
import { UserDTO } from 'api/types';

type Props = {
    userData?: UserDTO
}
class FormProfile extends Block<Props> {
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
            className: 'form-group__input-disabled',
            type: 'mail',
            label: 'Почта',
            text: email,
            name: 'email',
        });
        const FormGroupLogin = new FormGroup({
            className: 'form-group__input-disabled',
            type: 'text',
            label: 'Логин',
            text: login,
            name: 'login',
        });
        const FormGroupFirstName = new FormGroup({
            className: 'form-group__input-disabled',
            type: 'text',
            label: 'Имя',
            text: firstName,
            name: 'first_name',
        });
        const FormGroupSecondName = new FormGroup({
            className: 'form-group__input-disabled',
            type: 'text',
            label: 'Фамилия',
            text: secondName,
            name: 'second_name',
        });
        const FormGroupDisplayName = new FormGroup({
            className: 'form-group__input-disabled',
            type: 'text',
            label: 'Имя в чате',
            text: displayName,
            name: 'display_name',
        });
        const FormGroupPhone = new FormGroup({
            className: 'form-group__input-disabled',
            type: 'tel',
            label: 'Телефон',
            text: phone,
            name: 'phone',
        });
        const EditProfileButton = new Button({
            className: 'link-profile',
            type: 'link',
            label: 'Изменить данные',
            page: '/profile-edit',
        });
        const EditPasswordButton = new Button({
            className: 'link-profile',
            type: 'link',
            label: 'Изменить пароль',
            page: '/profile-password',
        });
        const LogoutButton = new Button({
            className: 'link-exit',
            type: 'link',
            label: 'Выйти',
            events: {
                click: () => logout(),
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
            EditProfileButton,
            EditPasswordButton,
            LogoutButton,
        };
    }

    componentDidUpdate(oldProps: Props, newProps: Props): boolean | { [x: string]: any; } {
        if (oldProps === newProps) {
            return false;
        }

        this.children.FormGroupLogin.setProps({ text: newProps.userData?.login });
        this.children.FormGroupEmail.setProps({ text: newProps.userData?.email });
        this.children.FormGroupFirstName.setProps({
            text: newProps.userData?.first_name,
        });
        this.children.FormGroupSecondName.setProps({
            text: newProps.userData?.second_name,
        });
        this.children.FormGroupDisplayName.setProps({
            text: newProps.userData?.display_name,
        });
        this.children.FormGroupPhone.setProps({ text: newProps.userData?.phone });

        return true;
    }

    render() {
        return (
            `
            <div class="form-profile">
                {{{ FormGroupEmail }}}
                {{{ FormGroupLogin }}}
                {{{ FormGroupFirstName }}}
                {{{ FormGroupSecondName }}}
                {{{ FormGroupDisplayName }}}
                {{{ FormGroupPhone }}}
                <div class="form-profile__space"></div>
                {{{ EditProfileButton }}}
                {{{ EditPasswordButton }}}
                {{{ LogoutButton }}}
            </div>
            `
        );
    }
}

const mapStateToProps = ({ userData }: Props) => ({ userData });

export default connect(mapStateToProps)(FormProfile);
