import { HeaderTamplate } from './style';

const ModalHeader = ({ title, setModal }) => {
    return (
        <HeaderTamplate>
            <div className="modal_title">{title}</div>
            <div className="modal_close_btn">
                <button onClick={() => setModal((prev) => !prev)}>✖</button>
            </div>
        </HeaderTamplate>
    );
};
export default ModalHeader;
