(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[2],{"8b24":function(t,e,o){"use strict";o.r(e);var s=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("q-page",{attrs:{id:"index"}},[o("q-page-container",{staticStyle:{padding:"50px 0 100px 0"}},[o("div",{staticClass:"row justify-center",staticStyle:{"margin-bottom":"0.3rem","margin-top":"1.5rem"}},[o("div",{staticClass:"col-xs-10 col-md-8 col-lg-6",staticStyle:{"margin-top":"20px"}},[o("q-input",{attrs:{borderless:"",dense:"",debounce:"300"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.filterPhoto()}},scopedSlots:t._u([{key:"append",fn:function(){return[o("q-icon",{attrs:{id:"search-icon",name:"search"}})]},proxy:!0}]),model:{value:t.filtermodel,callback:function(e){t.filtermodel=e},expression:"filtermodel"}},[o("q-btn",{attrs:{rounded:"",id:"search-btn",type:"submit"},on:{click:function(e){return t.filterPhoto()}}},[t._v("搜尋")])],1)],1),o("q-btn",{staticClass:"col-xs-10 col-md-8 col-lg-1 random_btn",staticStyle:{"margin-top":"1.2rem"},attrs:{rounded:""},on:{click:function(e){return t.random()}}},[o("q-icon",{staticStyle:{"margin-right":"0.5rem"},attrs:{name:"help_outline",size:"1.2rem"}}),t._v("隨機療癒")],1)],1),o("q-page-container",{staticClass:"flex flex-center page"},[o("div",{staticClass:"row fit wrap items-start"},t._l(t.filteredphoto,(function(e,s){return o("div",{key:e._id,staticClass:"col-xs-6 col-sm-6 col-md-4 col-lg-3 q-pa-sm",attrs:{value:e}},[o("q-card",{staticClass:"my-card"},[o("img",{attrs:{src:e.src}}),o("div",{staticClass:"absolute-bottom-right"},[!1===e.star?o("q-btn",{attrs:{flat:"",round:"",color:"white",icon:"star"},on:{click:function(o){return t.like(e)}}}):o("q-btn",{attrs:{flat:"",round:"",color:"red-9",icon:"star"},on:{click:function(e){return t.del(s)}}})],1)]),o("div",{staticClass:"flex justify-end",staticStyle:{"padding-top":"5px"}},[o("q-chip",{attrs:{color:"primary","text-color":"white"}},[t._v(t._s(e.animal))]),o("q-chip",[t._v(t._s(e.breed))])],1)],1)})),0)]),o("q-dialog",{model:{value:t.randomCard,callback:function(e){t.randomCard=e},expression:"randomCard"}},[o("q-card",{staticClass:"column pet_card"},[o("q-card-section",{staticClass:"row justify-end q-pb-none"},[o("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{icon:"close",round:"",dense:"",color:"primary"}})],1),o("q-card-section",{staticClass:"photoBox"},[o("img",{staticClass:"photo",attrs:{src:t.photos[t.rand].src}})]),o("q-card-section",[o("div",[o("q-chip",{attrs:{color:"primary","text-color":"white"}},[t._v("\n              "+t._s(t.photos[t.rand].animal)+"\n            ")]),o("q-chip",{attrs:{color:"accent","text-color":"white"}},[t._v("\n              "+t._s(t.photos[t.rand].breed)+"\n            ")])],1)]),o("q-card-section",{staticStyle:{margin:"0 0 1rem 0.5rem"}},[o("div",[t._v("\n            "+t._s(t.photos[t.rand].description)+"\n          ")]),o("div",{staticClass:"absolute-bottom-right",staticStyle:{"margin-right":"1rem"}},[!1===t.photos[t.rand].star?o("q-btn",{attrs:{flat:"",round:"",color:"negative",icon:"star_border"},on:{click:function(e){return t.like_rand(t.photos[t.rand])}}}):o("q-btn",{attrs:{flat:"",round:"",color:"red-9",icon:"star"},on:{click:function(e){return t.del(t.rand)}}})],1)])],1)],1)],1)],1)},r=[],a=(o("e01a"),o("26e9"),o("e6cf"),{name:"PageIndex",data(){return{model:"依熱門程度排序",options:[{label:"依熱門程度排序",value:"hot"},{label:"依時間新到舊",value:"time-new-first"},{label:"依時間舊到新",value:"time-old-first"}],photos:[],animals:[],newPhotos:[],filter:"",filtermodel:"",randomCard:!1,rand:0,ranPhoto:[]}},methods:{like(t){if(""===this.user.account)this.$swal.fire({icon:"error",title:"儲存失敗",text:"請先登入會員",confirmButtonColor:"#C2B593"});else{const e=this.photos.findIndex((e=>e._id===t._id));console.log(e),this.photos[e].star=!0,this.$store.commit("like",t)}this.$forceUpdate()},like_rand(t){if(""===this.user.account)this.$swal.fire({icon:"error",title:"儲存失敗",text:"請先登入會員",confirmButtonColor:"#C2B593"});else{const e=this.photos.findIndex((e=>e._id===t._id));console.log(e),t.star=!0,this.$store.commit("like",t)}this.$forceUpdate()},del(t){const e=this.photos[t];this.photo[e].star=!1,this.$store.commit("delPhoto",t),this.$forceUpdate()},filterPhoto(t){this.filter=this.filtermodel},random(){this.randomCard=!0;const t=(t,e)=>Math.round(Math.random()*(e-t))+t;this.rand=t(0,this.photos.length)},addAlbum(t){void 0===this.user.account?this.$swal.fire({icon:"error",title:"錯誤",text:"請先登入會員",confirmButtonColor:"#C2B593",iconColor:"#8d2430"}):this.axios.patch("https://petcle.herokuapp.com/users/album/"+t._id).then((e=>{e.data.success&&(t.star=!0)})).catch((t=>{console.log(t)}))}},computed:{user(){return this.$store.state.user},redStar(){return this.$store.getters.stars},filteredphoto(){return this.photos.filter((t=>{const e=this.filter.toUpperCase();return!!t.animal.toString().toUpperCase().includes(e)||(!!t.breed.toString().toUpperCase().includes(e)||!!t.bodypart.toString().toUpperCase().includes(e))}))}},async mounted(){await this.axios.get("https://petcle.herokuapp.com/photos/").then((t=>{t.data.success?(this.photos=t.data.result.reverse(),this.photos=t.data.result.map((t=>(t.src="https://petcle.herokuapp.com/photos/file/"+t.file,t.des=t.description,t.breed=t.breeds,t.bodypart=t.bodyparts,t.star=!1,delete t.breeds,delete t.bodyparts,t)))):this.$swal.fire({icon:"error",title:"錯誤",confirmButtonColor:"#C2B593",iconColor:"#8d2430"})})).catch((t=>{console.log(t)})),await this.photos.map((t=>{this.axios.get("https://petcle.herokuapp.com/photos/breeds/"+t._id).then((e=>{t.breed=e.data.breed.name})).catch((t=>{console.log(t)})),this.axios.get("https://petcle.herokuapp.com/photos/bodyparts/"+t._id).then((e=>{t.bodypart=e.data.body.name})).catch((t=>{console.log(t)})),this.axios.get("https://petcle.herokuapp.com/photos/animals/"+t._id).then((e=>{t.animal=e.data.animal})).catch((t=>{console.log(t)}))})),this.redStar.forEach((t=>{const e=this.photos.find((e=>t._id===e._id));e.star=!0})),this.axios.get("https://petcle.herokuapp.com/animals/").then((t=>{t.data.success?this.animals=t.data.result:this.$swal.fire({icon:"error",title:"錯誤",confirmButtonColor:"#C2B593",iconColor:"#8d2430"})})).catch((t=>{console.log(t)}))}}),i=a,n=o("2877"),c=o("9989"),l=o("09e3"),d=o("27f9"),p=o("0016"),h=o("ddd8"),u=o("66e5"),m=o("4074"),f=o("0170"),b=o("9c40"),g=o("f09f"),C=o("b047"),_=o("24e8"),x=o("a370"),y=o("7f67"),k=o("eebe"),v=o.n(k),q=Object(n["a"])(i,s,r,!1,null,null,null);e["default"]=q.exports;v()(q,"components",{QPage:c["a"],QPageContainer:l["a"],QInput:d["a"],QIcon:p["a"],QSelect:h["a"],QItem:u["a"],QItemSection:m["a"],QItemLabel:f["a"],QBtn:b["a"],QCard:g["a"],QChip:C["a"],QDialog:_["a"],QCardSection:x["a"]}),v()(q,"directives",{ClosePopup:y["a"]})}}]);