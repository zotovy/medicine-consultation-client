class SupportController {

    // Test data
    chats: SupportChatType[] = [
        {
            date: new Date(2021, 0, 20, 10, 0),
            messages: [
                {
                    content: "Добрый день! Для смены пароля необходимо перейти в настройки в пункт «Пароль», там находятся три поля: В первом вводите старый пароль а в последних двух – новый. Не забудьте нажать на кнопку «Пароль»!",
                    date: new Date(2021, 0, 20, 11, 20),
                    isUser: false,
                }
            ],
            title: "Как мне сменить пароль?",
            user: "5fe98b597c4d6207627c1097",
            problem: "Other",
            number: 134,
        },
        {
            date: new Date(2020, 11, 31, 9, 0),
            messages: [
                {
                    content: "Большое спасибо! Все заработало)",
                    date: new Date(2020, 11, 31, 17, 0),
                    isUser: true,
                }
            ],
            title: "Не могу подключиться к консультации",
            user: "5fe98b597c4d6207627c1097",
            problem: "Tech",
            number: 12,
        },
        {
            date: new Date(2019, 3, 1, 19, 10),
            messages: [
                {
                    content: "Да, 500р вернулось на ваш счёт. Спасибо за обращение!",
                    date: new Date(2019, 3, 12, 19, 10),
                    isUser: false,
                }
            ],
            title: "Доктор не пришёл на консультацию",
            user: "5fe98b597c4d6207627c1097",
            problem: "Doctor",
            number: 7,
        }
    ];

    // chats: SupportChatType[] = new Array(100).fill({
    //     date: new Date(2021, 0, 20, 10, 0),
    //     messages: [
    //         {
    //             content: "Добрый день! Для смены пароля необходимо перейти в настройки в пункт «Пароль», там находятся три поля: В первом вводите старый пароль а в последних двух – новый. Не забудьте нажать на кнопку «Пароль»!",
    //             date: new Date(2021, 0, 20, 11, 20),
    //             isUser: false,
    //         }
    //     ],
    //     title: "Как мне сменить пароль?",
    //     user: "5fe98b597c4d6207627c1097",
    //     problem: "Other",
    //     number: 134,
    // });

}

export default new SupportController();