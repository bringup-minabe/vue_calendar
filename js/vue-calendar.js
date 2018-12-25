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
        cal_data: [],
        w_names: ['日', '月', '火', '水', '木', '金', '土'],
        cal_event: [],
        cal_row_events: {},
        cal_header: [],
        cal_today: '',
        cal_guid_ev: {},
        cal_guid_ev_date: {},
        cal_more_title: '',
        cal_more: []
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
            this.cal_guid_ev = {};
            this.cal_guid_ev_date = {};
            for (var i = 0; i < this.cal_event.length; i++) {

                if (typeof this.cal_event[i].start_date == "undefined") {
                    continue;
                }

                //set guid
                this.cal_event[i].guid = this.guid();

                //set between flag
                this.cal_event[i].between = 0;

                //set event date ar
                var this_start_date = this.cal_event[i].start_date;
                if (typeof this.cal_guid_ev_date[this_start_date]  == "undefined") {
                    this.cal_guid_ev_date[this_start_date] = [];
                }
                
                this.cal_guid_ev[this.cal_event[i].guid] = this.cal_event[i];
                this.cal_guid_ev_date[this_start_date].push(this.cal_event[i].guid);

                //set between date
                if (
                    typeof this.cal_event[i].start_date != "undefined" && 
                    typeof this.cal_event[i].end_date != "undefined"
                ) {
                    var tob_start_date = new Date(this.cal_event[i].start_date);
                    var tob_end_date = new Date(this.cal_event[i].end_date);
                    if (tob_end_date.getTime() > tob_start_date.getTime()) {
                        this.cal_event[i].between = 1;
                        tob_start_date.setDate(tob_start_date.getDate() + 1);
                        var btw_fl = true;
                        while (btw_fl) {
                            var btw_date = tob_start_date.getFullYear() + '-' + (tob_start_date.getMonth() + 1) + '-' + tob_start_date.getDate();
                            if (typeof this.cal_guid_ev_date[btw_date]  == "undefined") {
                                this.cal_guid_ev_date[btw_date] = [];
                            }
                            if (this.cal_guid_ev_date[btw_date].indexOf(this.cal_event[i].guid) == -1) {
                                this.cal_guid_ev_date[btw_date].push(this.cal_event[i].guid);
                            }
                            tob_start_date.setDate(tob_start_date.getDate() + 1);
                            if (tob_end_date.getTime() < tob_start_date.getTime()) {
                                btw_fl = false;
                            }
                        }
                    }
                }
            }
        },
        setCalendarData: function() {
            this.cal_data = [];
            for (var i = 0; i < this.cal_cel.length; i++) {
                this.cal_data[i] = [];
                this.cal_row_events[i] = {};
                for (var e = 0; e < this.cal_cel[i].length; e++) {

                    this.cal_row_events[i][e] = [];

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

                        var this_row_event = [];
                        if (typeof this.cal_guid_ev_date[this_date] != 'undefined') {
                            var this_zinex = 0;
                            var tmp_ev = this.cal_guid_ev_date[this_date];
                            var cal_guid_ev = this.cal_guid_ev;
                            var cal_row_events = this.cal_row_events;
                            var cal_firstDay = this.cal_firstDay;
                            tmp_ev.forEach(function(tre_guid, index) {
                                
                                // var tre_guid_obj = cal_guid_ev[tre_guid];
                                var tre_guid_obj = Vue.util.extend({}, cal_guid_ev[tre_guid]);

                                //format start date
                                if (tre_guid_obj.start_date < this_date) {
                                    tre_guid_obj.start_date = this_date;
                                }

                                //set day between
                                var btw_class = 'zsh-cal-btw-0';
                                if (tre_guid_obj.start_date != tre_guid_obj.end_date) {
                                    var sDy = new Date(tre_guid_obj.start_date);
                                    var eDy = new Date(tre_guid_obj.end_date);
                                    var termDay = Math.ceil((eDy - sDy) / 86400000);
                                    if (this_dw == 0) {
                                        if (cal_firstDay == 1 && termDay >= 1) {
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
                                            btw_class = 'zsh-cal-btw-' + (termDay + cal_firstDay);
                                        } else {
                                            btw_class = 'zsh-cal-btw-' + (termDay + 1);
                                        }
                                    }
                                }
                                tre_guid_obj.btw_class = btw_class;

                                tre_guid_obj.event_class = 'zsh-cal-ev-' + e;

                                tre_guid_obj.zindex = this_zinex;
                                this_zinex = this_zinex + 1;
                                cal_row_events[i][e].push(tre_guid_obj);
                            })
                            this.cal_row_events = cal_row_events;
                        }
                    }

                    this.cal_data[i].push({
                        day: this.cal_cel[i][e],
                        date: this_date,
                        dw: this_dw,
                        dwd: this_dwd,
                        holiday: this_holiday
                    });
                }
            }

            //sort event
            for (var rei = 0; rei < Object.keys(this.cal_row_events).length; rei++) {
                for (var i = 0; i <  Object.keys(this.cal_row_events[rei]).length; i++) {
                    if (this.cal_row_events[rei][i].length > 0) {
                        this.cal_row_events[rei][i].sort(function(a,b) {
                            if(a.between > b.between) return -1;
                            if(a.between < b.between) return 1;
                            if(a.zindex < b.zindex) return -1;
                            if(a.zindex > b.zindex) return 1;
                            return 0;
                        });
                    }
                }
            }

            //set event style zindex
            for (var rei = 0; rei < Object.keys(this.cal_row_events).length; rei++) {
                for (var i = 0; i <  Object.keys(this.cal_row_events[rei]).length; i++) {
                    if (this.cal_row_events[rei][i].length > 0) {
                        var rei_cnt = 0;
                        for (var e = 0; e < this.cal_row_events[rei][i].length; e++) {
                            this.cal_row_events[rei][i][e]['s_zindex'] = rei_cnt;
                            rei_cnt = rei_cnt + 1;
                        }
                    }
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
        },
        calMore: function(event) {
            console.log(event);
            var md_date = new Date(event.srcElement.dataset.date);
            this.cal_more_title = md_date.getFullYear() + '年' + (md_date.getMonth() + 1) + '月' + md_date.getDate() + '日';

            var row = event.srcElement.dataset.row;
            var day = event.srcElement.dataset.day;

            this.cal_more = this.cal_row_events[row][day];

            $('#zsh-cal-more').modal();
        }
    },
    created: function() {
        var now = new Date;
        this.cal_today = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    }
}