(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[19],{"4b86":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"q-pa-md flex justify-center",staticStyle:{width:"100%"},attrs:{id:"news"}},[a("div",{staticClass:"q-gutter-y-md width"},[a("q-tabs",{staticClass:"bg-white",staticStyle:{color:"#56C6BF"},attrs:{"inline-label":"","indicator-color":"secondary","active-color":"secondary",breakpoint:0,align:"justify"},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[a("q-tab",{staticClass:"tab_border",attrs:{name:"all",label:"全部"}}),t.$q.screen.gt.sm?a("q-tab",{staticClass:"tab_border",attrs:{name:"new",label:"新聞"}}):t._e(),t.$q.screen.gt.sm?a("q-tab",{staticClass:"tab_border",attrs:{name:"even",label:"活動"}}):t._e(),t.$q.screen.gt.sm?a("q-tab",{staticClass:"tab_border",attrs:{name:"exhibition",label:"展覽"}}):t._e(),t.$q.screen.gt.sm?a("q-tab",{staticClass:"tab_border",attrs:{name:"adopt",label:"領養"}}):t._e(),t.$q.screen.gt.sm?a("q-tab",{staticClass:"tab_border",attrs:{name:"lost",label:"走失"}}):t._e(),t.$q.screen.gt.sm?a("q-tab",{staticClass:"tab_border",attrs:{name:"stray",label:"浪浪"}}):t._e(),t.$q.screen.lt.md?a("q-btn-dropdown",{attrs:{"auto-close":"",stretch:"",label:"更多分類"}},[a("q-list",[a("q-item",{attrs:{clickable:""},on:{click:function(e){t.tab="new"}}},[a("q-item-section",[t._v("新聞")])],1),a("q-item",{attrs:{clickable:""},on:{click:function(e){t.tab="even"}}},[a("q-item-section",[t._v("活動")])],1),a("q-item",{attrs:{clickable:""},on:{click:function(e){t.tab="exhibition"}}},[a("q-item-section",[t._v("展覽")])],1),a("q-item",{attrs:{clickable:""},on:{click:function(e){t.tab="adopt"}}},[a("q-item-section",[t._v("領養")])],1),a("q-item",{attrs:{clickable:""},on:{click:function(e){t.tab="lost"}}},[a("q-item-section",[t._v("走失")])],1),a("q-item",{attrs:{clickable:""},on:{click:function(e){t.tab="stray"}}},[a("q-item-section",[t._v("浪浪")])],1),a("q-item",{attrs:{clickable:""},on:{click:function(e){t.tab="all"}}},[a("q-item-section",[t._v("全部")])],1)],1)],1):t._e()],1),a("q-tab-panels",{attrs:{animated:""},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[a("q-tab-panel",{staticClass:"news_table",attrs:{name:"all"}},[a("div",{staticClass:"flex flex-center"},t._l(t.news,(function(e){return a("div",{key:e._id,staticClass:"flex row q-layout-container flex-center news_row",attrs:{value:e}},[a("div",{staticClass:"col-2 type_cube",style:t.getCubeBG(e.type)},[a("div",[t._v(t._s(e.type))])]),a("div",{staticClass:"col-7 table_title"},[a("q-item",{attrs:{to:"/news/"+e._id}},[t._v(t._s(e.title))])],1),a("div",{staticClass:"col-2 table_date"},[t._v("\n              "+t._s(new Date(e.date).toLocaleString())+"\n            ")])])})),0)]),a("q-tab-panel",{attrs:{name:"new"}},[a("div",{staticClass:"flex flex-center"},t._l(t.newNews,(function(e){return a("div",{key:e._id,staticClass:"flex row q-layout-container flex-center news_row",attrs:{value:e}},[a("div",{staticClass:"col-2 type_cube",style:t.getCubeBG(e.type)},[a("div",[t._v(t._s(e.type))])]),a("div",{staticClass:"col-7 table_title"},[a("q-item",{attrs:{to:"/news/"+e._id}},[t._v(t._s(e.title))])],1),a("div",{staticClass:"col-2 table_date"},[t._v("\n              "+t._s(new Date(e.date).toLocaleString())+"\n            ")])])})),0)]),a("q-tab-panel",{attrs:{name:"even"}},[a("div",{staticClass:"flex flex-center"},t._l(t.evenNews,(function(e){return a("div",{key:e._id,staticClass:"flex row q-layout-container flex-center news_row",attrs:{value:e}},[a("div",{staticClass:"col-2 type_cube",style:t.getCubeBG(e.type)},[a("div",[t._v(t._s(e.type))])]),a("div",{staticClass:"col-7 table_title"},[a("q-item",{attrs:{to:"/news/"+e._id}},[t._v(t._s(e.title))])],1),a("div",{staticClass:"col-2 table_date"},[t._v("\n              "+t._s(new Date(e.date).toLocaleString())+"\n            ")])])})),0)]),a("q-tab-panel",{attrs:{name:"exhibition"}},[a("div",{staticClass:"flex flex-center"},t._l(t.exhibitionNews,(function(e){return a("div",{key:e._id,staticClass:"flex row q-layout-container flex-center news_row",attrs:{value:e}},[a("div",{staticClass:"col-2 type_cube",style:t.getCubeBG(e.type)},[a("div",[t._v(t._s(e.type))])]),a("div",{staticClass:"col-7 table_title"},[a("q-item",{attrs:{to:"/news/"+e._id}},[t._v(t._s(e.title))])],1),a("div",{staticClass:"col-2 table_date"},[t._v("\n              "+t._s(new Date(e.date).toLocaleString())+"\n            ")])])})),0)]),a("q-tab-panel",{attrs:{name:"adopt"}},[a("div",{staticClass:"flex flex-center"},t._l(t.adoptNews,(function(e){return a("div",{key:e._id,staticClass:"flex row q-layout-container flex-center news_row",attrs:{value:e}},[a("div",{staticClass:"col-2 type_cube",style:t.getCubeBG(e.type)},[a("div",[t._v(t._s(e.type))])]),a("div",{staticClass:"col-7 table_title"},[a("q-item",{attrs:{to:"/news/"+e._id}},[t._v(t._s(e.title))])],1),a("div",{staticClass:"col-2 table_date"},[t._v("\n              "+t._s(new Date(e.date).toLocaleString())+"\n            ")])])})),0)]),a("q-tab-panel",{attrs:{name:"lost"}},[a("div",{staticClass:"flex flex-center"},t._l(t.lostNews,(function(e){return a("div",{key:e._id,staticClass:"flex row q-layout-container flex-center news_row",attrs:{value:e}},[a("div",{staticClass:"col-2 type_cube",style:t.getCubeBG(e.type)},[a("div",[t._v(t._s(e.type))])]),a("div",{staticClass:"col-7 table_title"},[a("q-item",{attrs:{to:"/news/"+e._id}},[t._v(t._s(e.title))])],1),a("div",{staticClass:"col-2 table_date"},[t._v("\n              "+t._s(new Date(e.date).toLocaleString())+"\n            ")])])})),0)]),a("q-tab-panel",{attrs:{name:"stray"}},[a("div",{staticClass:"flex flex-center"},t._l(t.strayNews,(function(e){return a("div",{key:e._id,staticClass:"flex row q-layout-container flex-center news_row",attrs:{value:e}},[a("div",{staticClass:"col-2 type_cube",style:t.getCubeBG(e.type)},[a("div",[t._v(t._s(e.type))])]),a("div",{staticClass:"col-7 table_title"},[a("q-item",{attrs:{to:"/news/"+e._id}},[t._v(t._s(e.title))])],1),a("div",{staticClass:"col-2 table_date"},[t._v("\n              "+t._s(new Date(e.date).toLocaleString())+"\n            ")])])})),0)])],1)],1)])},l=[],i=(a("26e9"),a("e6cf"),{data(){return{tab:"all",key:!1,news:[],newNews:[],evenNews:[],exhibitionNews:[],adoptNews:[],lostNews:[],strayNews:[]}},methods:{getCubeBG(t){let e="";switch(t){case"新聞快訊":e="#C2B593";break;case"活動消息":e="#56C6BF";break;case"展覽資訊":e="#548E9B";break;case"愛心領養":e="#A9486B";break;case"走失情報":e="#E8D38B";break;case"流浪動物":e="#B4B4B4";break}return{background:e}}},async mounted(){await this.axios.get("https://petcle.herokuapp.com/news/").then((t=>{t.data.success?(this.news=t.data.result.reverse(),this.news=t.data.result.map((t=>(t.src="https://petcle.herokuapp.com/news/file/"+t.file,t)))):this.$swal.fire({icon:"error",title:"錯誤",confirmButtonColor:"#C2B593",iconColor:"#8d2430",border:"none"})})).catch((t=>{console.log(t)})),this.newNews=this.news.filter((t=>"新聞快訊"===t.type)),this.evenNews=this.news.filter((t=>"活動消息"===t.type)),this.exhibitionNews=this.news.filter((t=>"展覽資訊"===t.type)),this.adoptNews=this.news.filter((t=>"愛心領養"===t.type)),this.lostNews=this.news.filter((t=>"走失情報"===t.type)),this.strayNews=this.news.filter((t=>"流浪動物"===t.type))}}),n=i,c=a("2877"),o=a("429b"),r=a("7460"),b=a("f20b"),d=a("1c1c"),_=a("66e5"),v=a("4074"),w=a("adad"),u=a("823b"),y=a("4d5a"),f=a("eebe"),p=a.n(f),C=Object(c["a"])(n,s,l,!1,null,null,null);e["default"]=C.exports;p()(C,"components",{QTabs:o["a"],QTab:r["a"],QBtnDropdown:b["a"],QList:d["a"],QItem:_["a"],QItemSection:v["a"],QTabPanels:w["a"],QTabPanel:u["a"],QLayout:y["a"]})}}]);