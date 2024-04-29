import { FormProfile, LeftPanel, Photo } from 'components';
import Block from 'core/Block';
import emptyPhoto from 'assets/empty.png';

export default class ProfilePage extends Block<object> {
    constructor(props: object) {
        const formGroups = [{
            classname: 'form-group__input-disabled',
            type: 'name',
            label: 'Почта',
            text: 'pochta@yandex.ru',
        }, {
            classname: 'form-group__input-disabled',
            type: 'name',
            label: 'Логин',
            text: 'ivanivanov',
        }, {
            classname: 'form-group__input-disabled',
            type: 'name',
            label: 'Имя',
            text: 'Иван',
        }, {
            classname: 'form-group__input-disabled',
            type: 'name',
            label: 'Фамилия',
            text: 'Иванов',
        }, {
            classname: 'form-group__input-disabled',
            type: 'name',
            label: 'Имя в чате',
            text: 'Иван',
        }, {
            classname: 'form-group__input-disabled',
            type: 'name',
            label: 'Телефон',
            text: '+7 (909) 967 30 30',
        }];

        const buttons = [{
            classname: 'link-profile', type: 'link', label: 'Изменить данные', page: 'profile-edit',
        }, {
            classname: 'link-profile',
            type: 'link',
            label: 'Изменить пароль',
            page: 'profile-password',
        }, {
            classname: 'link-exit', type: 'link', label: 'Выйти', page: 'login',
        }];

        super({
            ...props,
            formGroups: { label: 1 },
            FormProfileGroups: new FormProfile({ formGroups }),
            FormProfileButtons: new FormProfile({ buttons }),
            Photo: new Photo({ type: 'main', avatar: emptyPhoto }),
            LeftPanel: new LeftPanel({ page: 'chat' }),
        });
    }

    render() {
        return `
            <div class="container">
                {{{ Photo }}}
                {{{ FormProfileGroups }}}
                {{{ FormProfileButtons }}}
                {{{ LeftPanel }}}
            </div>
        `;
    }
}
