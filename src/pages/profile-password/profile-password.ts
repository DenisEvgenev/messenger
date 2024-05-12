import {
    FormEditPassword, LeftPanel, Photo, PopupError,
} from 'components';
import Block from 'core/Block';
import { connect } from 'utils/connect';
import { changePassword } from 'services/user';
import { UserDTO } from 'api/types';

type Props = {
    oldPasswordField: string;
    newPasswordField: string;
    userData: UserDTO;
    avatar: string;
}

class ProfileEditPage extends Block<Props> {
    init() {
        const PhotoBlock = new Photo({ avatar: this.props?.avatar, type: 'main' });
        const LeftPanelBlock = new LeftPanel({ onClick: "window.router.go('/settings')" });
        const FormEditBlock = new FormEditPassword({
            onSubmit: (e: Event) => {
                e.preventDefault();
                changePassword({
                    oldPassword: this.props.oldPasswordField,
                    newPassword: this.props.newPasswordField,
                });
            },
        });
        const PopupErrorBlock = new PopupError({});

        this.children = {
            ...this.children,
            FormEditBlock,
            PhotoBlock,
            LeftPanelBlock,
            PopupErrorBlock,
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
                    {{{ PhotoBlock }}}
                    {{{ FormEditBlock }}}
                    {{{ LeftPanelBlock }}}
                </div>
            </div>
        `;
    }
}

const mapStateToProps = ({
    oldPasswordField,
    newPasswordField,
    userData,
}: Props) => ({
    oldPasswordField,
    newPasswordField,
    avatar: userData?.avatar,
});
export default connect(mapStateToProps)(ProfileEditPage);
