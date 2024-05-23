import { Icon } from 'components/icon';
import Block from 'core/Block';

export type ButtonProps = {
    className?: string;
    label: string;
    page?: string;
    type: string;
    onClick?: () => void;
    events?: {
        click: () => void;
    }
    icon?: string;
}

export default class Button extends Block<ButtonProps> {
    constructor(props: ButtonProps) {
        if (props.page && !props.onClick) {
            const { page } = props;
            props.events = {
                click: () => window.router.go(page),
            };
        }

        if (props.onClick) {
            props.events = {
                click: props.onClick,
            };
        }
        super({
            ...props,
        });
    }

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
                class="button button__{{type}} button__{{className}} {{arrow}}"
            >
                {{#if icon}}{{{IconButton}}}{{/if}}
                {{label}}
            </button>
    
        `;
    }
}
