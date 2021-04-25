(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[14],{"41ad":function(e,t,o){"use strict";o.r(t);var l=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("q-page",{staticStyle:{padding:"1rem"},attrs:{id:"admin_new"}},[o("q-layout-container",[o("q-table",{attrs:{data:e.news,columns:e.titles,"row-key":"name","rows-per-page-option":[5,7,10],filter:e.filter},scopedSlots:e._u([{key:"body",fn:function(t){return[o("q-tr",{attrs:{props:t}},[o("q-td",{key:"type"},[t.row.edit?o("q-input",{attrs:{outlined:"",filled:""},model:{value:t.row.modelType,callback:function(o){e.$set(t.row,"modelType",o)},expression:"newss.row.modelType"}}):o("p",[e._v(e._s(t.row.type))])],1),o("q-td",{key:"title"},[t.row.edit?o("q-input",{attrs:{outlined:"",filled:""},model:{value:t.row.modelTitle,callback:function(o){e.$set(t.row,"modelTitle",o)},expression:"newss.row.modelTitle"}}):o("p",[e._v(e._s(t.row.title))])],1),o("q-td",{key:"description",staticClass:"long-text",on:{click:function(o){return e.moreinfo(t.row.description,t.row.edit,t.row.title)}}},[t.row.edit?o("q-input",{attrs:{outlined:"",filled:"",type:"textarea"},model:{value:t.row.modelDescription,callback:function(o){e.$set(t.row,"modelDescription",o)},expression:"newss.row.modelDescription"}}):o("p",[e._v(e._s(t.row.description))])],1),o("q-td",{key:"date"},[e._v("\n            "+e._s(new Date(t.row.date).toLocaleString())+"\n          ")]),o("q-td",{key:"actions"},[t.row.edit?e._e():o("q-btn",{staticClass:"mr-1",attrs:{round:"",icon:"edit",color:"primary",size:"0.7rem"},on:{click:function(o){return e.edit(t)}}}),t.row.edit?e._e():o("q-btn",{attrs:{round:"",icon:"delete_forever",color:"negative",size:"0.7rem"},on:{click:function(o){return e.del(t)}}}),t.row.edit?o("q-btn",{staticClass:"mr-1",attrs:{round:"",icon:"save",color:"secondary",size:"0.7rem"},on:{click:function(o){return e.save(t)}}}):e._e(),t.row.edit?o("q-btn",{attrs:{round:"",icon:"cancel",color:"accent",size:"0.7rem"},on:{click:function(o){return e.cancel(t)}}}):e._e()],1)],1)]}},{key:"top-left",fn:function(){return[o("h6",{staticClass:"adminTitle",staticStyle:{width:"85px"}},[e._v("最新消息")]),o("q-btn",{attrs:{icon:"add",color:"primary"},on:{click:function(t){e.uploadNew=!0}}},[e._v("新增消息")])]},proxy:!0},{key:"top-right",fn:function(){return[o("q-input",{attrs:{borderless:"",dense:"",debounce:"300",placeholder:"請輸入關鍵字"},scopedSlots:e._u([{key:"append",fn:function(){return[o("q-icon",{attrs:{name:"search"}})]},proxy:!0}]),model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}})]},proxy:!0}])})],1),o("q-dialog",{model:{value:e.uploadNew,callback:function(t){e.uploadNew=t},expression:"uploadNew"}},[o("q-card",{staticClass:"flex row",attrs:{id:"adminnew_dialog"}},[o("div",{staticClass:"col-12 flex flex-center bg-grey-8",staticStyle:{height:"15%"}},[o("p",{staticClass:"upload_title"},[e._v("新增消息")])]),o("div",{staticClass:"col-12 flex flex-center cloumn",staticStyle:{height:"80%"}},[o("q-form",{staticStyle:{width:"80%"},on:{submit:e.addNew,reset:e.restNew}},[o("q-file",{staticStyle:{"margin-bottom":"1rem"},attrs:{filled:"","bottom-slots":"",counter:"",label:"選擇檔案"},scopedSlots:e._u([{key:"prepend",fn:function(){return[o("q-icon",{attrs:{name:"cloud_upload"},on:{click:function(e){e.stopPropagation()}}})]},proxy:!0},{key:"append",fn:function(){return[o("q-icon",{staticClass:"cursor-pointer",attrs:{name:"close"},on:{click:function(t){t.stopPropagation(),e.model=null}}})]},proxy:!0},{key:"hint",fn:function(){return[e._v("\n              *僅接受jpeg、png格式，且檔案不超過1KB\n            ")]},proxy:!0}]),model:{value:e.newFile,callback:function(t){e.newFile=t},expression:"newFile"}}),o("div",{staticClass:"flex row justify-between",staticStyle:{"margin-bottom":"1rem"}},[o("q-input",{staticClass:"col-12",attrs:{filled:"",label:"標題"},model:{value:e.modelTitle,callback:function(t){e.modelTitle=t},expression:"modelTitle"}})],1),o("select",{directives:[{name:"model",rawName:"v-model",value:e.modelType,expression:"modelType"}],staticClass:"col-12 ULanimaltype_bp",attrs:{placeholder:"請選擇分類"},on:{change:function(t){var o=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.modelType=t.target.multiple?o:o[0]}}},[o("option",{attrs:{value:"",disabled:"",selected:""}},[e._v("請選擇分類")]),e._l(e.types,(function(t){return o("option",{key:t,domProps:{value:t}},[e._v(e._s(t))])}))],2),o("q-input",{attrs:{filled:"",clearable:"",type:"textarea",label:"活動說明文字"},model:{value:e.modelDescription,callback:function(t){e.modelDescription=t},expression:"modelDescription"}}),o("div",{staticClass:"login-btn flex flex-center"},[o("q-btn",{staticStyle:{"margin-right":"1rem",width:"80px"},attrs:{rounded:"",label:"上傳",type:"submit",color:"primary",size:"1.1rem"}}),o("q-btn",{staticStyle:{width:"80px"},attrs:{rounded:"",label:"重置",type:"reset",color:"accent",size:"1.1rem"}})],1)],1)],1),o("q-icon",{staticClass:"absolute",attrs:{name:"cancel",size:"40px",color:"white"},on:{click:function(t){e.uploadNew=!1}}})],1)],1)],1)},i=[],a=(o("e01a"),o("a434"),{data(){return{filter:"",news:[],newFile:null,modelTitle:"",modelDescription:"",modelType:"",titles:[{name:"type",required:!0,label:"分類",align:"left",field:"type",format:e=>`${e}`,sortable:!0},{name:"title",align:"left",label:"主題",field:"title",sortable:!0},{name:"description",align:"left",label:"活動說明",field:"description",sortable:!0},{name:"date",align:"left",label:"發佈時間",field:"date"},{name:"actions",label:"編輯",align:"left"}],uploadNew:!1,types:["新聞快訊","活動消息","展覽資訊","愛心領養","走失情報","流浪動物"]}},methods:{moreinfo(e,t,o){t||this.$q.dialog({message:e,title:o})},edit(e){e.row.edit=!0,e.row.modelType=e.row.type,e.row.modelTitle=e.row.title,e.row.modelDescription=e.row.description},save(e){this.axios.patch("https://petcle.herokuapp.com/news/"+e.row._id,{title:e.row.modelTitle,description:e.row.modelDescription,type:e.row.modelType}).then((t=>{t.data.success?(e.row.edit=!1,e.row.title=e.row.modelTitle,e.row.description=e.row.modelDescription,e.row.type=e.row.modelType,alert("保存成功")):alert(t.data.message)})).catch((e=>{console.log(e)}))},del(e){this.axios.delete("https://petcle.herokuapp.com/news/"+e.row._id).then((t=>{t.data.success?(this.news.splice(e.rowIndex,1),alert("刪除成功")):alert(t.data.message)})).catch((e=>{console.log(e)}))},cancel(e){e.row.edit=!1,e.row.model=e.row.description},addNew(){if(this.newFile.size>1048576)alert("圖片太大");else if(this.newFile.type.includes("image")){const e=new FormData;e.append("file",this.newFile),e.append("title",this.modelTitle),e.append("description",this.modelDescription),e.append("type",this.modelType),this.axios.post("https://petcle.herokuapp.com/news/",e).then((e=>{console.log(e.data),e.data.success?(e.data.result.file="https://petcle.herokuapp.com/photos/file/"+e.data.result.file,e.data.result.model=e.data.result.description,e.data.result.edit=!1,this.news.push(e.data.result),this.newFile=null,this.modelTitle="",this.modelDescription="",this.modelType="",this.uploadNew=!1):alert("上傳錯誤")}))}else alert("檔案格式錯誤")},restNew(){this.newFile=null,this.modelTitle="",this.modelDescription="",this.modelType=""}},mounted(){this.axios.get("https://petcle.herokuapp.com/news/").then((e=>{e.data.success?this.news=e.data.result.map((e=>(e.src="https://petcle.herokuapp.com/news/"+e.file,e.modelT=e.title,e.modelD=e.description,e.edit=!1,e))):alert("錯誤")})).catch((e=>{console.log(e)}))}}),n=a,s=o("2877"),r=o("9989"),c=o("4d5a"),d=o("eaac"),p=o("bd08"),u=o("db86"),m=o("27f9"),w=o("9c40"),f=o("0016"),y=o("24e8"),h=o("f09f"),b=o("0378"),g=o("7d53"),k=o("eebe"),v=o.n(k),x=Object(s["a"])(n,l,i,!1,null,null,null);t["default"]=x.exports;v()(x,"components",{QPage:r["a"],QLayout:c["a"],QTable:d["a"],QTr:p["a"],QTd:u["a"],QInput:m["a"],QBtn:w["a"],QIcon:f["a"],QDialog:y["a"],QCard:h["a"],QForm:b["a"],QFile:g["a"]})}}]);