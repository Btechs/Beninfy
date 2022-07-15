"use strict";(self.webpackChunkadmin_panel=self.webpackChunkadmin_panel||[]).push([[518],{518:(w,m,o)=>{o.r(m),o.d(m,{FleetWalletsModule:()=>b});var T=o(4534),u=o(9826),Z=o(4004),n=o(5e3),f=o(9827),d=o(1740),F=o(4138),_=o(5540),v=o(7036),g=o(285),y=o(9997),h=o(863),c=o(9808),C=o(8177),p=o(3075),i=o(7336),L=o(1062);function x(t,r){if(1&t&&(n.TgZ(0,"tr"),n.TgZ(1,"td"),n._uU(2),n.qZA(),n.TgZ(3,"td"),n._uU(4),n.ALo(5,"currency"),n.qZA(),n.TgZ(6,"td"),n._uU(7),n.qZA(),n.TgZ(8,"td"),n.TgZ(9,"a",22),n._uU(10),n.ALo(11,"translate"),n.qZA(),n.qZA(),n.qZA()),2&t){const e=r.$implicit;n.xp6(2),n.Oqu(e.fleet.name),n.xp6(2),n.Oqu(n.xi3(5,5,e.balance,e.currency)),n.xp6(3),n.Oqu(e.currency),n.xp6(2),n.Q6J("routerLink","/riders/view/"+e.fleetId),n.xp6(1),n.Oqu(n.lcZ(11,8,"table.viewRider"))}}const q=function(){return[]};function W(t,r){if(1&t){const e=n.EpF();n.TgZ(0,"nz-table",15,16),n.NdJ("nzQueryParams",function(a){return n.CHM(e),n.oxw(2).tableService.onTableQueryParamsChange(a)}),n.TgZ(2,"thead"),n.TgZ(3,"tr"),n.TgZ(4,"th"),n._uU(5),n.ALo(6,"translate"),n.qZA(),n.TgZ(7,"th",17),n._uU(8),n.ALo(9,"translate"),n.TgZ(10,"nz-filter-trigger",18),n._UZ(11,"i",19),n.qZA(),n.qZA(),n.TgZ(12,"th",20),n.ALo(13,"async"),n._uU(14),n.ALo(15,"translate"),n.qZA(),n.TgZ(16,"th"),n._uU(17),n.ALo(18,"translate"),n.qZA(),n.qZA(),n.qZA(),n.TgZ(19,"tbody"),n.YNc(20,x,12,10,"tr",21),n.qZA(),n.qZA()}if(2&t){const e=r.ngIf,l=n.MAs(1),a=n.oxw(2),s=n.MAs(15);let z;n.Q6J("nzFrontPagination",!1)("nzData",e.nodes)("nzTotal",e.totalCount),n.xp6(5),n.Oqu(n.lcZ(6,12,"profile.name")),n.xp6(3),n.hij("",n.lcZ(9,14,"profile.amount")," "),n.xp6(2),n.Q6J("nzActive",-1!==a.amountRange[0])("nzDropdownMenu",s),n.xp6(2),n.Q6J("nzFilters",null!==(z=n.lcZ(13,16,a.currencies))&&void 0!==z?z:n.DdM(22,q))("nzFilterFn",!0),n.xp6(2),n.Oqu(n.lcZ(15,18,"profile.currency")),n.xp6(3),n.Oqu(n.lcZ(18,20,"profile.actions")),n.xp6(3),n.Q6J("ngForOf",l.data)}}function M(t,r){if(1&t&&(n.TgZ(0,"nz-page-header-content"),n.YNc(1,W,21,23,"nz-table",14),n.ALo(2,"async"),n.qZA()),2&t){const e=n.oxw();let l;n.xp6(1),n.Q6J("ngIf",null==(l=n.lcZ(2,1,e.query))||null==l.data?null:l.data.fleetWallets)}}let J=(()=>{class t{constructor(e,l){this.route=e,this.tableService=l,this.amountRange=[-1,-1]}ngOnInit(){this.query=this.route.data.pipe((0,Z.U)(e=>e.fleetWallet)),this.currencies=this.query.pipe((0,Z.U)(e=>this.distinctCurrency(e.data.regions.nodes).map(l=>({text:l,value:l}))))}exportTo(e){}distinctCurrency(e){return e.map(l=>l.currency).filter((l,a,s)=>s.indexOf(l)===a)}}return t.\u0275fac=function(e){return new(e||t)(n.Y36(u.gz),n.Y36(f.w))},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-fleet-wallets-list"]],decls:28,vars:22,consts:[["nzBackIcon","","nzTitle","Fleet Wallets","nzSubtitle","List of fleets current wallet balance",3,"nzGhost"],["nz-button","","nz-dropdown","",3,"nzDropdownMenu"],["nz-icon","","nzType","export"],["nz-icon","","nzType","down"],["menuExport","nzDropdownMenu"],["nz-menu",""],["nz-menu-item","",3,"click"],[4,"ngIf"],["filteramount","nzDropdownMenu"],[1,"ant-table-filter-dropdown"],[1,"search-box"],["nz-input","","type","number",3,"placeholder","ngModel","ngModelChange"],["nz-button","","nzSize","small","nzType","primary",1,"search-button",3,"click"],["nz-button","","nzSize","small",3,"click"],["nzShowSizeChanger","","nzBordered","",3,"nzFrontPagination","nzData","nzTotal","nzQueryParams",4,"ngIf"],["nzShowSizeChanger","","nzBordered","",3,"nzFrontPagination","nzData","nzTotal","nzQueryParams"],["table",""],["nzShowSort","","nzColumnKey","amount","nzCustomFilter",""],[3,"nzActive","nzDropdownMenu"],["nz-icon","","nzType","search"],["nzShowSort","","nzColumnKey","currency","nzShowFilter","",3,"nzFilters","nzFilterFn"],[4,"ngFor","ngForOf"],[3,"routerLink"]],template:function(e,l){if(1&e&&(n.TgZ(0,"nz-page-header",0),n.TgZ(1,"nz-page-header-extra"),n.TgZ(2,"button",1),n._UZ(3,"i",2),n._uU(4),n.ALo(5,"translate"),n._UZ(6,"i",3),n.qZA(),n.TgZ(7,"nz-dropdown-menu",null,4),n.TgZ(9,"ul",5),n.TgZ(10,"li",6),n.NdJ("click",function(){return l.exportTo("csv")}),n._uU(11,"CSV"),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.YNc(12,M,3,3,"nz-page-header-content",7),n.ALo(13,"async"),n.qZA(),n.TgZ(14,"nz-dropdown-menu",null,8),n.TgZ(16,"div",9),n.TgZ(17,"div",10),n.TgZ(18,"input",11),n.NdJ("ngModelChange",function(s){return l.amountRange[0]=s}),n.ALo(19,"translate"),n.qZA(),n.TgZ(20,"input",11),n.NdJ("ngModelChange",function(s){return l.amountRange[1]=s}),n.ALo(21,"translate"),n.qZA(),n.TgZ(22,"button",12),n.NdJ("click",function(){return l.tableService.filterRange("balance",l.amountRange)}),n._uU(23),n.ALo(24,"translate"),n.qZA(),n.TgZ(25,"button",13),n.NdJ("click",function(){return l.tableService.filterRange("balance",void 0)}),n._uU(26),n.ALo(27,"translate"),n.qZA(),n.qZA(),n.qZA(),n.qZA()),2&e){const a=n.MAs(8);let s;n.Q6J("nzGhost",!1),n.xp6(2),n.Q6J("nzDropdownMenu",a),n.xp6(2),n.hij(" ",n.lcZ(5,10,"profile.export")," "),n.xp6(8),n.Q6J("ngIf",null==(s=n.lcZ(13,12,l.query))?null:s.data),n.xp6(6),n.s9C("placeholder",n.lcZ(19,14,"table.min")),n.Q6J("ngModel",l.amountRange[0]),n.xp6(2),n.s9C("placeholder",n.lcZ(21,16,"table.max")),n.Q6J("ngModel",l.amountRange[1]),n.xp6(3),n.Oqu(n.lcZ(24,18,"profile.search")),n.xp6(3),n.Oqu(n.lcZ(27,20,"profile.reset"))}},directives:[d.$O,d.Jp,F.ix,_.dQ,v.w,g.wA,g.cm,y.Ls,g.RR,h.wO,h.r9,c.O5,C.Zp,p.wV,p.Fj,p.JJ,p.On,d.u5,i.N8,i.Om,i.$Z,i.Uo,i._C,i.qD,i.Ql,i.p0,c.sg,u.yS],pipes:[L.X$,c.Ov,c.H9],encapsulation:2}),t})();var O=o(7157);let A=(()=>{class t{constructor(e,l){this.paging=e,this.gql=l}resolve(e,l){const a=this.paging.deserializeQueryParams(e.queryParams);return this.gql.fetch(a)}}return t.\u0275fac=function(e){return new(e||t)(n.LFG(f.w),n.LFG(O.vC$))},t.\u0275prov=n.Yz7({token:t,factory:t.\u0275fac}),t})();const Q=[{path:"",component:J,resolve:{fleetWallet:A},runGuardsAndResolvers:"paramsOrQueryParamsChange"}];let S=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({providers:[A],imports:[[u.Bz.forChild(Q)],u.Bz]}),t})(),b=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[[S,T.m]]}),t})()}}]);