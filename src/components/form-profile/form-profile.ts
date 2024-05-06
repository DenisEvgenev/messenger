import { Button, FormGroup } from 'components';
import { ButtonProps } from 'components/button/button';
import { Group } from 'components/form-group/form-group';
import Block from 'core/Block';

type Props = {
    formGroups?: Array<Group>;
    buttons?: Array<ButtonProps>;
    formGroupComponentKeys?: Array<string>;
    buttonComponentKeys?: Array<string>;
}

export default class FormProfile extends Block<Props> {
    constructor(props: Props) {
        const { formGroups = [], buttons = [] } = props;

        const formGroupComponents = formGroups.reduce((acc: Record<string, unknown>, data) => {
            const component = new FormGroup(data);

            acc[component.id] = component;
            return acc;
        }, {});

        const buttonComponents = buttons.reduce((acc: Record<string, unknown>, data) => {
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
            <div class="form-profile">
                ${this.props.formGroupComponentKeys?.map(
                (key: string) => `{{{ ${key} }}}`,
            ).join('')}
                ${this.props.buttonComponentKeys?.map((key: string) => `{{{ ${key} }}}`).join('')}
            </div>
            `
        );
    }
}
