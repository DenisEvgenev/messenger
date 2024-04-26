import Block from 'core/Block';

export default class Title extends Block {
    constructor(props) {
        super({
            ...props,
        });
    }

    render(): string {
        return (`
            <p class="title title__{{type}}">{{title}}</p>
        `);
    }
}
