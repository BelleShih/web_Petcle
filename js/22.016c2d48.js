(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[22],{"9ea3":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-page",{attrs:{id:"pediaContent"}},[s("div",{staticClass:"container flex-center"},[s("div",{staticClass:"column flex-center",staticStyle:{"margin-top":"3rem"}},[s("div",{staticClass:"flex flex-center box"},[s("img",{staticClass:"object-fit",attrs:{src:t.pedias.src}})]),s("div",{staticClass:"width"},[s("p",{staticClass:"title"},[t._v(t._s(t.pedias.title))]),s("div",{staticClass:"row",staticStyle:{"padding-top":"1rem"}},[s("div",{staticClass:"col-5 date"},[t._v(t._s(new Date(t.pedias.date).toDateString()))]),s("div",{staticClass:"col-3 type"},[t._v(t._s(t.pedias.type))])]),s("div",{staticClass:"col-8 line",staticStyle:{"margin-top":"1rem"}})]),s("div",{staticClass:"flex flex-center width"},[s("p",{staticClass:"text",domProps:{innerHTML:t._s(t.html(t.pedias.description))}})]),s("div",{staticClass:"line",staticStyle:{"margin-bottom":"2rem"}}),s("q-btn",{attrs:{icon:"expand_less",color:"primary",to:{name:"front.pedia"}}},[t._v("回到寵物百科")])],1)])])},i=[],r=(s("5319"),{data(){return{pedias:{}}},mounted(){this.axios.get("https://petcle.herokuapp.com/pedias/"+this.$route.params.id).then((t=>{console.log(this.$route.params.id),t.data.success?(this.pedias=t.data.result,this.pedias.src="https://petcle.herokuapp.com/pedias/file/"+this.pedias.file):this.$swal.fire({icon:"error",title:"錯誤",confirmButtonColor:"#C2B593",iconColor:"#8d2430",border:"none"})})).catch((t=>{alert(t.response.data.message)}))},methods:{html(t){return t.replace(/\n/g,"<br>").replace(/(https?:\/\/[\w-.]+(:\d+)?(\/[\w/.]*)?(\?\S*)?(#\S*)?)/g,'<a href="$1" target="_blank" >$1</a>')}}}),l=r,c=s("2877"),n=s("9989"),o=s("9c40"),d=s("eebe"),p=s.n(d),m=Object(c["a"])(l,a,i,!1,null,null,null);e["default"]=m.exports;p()(m,"components",{QPage:n["a"],QBtn:o["a"]})}}]);