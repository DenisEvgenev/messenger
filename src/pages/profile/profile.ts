import { FormProfile, LeftPanel, Photo } from 'components';
import Block from 'core/Block';
import emptyPhoto from 'assets/empty.png';
import { Group } from 'components/form-group/form-group';

export default class ProfilePage extends Block<object> {
    constructor(props: object) {
        const formGroups: Array<Group> = [{
            className: 'form-group__input-disabled',
            type: 'text',
            label: 'Почта',
            text: 'pochta@yandex.ru',
            name: 'email',
        }, {
            className: 'form-group__input-disabled',
            type: 'text',
            label: 'Логин',
            text: 'ivanivanov',
            name: 'login',
        }, {
            className: 'form-group__input-disabled',
            type: 'text',
            label: 'Имя',
            text: 'Иван',
            name: 'first_name',
        }, {
            className: 'form-group__input-disabled',
            type: 'text',
            label: 'Фамилия',
            text: 'Иванов',
            name: 'second_name',
        }, {
            className: 'form-group__input-disabled',
            type: 'text',
            label: 'Имя в чате',
            text: 'Иван',
            name: 'display_name',
        }, {
            className: 'form-group__input-disabled',
            type: 'text',
            label: 'Телефон',
            text: '+7 (909) 967 30 30',
            name: 'phone',
        }];

        const buttons = [{
            classname: 'link-profile',
            type: 'link',
            label: 'Изменить данные',
            page: '/profile-edit',
        }, {
            classname: 'link-profile',
            type: 'link',
            label: 'Изменить пароль',
            page: '/profile-password',
        }, {
            classname: 'link-exit', type: 'link', label: 'Выйти', page: '/',
        }];

        super({
            ...props,
            formGroups: { label: 1 },
            FormProfileGroups: new FormProfile({ formGroups }),
            FormProfileButtons: new FormProfile({ buttons }),
            Photo: new Photo({ avatar: emptyPhoto }),
        });
    }

    init() {
        const LeftPanelBlock = new LeftPanel({
            onClick: "window.router.go('/messenger')",
        });

        this.children = {
            ...this.children,
            LeftPanelBlock,
        };
    }

    render() {
        return `
            <div>
                <div class="container">
                    {{{ Photo }}}
                    {{{ FormProfileGroups }}}
                    {{{ FormProfileButtons }}}
                    {{{ LeftPanelBlock }}}
                </div>
            </div>
        `;
    }
}
