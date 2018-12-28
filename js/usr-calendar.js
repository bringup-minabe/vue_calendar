var usr_calendar = new Vue({
    el: '#calendar',
    mixins: [vm_calendar],
    created: function() {
        this.cal_event = [
            {
                subject: 'テスト1',
                start_date: '2018-12-03',
                end_date: '2018-12-03',
                link: 'http://localhost:8080/#1',
                background_color: 'rgb(234, 128, 128)',
                color: '#000'
            },
            {
                subject: 'テスト2',
                start_date: '2018-12-03',
                end_date: '2018-12-03',
                link: 'http://localhost:8080/#2',
                background_color: 'rgb(243, 190, 185)'
            },
            {
                subject: 'テスト3',
                start_date: '2018-12-03',
                end_date: '2018-12-03',
                link: 'http://localhost:8080/#3',
                background_color: 'rgb(250, 168, 143)'
            },
            {
                subject: 'テスト4',
                start_date: '2018-12-03',
                end_date: '2018-12-03',
                link: 'http://localhost:8080/#4',
                background_color: 'rgb(251, 223, 147)'
            },
            {
                subject: 'テスト5-1',
                start_date: '2018-12-03',
                end_date: '2018-12-03',
                link: 'http://localhost:8080/#5-1',
                background_color: 'rgb(153, 219, 188)'
            },
            {
                subject: 'テスト5-2',
                start_date: '2018-12-03',
                end_date: '2018-12-03',
                link: 'http://localhost:8080/#5-2',
                background_color: 'rgb(133, 192, 161)'
            },
            {
                subject: 'テスト6-1',
                start_date: '2018-12-04',
                end_date: '2018-12-04',
                link: 'http://localhost:8080/#6-1',
                background_color: 'rgb(129, 205, 242)'
            },
            {
                subject: 'テスト6-2',
                start_date: '2018-12-04',
                end_date: '2018-12-04',
                link: 'http://localhost:8080/#6-2',
                background_color: 'rgb(159, 168, 218)'
            },
            {
                subject: 'テスト6-3',
                start_date: '2018-12-04',
                end_date: '2018-12-04',
                link: 'http://localhost:8080/#6-3',
                background_color: 'rgb(188, 195, 229)'
            },
            {
                subject: 'テスト6-4',
                start_date: '2018-12-04',
                end_date: '2018-12-04',
                link: 'http://localhost:8080/#6-4',
                background_color: 'rgb(199, 146, 213)'
            },
            {
                subject: 'テスト6-5',
                start_date: '2018-12-04',
                end_date: '2018-12-04',
                link: 'http://localhost:8080/#6-5',
                background_color: 'rgb(176, 176, 176)'
            },
            {
                subject: 'テスト',
                start_date: '2018-12-17',
                end_date: '2018-12-28',
                link: 'http://localhost:8080/#test',
                background_color: 'rgb(161, 194, 250)'
            },
            {
                subject: 'テスト7',
                start_date: '2018-12-18',
                end_date: '2018-12-18',
                link: 'http://localhost:8080/#7'
            },
            {
                subject: 'テスト8',
                start_date: '2018-12-18',
                end_date: '2018-12-18',
                link: 'http://localhost:8080/#8'
            },
            {
                subject: 'テスト9',
                start_date: '2018-12-18',
                end_date: '2018-12-18',
                link: 'http://localhost:8080/#9'
            },
            {
                subject: 'テスト10',
                start_date: '2018-12-18',
                end_date: '2018-12-21',
                link: 'http://localhost:8080/#10'
            },
        ];
        this.setCalendar();
    }
})