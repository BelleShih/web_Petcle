(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[17],{cb2c:function(e,t,o){"use strict";o.r(t);var a=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("q-page",{staticStyle:{padding:"1rem"},attrs:{id:"admin_new"}},[o("q-layout-container",[o("q-table",{attrs:{data:e.pets,columns:e.titles,"row-key":"name","rows-per-page-option":[10,15,20],filter:e.filter},scopedSlots:e._u([{key:"body",fn:function(t){return[o("q-tr",{attrs:{props:t}},[o("q-td",{key:"file"},[o("img",{staticStyle:{height:"60px"},attrs:{src:t.row.src}})]),o("q-td",{key:"name"},[t.row.edit?o("q-input",{attrs:{outlined:"",filled:""},model:{value:t.row.modelName,callback:function(o){e.$set(t.row,"modelName",o)},expression:"pet.row.modelName"}}):o("p",[e._v(e._s(t.row.name))])],1),o("q-td",{key:"animal"},[t.row.edit?o("q-input",{attrs:{outlined:"",filled:""},model:{value:t.row.modelAnimal,callback:function(o){e.$set(t.row,"modelAnimal",o)},expression:"pet.row.modelAnimal"}}):o("p",[e._v(e._s(t.row.animal))])],1),o("q-td",{key:"breed"},[t.row.edit?o("q-input",{attrs:{outlined:"",filled:"",type:"textarea"},model:{value:t.row.modelBreed,callback:function(o){e.$set(t.row,"modelBreed",o)},expression:"pet.row.modelBreed"}}):o("p",[e._v(e._s(t.row.breed))])],1),o("q-td",{key:"description"},[t.row.edit?o("q-input",{attrs:{outlined:"",filled:"",type:"textarea"},model:{value:t.row.modelDes,callback:function(o){e.$set(t.row,"modelDes",o)},expression:"pet.row.modelDes"}}):o("p",[e._v(e._s(t.row.description))])],1),o("q-td",{key:"actions"},[t.row.edit?e._e():o("q-btn",{staticClass:"mr-1",attrs:{round:"",icon:"edit",color:"primary",size:"0.7rem"},on:{click:function(o){return e.edit(t)}}}),t.row.edit?e._e():o("q-btn",{attrs:{round:"",icon:"delete_forever",color:"negative",size:"0.7rem"},on:{click:function(o){return e.del(t)}}}),t.row.edit?o("q-btn",{staticClass:"mr-1",attrs:{round:"",icon:"save",color:"secondary",size:"0.7rem"},on:{click:function(o){return e.save(t)}}}):e._e(),t.row.edit?o("q-btn",{attrs:{round:"",icon:"cancel",color:"accent",size:"0.7rem"},on:{click:function(o){return e.cancel(t)}}}):e._e()],1)],1)]}},{key:"top-left",fn:function(){return[o("h6",{staticClass:"adminTitle"},[e._v("寵物管理")]),o("q-btn",{staticStyle:{width:"40px"},attrs:{rounded:"",icon:"arrow_back",color:"primary",to:{name:"admin.member"}}})]},proxy:!0},{key:"top-right",fn:function(){return[o("q-input",{attrs:{borderless:"",dense:"",debounce:"300",placeholder:"請輸入關鍵字"},scopedSlots:e._u([{key:"append",fn:function(){return[o("q-icon",{attrs:{name:"search"}})]},proxy:!0}]),model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}})]},proxy:!0}])})],1)],1)},r=[],l=(o("e01a"),o("a434"),{data(){return{filter:"",pets:[],pet:[],modelName:"",modelAnimal:"",modelBreed:"",modelBody:"",modelDes:"",titles:[{name:"file",required:!0,label:"大頭照",align:"left",field:"file",format:e=>`${e}`,sortable:!0},{name:"name",required:!0,label:"名字",align:"left",field:"name",format:e=>`${e}`,sortable:!0},{name:"animal",align:"left",label:"種類",field:"animal",sortable:!0},{name:"breed",align:"left",label:"品種",field:"breed",sortable:!0},{name:"description",align:"left",label:"關於我",field:"description",sortable:!0},{name:"actions",label:"編輯",align:"left"}]}},methods:{edit(e){e.row.edit=!0,e.row.modelName=e.row.name,e.row.modelAnimal=e.row.animal,e.row.modelBreed=e.row.breed,e.row.modelDes=e.row.description},save(e){this.axios.patch("https://petcle.herokuapp.com/pets/"+e.row._id,{name:e.row.modelName,animal:e.row.modelAnimal,breed:e.row.modelBreed,description:e.row.modelDes}).then((t=>{t.data.success?(e.row.edit=!1,e.name=e.row.modelName,e.animal=e.row.modeAnimal,e.breed=e.row.modelBreed,e.description=e.row.modelDes,alert("保存成功")):alert(t.data.message)})).catch((e=>{console.log(e)}))},del(e){this.axios.delete("https://petcle.herokuapp.com/pets/"+e.row._id).then((t=>{t.data.success?(this.pets.splice(e.rowIndex,1),alert("刪除成功")):alert(t.data.message)})).catch((e=>{console.log(e)}))},cancel(e){e.row.edit=!1,e.modelName=e.name,e.modeAnimal=e.animal,e.modelBreed=e.breed,e.modelDes=e.description}},mounted(){this.axios.get("https://petcle.herokuapp.com/pets/"+this.$route.params.id).then((e=>{console.log(e),e.data.success?this.pets=[e.data.result].map((e=>(e.src="https://petcle.herokuapp.com/pets/file/"+e.file,e.modelName=e.name,e.modeAnimal=e.animal,e.modelBreed=e.breed,e.modelDes=e.description,e.edit=!1,e))):alert("錯誤")})).catch((e=>{console.log(e)}))}}),n=l,i=o("2877"),d=o("9989"),s=o("4d5a"),c=o("eaac"),m=o("bd08"),p=o("db86"),u=o("27f9"),w=o("9c40"),f=o("0016"),b=o("eebe"),h=o.n(b),k=Object(i["a"])(n,a,r,!1,null,null,null);t["default"]=k.exports;h()(k,"components",{QPage:d["a"],QLayout:s["a"],QTable:c["a"],QTr:m["a"],QTd:p["a"],QInput:u["a"],QBtn:w["a"],QIcon:f["a"]})}}]);