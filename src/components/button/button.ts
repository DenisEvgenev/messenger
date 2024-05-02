import { Icon } from 'components/icon';
import Block from 'core/Block';

export type ButtonProps = {
    label: string;
    page?: string;
    type: string;
    disabled?: boolean;
    events?: {
        click: () => void;
    }
    icon?: string;
}

export default class Button extends Block<ButtonProps> {
    init() {
        if (this.props.icon) {
            const IconButton = new Icon({
                src: this.props.icon,
                size: 'm',
            });

            this.children = {
                ...this.children,
                IconButton,
            };
        }
    }

    render(): string {
        return `
            <button 
                type={{type}}        
                class="button button__{{type}} button__{{classname}} {{arrow}}"
                {{#unless disabled}}page="{{page}}"{{/unless}}
            >
                {{#if icon}}{{{IconButton}}}{{/if}}
                {{label}}
            </button>
    
        `;
    }
}
