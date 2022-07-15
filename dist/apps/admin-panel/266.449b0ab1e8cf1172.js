"use strict";(self.webpackChunkadmin_panel=self.webpackChunkadmin_panel||[]).push([[266],{7266:(X,A,r)=>{r.r(A),r.d(A,{DriversModule:()=>W});var M=r(4534),c=r(9826),T=r(655),u=r(3075),z=r(7157),U=r(3905),t=r(5e3),_=r(8900),p=r(1740),J=r(1646),d=r(3714),N=r(9095),Z=r(8177),b=r(7036),C=r(4471),x=r(4138),L=r(5540);function Q(n,a){1&n&&(t.TgZ(0,"nz-select",18),t._UZ(1,"nz-option",19),t.qZA())}function S(n,a){if(1&n){const e=t.EpF();t.TgZ(0,"button",20),t.NdJ("click",function(){return t.CHM(e),t.oxw().submitForm()}),t._uU(1,"Register"),t.qZA()}if(2&n){const e=t.oxw();t.Q6J("disabled",e.form.invalid)}}const O=function(n){return[n]};let P=(()=>{class n{constructor(e,l,o,i){this.fb=e,this.createGQL=l,this.routerHelper=o,this.route=i,this.form=this.fb.group({firstName:[null],lastName:[null],phoneNumberPrefix:["+1",u.kI.required],phoneNumber:[null,u.kI.required],gender:[null]})}submitForm(){return(0,T.mG)(this,void 0,void 0,function*(){const e=this.form.value,{phoneNumber:l,phoneNumberPrefix:o}=e,i=(0,T._T)(e,["phoneNumber","phoneNumberPrefix"]);yield(0,U.z)(this.createGQL.mutate({input:Object.assign({mobileNumber:`${o}${l}`},i)})),this.routerHelper.goToParent(this.route)})}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(u.qu),t.Y36(z.Ae5),t.Y36(_.b),t.Y36(c.gz))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-driver-new"]],decls:30,vars:6,consts:[["nzBackIcon","","nzTitle","New Driver","nzSubtitle","Input Driver's contact details below.",3,"nzGhost"],[3,"nzActions"],["nz-form","",3,"formGroup","ngSubmit"],["nzRequired","","nzFor","firstName"],["nzErrorTip","The input is not valid First Name"],["nz-input","","formControlName","firstName","id","firstName"],["nzRequired","","nzFor","lastName"],["nzErrorTip","The input is not valid Last Name"],["nz-input","","formControlName","lastName","id","lastName"],["nzFor","phoneNumber","nzRequired",""],[3,"nzAddOnBefore"],["addOnBeforeTemplate",""],["formControlName","phoneNumber","id","'phoneNumber'","nz-input",""],["nzFor","gender"],["formControlName","gender"],["nzLabel","Male","nzValue","Male"],["nzLabel","Female","nzValue","Female"],["tmplActions",""],["formControlName","phoneNumberPrefix",1,"phone-select"],["nzLabel","+1","nzValue","+1"],["nz-button","","nzType","primary",3,"disabled","click"]],template:function(e,l){if(1&e&&(t._UZ(0,"nz-page-header",0),t.TgZ(1,"nz-card",1),t.TgZ(2,"form",2),t.NdJ("ngSubmit",function(){return l.submitForm()}),t.TgZ(3,"nz-form-item"),t.TgZ(4,"nz-form-label",3),t._uU(5,"First Name"),t.qZA(),t.TgZ(6,"nz-form-control",4),t._UZ(7,"input",5),t.qZA(),t.qZA(),t.TgZ(8,"nz-form-item"),t.TgZ(9,"nz-form-label",6),t._uU(10,"Last Name"),t.qZA(),t.TgZ(11,"nz-form-control",7),t._UZ(12,"input",8),t.qZA(),t.qZA(),t.TgZ(13,"nz-form-item"),t.TgZ(14,"nz-form-label",9),t._uU(15,"Phone Number"),t.qZA(),t.TgZ(16,"nz-form-control"),t.TgZ(17,"nz-input-group",10),t.YNc(18,Q,2,0,"ng-template",null,11,t.W1O),t._UZ(20,"input",12),t.qZA(),t.qZA(),t.qZA(),t.TgZ(21,"nz-form-item"),t.TgZ(22,"nz-form-label",13),t._uU(23,"Gender"),t.qZA(),t.TgZ(24,"nz-form-control"),t.TgZ(25,"nz-select",14),t._UZ(26,"nz-option",15),t._UZ(27,"nz-option",16),t.qZA(),t.qZA(),t.qZA(),t.YNc(28,S,2,1,"ng-template",null,17,t.W1O),t.qZA(),t.qZA()),2&e){const o=t.MAs(19),i=t.MAs(29);t.Q6J("nzGhost",!1),t.xp6(1),t.Q6J("nzActions",t.VKq(4,O,i)),t.xp6(1),t.Q6J("formGroup",l.form),t.xp6(15),t.Q6J("nzAddOnBefore",o)}},directives:[p.$O,J.bd,u._Y,u.JL,d.Lr,u.sg,N.SK,d.Nx,N.t3,d.iK,d.Fd,Z.Zp,u.Fj,u.JJ,u.u,Z.gB,b.w,C.Vq,C.Ip,x.ix,L.dQ],encapsulation:2}),n})();var Y=r(3266),F=r(4610),R=r(4004),D=r(9827),q=r(1062),G=r(9997),g=r(9808),B=r(285),m=r(7336),I=r(6771),w=r(1670);function j(n,a){if(1&n&&(t.TgZ(0,"tr"),t.TgZ(1,"td"),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.ALo(5,"phone"),t.qZA(),t.TgZ(6,"td",22),t.TgZ(7,"nz-tag",23),t._uU(8),t.ALo(9,"translate"),t.qZA(),t.qZA(),t.TgZ(10,"td"),t.TgZ(11,"a",24),t._uU(12),t.ALo(13,"translate"),t.qZA(),t.qZA(),t.qZA()),2&n){const e=a.$implicit,l=t.oxw(2);t.xp6(2),t.AsE("",e.firstName," ",e.lastName,""),t.xp6(2),t.Oqu(t.lcZ(5,7,e.mobileNumber)),t.xp6(3),t.Q6J("nzColor",l.tagColor.driver(e.status)),t.xp6(1),t.Oqu(t.lcZ(9,9,"enum.driver.status."+l.toCamelCase(e.status))),t.xp6(3),t.Q6J("routerLink","view/"+e.id),t.xp6(1),t.Oqu(t.lcZ(13,11,"table.details"))}}const H=function(){return[]};function V(n,a){if(1&n){const e=t.EpF();t.TgZ(0,"nz-table",14,15),t.NdJ("nzQueryParams",function(o){return t.CHM(e),t.oxw().tableService.onTableQueryParamsChange(o)}),t.TgZ(2,"thead"),t.TgZ(3,"tr"),t.TgZ(4,"th",16),t._uU(5),t.ALo(6,"translate"),t.TgZ(7,"nz-filter-trigger",17),t.ALo(8,"async"),t._UZ(9,"i",18),t.qZA(),t.qZA(),t.TgZ(10,"th",19),t._uU(11),t.ALo(12,"translate"),t.TgZ(13,"nz-filter-trigger",17),t.ALo(14,"async"),t._UZ(15,"i",18),t.qZA(),t.qZA(),t.TgZ(16,"th",20),t._uU(17,"Status"),t.qZA(),t.TgZ(18,"th"),t._uU(19),t.ALo(20,"translate"),t.qZA(),t.qZA(),t.qZA(),t.TgZ(21,"tbody"),t.YNc(22,j,14,13,"tr",21),t.qZA(),t.qZA()}if(2&n){const e=a.ngIf,l=t.MAs(1),o=t.oxw(),i=t.MAs(10),s=t.MAs(23);let f,v,h;t.Q6J("nzFrontPagination",!1)("nzData",e.nodes)("nzTotal",e.totalCount),t.xp6(4),t.Q6J("nzSortFn",!0),t.xp6(1),t.hij(" ",t.lcZ(6,15,"profile.name")," "),t.xp6(2),t.Q6J("nzActive",null==(f=t.lcZ(8,17,o.route.queryParams))||null==f.filter?null:f.filter.includes("lastName|like|"))("nzDropdownMenu",i),t.xp6(3),t.Q6J("nzSortFn",!0),t.xp6(1),t.hij(" ",t.lcZ(12,19,"profile.mobileNumber")," "),t.xp6(2),t.Q6J("nzActive",null==(v=t.lcZ(14,21,o.route.queryParams))||null==v.filter?null:v.filter.includes("mobileNumber|like|"))("nzDropdownMenu",s),t.xp6(3),t.Q6J("nzFilters",null!==(h=o.statuses)&&void 0!==h?h:t.DdM(25,H))("nzFilterFn",!0),t.xp6(3),t.Oqu(t.lcZ(20,23,"profile.actions")),t.xp6(3),t.Q6J("ngForOf",l.data)}}let $=(()=>{class n{constructor(e,l,o,i){this.tagColor=e,this.tableService=l,this.route=o,this.translator=i,this.statuses=Object.values(z.K$m).map(s=>({value:s,text:this.translator.instant(`enum.driver.status.${(0,F.eV)(s)}`)})),this.toCamelCase=F.eV}ngOnInit(){this.query=this.route.data.pipe((0,R.U)(e=>e.drivers))}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(Y.k),t.Y36(D.w),t.Y36(c.gz),t.Y36(q.sK))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-drivers-list"]],decls:34,vars:22,consts:[["nzBackIcon","","nzTitle","Drivers","nzSubtitle","List of all drivers registered",3,"nzGhost"],["nz-button","","nzType","primary","routerLink","new"],["nz-icon","","nzType","plus"],["nzShowSizeChanger","","nzBordered","",3,"nzFrontPagination","nzData","nzTotal","nzQueryParams",4,"ngIf"],["filtername","nzDropdownMenu"],[1,"ant-table-filter-dropdown"],[1,"search-box"],["nz-input","",3,"placeholder"],["lastNameInput",""],["nz-button","","nzSize","small","nzType","primary",1,"search-button",3,"click"],["nz-button","","nzSize","small",3,"click"],["filtermobile","nzDropdownMenu"],["nz-input","","placeholder","Search Mobile Number"],["mobileNumberInput",""],["nzShowSizeChanger","","nzBordered","",3,"nzFrontPagination","nzData","nzTotal","nzQueryParams"],["table",""],["nzCustomFilter","","nzColumnKey","lastName",3,"nzSortFn"],[3,"nzActive","nzDropdownMenu"],["nz-icon","","nzType","search"],["nzCustomFilter","","nzColumnKey","mobileNumber",3,"nzSortFn"],["nzColumnKey","status",1,"hidden","md:table-cell",3,"nzFilters","nzFilterFn"],[4,"ngFor","ngForOf"],[1,"hidden","md:table-cell"],[3,"nzColor"],[3,"routerLink"]],template:function(e,l){if(1&e){const o=t.EpF();t.TgZ(0,"nz-page-header",0),t.TgZ(1,"nz-page-header-extra"),t.TgZ(2,"button",1),t._UZ(3,"i",2),t._uU(4),t.ALo(5,"translate"),t.qZA(),t.qZA(),t.TgZ(6,"nz-page-header-content"),t.YNc(7,V,23,26,"nz-table",3),t.ALo(8,"async"),t.TgZ(9,"nz-dropdown-menu",null,4),t.TgZ(11,"div",5),t.TgZ(12,"div",6),t._UZ(13,"input",7,8),t.ALo(15,"translate"),t.TgZ(16,"button",9),t.NdJ("click",function(){t.CHM(o);const s=t.MAs(14);return l.tableService.filterText("lastName",s.value)}),t._uU(17),t.ALo(18,"translate"),t.qZA(),t.TgZ(19,"button",10),t.NdJ("click",function(){t.CHM(o);const s=t.MAs(14);return l.tableService.resetFilter("lastName",s)}),t._uU(20),t.ALo(21,"translate"),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(22,"nz-dropdown-menu",null,11),t.TgZ(24,"div",5),t.TgZ(25,"div",6),t._UZ(26,"input",12,13),t.TgZ(28,"button",9),t.NdJ("click",function(){t.CHM(o);const s=t.MAs(27);return l.tableService.filterText("mobileNumber",s.value)}),t._uU(29),t.ALo(30,"translate"),t.qZA(),t.TgZ(31,"button",10),t.NdJ("click",function(){t.CHM(o);const s=t.MAs(27);return l.tableService.resetFilter("mobileNumber",s)}),t._uU(32),t.ALo(33,"translate"),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA()}if(2&e){let o;t.Q6J("nzGhost",!1),t.xp6(4),t.Oqu(t.lcZ(5,8,"profile.add")),t.xp6(3),t.Q6J("ngIf",null==(o=t.lcZ(8,10,l.query))||null==o.data?null:o.data.drivers),t.xp6(6),t.s9C("placeholder",t.lcZ(15,12,"profile.lastName")),t.xp6(4),t.hij(" ",t.lcZ(18,14,"profile.search")," "),t.xp6(3),t.Oqu(t.lcZ(21,16,"profile.reset")),t.xp6(9),t.hij(" ",t.lcZ(30,18,"profile.search")," "),t.xp6(3),t.Oqu(t.lcZ(33,20,"profile.reset"))}},directives:[p.$O,p.Jp,x.ix,L.dQ,b.w,c.rH,G.Ls,p.u5,g.O5,B.RR,Z.Zp,m.N8,m.Om,m.$Z,m.Uo,m._C,m.qD,m.Ql,m.p0,g.sg,I.j,c.yS],pipes:[q.X$,g.Ov,w.E],encapsulation:2}),n})(),y=(()=>{class n{constructor(e,l){this.paging=e,this.gql=l}resolve(e,l){const o=this.paging.deserializeQueryParams(e.queryParams);return this.gql.fetch(o)}}return n.\u0275fac=function(e){return new(e||n)(t.LFG(D.w),t.LFG(z.RWY))},n.\u0275prov=t.Yz7({token:n,factory:n.\u0275fac}),n})();const K=[{path:"",component:$,resolve:{drivers:y},runGuardsAndResolvers:"paramsOrQueryParamsChange"},{path:"view/:id",loadChildren:()=>r.e(931).then(r.bind(r,3411)).then(n=>n.DriverProfileModule)},{path:"new",component:P}];let E=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({providers:[y],imports:[[c.Bz.forChild(K)],c.Bz]}),n})(),W=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[M.m,E]]}),n})()}}]);