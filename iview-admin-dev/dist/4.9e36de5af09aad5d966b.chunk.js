webpackJsonp([4],{685:function(e,t,s){s(745),s(732);var a=s(23)(s(748),s(728),null,null);a.options.__file="/Users/deer_mac/Desktop/APP托管系统/iview-admin-dev/src/views/access/access.vue",a.esModule&&Object.keys(a.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),a.options.functional&&console.error("[vue-loader] access.vue: functional components are not supported with templates, they should use render functions."),e.exports=a.exports},728:function(e,t,s){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"access"},[s("Row",[s("Col",{attrs:{span:"8"}},[s("Card",[s("p",{attrs:{slot:"title"},slot:"title"},[s("Icon",{attrs:{type:"android-contact"}}),e._v("\n                    当前用户\n                ")],1),e._v(" "),s("div",{staticClass:"access-user-con access-current-user-con"},[s("img",{attrs:{src:e.avatorPath,alt:""}}),e._v(" "),s("p",[e._v("当前用户权限值:"),s("b",[e._v(e._s(e.accessCode))])])])])],1),e._v(" "),s("Col",{staticClass:"padding-left-10",attrs:{span:"16"}},[s("Card",[s("p",{attrs:{slot:"title"},slot:"title"},[s("Icon",{attrs:{type:"android-contacts"}}),e._v("\n                    不同权限用户的不同菜单\n                ")],1),e._v(" "),s("div",{staticClass:"access-user-con access-change-access-con"},[s("Col",{attrs:{span:"8"}},[s("Row",{staticClass:"access-change-access-con-row",attrs:{type:"flex",justify:"center",align:"middle"}},[s("i-switch",{attrs:{value:e.switchValue,size:"large"},on:{"on-change":e.changeAccess}})],1)],1),e._v(" "),s("Col",{staticClass:"padding-left-10",attrs:{span:"16"}},[s("Row",{staticClass:"access-change-access-con-row",attrs:{type:"flex",justify:"center",align:"middle"}},[s("p",[e._v("您可以通过左侧的开关来切换当前用户的权限值，然后您可以观察左侧菜单栏的变化，如果当前用户的权限值是"),s("b",[e._v(" 0 ")]),e._v("，则左侧菜单栏会显示’权限测试页‘这一项('权限测试页'只用于测试，点击不会跳转)。")])])],1)],1)])],1)],1)],1)},staticRenderFns:[]},e.exports.render._withStripped=!0},732:function(e,t){},745:function(e,t){},748:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s(45),c=function(e){return e&&e.__esModule?e:{default:e}}(a);t.default={data:function(){return{accessCode:parseInt(c.default.get("access")),switchValue:1===parseInt(c.default.get("access"))}},computed:{avatorPath:function(){return localStorage.avatorImgPath}},methods:{changeAccess:function(e){e?(this.accessCode=1,c.default.set("access",1)):(this.accessCode=0,c.default.set("access",0)),this.$store.commit("updateMenulist")}}}}});