import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const PostIcon = (props: SvgProps) => (
    <Svg
        width={24}
        height={24}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}>
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.82 4H19c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H5c-.14 0-.27-.01-.4-.03a2.008 2.008 0 0 1-1.44-1.19c-.1-.24-.16-.51-.16-.78V6c0-.28.06-.54.16-.77A2.008 2.008 0 0 1 4.6 4.04c.13-.03.26-.04.4-.04h4.18C9.6 2.84 10.7 2 12 2c1.3 0 2.4.84 2.82 2ZM7 10V8h10v2H7Zm10 4v-2H7v2h10Zm-3 2H7v2h7v-2ZM12 3.75c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75ZM5 20h14V6H5v14Z"
            fill="#000"
            fillOpacity={0.9}
        />
    </Svg>
);

export default PostIcon;
