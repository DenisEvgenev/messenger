import { FormProfile, LeftPanel, Photo } from 'components';
import Block from 'core/Block';
import emptyPhoto from 'assets/empty.png';
import { connect } from 'utils/connect';
import { UserDTO } from 'api/types';

type Props = {
    userData: UserDTO;
    avatar: string;
}

class ProfilePage extends Block<Props> {
    init() {
        const PhotoBlock = new Photo({ avatar: this.props.avatar, type: 'main' });
        const LeftPanelBlock = new LeftPanel({
            onClick: "window.router.go('/messenger')",
        });

        const FormProfileGroups = new FormProfile({});
        this.children = {
            ...this.children,
            FormProfileGroups,
            LeftPanelBlock,
            PhotoBlock,
        };
    }

    componentDidUpdate(oldProps: Props, newProps: Props): boolean | { [x: string]: any; } {
        if (oldProps === newProps) {
            return false;
        }

        this.children.PhotoBlock.setProps({ avatar: newProps.avatar });
        return true;
    }

    render() {
        return `
            <div>
                <div class="container">
                    {{{ PhotoBlock }}}
                    {{{ FormProfileGroups }}}
                    {{{ LeftPanelBlock }}}
                </div>
            </div>
        `;
    }
}

const mapStateToProps = ({ userData, isLoading }:
    { userData: UserDTO, isLoading: boolean }) =>
    ({
        userData,
        isLoading,
        avatar: userData?.avatar
            ? `https://ya-praktikum.tech/api/v2/resources${userData?.avatar}`
            : emptyPhoto,
    });

export default connect(mapStateToProps)(ProfilePage);
