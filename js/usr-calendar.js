var usr_calendar = new Vue({
    el: '#calendar',
    mixins: [vm_calendar],
    created: function() {
        this.cal_event = [
            {
                subject: 'テスト1',
                start_date: '2018-12-03',
                end_date: '2018-12-03',
                link: 'http://localhost:8080/'
            },
            {
                subject: 'テスト2',
                start_date: '2018-12-03',
                end_date: '2018-12-03',
                link: 'http://localhost:8080/'
            },
            {
                subject: 'テスト3',
                start_date: '2018-12-03',
                end_date: '2018-12-03',
                link: 'http://localhost:8080/'
            },
            {
                subject: 'テスト4',
                start_date: '2018-12-03',
                end_date: '2018-12-03',
                link: 'http://localhost:8080/'
            },
            {
                subject: 'テスト5',
                start_date: '2018-12-03',
                end_date: '2018-12-03',
                link: 'http://localhost:8080/'
            },
            {
                subject: 'テスト6',
                start_date: '2018-12-04',
                end_date: '2018-12-04',
                link: 'http://localhost:8080/'
            },
            {
                subject: 'テスト',
                start_date: '2018-12-17',
                end_date: '2018-12-28',
                link: 'http://localhost:8080/'
            }
        ];
        this.setCalendar();
    }
})