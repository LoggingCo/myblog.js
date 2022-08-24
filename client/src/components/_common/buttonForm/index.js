import { MyBlogBoutton } from './style';
import ReactLoading from 'react-loading';
import { LoaderWrap } from '@style/common';
import PropTypes from 'prop-types';

const CommonButton = ({
    type,
    children,
    size,
    width,
    height,
    radius,
    fontSize,
    mainColor,
    subColor,
    onClick,
    onKeyDown,
    margin,
    padding,
    ref,
    isLoading,
    disabled,
}) => {
    return (
        <MyBlogBoutton
            type={type}
            size={size}
            width={width}
            height={height}
            margin={margin}
            padding={padding}
            radius={radius}
            fontSize={fontSize}
            mainColor={mainColor}
            subColor={subColor}
            onClick={onClick}
            onKeyDown={onKeyDown}
            ref={ref}
            disabled={disabled}
        >
            {isLoading ? (
                <LoaderWrap>
                    <ReactLoading
                        type="spin"
                        color={mainColor}
                        width={16}
                        height={16}
                        disabled={isLoading}
                    />
                </LoaderWrap>
            ) : (
                children
            )}
        </MyBlogBoutton>
    );
};
export default CommonButton;

CommonButton.propTypes = {
    type: PropTypes.oneOf(['normal', 'reverse']),
    children: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'big', 'full']),
    width: PropTypes.string,
    height: PropTypes.string,
    radius: PropTypes.string,
    fontSize: PropTypes.string,
    mainColor: PropTypes.string,
    subColor: PropTypes.string,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    margin: PropTypes.string,
    padding: PropTypes.string,
    ref: PropTypes.object,
    isLoading: PropTypes.bool,
};
