import Block from 'core/Block';
import emptyPhoto from 'assets/empty.png';
import isEqual from 'utils/isEqual';

const REGEXP_IMAGE_NAME = /[^/]*_([^/.]+)\.\w+$/;

type Props = {
    avatar?: string | null;
    avatarSrc?: string;
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
        const avatarSrc = props.avatar
            ? `https://ya-praktikum.tech/api/v2/resources${props.avatar}`
            : emptyPhoto;

        super({
            ...props,
            imageName: imageName ?? 'Empty image',
            avatarSrc,
        });
    }

    componentDidUpdate(oldProps: Props, newProps: Props): boolean | { [x: string]: unknown; } {
        if (isEqual(oldProps, newProps)) {
            return false;
        }

        if (oldProps.avatar !== newProps.avatar) {
            const avatarSrc = newProps.avatar
                ? `https://ya-praktikum.tech/api/v2/resources${newProps.avatar}`
                : emptyPhoto;

            this.setProps({
                avatarSrc,
            });
        }
        return true;
    }

    render() {
        return (`
            <img 
                alt="{{imageName}}" 
                src="{{avatarSrc}}" 
                class="image image__{{type}} image__{{className}}" 
            />`
        );
    }
}
