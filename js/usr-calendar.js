/**
 * Event Data Format
 *
    event = [
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
            end_date: '2018-12-13',
            link: 'http://localhost:8080/#2',
            background_color: 'rgb(243, 190, 185)'
        }
    ]
*/

var usr_calendar = new Vue({
    el: '#calendar',
    mixins: [vm_calendar],
    methods: {
        getCalendarEvent: function() {

            var events = [];

            var ev_colors = [
                {
                    background_color: 'rgb(234, 128, 128)',
                    color: '#000'
                },
                {
                    background_color: 'rgb(243, 190, 185)'
                },
                {
                    background_color: 'rgb(250, 168, 143)'
                },
                {
                    background_color: 'rgb(251, 223, 147)'
                },
                {
                    background_color: 'rgb(153, 219, 188)'
                },
                {
                    background_color: 'rgb(133, 192, 161)'
                },
                {
                    background_color: 'rgb(129, 205, 242)'
                },
                {
                    background_color: 'rgb(159, 168, 218)'
                },
                {
                    background_color: 'rgb(188, 195, 229)'
                },
                {
                    background_color: 'rgb(199, 146, 213)'
                },
                {
                    background_color: 'rgb(176, 176, 176)'
                },
                {
                    background_color: 'rgb(161, 194, 250)'
                },
            ];

            var now = new Date;
            var ev_date = new Date(now.getFullYear(), now.getMonth(), 1);
            for (var i = 0; i < 20; i++) {

                //set start date
                var start_date_m = ('0' + (ev_date.getMonth() + 1)).slice(-2);
                var start_date_d = ('0' + ev_date.getDate()).slice(-2);
                var start_date = ev_date.getFullYear() + '-' + start_date_m + '-' + start_date_d;

                //set end date
                var end_date = start_date;
                if (i == 10) {
                    var end_date_m = ('0' + (ev_date.getMonth() + 1)).slice(-2);
                    var end_date_d = ('0' + (ev_date.getDate() + 5)).slice(-2);
                    end_date = ev_date.getFullYear() + '-' + end_date_m + '-' + end_date_d;
                }
                if (i == 15) {
                    var end_date_m = ('0' + (ev_date.getMonth() + 1)).slice(-2);
                    var end_date_d = ('0' + (ev_date.getDate() + 4)).slice(-2);
                    end_date = ev_date.getFullYear() + '-' + end_date_m + '-' + end_date_d;
                }

                //set data
                var this_ev = {
                    subject: 'テスト' + (i + 1),
                    start_date: start_date,
                    end_date: end_date,
                    link: 'http://localhost:8080/#' + i
                };

                //set colors
                if (ev_colors[i] != undefined) {
                    if (typeof ev_colors[i].background_color != 'undefined') {
                        this_ev['background_color'] = ev_colors[i].background_color;
                    }
                    if (typeof ev_colors[i].color != 'undefined') {
                        this_ev['color'] = ev_colors[i].color;
                    }
                }

                events.push(this_ev);

                if (i >= 5) {
                    ev_date.setDate(ev_date.getDate() + 1);
                }
                
            }

            this.cal_event = events;
            this.$emit('GET_CALEMDAR_EVENT_COMPLETE');
        }
    },
    created: function() {
        this.cal_show_holiday = true;
    },
    mounted: function() {
        this.getCalendarEvent();
    }
})