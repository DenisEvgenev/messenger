import {
    FormEdit, FormModal, LeftPanel, Photo, PopupError,
} from 'components';
import Block from 'core/Block';
import { connect } from 'utils/connect';
import { changeAvatar, changeProfile } from 'services/user';
import { UserDTO } from 'api/types';

type Props = {
    userData?: UserDTO;
    firstNameField: string
    secondNameField: string;
    displayNameField: string;
    loginField: string;
    emailField: string;
    phoneField: string;
    avatar: string;
}

class ProfileEditPage extends Block<Props> {
    init() {
        const EditPhotoBlock = new FormModal({
            id: 'change-user-avatar',
            formBody: 'Картинка: <input id="avatar" type="file" name="avatar" accept="image/*">',
            onSubmit: async (e: Event) => {
                e.preventDefault();
                const formModal = document.getElementById(
                    'form-modal__change-user-avatar',
                ) as HTMLFormElement;
                const formData = new FormData(formModal);
                const { avatar } = await changeAvatar(formData) as { avatar: string };
                this.children.PhotoBlock.setProps({
                    avatar,
                });
                EditPhotoBlock.setProps({ showModal: false });
            },
        });

        const LeftPanelBlock = new LeftPanel({ onClick: "window.router.go('/settings')" });
        const FormEditBlock = new FormEdit({
            onSubmit: (e: Event) => {
                e.preventDefault();
                changeProfile({
                    first_name: this.props.firstNameField,
                    second_name: this.props.secondNameField,
                    display_name: this.props.displayNameField,
                    login: this.props.loginField,
                    email: this.props.emailField,
                    phone: this.props.phoneField,
                });
            },
        });

        const PhotoBlock = new Photo({
            avatar: this.props.avatar,
            type: 'main',
            className: 'edit',
            events: {
                click: () => EditPhotoBlock.setProps({ showModal: true }),
            },
        });
        const PopupErrorBlock = new PopupError({});

        this.children = {
            ...this.children,
            FormEditBlock,
            PhotoBlock,
            LeftPanelBlock,
            PopupErrorBlock,
            EditPhotoBlock,
        };
    }

    componentDidUpdate(oldProps: Props, newProps: Props): boolean | { [x: string]: unknown; } {
        if (oldProps === newProps) {
            return false;
        }

        this.children.PhotoBlock.setProps({ avatar: newProps.avatar });
        return true;
    }

    render() {
        return `
            <div>
                {{{ PopupErrorBlock }}}
                <div class="container">
                    {{{ EditPhotoBlock }}}
                    {{{ PhotoBlock }}}
                    {{{ FormEditBlock }}}
                    {{{ LeftPanelBlock }}}
                </div>
            </div>
        `;
    }
}

const mapStateToProps = ({
    userData,
    firstNameField,
    secondNameField,
    displayNameField,
    loginField,
    emailField,
    phoneField,
}: Props) => ({
    avatar: userData?.avatar,
    firstNameField: firstNameField ?? userData?.first_name,
    secondNameField: secondNameField ?? userData?.second_name,
    displayNameField: displayNameField ?? userData?.display_name,
    loginField: loginField ?? userData?.login,
    emailField: emailField ?? userData?.email,
    phoneField: phoneField ?? userData?.phone,
});
export default connect(mapStateToProps)(ProfileEditPage);
