(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[15],{6150:function(e,t,i){"use strict";i.r(t);var o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("q-page",{staticStyle:{padding:"1rem"},attrs:{id:"admin_new"}},[i("q-layout-container",[i("q-table",{attrs:{data:e.pedias,columns:e.titles,"row-key":"name","rows-per-page-option":[5,7,10],filter:e.filter},scopedSlots:e._u([{key:"body",fn:function(t){return[i("q-tr",{attrs:{props:t}},[i("q-td",{key:"type"},[t.row.edit?i("q-input",{attrs:{outlined:"",filled:""},model:{value:t.row.modelType,callback:function(i){e.$set(t.row,"modelType",i)},expression:"pedia.row.modelType"}}):i("p",[e._v(e._s(t.row.type))])],1),i("q-td",{key:"title"},[t.row.edit?i("q-input",{attrs:{outlined:"",filled:""},model:{value:t.row.modelTitle,callback:function(i){e.$set(t.row,"modelTitle",i)},expression:"pedia.row.modelTitle"}}):i("p",[e._v(e._s(t.row.title))])],1),i("q-td",{key:"description",staticClass:"long-text",on:{click:function(i){return e.moreinfo(t.row.description,t.row.edit,t.row.title)}}},[t.row.edit?i("q-input",{attrs:{outlined:"",filled:"",type:"textarea"},model:{value:t.row.modelDescription,callback:function(i){e.$set(t.row,"modelDescription",i)},expression:"pedia.row.modelDescription"}}):i("p",[e._v(e._s(t.row.description))])],1),i("q-td",{key:"date"},[e._v("\n            "+e._s(new Date(t.row.date).toLocaleString())+"\n          ")]),i("q-td",{key:"actions"},[t.row.edit?e._e():i("q-btn",{staticClass:"mr-1",attrs:{round:"",icon:"edit",color:"primary",size:"0.7rem"},on:{click:function(i){return e.edit(t)}}}),t.row.edit?e._e():i("q-btn",{attrs:{round:"",icon:"delete_forever",color:"negative",size:"0.7rem"},on:{click:function(i){return e.del(t)}}}),t.row.edit?i("q-btn",{staticClass:"mr-1",attrs:{round:"",icon:"save",color:"secondary",size:"0.7rem"},on:{click:function(i){return e.save(t)}}}):e._e(),t.row.edit?i("q-btn",{attrs:{round:"",icon:"cancel",color:"accent",size:"0.7rem"},on:{click:function(i){return e.cancel(t)}}}):e._e()],1)],1)]}},{key:"top-left",fn:function(){return[i("h6",{staticClass:"adminTitle",staticStyle:{width:"85px"}},[e._v("寵物百科")]),i("q-btn",{attrs:{icon:"add",color:"primary"},on:{click:function(t){e.uploadPedia=!0}}},[e._v("新增文章")])]},proxy:!0},{key:"top-right",fn:function(){return[i("q-input",{attrs:{borderless:"",dense:"",debounce:"300",placeholder:"請輸入關鍵字"},scopedSlots:e._u([{key:"append",fn:function(){return[i("q-icon",{attrs:{name:"search"}})]},proxy:!0}]),model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}})]},proxy:!0}])})],1),i("q-dialog",{model:{value:e.uploadPedia,callback:function(t){e.uploadPedia=t},expression:"uploadPedia"}},[i("q-card",{staticClass:"flex row",attrs:{id:"adminnew_dialog"}},[i("div",{staticClass:"col-12 flex flex-center bg-grey-8",staticStyle:{height:"15%"}},[i("p",{staticClass:"upload_title"},[e._v("新增文章")])]),i("div",{staticClass:"col-12 flex flex-center cloumn",staticStyle:{height:"80%"}},[i("q-form",{staticStyle:{width:"80%"},on:{submit:e.addPedia,reset:e.restPedia}},[i("q-file",{staticStyle:{"margin-bottom":"1rem"},attrs:{filled:"","bottom-slots":"",counter:"",label:"選擇檔案"},scopedSlots:e._u([{key:"prepend",fn:function(){return[i("q-icon",{attrs:{name:"cloud_upload"},on:{click:function(e){e.stopPropagation()}}})]},proxy:!0},{key:"append",fn:function(){return[i("q-icon",{staticClass:"cursor-pointer",attrs:{name:"close"},on:{click:function(t){t.stopPropagation(),e.model=null}}})]},proxy:!0},{key:"hint",fn:function(){return[e._v("\n              *僅接受jpeg、png格式，且檔案不超過1KB\n            ")]},proxy:!0}]),model:{value:e.pediaFile,callback:function(t){e.pediaFile=t},expression:"pediaFile"}}),i("div",{staticClass:"flex row justify-between",staticStyle:{"margin-bottom":"1rem"}},[i("q-input",{staticClass:"col-12",attrs:{filled:"",label:"標題"},model:{value:e.modelTitle,callback:function(t){e.modelTitle=t},expression:"modelTitle"}})],1),i("select",{directives:[{name:"model",rawName:"v-model",value:e.modelType,expression:"modelType"}],staticClass:"col-12 ULanimaltype_bp",attrs:{placeholder:"請選擇分類"},on:{change:function(t){var i=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.modelType=t.target.multiple?i:i[0]}}},[i("option",{attrs:{value:"",disabled:"",selected:""}},[e._v("請選擇分類")]),e._l(e.types,(function(t){return i("option",{key:t,domProps:{value:t}},[e._v(e._s(t))])}))],2),i("q-input",{attrs:{filled:"",clearable:"",type:"textarea",label:"活動說明文字"},model:{value:e.modelDescription,callback:function(t){e.modelDescription=t},expression:"modelDescription"}}),i("div",{staticClass:"login-btn flex flex-center"},[i("q-btn",{staticStyle:{"margin-right":"1rem",width:"80px"},attrs:{rounded:"",label:"上傳",type:"submit",color:"primary",size:"1.1rem"}}),i("q-btn",{staticStyle:{width:"80px"},attrs:{rounded:"",label:"重置",type:"reset",color:"accent",size:"1.1rem"}})],1)],1)],1),i("q-icon",{staticClass:"absolute",attrs:{name:"cancel",size:"40px",color:"white"},on:{click:function(t){e.uploadPedia=!1}}})],1)],1)],1)},l=[],a=(i("e01a"),i("a434"),{data(){return{filter:"",pedias:[],pediaFile:null,modelTitle:"",modelDescription:"",modelType:"",titles:[{name:"type",required:!0,label:"分類",align:"left",field:"type",format:e=>`${e}`,sortable:!0},{name:"title",align:"left",label:"主題",field:"title",sortable:!0},{name:"description",align:"left",label:"活動說明",field:"description",sortable:!0},{name:"date",align:"left",label:"發佈時間",field:"date"},{name:"actions",label:"編輯",align:"left"}],uploadPedia:!1,types:["健康知識","寵物飲食","生活觀察","美容保養"]}},methods:{moreinfo(e,t,i){t||this.$q.dialog({message:e,title:i})},edit(e){e.row.edit=!0,e.row.modelType=e.row.type,e.row.modelTitle=e.row.title,e.row.modelDescription=e.row.description},save(e){this.axios.patch("https://petcle.herokuapp.com/pedias/"+e.row._id,{title:e.row.modelTitle,description:e.row.modelDescription,type:e.row.modelType}).then((t=>{t.data.success?(e.row.edit=!1,e.row.title=e.row.modelTitle,e.row.description=e.row.modelDescription,e.row.type=e.row.modelType,alert("保存成功")):alert(t.data.message)})).catch((e=>{console.log(e)}))},del(e){this.axios.delete("https://petcle.herokuapp.com/pedias/"+e.row._id).then((t=>{t.data.success?(this.pedias.splice(e.rowIndex,1),alert("刪除成功")):alert(t.data.message)})).catch((e=>{console.log(e)}))},cancel(e){e.row.edit=!1,e.row.model=e.row.description},addPedia(){if(this.pediaFile.size>1048576)alert("圖片太大");else if(this.pediaFile.type.includes("image")){const e=new FormData;e.append("file",this.pediaFile),e.append("title",this.modelTitle),e.append("description",this.modelDescription),e.append("type",this.modelType),this.axios.post("https://petcle.herokuapp.com/pedias/",e).then((e=>{console.log(e.data),e.data.success?(e.data.result.file="https://petcle.herokuapp.com/photos/file/"+e.data.result.file,e.data.result.model=e.data.result.description,e.data.result.edit=!1,this.pedias.push(e.data.result),this.pediaFile=null,this.modelTitle="",this.modelDescription="",this.modelType="",this.uploadPedia=!1):alert("上傳錯誤")}))}else alert("檔案格式錯誤")},restPedia(){this.pediaFile=null,this.modelTitle="",this.modelDescription="",this.modelType=""}},mounted(){this.axios.get("https://petcle.herokuapp.com/pedias/").then((e=>{e.data.success?this.pedias=e.data.result.map((e=>(e.src="https://petcle.herokuapp.com/pedias/"+e.file,e.modelT=e.title,e.modelD=e.description,e.edit=!1,e))):alert("錯誤")})).catch((e=>{console.log(e)}))}}),r=a,s=i("2877"),n=i("9989"),d=i("4d5a"),c=i("eaac"),p=i("bd08"),u=i("db86"),m=i("27f9"),f=i("9c40"),y=i("0016"),w=i("24e8"),h=i("f09f"),b=i("0378"),g=i("7d53"),k=i("eebe"),v=i.n(k),x=Object(s["a"])(r,o,l,!1,null,null,null);t["default"]=x.exports;v()(x,"components",{QPage:n["a"],QLayout:d["a"],QTable:c["a"],QTr:p["a"],QTd:u["a"],QInput:m["a"],QBtn:f["a"],QIcon:y["a"],QDialog:w["a"],QCard:h["a"],QForm:b["a"],QFile:g["a"]})}}]);