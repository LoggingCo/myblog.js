import { faker } from '@faker-js/faker';
import shortId from 'shortid';
import dayjs from 'dayjs';

dayjs.locale('ko');
// userDummy

const userInfo = {
    blogIdx: 1,
    nick: 'korpg95274',
    img: null,
};

export const userUpdateInfo = {
    blogIdx: 1,
    nick: 'korpg95274',
    img: faker.image.image(),
};

export const dummyRoomIdx = '4352dO#IR0238#%9';

export const userDATA = () => {
    return {
        info: userInfo,
        token: 'OAQo2er#&$EORodkguriEIQOWOER=APEIldgjrgo>roro75789123',
        //JWT 토큰 로그인 방식
    };
};

// postDummy
export const postDATA = (count) =>
    Array(count)
        .fill()
        .map(() => ({
            id: shortId.generate(),
            content: faker.lorem.paragraph(),
            User: {
                blogIdx: shortId.generate(),
                nick: faker.name.findName(),
                img: faker.image.image(),
            },
            Images: [faker.image.image()],
            Comments: [
                {
                    id: shortId.generate(),
                    content: faker.lorem.sentence(),
                    User: {
                        blogIdx: shortId.generate(),
                        nick: faker.name.findName(),
                        img: faker.image.image(),
                    },

                    myComment: 'N',
                    createdAt: faker.date.between(
                        '2022-07-01T00:00:00.000Z',
                        '2022-08-01T00:00:00.000Z',
                    ),
                },
            ],
            createdAt: faker.date.between('2022-07-01T00:00:00.000Z', '2022-08-01T00:00:00.000Z'),
            updatedAt: null,
            myPost: 'N',
        }));

export const postDummy = (req) => ({
    id: req.postId ? req.postId : shortId.generate(),
    content: req.content,
    User: userInfo,
    Images: Array(req.files)
        .fill()
        .map(() => faker.image.image()),
    Comments: [],
    createdAt: dayjs().format('YYYY.MM.DD'),
    updatedAt: null,
    myPost: 'Y',
});

// commentDummy

export const commentDummy = (req) => ({
    id: shortId.generate(),
    content: req,
    User: userInfo,
    myComment: 'Y',
    createdAt: dayjs().format('YYYY.MM.DD'),
});

// blogPostDummy

export const blogDATA = (count) =>
    Array(count)
        .fill()
        .map(() => ({
            id: shortId.generate(),
            content: faker.lorem.paragraph(),
            User: userInfo,
            Images: [faker.image.image()],
            Comments: [
                {
                    id: shortId.generate(),
                    content: faker.lorem.sentence,
                    User: {
                        blogIdx: shortId.generate(),
                        nick: faker.name.findName(),
                        img: faker.image.image(),
                    },
                    myComment: 'N',
                },
            ],
            createdAt: faker.date.between('2022-07-01T00:00:00.000Z', '2022-08-01T00:00:00.000Z'),
            updatedAt: null,
            myPost: 'Y',
        }));

export const blogFollower = (count) =>
    Array(count)
        .fill()
        .map(() => ({
            blogIdx: shortId.generate(),
            nick: faker.name.findName(),
            img: faker.image.image(),
        }));

export const blogFollowing = (count) =>
    Array(count)
        .fill()
        .map(() => ({
            blogIdx: shortId.generate(),
            nick: faker.name.findName(),
            img: faker.image.image(),
        }));

export const blogBen = (count) =>
    Array(count)
        .fill()
        .map(() => ({
            blogIdx: shortId.generate(),
            nick: faker.name.findName(),
            img: faker.image.image(),
        }));

export const blogInfo = {
    blogIdx: 1,
    nick: 'korpg95274',
    post: 50,
    following: 259,
    follower: 159,
    ben: 10,
    myinfo: 'Y',
    benInfo: 'N',
    followingInfo: 'Y',
};

// listdummy

export const listDummy = () => ({
    blogIdx: shortId.generate(),
    nick: faker.name.findName(),
    img: faker.image.image(),
});

// chatDummy

export const chatFirstDummy = () => ({
    info: {
        roomIdx: 'chatbot',
        nick: 'korpg95274',
        blogIdx: 1,
    },
    content: [
        {
            from: 'myBlog',
            content: `안녕하세요 korpg95274님 내 친구들과 자유롭게 대화해보세요`,
            createdAt: dayjs().format('A HH:mm'),
            read: 'Y',
        },
        {
            from: 'myBlog',
            content: "도움이 필요하면 '/도움말'을 입력해주세요",
            createdAt: dayjs().format('A HH:mm'),
            read: 'Y',
        },
    ],
});

export const chatDummy = () => {
    return {
        info: {
            roomIdx: dummyRoomIdx,
            nick: faker.name.findName(),
            blogIdx: shortId.generate(),
        },
        content: [
            {
                content: '안녕하세요. 반갑습니다 김성용이라고 합니다',
                createdAt: dayjs().format('A HH:mm'),
                read: 'Y',
            },
            {
                from: 'korpg95274',
                content: '네? 저도 이름이 김성용인데',
                createdAt: dayjs().format('A HH:mm'),
                read: 'Y',
            },
            {
                from: 'korpg95274',
                content: '이런 우연도 다 있네요 하하하',
                createdAt: dayjs().format('A HH:mm'),
                read: 'Y',
            },
            {
                content: '앗, 제 오타입니다. 저는 기성용입니다',
                createdAt: dayjs().format('A HH:mm'),
                read: 'Y',
            },
            {
                content: '그래도 정말 신기하군요 :)',
                createdAt: dayjs().format('A HH:mm'),
                read: 'Y',
            },
            {
                from: 'korpg95274',
                content: 'ㅡ,.ㅡ',
                createdAt: dayjs().format('A HH:mm'),
                read: 'Y',
            },
        ],
    };
};

export const chatListData = (count) => {
    return Array(count)
        .fill()
        .map(() => ({
            roomIdx: shortId.generate(),
            blogIdx: shortId.generate(),
            nick: faker.name.findName(),
            img: faker.image.image(),
        }));
};

export const chatListDummy = () => ({
    roomIdx: shortId.generate(),
    blogIdx: shortId.generate(),
    nick: faker.name.findName(),
    img: faker.image.image(),
});
