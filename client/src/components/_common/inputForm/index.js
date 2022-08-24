import { MyBlogInput, MyblogTextArea } from './style';

const CommonInput = ({
    type,
    size,
    width,
    height,
    radius,
    fontSize,
    borderWidth,
    borderColor,
    margin,
    padding,
    onClick,
    onKeyDown,
    onChange,
    value,
    placeholder,
    ref,
}) => {
    return type === 'textarea' ? (
        <MyblogTextArea
            type={type}
            size={size}
            width={width}
            height={height}
            margin={margin}
            padding={padding}
            radius={radius}
            fontSize={fontSize}
            borderWidth={borderWidth}
            borderColor={borderColor}
            onClick={onClick}
            onKeyDown={onKeyDown}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            ref={ref}
        ></MyblogTextArea>
    ) : (
        <MyBlogInput
            type={type}
            size={size}
            width={width}
            height={height}
            margin={margin}
            padding={padding}
            radius={radius}
            fontSize={fontSize}
            borderWidth={borderWidth}
            borderColor={borderColor}
            onClick={onClick}
            onKeyDown={onKeyDown}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            ref={ref}
        />
    );
};
export default CommonInput;
