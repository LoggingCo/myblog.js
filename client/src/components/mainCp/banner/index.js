import { MainBannerTamplate, MouseMoving } from './style';

import { useMedia } from '@hooks/useMedia';
import { useRef, useEffect, useState } from 'react';
import { useCallback } from 'react';
import { setUseProxies } from 'immer';

const MainBanner = () => {
    // media qurey
    const { isMobile } = useMedia();

    // state
    const content = useRef('');
    const count = useRef(0);
    const [text, setText] = useState('');
    const [mouse, setMouse] = useState(false);
    const [xy, setXY] = useState({ x: 0, y: 0 });
    const [click, setClick] = useState(false);
    const [state, setState] = useState(true);

    // ref
    const txt = useRef(['마이블로그', 'myblog']);
    const curserRef = useRef(null);

    // typing evnet func
    useEffect(() => {
        let interval_1;
        let interval_2;
        let interval_3;

        interval_1 = setInterval(() => {
            content.current = content.current + txt.current[0][count.current];
            count.current = count.current + 1;
            setText(content.current);

            if (count.current === txt.current[0].length) {
                clearInterval(interval_1);
                interval_2 = setInterval(() => {
                    content.current = content.current.substring(0, content.current.length - 1);
                    count.current = count.current - 1;
                    setText(content.current);

                    if (count.current === 0) {
                        clearInterval(interval_2);
                        interval_3 = setInterval(() => {
                            content.current = content.current + txt.current[1][count.current];
                            count.current = count.current + 1;
                            setText(content.current);
                            if (count.current === txt.current[1].length) {
                                clearInterval(interval_3);
                                setTimeout(() => {
                                    count.current = 0;
                                    content.current = '';
                                    setText(content.current);
                                    setState((prev) => !prev);
                                }, 800);
                            }
                        }, 400);
                    }
                }, 200);
            }
        }, 400);
        return () => clearInterval(interval_1);
    }, [state]);

    // curser evnet func
    useEffect(() => {
        const interval = setInterval(() => {
            if (curserRef.current.style.visibility === 'visible') {
                curserRef.current.style.visibility = 'hidden';
            } else {
                curserRef.current.style.visibility = 'visible';
            }
        }, 500);
        return () => clearInterval(interval);
    }, []);

    //mouse

    const onMoveHandler = useCallback(
        (e) => {
            setXY({ x: e.clientX, y: e.clientY });
        },
        [xy],
    );

    const onOverHandler = useCallback(() => {
        setMouse(true);
    }, [mouse]);

    const onLeavHander = useCallback(() => {
        setMouse(false);
    }, [mouse]);

    const onClickHandler = useCallback(() => {
        setClick((prev) => !prev);
    }, [click]);

    // html
    return (
        <>
            {mouse && (
                <MouseMoving x={xy.x + 5} y={xy.y + 5} click={click}>
                    {click ? 'FOLLOWING' : 'FOLLOWER'}
                </MouseMoving>
            )}
            {!isMobile && (
                <MainBannerTamplate
                    onMouseMove={onMoveHandler}
                    onMouseOver={onOverHandler}
                    onMouseLeave={onLeavHander}
                    onClick={onClickHandler}
                >
                    <span>
                        우리들의 블로그,
                        <span>
                            {text}
                            <span
                                ref={curserRef}
                                style={{
                                    visibility: 'hidden',
                                    fontSize: '0.825rem',
                                    fontWeight: 'bold',
                                    color: '#222',
                                    marginLeft: '0.2rem',
                                }}
                            >
                                |
                            </span>
                        </span>
                    </span>
                </MainBannerTamplate>
            )}
        </>
    );
};
export default MainBanner;
