var usr_calendar = new Vue({
    el: '#calendar',
    mixins: [vm_calendar],
    created: function() {
        this.cal_event = [
            {
                subject: 'テスト1',
                start_date: '2018-12-03',
                end_date: '2018-12-03',
                link: 'http://localhost:8080/#1'
            },
            {
                subject: 'テスト2',
                start_date: '2018-12-03',
                end_date: '2018-12-03',
                link: 'http://localhost:8080/#2'
            },
            {
                subject: 'テスト3',
                start_date: '2018-12-03',
                end_date: '2018-12-03',
                link: 'http://localhost:8080/#3'
            },
            {
                subject: 'テスト4',
                start_date: '2018-12-03',
                end_date: '2018-12-03',
                link: 'http://localhost:8080/#4'
            },
            {
                subject: 'テスト5-1',
                start_date: '2018-12-03',
                end_date: '2018-12-03',
                link: 'http://localhost:8080/#5-1'
            },
            {
                subject: 'テスト5-2',
                start_date: '2018-12-03',
                end_date: '2018-12-03',
                link: 'http://localhost:8080/#5-2'
            },
            {
                subject: 'テスト6-1',
                start_date: '2018-12-04',
                end_date: '2018-12-04',
                link: 'http://localhost:8080/#6-1'
            },
            {
                subject: 'テスト6-2',
                start_date: '2018-12-04',
                end_date: '2018-12-04',
                link: 'http://localhost:8080/#6-2'
            },
            {
                subject: 'テスト6-3',
                start_date: '2018-12-04',
                end_date: '2018-12-04',
                link: 'http://localhost:8080/#6-3'
            },
            {
                subject: 'テスト6-4',
                start_date: '2018-12-04',
                end_date: '2018-12-04',
                link: 'http://localhost:8080/#6-4'
            },
            {
                subject: 'テスト6-5',
                start_date: '2018-12-04',
                end_date: '2018-12-04',
                link: 'http://localhost:8080/#6-5'
            },
            {
                subject: 'テスト',
                start_date: '2018-12-17',
                end_date: '2018-12-28',
                link: 'http://localhost:8080/#test'
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