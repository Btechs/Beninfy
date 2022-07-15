"use strict";(self.webpackChunkadmin_panel=self.webpackChunkadmin_panel||[]).push([[432],{2535:(q,g,r)=>{r.d(g,{d:()=>m});var z=r(7157),i=r(5e3);let m=(()=>{class l{constructor(u){this.gql=u}resolve(u,h){return this.gql.fetch({id:u.params.id})}}return l.\u0275fac=function(u){return new(u||l)(i.LFG(z.kd6))},l.\u0275prov=i.Yz7({token:l,factory:l.\u0275fac}),l})()},1432:(q,g,r)=>{r.r(g),r.d(g,{RequestsModule:()=>P});var z=r(4534),i=r(9826),m=r(2535),l=r(7157),t=r(5e3),u=r(9827);let h=(()=>{class e{constructor(n,o){this.paging=n,this.gql=o}resolve(n,o){const s=this.paging.deserializeQueryParams(n.queryParams);return this.gql.fetch(s)}}return e.\u0275fac=function(n){return new(n||e)(t.LFG(u.w),t.LFG(l.bqW))},e.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac}),e})();var R=r(3266),C=r(4004),f=r(1062),Z=r(1740),c=r(9808),L=r(285),v=r(1235),A=r(3075),O=r(4138),y=r(5540),x=r(7036),d=r(7336),F=r(6771);function M(e,a){if(1&e&&(t.TgZ(0,"tr"),t.TgZ(1,"td"),t._uU(2),t.ALo(3,"date"),t.qZA(),t.TgZ(4,"td"),t._uU(5),t.ALo(6,"currency"),t.qZA(),t.TgZ(7,"td"),t.TgZ(8,"nz-tag",12),t._uU(9),t.ALo(10,"translate"),t.qZA(),t.qZA(),t.TgZ(11,"td"),t.TgZ(12,"a",13),t._uU(13),t.ALo(14,"translate"),t.qZA(),t.qZA(),t.qZA()),2&e){const n=a.$implicit,o=t.oxw(2);t.xp6(2),t.Oqu(t.xi3(3,6,n.createdOn,"short")),t.xp6(3),t.Oqu(t.xi3(6,9,n.costAfterCoupon,n.currency)),t.xp6(3),t.Q6J("nzColor",o.tagColor.orderStatus(n.status)),t.xp6(1),t.Oqu(t.lcZ(10,12,"enum.request."+n.status)),t.xp6(3),t.Q6J("routerLink","view/"+n.id),t.xp6(1),t.Oqu(t.lcZ(14,14,"profile.view"))}}function S(e,a){if(1&e){const n=t.EpF();t.TgZ(0,"nz-table",8,9),t.NdJ("nzQueryParams",function(s){return t.CHM(n),t.oxw().tableService.onTableQueryParamsChange(s)}),t.TgZ(2,"thead"),t.TgZ(3,"tr"),t.TgZ(4,"th"),t._uU(5),t.ALo(6,"translate"),t.qZA(),t.TgZ(7,"th"),t._uU(8),t.ALo(9,"translate"),t.qZA(),t.TgZ(10,"th",10),t._uU(11),t.ALo(12,"translate"),t.qZA(),t.TgZ(13,"th"),t._uU(14),t.ALo(15,"translate"),t.qZA(),t.qZA(),t.qZA(),t.TgZ(16,"tbody"),t.YNc(17,M,15,16,"tr",11),t.qZA(),t.qZA()}if(2&e){const n=a.ngIf,o=t.MAs(1),s=t.oxw();t.Q6J("nzFrontPagination",!1)("nzData",n.nodes)("nzTotal",n.totalCount),t.xp6(5),t.hij(" ",t.lcZ(6,11,"profile.dateTime")," "),t.xp6(3),t.hij(" ",t.lcZ(9,13,"profile.cost")," "),t.xp6(2),t.Q6J("nzSortFn",!0)("nzFilters",s.statuses)("nzFilterFn",!0),t.xp6(1),t.Oqu(t.lcZ(12,15,"profile.status")),t.xp6(3),t.Oqu(t.lcZ(15,17,"profile.actions")),t.xp6(3),t.Q6J("ngForOf",o.data)}}const J=[{path:"",component:(()=>{class e{constructor(n,o,s,p,Q){this.tagColor=n,this.route=o,this.tableService=s,this.translate=p,this.router=Q,this.statuses=Object.values(l.iFo).map(T=>({value:T,text:this.translate.instant(`enum.request.${T}`)})),this.dateRanges=[]}ngOnInit(){this.query=this.route.data.pipe((0,C.U)(n=>n.orders))}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(R.k),t.Y36(i.gz),t.Y36(u.w),t.Y36(f.sK),t.Y36(i.F0))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-requests-list"]],decls:17,vars:11,consts:[["nzBackIcon","","nzTitle","Requests","nzSubtitle","List of all the order requests",3,"nzGhost"],["nzShowSizeChanger","","nzBordered","",3,"nzFrontPagination","nzData","nzTotal","nzQueryParams",4,"ngIf"],["filterDateRange","nzDropdownMenu"],[1,"ant-table-filter-dropdown"],[1,"search-box"],[3,"ngModel","ngModelChange"],["nz-button","","nzSize","small","nzType","primary",1,"search-button",3,"click"],["nz-button","","nzSize","small",3,"click"],["nzShowSizeChanger","","nzBordered","",3,"nzFrontPagination","nzData","nzTotal","nzQueryParams"],["table",""],["nzColumnKey","status",3,"nzSortFn","nzFilters","nzFilterFn"],[4,"ngFor","ngForOf"],[3,"nzColor"],[3,"routerLink"]],template:function(n,o){if(1&n&&(t.TgZ(0,"nz-page-header",0),t._UZ(1,"nz-page-header-extra"),t.TgZ(2,"nz-page-header-content"),t.YNc(3,S,18,19,"nz-table",1),t.ALo(4,"async"),t.TgZ(5,"nz-dropdown-menu",null,2),t.TgZ(7,"div",3),t.TgZ(8,"div",4),t.TgZ(9,"nz-range-picker",5),t.NdJ("ngModelChange",function(p){return o.dateRanges=p}),t.qZA(),t._UZ(10,"br"),t.TgZ(11,"button",6),t.NdJ("click",function(){return o.tableService.filterText("createdOn",void 0)}),t._uU(12),t.ALo(13,"translate"),t.qZA(),t.TgZ(14,"button",7),t.NdJ("click",function(){return o.tableService.filterText("createdOn",void 0)}),t._uU(15),t.ALo(16,"translate"),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&n){let s;t.Q6J("nzGhost",!1),t.xp6(3),t.Q6J("ngIf",null==(s=t.lcZ(4,5,o.query))||null==s.data?null:s.data.orders),t.xp6(6),t.Q6J("ngModel",o.dateRanges),t.xp6(3),t.Oqu(t.lcZ(13,7,"profile.search")),t.xp6(3),t.Oqu(t.lcZ(16,9,"profile.reset"))}},directives:[Z.$O,Z.Jp,Z.u5,c.O5,L.RR,v.uw,v.wS,A.JJ,A.On,O.ix,y.dQ,x.w,d.N8,d.Om,d.$Z,d.Uo,d._C,d.qD,d.p0,c.sg,F.j,i.yS],pipes:[c.Ov,f.X$,c.uU,c.H9],encapsulation:2}),e})(),resolve:{orders:h},runGuardsAndResolvers:"paramsOrQueryParamsChange"},{path:"view/:id",loadChildren:()=>Promise.all([r.e(592),r.e(115)]).then(r.bind(r,2115)).then(e=>e.RequestViewModule)}];let U=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({providers:[h,m.d],imports:[[i.Bz.forChild(J)],i.Bz]}),e})(),P=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[U,z.m]]}),e})()}}]);