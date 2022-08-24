import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import CommonInput from '@common/inputForm';
import { SearchBox, SearchWraaper } from './style';

const HeaderSearch = () => {
    return (
        <SearchWraaper>
            <CommonInput
                radius="0.2rem"
                width="100%"
                margin="0 1rem"
                placeholder="관심사 혹은 친구를 검색하세요"
                fontSize="0.825rem"
                padding="0.3rem 3rem 0.3rem 1rem"
                borderWidth="3px"
            ></CommonInput>
            <SearchBox>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </SearchBox>
        </SearchWraaper>
    );
};
export default HeaderSearch;
