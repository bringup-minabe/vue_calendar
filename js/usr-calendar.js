var usr_calendar = new Vue({
    el: '#calendar',
    mixins: [vm_calendar],
    created: function() {
        this.calendar_event = [
            {
                subject: 'テスト1',
                start_date: '2018-12-03',
                end_date: '2018-12-03',
                link: 'http://localhost:8080/forval_nippin_sy/site/'
            },
            {
                subject: 'テスト2',
                start_date: '2018-12-03',
                end_date: '2018-12-03',
                link: 'http://localhost:8080/forval_nippin_sy/site/'
            },
            {
                subject: 'テスト3',
                start_date: '2018-12-17',
                end_date: '2018-12-25',
                link: 'http://localhost:8080/forval_nippin_sy/site/'
            }
        ];
        this.setCalendar();
    }
})