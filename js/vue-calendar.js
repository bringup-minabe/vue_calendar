/**
 * calendar
 *
 * firstDay:開始曜日
 *  0:日曜日
 *  1:月曜日
 */
var vm_calendar = {
    data: {
        calendar_date: null,
        calendar_date_display: '',
        calendar_firstDay: 1,
        calendar_cel: [],
        calendar_data:[],
        w_names: ['日', '月', '火', '水', '木', '金', '土'],
        calendar_event: [],
        calendar_days_event: {},
        calendar_format_event: [],
        calendar_header: [],
        calendar_today: ''
    },
    methods: {
        setCalendar: function() {

            this.calendar_cel = [];

            if (this.calendar_date == null) {
                this.calendar_date = new Date;
            } else {
                this.calendar_date = new Date(this.calendar_date);
            }

            //set date display
            this.setDateDisplay();

            var pr_date = this.calendar_date;
            var firstDay = this.calendar_firstDay;

            Array.prototype.cal_chunk = function(size) {
                var array = this;
                return [].concat.apply([], array.map(function(e, i) {
                    return i % size ? [] : [array.slice(i, i + size)];
                }));
            }

            var range = function(min, max) {
                return Array(max - min + 1).join().split(',').map(function(e, i) {
                    return min + i;
                });
            }

            var dt = new Date(pr_date.getFullYear(), pr_date.getMonth(), 1);
            var max = new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDate();
            var before = dt.getDay() - firstDay;
            var after  = (7 - (before + max) % 7) % 7;

            var calendar_cel = range(1 - before, max + after)
                   .map(function (e) { return e < 1 || e > max ? '' : e; })
                   .cal_chunk(7);

            this.calendar_cel = calendar_cel;

            //format calendar event
            this.formatCalendarEvent();

            //set calendar data
            this.setCalendarData();

            //set calendar header
            this.setCalendarHeader();
        },
        formatCalendarEvent: function(){
            this.calendar_days_event = {};
            for (var i = 0; i < this.calendar_event.length; i++) {
                if (typeof this.calendar_event[i].start_date == "undefined") {
                    continue;
                }
                var this_start_date = this.calendar_event[i].start_date;
                if (typeof this.calendar_days_event[this_start_date]  == "undefined") {
                    this.calendar_days_event[this_start_date] = {};
                }

                //set day between
                this.calendar_event[i].btw_class = 'zsh-cal-btw-1';
                if (this.calendar_event[i].start_date != this.calendar_event[i].end_date) {
                    var sDy = new Date(this.calendar_event[i].start_date);
                    var eDy = new Date(this.calendar_event[i].end_date);
                    var termDay = Math.ceil((eDy - sDy) / 86400000);
                    this.calendar_event[i].btw_class = 'zsh-cal-btw-' + (termDay + 1);
                }
                
                this.calendar_days_event[this_start_date][i] = this.calendar_event[i];
            }
        },
        setCalendarData: function() {
            this.calendar_data = [];
            for (var i = 0; i < this.calendar_cel.length; i++) {
                this.calendar_data[i] = [];
                this.calendar_format_event[i] = [];
                for (var e = 0; e < this.calendar_cel[i].length; e++) {

                    var this_date = null;
                    var this_dw = null;
                    var this_dwd = null;
                    var this_holiday = false;

                    if (this.calendar_cel[i][e] != '') {
                        var td_ob = new Date(
                            this.calendar_date.getFullYear(),
                            this.calendar_date.getMonth(),
                            this.calendar_cel[i][e]
                            );

                        var this_date_m = ('0' + (td_ob.getMonth() + 1)).slice(-2);
                        var this_date_d = ('0' + td_ob.getDate()).slice(-2);

                        this_date = td_ob.getFullYear() + '-' + this_date_m + '-' + this_date_d;
                        this_dw = td_ob.getDay();

                        //set day display
                        if (typeof this.w_names[this_dw] != 'undefined') {
                            this_dwd = this.w_names[this_dw];
                        }

                        //set holiday
                        if (this_dw == 6 || this_dw == 0) {
                            this_holiday = true;
                        }

                        //set event
                        var this_event = [];
                        if (typeof this.calendar_days_event[this_date] != 'undefined') {
                            for(ev in this.calendar_days_event[this_date]) {
                                //set event order class
                                this.calendar_days_event[this_date][ev].event_class = 'zsh-cal-ev-' + e;

                                //set day between
                                var btw_class = 'zsh-cal-btw-0';
                                if (this.calendar_days_event[this_date][ev].start_date != this.calendar_days_event[this_date][ev].end_date) {
                                    var sDy = new Date(this.calendar_days_event[this_date][ev].start_date);
                                    var eDy = new Date(this.calendar_days_event[this_date][ev].end_date);
                                    var termDay = Math.ceil((eDy - sDy) / 86400000);
                                    if (this_dw == 0) {
                                        if (this.calendar_firstDay == 1 && termDay >= 1) {
                                            btw_class = 'zsh-cal-btw-' + 1;
                                        } else {
                                            if (termDay >= 7) {
                                                btw_class = 'zsh-cal-btw-' + 7;
                                            } else {
                                                btw_class = 'zsh-cal-btw-' + (termDay + 1);
                                            }
                                        }
                                    } else {
                                        if ((termDay + this_dw) >= 7) {
                                            termDay = 7 - this_dw;
                                            btw_class = 'zsh-cal-btw-' + (termDay + this.calendar_firstDay);
                                        } else {
                                            btw_class = 'zsh-cal-btw-' + (termDay + 1);
                                        }
                                    }
                                }
                                this.calendar_days_event[this_date][ev].btw_class = btw_class;

                                this.calendar_format_event[i].push(this.calendar_days_event[this_date][ev]);
                                this_event.push(this.calendar_days_event[this_date][ev]);
                            } 
                        }
                    }

                    this.calendar_data[i].push({
                        day: this.calendar_cel[i][e],
                        date: this_date,
                        dw: this_dw,
                        dwd: this_dwd,
                        holiday: this_holiday,
                        event: this_event
                    });
                }
            }
        },
        setCalendarHeader: function() {
            
            this.calendar_header = [];
            
            var h_ar = ['日', '月', '火', '水', '木', '金', '土'];
            if (this.calendar_firstDay == 1) {
                h_ar = ['月', '火', '水', '木', '金', '土', '日'];
            }
            
            for (var i = 0; i < h_ar.length; i++) {
                var holiday = false;
                if (h_ar[i] == '土' || h_ar[i] == '日') {
                    holiday = true;
                }
                this.calendar_header.push({
                    display: h_ar[i],
                    holiday: holiday
                });
            }
        },
        setDateDisplay: function() {
            var date_m = ('0' + (this.calendar_date.getMonth() + 1)).slice(-2);
            this.calendar_date_display = this.calendar_date.getFullYear() + '年' + date_m + '月';
        },
        calPrev: function() {
            this.calendar_date.setMonth(this.calendar_date.getMonth() - 1);
            this.setCalendar();
        },
        calNext: function() {
            this.calendar_date.setMonth(this.calendar_date.getMonth() + 1);
            this.setCalendar();
        },
        calToday: function() {
            this.calendar_date = new Date
            this.setCalendar();
        }
    },
    created: function() {
        var now = new Date;
        this.calendar_today = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    }
}