import Block from 'core/Block';

type Props = {
    title: string;
    type?: 'main';
}

export default class Title extends Block<Props> {
    constructor(props: Props) {
        super({
            ...props,
        });
    }

    render(): string {
        return (`
            <p class="title{{#if type}} title__{{type}}{{/if}}">{{title}}</p>
        `);
    }
}
