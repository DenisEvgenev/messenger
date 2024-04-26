import { Icon } from 'components/icon';
import Block from 'core/Block';

export default class Button extends Block {
    constructor(props) {
        super({
            ...props,
            events: {
                click: props.onClick,
            },
            IconButton: new Icon({
                src: props.icon,
                size: 'm',
            }),
        });
    }

    render(): string {
        return `
            <button 
                type="button"        
                class="button button__{{type}} button__{{classname}} {{arrow}}"
                {{#unless disabled}}page="{{page}}"{{/unless}}
            >
                {{#if icon}}{{{IconButton}}}{{/if}}
                {{label}}
            </button>
    
        `;
    }
}
