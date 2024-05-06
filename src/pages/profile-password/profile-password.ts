import {
    Button, FormProfile, LeftPanel, Photo,
} from 'components';
import Block from 'core/Block';
import emptyPhoto from 'assets/empty.png';

export default class ProfilePasswordPage extends Block<object> {
    constructor(props: object) {
        const formGroups = [{
            type: 'password', label: 'Старый пароль', text: '12345678', name: 'oldPassword',
        }, {
            type: 'password', label: 'Новый пароль', text: '', name: 'newPassword',
        }, {
            type: 'password', label: 'Повторите новый пароль', text: '', name: 'newPassword',
        }];

        super({
            ...props,
            FormProfileGroups: new FormProfile({ formGroups }),
            Photo: new Photo({ avatar: emptyPhoto }),
            LeftPanel: new LeftPanel({ onClick: "window.router.go('/messenger')" }),
            ButtonSave: new Button({ label: 'Сохранить', type: 'primary', page: '/settings' }),
        });
    }

    render() {
        return `
            <div>
                <div class="container">
                    {{{ Photo }}}
                    {{{ FormProfileGroups }}}
                    <div class="button-container">
                        {{{ ButtonSave }}}
                    </div>
                    {{{ LeftPanel }}}
                </div>
            </div>
        `;
    }
}
