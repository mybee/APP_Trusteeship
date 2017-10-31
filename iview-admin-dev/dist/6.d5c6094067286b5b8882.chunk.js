webpackJsonp([6],{700:function(e,t,a){a(791);var o=a(37)(a(840),a(757),"data-v-5f0f2458",null);o.options.__file="/Users/mac/Desktop/iview-admin-dev/src/views/tables/exportable-table.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] exportable-table.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},757:function(e,t,a){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("Row",[a("Card",[a("h4",{attrs:{slot:"title"},slot:"title"},[a("Icon",{attrs:{type:"android-archive"}}),e._v("\n                导出表格数据到 .Csv 文件\n            ")],1),e._v(" "),a("Row",[a("Col",{attrs:{span:"18"}},[a("Table",{ref:"tableCsv",attrs:{columns:e.columnsCsv,data:e.csvData,size:"small"}})],1),e._v(" "),a("Col",{staticClass:"padding-left-10",attrs:{span:"6"}},[a("div",{staticClass:"exportable-table-download-con1"},[a("span",{staticStyle:{"margin-right":"16px"}},[a("Button",{attrs:{type:"primary",size:"large"},on:{click:function(t){e.exportData(1)}}},[a("Icon",{attrs:{type:"ios-download-outline"}}),e._v(" 导出原始数据")],1)],1),e._v(" "),a("Button",{attrs:{type:"primary",size:"large"},on:{click:function(t){e.exportData(2)}}},[a("Icon",{attrs:{type:"ios-download-outline"}}),e._v(" 导出排序和过滤后的数据")],1)],1),e._v(" "),a("div",{staticClass:"exportable-table-download-con2"},[a("div",[a("span",[e._v("选取行范围： ")]),a("InputNumber",{attrs:{min:1,max:e.selectMaxRow},model:{value:e.selectMinRow,callback:function(t){e.selectMinRow=t},expression:"selectMinRow"}}),e._v(" "),a("span",[e._v("  -  ")]),e._v(" "),a("InputNumber",{attrs:{min:e.selectMinRow,max:e.rowNum},model:{value:e.selectMaxRow,callback:function(t){e.selectMaxRow=t},expression:"selectMaxRow"}})],1),e._v(" "),a("div",{staticClass:"margin-top-10"},[a("span",[e._v("选取列范围： ")]),a("InputNumber",{attrs:{min:1,max:e.selectMaxCol},model:{value:e.selectMinCol,callback:function(t){e.selectMinCol=t},expression:"selectMinCol"}}),e._v(" "),a("span",[e._v("  -  ")]),e._v(" "),a("InputNumber",{attrs:{min:e.selectMinCol,max:e.colNum},model:{value:e.selectMaxCol,callback:function(t){e.selectMaxCol=t},expression:"selectMaxCol"}})],1),e._v(" "),a("div",{staticClass:"margin-top-10"},[a("span",[e._v("输入文件名：")]),e._v(" "),a("Input",{staticStyle:{width:"190px"},attrs:{icon:"document",placeholder:"请输入文件名"},model:{value:e.csvFileName,callback:function(t){e.csvFileName=t},expression:"csvFileName"}})],1),e._v(" "),a("div",{staticClass:"margin-top-20"},[a("Button",{attrs:{type:"primary",size:"large"},on:{click:function(t){e.exportData(3)}}},[a("Icon",{attrs:{type:"ios-download-outline"}}),e._v(" 导出自定义数据")],1)],1)])])],1)],1)],1),e._v(" "),a("Row",{staticClass:"margin-top-10"},[a("Card",[a("h4",{attrs:{slot:"title"},slot:"title"},[a("Icon",{attrs:{type:"android-archive"}}),e._v("\n                导出表格数据到 .Xls 文件 (Excel)\n            ")],1),e._v(" "),a("Row",[a("Col",{attrs:{span:"18"}},[a("Table",{ref:"tableExcel",attrs:{columns:e.excelColumns,height:"390px",data:e.table2excelData,size:"small"}})],1),e._v(" "),a("Col",{staticClass:"padding-left-10",attrs:{span:"6"}},[a("div",{staticClass:"margin-top-10 margin-left-10"},[a("span",[e._v("输入文件名：")]),e._v(" "),a("Input",{staticStyle:{width:"190px"},attrs:{icon:"document",placeholder:"请输入文件名"},model:{value:e.excelFileName,callback:function(t){e.excelFileName=t},expression:"excelFileName"}})],1),e._v(" "),a("div",{staticClass:"margin-left-10 margin-top-20"},[a("a",{staticStyle:{postion:"absolute",left:"-10px",top:"-10px",width:"0px",height:"0px"},attrs:{id:"hrefToExportTable"}}),e._v(" "),a("Button",{attrs:{type:"primary",size:"large"},on:{click:e.exportExcel}},[e._v("下载表格数据")])],1)])],1)],1)],1)],1)},staticRenderFns:[]},e.exports.render._withStripped=!0},791:function(e,t){},840:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a(846),l=a(847),n=a(842),i=function(e){return e&&e.__esModule?e:{default:e}}(n);t.default={data:function(){return{columnsCsv:o.csvColumns,csvData:o.table2csvData,table2excelData:l.table2excelData,excelColumns:l.excelColumns,rowNum:o.table2csvData.length,colNum:o.csvColumns.length,selectMinRow:1,selectMaxRow:o.table2csvData.length,selectMinCol:1,selectMaxCol:o.csvColumns.length,maxRow:0,minRow:1,maxCol:0,minCol:1,csvFileName:"",excelFileName:"",tableExcel:{},fontSize:16}},methods:{exportData:function(e){var t=this;1===e?this.$refs.tableCsv.exportCsv({filename:"原始数据"}):2===e?this.$refs.tableCsv.exportCsv({filename:"排序和过滤后的数据",original:!1}):3===e&&this.$refs.tableCsv.exportCsv({filename:this.csvFileName,columns:this.columnsCsv.filter(function(e,a){return a>=t.selectMinCol-1&&a<=t.selectMaxCol-1}),data:this.csvData.filter(function(e,a){return a>=t.selectMinRow-1&&a<=t.selectMaxRow-1})})},exportExcel:function(){i.default.transform(this.$refs.tableExcel,"hrefToExportTable",this.excelFileName)}}}},842:function(e,t,a){"use strict";function o(){var e=window.navigator.userAgent;return e.indexOf("MSIE")>=0?"ie":e.indexOf("Firefox")>=0?"Firefox":e.indexOf("Chrome")>=0?"Chrome":e.indexOf("Opera")>=0?"Opera":e.indexOf("Safari")>=0?"Safari":void 0}function l(e,t,a){var l=e.$children[0].$el,s=e.$children[1].$el,d="<thead><tr>";if(1!==e.$children.length){for(var m=s.rows.length,v=-1;v<m;)-1===v?((0,r.default)(l.rows[0].children).forEach(function(e){d=d+"<th>"+e.children[0].children[0].innerHTML+"</th>"}),d+="</tr><thead><tbody>"):(d+="<tr>",(0,r.default)(s.rows[v].children).forEach(function(e){d=d+"<td>"+e.children[0].children[0].innerHTML+"</td>"}),d+="</tr>"),v++;d+="</tbody>"}if("Safari"!==o()&&".xls"!==a.substr(-1,4)&&(a+=".xls"),"ie"===o()){var u=e,w=new ActiveXObject("Excel.Application"),h=w.Workbooks.Add(),f=h.Worksheets(1),p=document.body.createTextRange();p.moveToElementText(u),p.select(),p.execCommand("Copy"),f.Paste(),w.Visible=!0;try{var y=w.Application.GetSaveAsFilename("Excel.xls","Excel Spreadsheets (*.xls), *.xls")}catch(e){print("Nested catch caught "+e)}finally{h.SaveAs(y),w.Quit(),w=null,i=setInterval(n(),1)}}else c(d,t,a)}function n(){window.clearInterval(i)}Object.defineProperty(t,"__esModule",{value:!0});var i,s=a(143),r=function(e){return e&&e.__esModule?e:{default:e}}(s),c=function(){var e=function(e){return window.btoa(unescape(encodeURIComponent(e)))},t=function(e,t){return e.replace(/{(\w+)}/g,function(e,a){return t[a]})};return function(a,o,l){var n={worksheet:l||"Worksheet",table:a};document.getElementById(o).href="data:application/vnd.ms-excel;base64,"+e(t('<html><head><meta charset="UTF-8"></head><body><table>{table}</table></body></html>',n)),document.getElementById(o).download=l,document.getElementById(o).click()}}(),d={};d.transform=l,t.default=d},846:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.table2csvData=[{name:"推广名称1",fav:0,show:7302,weak:5627,signin:1563,click:4254,active:1438,day7:274,day30:285,tomorrow:1727,day:558,week:4440,month:5610},{name:"推广名称2",fav:0,show:4720,weak:4086,signin:3792,click:8690,active:8470,day7:8172,day30:5197,tomorrow:1684,day:2593,week:2507,month:1537},{name:"推广名称3",fav:0,show:7181,weak:8007,signin:8477,click:1879,active:16,day7:2249,day30:3450,tomorrow:377,day:1561,week:3219,month:1588},{name:"推广名称4",fav:0,show:9911,weak:8976,signin:8807,click:8050,active:7668,day7:1547,day30:2357,tomorrow:7278,day:5309,week:1655,month:9043},{name:"推广名称5",fav:0,show:934,weak:1394,signin:6463,click:5278,active:9256,day7:209,day30:3563,tomorrow:8285,day:1230,week:4840,month:9908},{name:"推广名称6",fav:0,show:6856,weak:1608,signin:457,click:4949,active:2909,day7:4525,day30:6171,tomorrow:1920,day:1966,week:904,month:6851},{name:"推广名称7",fav:0,show:5107,weak:6407,signin:4166,click:7970,active:1002,day7:8701,day30:9040,tomorrow:7632,day:4061,week:4359,month:3676}],t.csvColumns=[{title:"名称",key:"name",fixed:"left",width:200},{title:"展示",key:"show",width:150,sortable:!0,filters:[{label:"大于4000",value:1},{label:"小于4000",value:2}],filterMultiple:!1,filterMethod:function(e,t){return 1===e?t.show>4e3:2===e?t.show<4e3:void 0}},{title:"唤醒",key:"weak",width:150,sortable:!0},{title:"登录",key:"signin",width:150,sortable:!0},{title:"点击",key:"click",width:150,sortable:!0},{title:"激活",key:"active",width:150,sortable:!0},{title:"7日留存",key:"day7",width:150,sortable:!0},{title:"30日留存",key:"day30",width:150,sortable:!0},{title:"次日留存",key:"tomorrow",width:150,sortable:!0},{title:"日活跃",key:"day",width:150,sortable:!0},{title:"周活跃",key:"week",width:150,sortable:!0},{title:"月活跃",key:"month",width:150,sortable:!0}]},847:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.table2excelData=[{name:"推广名称1",fav:0,show:7302,weak:5627,signin:1563,click:4254,active:1438,day7:274,day30:285,tomorrow:1727,day:558,week:4440,month:5610},{name:"推广名称2",fav:0,show:4720,weak:4086,signin:3792,click:8690,active:8470,day7:8172,day30:5197,tomorrow:1684,day:2593,week:2507,month:1537},{name:"推广名称3",fav:0,show:7181,weak:8007,signin:8477,click:1879,active:16,day7:2249,day30:3450,tomorrow:377,day:1561,week:3219,month:1588},{name:"推广名称4",fav:0,show:9911,weak:8976,signin:8807,click:8050,active:7668,day7:1547,day30:2357,tomorrow:7278,day:5309,week:1655,month:9043},{name:"推广名称5",fav:0,show:934,weak:1394,signin:6463,click:5278,active:9256,day7:209,day30:3563,tomorrow:8285,day:1230,week:4840,month:9908},{name:"推广名称6",fav:0,show:6856,weak:1608,signin:457,click:4949,active:2909,day7:4525,day30:6171,tomorrow:1920,day:1966,week:904,month:6851},{name:"推广名称7",fav:0,show:5107,weak:6407,signin:4166,click:7970,active:1002,day7:8701,day30:9040,tomorrow:7632,day:4061,week:4359,month:3676},{name:"推广名称8",fav:0,show:5107,weak:6407,signin:4166,click:7970,active:1002,day7:8701,day30:9040,tomorrow:7632,day:4061,week:4359,month:3676},{name:"推广名称9",fav:0,show:5107,weak:6407,signin:4166,click:7970,active:1002,day7:8701,day30:9040,tomorrow:7632,day:4061,week:4359,month:3676},{name:"推广名称10",fav:0,show:5107,weak:6407,signin:4166,click:7970,active:1002,day7:8701,day30:9040,tomorrow:7632,day:4061,week:4359,month:3676}],t.excelColumns=[{title:"名称",key:"name"},{title:"展示",key:"show",sortable:!0,filters:[{label:"大于4000",value:1},{label:"小于4000",value:2}],filterMultiple:!1,filterMethod:function(e,t){return 1===e?t.show>4e3:2===e?t.show<4e3:void 0}},{title:"唤醒",key:"weak",sortable:!0},{title:"登录",key:"signin",sortable:!0},{title:"点击",key:"click",sortable:!0},{title:"激活",key:"active",sortable:!0},{title:"30日留存",key:"day30",sortable:!0},{title:"月活跃",key:"month",sortable:!0}]}});