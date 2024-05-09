import Block from 'core/Block';
import emptyPhoto from 'assets/empty.png';

const REGEXP_IMAGE_NAME = /[^/]*_([^/.]+)\.\w+$/;

type Props = {
    avatar: string | null;
    imageName?: string;
    srcAvatar?: string;
    events?: {
        click: () => void;
    },
    type?: string;
    className?: string;
}

export default class Photo extends Block<Props> {
    constructor(props: Props) {
        const imageName = props.avatar?.match(REGEXP_IMAGE_NAME)?.[1];

        super({
            ...props,
            imageName: imageName ?? 'Empty image',
            avatar: props.avatar || emptyPhoto,
        });
    }

    render() {
        return (`
            <img 
                alt="{{imageName}}" 
                src="{{avatar}}" 
                class="image image__{{type}} image__{{className}}" 
            />`
        );
    }
}
