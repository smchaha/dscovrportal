"use strict";angular.module("dscovrDataApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ui.bootstrap"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/vis/:type?/:arg?/:argg?",{templateUrl:"views/vis.html",controller:"VisCtrl"}).when("/download/:type?/:arg?/:argg?",{templateUrl:"views/download.html",controller:"DownloadCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("dscovrDataApp").controller("MainCtrl",["$scope","$location","$anchorScroll",function(a,b,c){a.scrollTo=function(a){b.hash(a),c()}}]),angular.module("dscovrDataApp").controller("NavCtrl",["$scope","$location",function(a,b){a.isActive=function(a){return a===b.path().split("/")[1]}}]),angular.module("dscovrDataApp").controller("VisCtrl",["$scope","$routeParams","$cookieStore","$location",function(a,b,c,d){a.mission_start=moment.utc("12-12-1995","DD-MM-YYYY"),a.mission_end=moment.utc("12-12-2015","DD-MM-YYYY");var e=moment.range(a.mission_start,a.mission_end);if(a.make_urldate=function(a){return moment.utc(a).toDate().getTime()/1e5},a.parse_urldate=function(a){return moment.utc(1e5*a)},a.summary_frame_info={"6h":{dt:864e5,src:"/dscovr_6hr_plots/{{year}}/{{month}}/{{year}}{{month}}{{day}}{{hour}}-6hr.png"},"1d":{dt:864e5,src:"/dscovr_1day_plots/{{year}}/{{month}}/{{year}}{{month}}{{day}}-day.png"},"3d":{dt:2592e5,src:"/dscovr_3day_plots/{{year}}/{{year}}{{month}}{{day}}-3day.png"},"7d":{dt:6048e5,src:"/dscovr_7day_plots/{{year}}/{{year}}{{month}}{{day}}-7day.png"},"1m":{dt:24192e5,src:"/dscovr_month_plots/{{year}}/{{year}}{{month}}-month.png"}},"interactive"==b.type)a.selectmode=1;else{if("summary"!=b.type)return void d.url("/vis/summary/7d");switch(a.selectmode=0,b.arg){case"6h":case"1d":case"3d":case"7d":case"1m":a.frame_size=b.arg,a.summary_date=moment.utc().subtract(1,"days"),b.argg&&e.contains(a.parse_urldate(b.argg))&&(a.summary_date=a.parse_urldate(b.argg)),a.timestring=a.make_urldate(a.summary_date),a.selected_date=a.summary_date.format("YYYY-MM-DD"),"3d"==a.frame_size||"7d"==a.frame_size?a.summary_file_date=moment.utc(a.mission_start.toDate().getTime()+a.summary_frame_info[a.frame_size].dt*Math.floor((moment.utc(a.selected_date).toDate().getTime()-a.mission_start.toDate().getTime())/a.summary_frame_info[a.frame_size].dt)):"1d"==a.frame_size||"6h"==a.frame_size?a.summary_file_date=moment.utc(a.selected_date).startOf("day"):"1m"==a.frame_size&&(a.summary_file_date=moment.utc(a.selected_date).startOf("month")),a.summary_file_date_prev=moment.utc(a.summary_file_date).subtract(a.summary_frame_info[a.frame_size].dt,"ms"),a.summary_file_date_end=moment.utc(a.summary_file_date).add(a.summary_frame_info[a.frame_size].dt,"ms"),a.summary_file_date_next=moment.utc(a.summary_file_date).add(2*a.summary_frame_info[a.frame_size].dt,"ms");break;default:return void d.url("/vis/summary/7d")}}a.dateselect_onchange=function(){1==a.datepicker_opened&&a.dateselect_locationchange()},a.dateselect_locationchange=function(){if(a.selected_date){var c=moment(a.selected_date);d.url("/vis/summary/"+b.arg+"/"+a.make_urldate(c))}},a.datepicker_open=function(b){b.preventDefault(),b.stopPropagation(),a.datepicker_opened=!0},a.get_plotsrc=function(){console.log(a.summary_file_date);var b=a.summary_frame_info[a.frame_size].src;return b=b.split("{{year}}").join(a.summary_file_date.format("YYYY")),b=b.split("{{month}}").join(a.summary_file_date.format("MM")),b=b.split("{{day}}").join(a.summary_file_date.format("DD"))},a.get_plotsrc_6h=function(b){console.log(a.summary_file_date);var c=a.summary_frame_info[a.frame_size].src;return c=c.split("{{year}}").join(a.summary_file_date.format("YYYY")),c=c.split("{{month}}").join(a.summary_file_date.format("MM")),c=c.split("{{day}}").join(a.summary_file_date.format("DD")),c=c.split("{{hour}}").join(10>b?"0"+b:b)}}]),angular.module("dscovrDataApp").controller("DownloadCtrl",["$scope","$routeParams","$cookieStore","$location",function(a,b,c,d){a.mission_start=moment.utc("12-12-1995","DD-MM-YYYY"),a.mission_end=moment.utc("12-12-2015","DD-MM-YYYY");var e=moment.range(a.mission_start,a.mission_end);if(a.testData={20150401:{att:"http://www.ngdc.noaa.gov/dscovr/files/2015/04/it_vc0_dscovr_s20150401000000_e20150401235959_p20150402000010_pub.nc.gz"},20150402:{att:"http://www.ngdc.noaa.gov/dscovr/files/2015/04/it_vc1_dscovr_s20150402000000_e20150402235959_p20150403000010_pub.nc.gz",f1m:"http://www.ngdc.noaa.gov/dscovr/files/2015/04/it_vc0_dscovr_s20150402000000_e20150402235959_p20150403000010_pub.nc.gz"},20150403:{att:"http://www.ngdc.noaa.gov/dscovr/files/2015/04/it_vc0_dscovr_s20150403000000_e20150403235959_p20150404000059_pub.nc.gz",f1m:"http://www.ngdc.noaa.gov/dscovr/files/2015/04/it_vc1_dscovr_s20150403000000_e20150403235959_p20150404000059_pub.nc.gz"}},a.download_data_type=[{type:"mg1",selected:!0,desc:"Magnetometer L1 data"},{type:"fc1",selected:!0,desc:"Faraday Cup L1 data"},{type:"m1s",selected:!0,desc:"Magnetometer 1 second"},{type:"f3s",selected:!0,desc:"Faraday Cup 3 second"},{type:"m1m",selected:!0,desc:"Magnetometer 1 minute average"},{type:"f1m",selected:!0,desc:"Faraday Cup 1 minute average"},{type:"pop",selected:!0,desc:"Predicted Orbit Product"},{type:"mgc",selected:!0,desc:"Magnetometer Calibration"},{type:"fcc",selected:!0,desc:"Faraday Cup Calibration"},{type:"tmd",selected:!0,desc:"Telemetry Database"},{type:"att",selected:!0,desc:"Spacecraft Attitude"}],a.download_dayfile_info={typea:"/dscovr_data/typea/{{year}}/{{month}}/{{year}}{{month}}{{day}}-day.nc",typeb:"/dscovr_data/typeb/{{year}}/{{month}}/{{year}}{{month}}{{day}}-day.nc",typec:"/dscovr_data/typec/{{year}}/{{month}}/{{year}}{{month}}{{day}}-day.nc",typed:"/dscovr_data/typed/{{year}}/{{month}}/{{year}}{{month}}{{day}}-day.nc",typee:"/dscovr_data/typee/{{year}}/{{month}}/{{year}}{{month}}{{day}}-day.nc"},a.make_urldate=function(a){return moment.utc(a).startOf("day").toDate().getTime()/1e5},a.parse_urldate=function(a){return moment.utc(1e5*a)},a.make_filedates=function(){if(a.selected_start_date&&a.selected_end_date)if(e.contains(moment(a.selected_start_date))&&e.contains(moment(a.selected_end_date)))if(moment(a.selected_start_date).isBefore(a.selected_end_date)){a.error_message="";var b=moment().range(a.selected_start_date,moment.utc(a.selected_end_date));a.filedates=[],b.by("days",function(b){a.filedates.push(b),console.log("iterating, lookat me!!")})}else a.error_message="Make sure end date is after start date";else a.error_message="Begin and/or end date is not during mission"},"tape"==b.type)a.selectmode=1;else{if("file"!=b.type)return void d.url("/download/file");if(a.selectmode=0,a.start_date=moment.utc().subtract(2,"days").startOf("day"),b.arg&&e.contains(a.parse_urldate(b.arg))&&(a.start_date=a.parse_urldate(b.arg)),a.end_date=moment(a.start_date).add(1,"days"),!b.argg||!e.contains(a.parse_urldate(b.argg)))return void d.url("/download/file/"+a.make_urldate(a.start_date)+"/"+a.make_urldate(a.end_date));a.end_date=a.parse_urldate(b.argg),a.selected_start_date=a.start_date.format("YYYY-MM-DD"),a.selected_end_date=a.end_date.format("YYYY-MM-DD"),a.make_filedates()}a.dateselect_start_onchange=function(){1==a.datepicker_start_opened&&a.dateselect_start_locationchange()},a.dateselect_start_locationchange=function(){d.url("/download/file/"+a.make_urldate(a.selected_start_date)+"/"+a.make_urldate(a.selected_end_date))},a.datepicker_start_open=function(b){b.preventDefault(),b.stopPropagation(),a.datepicker_start_opened=!0},a.dateselect_end_onchange=function(){1==a.datepicker_end_opened&&a.dateselect_end_locationchange()},a.dateselect_end_locationchange=function(){d.url("/download/file/"+a.make_urldate(a.selected_start_date)+"/"+a.make_urldate(a.selected_end_date))},a.datepicker_end_open=function(b){b.preventDefault(),b.stopPropagation(),a.datepicker_end_opened=!0},a.format_srcdate=function(a,b){return a=a.split("{{year}}").join(b.format("YYYY")),a=a.split("{{month}}").join(b.format("MM")),a=a.split("{{day}}").join(b.format("DD"))},$("data-type-name").tooltip()}]);