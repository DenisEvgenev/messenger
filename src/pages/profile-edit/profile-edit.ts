import {
    Button, FormProfile, LeftPanel, Photo,
} from 'components';
import Block from 'core/Block';
import emptyPhoto from 'assets/empty.png';

export default class ProfileEditPage extends Block {
    constructor(props) {
        const formGroups = [{
            type: 'name', label: 'Почта', text: 'pochta@yandex.ru', name: 'email',
        }, {
            name: 'login', type: 'name', label: 'Логин', text: 'ivanivanov',
        }, {
            name: 'first_name', type: 'name', label: 'Имя', text: 'Иван',
        }, {
            name: 'second_name', type: 'name', label: 'Фамилия', text: 'Иванов',
        }, {
            name: 'display_name', type: 'name', label: 'Имя в чате', text: 'Иван',
        }, {
            name: 'phone', type: 'name', label: 'Телефон', text: '+7 (909) 967 30 30',
        }];

        super({
            ...props,
            FormProfileGroups: new FormProfile({ formGroups }),
            Photo: new Photo({ type: 'main', avatar: emptyPhoto }),
            LeftPanel: new LeftPanel({ page: 'chat' }),
            ButtonSave: new Button({ label: 'Сохранить', type: 'primary', page: 'profile' }),
        });
    }

    render() {
        return `
            <div class="container">
                {{{ Photo }}}
                {{{ FormProfileGroups }}}
                <div class="button-container">
                    {{{ ButtonSave }}}
                </div>
                {{{ LeftPanel }}}
            </div>
        `;
    }
}