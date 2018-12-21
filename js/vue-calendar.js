/**
 * calendar
 *
 * firstDay:開始曜日
 *  0:日曜日
 *  1:月曜日
 */
Array.prototype.cal_chunk = function(size) {
    var array = this;
    return [].concat.apply([], array.map(function(e, i) {
        return i % size ? [] : [array.slice(i, i + size)];
    }));
}
var vm_calendar = {
    data: {
        cal_date: null,
        cal_date_display: '',
        cal_firstDay: 1,
        cal_cel: [],
        cal_data:[],
        w_names: ['日', '月', '火', '水', '木', '金', '土'],
        cal_event: [],
        cal_days_event: {},
        cal_format_event: [],
        cal_header: [],
        cal_today: ''
    },
    methods: {
        guid: function() {
            var s4 = function() {
                return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        },
        setCalendar: function() {

            this.cal_cel = [];

            if (this.cal_date == null) {
                this.cal_date = new Date;
            } else {
                this.cal_date = new Date(this.cal_date);
            }

            //set date display
            this.setDateDisplay();

            var pr_date = this.cal_date;
            var firstDay = this.cal_firstDay;

            var range = function(min, max) {
                return Array(max - min + 1).join().split(',').map(function(e, i) {
                    return min + i;
                });
            }

            var dt = new Date(pr_date.getFullYear(), pr_date.getMonth(), 1);
            var max = new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDate();
            var before = dt.getDay() - firstDay;
            var after  = (7 - (before + max) % 7) % 7;

            var cal_cel = range(1 - before, max + after)
                   .map(function (e) { return e < 1 || e > max ? '' : e; })
                   .cal_chunk(7);

            this.cal_cel = cal_cel;

            //format calendar event
            this.formatCalendarEvent();

            //set calendar data
            this.setCalendarData();

            //set calendar header
            this.setCalendarHeader();
        },
        formatCalendarEvent: function(){
            this.cal_days_event = {};
            for (var i = 0; i < this.cal_event.length; i++) {

                if (typeof this.cal_event[i].start_date == "undefined") {
                    continue;
                }

                //set guid
                this.cal_event[i].guid = this.guid();

                //set event date ar
                var this_start_date = this.cal_event[i].start_date;
                if (typeof this.cal_days_event[this_start_date]  == "undefined") {
                    this.cal_days_event[this_start_date] = {};
                }

                if (
                    typeof this.cal_event[i].start_date != "undefined" && 
                    typeof this.cal_event[i].end_date != "undefined"
                ) {
                    var tob_start_date = new Date(this.cal_event[i].start_date);
                    var tob_end_date = new Date(this.cal_event[i].end_date);
                    if (tob_end_date > tob_start_date) {
                        console.log(tob_end_date);
                    }
                }
                
                this.cal_days_event[this_start_date][i] = this.cal_event[i];
            }
        },
        setCalendarData: function() {
            this.cal_data = [];
            for (var i = 0; i < this.cal_cel.length; i++) {
                this.cal_data[i] = [];
                this.cal_format_event[i] = [];
                for (var e = 0; e < this.cal_cel[i].length; e++) {

                    var this_date = null;
                    var this_dw = null;
                    var this_dwd = null;
                    var this_holiday = false;

                    if (this.cal_cel[i][e] != '') {

                        var td_ob = new Date(
                            this.cal_date.getFullYear(),
                            this.cal_date.getMonth(),
                            this.cal_cel[i][e]
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
                        if (typeof this.cal_days_event[this_date] != 'undefined') {
                            for(ev in this.cal_days_event[this_date]) {

                                //set event order class
                                this.cal_days_event[this_date][ev].event_class = 'zsh-cal-ev-' + e;

                                //set day between
                                var btw_class = 'zsh-cal-btw-0';
                                if (this.cal_days_event[this_date][ev].start_date != this.cal_days_event[this_date][ev].end_date) {
                                    var sDy = new Date(this.cal_days_event[this_date][ev].start_date);
                                    var eDy = new Date(this.cal_days_event[this_date][ev].end_date);
                                    var termDay = Math.ceil((eDy - sDy) / 86400000);
                                    if (this_dw == 0) {
                                        if (this.cal_firstDay == 1 && termDay >= 1) {
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
                                            btw_class = 'zsh-cal-btw-' + (termDay + this.cal_firstDay);
                                        } else {
                                            btw_class = 'zsh-cal-btw-' + (termDay + 1);
                                        }
                                    }
                                }
                                this.cal_days_event[this_date][ev].btw_class = btw_class;

                                this.cal_format_event[i].push(this.cal_days_event[this_date][ev]);
                                this_event.push(this.cal_days_event[this_date][ev]);
                            } 
                        }
                    }

                    this.cal_data[i].push({
                        day: this.cal_cel[i][e],
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
            
            this.cal_header = [];
            
            var h_ar = ['日', '月', '火', '水', '木', '金', '土'];
            if (this.cal_firstDay == 1) {
                h_ar = ['月', '火', '水', '木', '金', '土', '日'];
            }
            
            for (var i = 0; i < h_ar.length; i++) {
                var holiday = false;
                if (h_ar[i] == '土' || h_ar[i] == '日') {
                    holiday = true;
                }
                this.cal_header.push({
                    display: h_ar[i],
                    holiday: holiday
                });
            }
        },
        setDateDisplay: function() {
            var date_m = ('0' + (this.cal_date.getMonth() + 1)).slice(-2);
            this.cal_date_display = this.cal_date.getFullYear() + '年' + date_m + '月';
        },
        calPrev: function() {
            this.cal_date.setMonth(this.cal_date.getMonth() - 1);
            this.setCalendar();
        },
        calNext: function() {
            this.cal_date.setMonth(this.cal_date.getMonth() + 1);
            this.setCalendar();
        },
        calToday: function() {
            this.cal_date = new Date
            this.setCalendar();
        }
    },
    created: function() {
        var now = new Date;
        this.cal_today = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    }
}