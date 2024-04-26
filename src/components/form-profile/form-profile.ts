import { Button } from 'components/button';
import { FormGroup } from 'components/form-group';
import Block from 'core/Block';

export default class FormProfile extends Block {
    constructor(props) {
        const { formGroups = [], buttons = [] } = props;

        const formGroupComponents = formGroups.reduce((acc, data) => {
            const component = new FormGroup(data);

            acc[component.id] = component;
            return acc;
        }, {});

        const buttonComponents = buttons.reduce((acc, data) => {
            const component = new Button(data);

            acc[component.id] = component;
            return acc;
        }, {});

        super({
            ...props,
            formGroupComponentKeys: Object.keys(formGroupComponents),
            buttonComponentKeys: Object.keys(buttonComponents),
            ...formGroupComponents,
            ...buttonComponents,
        });
    }

    render() {
        return (
            `
            <form class="form-profile">
                ${this.props.formGroupComponentKeys.map((key: string) => `{{{ ${key} }}}`).join('')}
                ${this.props.buttonComponentKeys.map((key: string) => `{{{ ${key} }}}`).join('')}
            </form>
            `
        );
    }
}
