import { useCallback } from 'react';

const AgreeCheckBox = ({ setSNS, setPromt, setAccept }) => {
    // checkBox Handler
    const onCheckBoxHandler = useCallback((e) => {
        if (e.target.id === 'sns') {
            if (e.target.checked) {
                setSNS(1);
            } else {
                setSNS(0);
            }
        } else if (e.target.id === 'promt') {
            if (e.target.checked) {
                setPromt(1);
            } else {
                setPromt(0);
            }
        } else {
            if (e.target.checked) {
                setAccept(1);
            } else {
                setAccept(0);
            }
        }
    }, []);

    return (
        <div>
            <div>
                <input type="checkbox" id="sns" onClick={onCheckBoxHandler} />
            </div>
            <div>
                <input type="checkbox" id="promt" onClick={onCheckBoxHandler} />
            </div>
            <div>
                <input type="checkbox" id="accept" onClick={onCheckBoxHandler} />
            </div>
        </div>
    );
};
export default AgreeCheckBox;
