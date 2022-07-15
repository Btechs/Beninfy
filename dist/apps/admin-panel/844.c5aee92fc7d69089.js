"use strict";(self.webpackChunkadmin_panel=self.webpackChunkadmin_panel||[]).push([[844],{1844:(j,h,r)=>{r.r(h),r.d(h,{ManagementRolesModule:()=>Y});var L=r(4534),u=r(9826),z=r(655),l=r(3075),c=r(7157),v=r(3905),t=r(5e3),O=r(8900),p=r(1740),F=r(1646),g=r(3714),Z=r(9095),J=r(8177),f=r(9808),C=r(4138),T=r(5540),R=r(7036),Q=r(8809),y=r(1062);function _(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"label",10),t.NdJ("nzCheckedChange",function(s){const d=t.CHM(e).$implicit,I=t.oxw().$implicit;return t.oxw().onPermissionCheckChanged(I,d,s)}),t._uU(1),t.qZA()}if(2&n){const e=i.$implicit,o=t.oxw().$implicit,s=t.oxw();t.Q6J("nzChecked",s.isPermissionChecked(o,e)),t.xp6(1),t.Oqu(e)}}function S(n,i){if(1&n&&(t.TgZ(0,"div",8),t.TgZ(1,"h6"),t._uU(2),t.qZA(),t.YNc(3,_,2,2,"label",9),t.qZA()),2&n){const e=i.$implicit,o=t.oxw();t.xp6(2),t.Oqu(e),t.xp6(1),t.Q6J("ngForOf",o.getCategoryPermissions(e))}}let A=(()=>{class n{constructor(e,o,s,a,d){this.route=e,this.fb=o,this.updateGQL=s,this.createGQL=a,this.routerHelper=d,this.form=this.fb.group({id:[null],title:[null,l.kI.required],permissions:[[],l.kI.required]})}ngOnInit(){this.subscription=this.route.data.subscribe(e=>{null!=e.role&&this.form.patchValue(e.role.data.operatorRole)})}getPermissionsCategories(){const e=Object.values(c.oMj).map(o=>o.split("_")[0]);return[...new Set(e)]}getCategoryPermissions(e){return Object.values(c.oMj).filter(o=>o.startsWith(e+"_")).map(o=>o.split("_")[1])}ngOnDestroy(){var e;null===(e=this.subscription)||void 0===e||e.unsubscribe()}onSubmit(){return(0,z.mG)(this,void 0,void 0,function*(){const e=this.form.value,{id:o}=e,s=(0,z._T)(e,["id"]);null==o?yield(0,v.z)(this.createGQL.mutate({input:s})):yield(0,v.z)(this.updateGQL.mutate({id:o,input:s})),this.routerHelper.goToParent(this.route)})}onPermissionCheckChanged(e,o,s){if(!this.form.value.permissions.includes(`${e}_${o}`)&&s&&(this.form.value.permissions.push(`${e}_${o}`),this.form.patchValue({permissions:this.form.value.permissions})),!s){const a=JSON.parse(JSON.stringify(this.form.value.permissions)).filter(d=>d!=`${e}_${o}`);console.log(JSON.stringify(a)),this.form.patchValue({permissions:a})}}isPermissionChecked(e,o){return this.form.value.permissions.includes(`${e}_${o}`)}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(u.gz),t.Y36(l.qu),t.Y36(c.JG9),t.Y36(c.tpO),t.Y36(O.b))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-role-view"]],decls:16,vars:7,consts:[["nzBackIcon","","nzTitle","User Role","nzSubtitle","Admin Panel user role definition",3,"nzGhost"],["nz-form","","nzLayout","vertical",3,"formGroup","ngSubmit"],["formControlName","id","type","hidden","hidden",""],[1,"lg:grid","lg:grid-cols-3","lg:gap-2"],["nzRequired","","nzFor","title"],["nz-input","","required","","id","title","formControlName","title"],["class","lg:grid lg:grid-cols-3 lg:gap-2 pt-2",4,"ngFor","ngForOf"],["nz-button","","nzType","primary","type","submit",1,"mt-2","float-right",3,"disabled"],[1,"lg:grid","lg:grid-cols-3","lg:gap-2","pt-2"],["nz-checkbox","",3,"nzChecked","nzCheckedChange",4,"ngFor","ngForOf"],["nz-checkbox","",3,"nzChecked","nzCheckedChange"]],template:function(e,o){1&e&&(t._UZ(0,"nz-page-header",0),t.TgZ(1,"nz-card"),t.TgZ(2,"form",1),t.NdJ("ngSubmit",function(){return o.onSubmit()}),t._UZ(3,"input",2),t.TgZ(4,"div",3),t.TgZ(5,"nz-form-item"),t.TgZ(6,"nz-form-label",4),t._uU(7,"Title"),t.qZA(),t.TgZ(8,"nz-form-control"),t._UZ(9,"input",5),t.qZA(),t.qZA(),t.qZA(),t.TgZ(10,"h4"),t._uU(11,"Permissions"),t.qZA(),t.YNc(12,S,4,2,"div",6),t.TgZ(13,"button",7),t._uU(14),t.ALo(15,"translate"),t.qZA(),t.qZA(),t.qZA()),2&e&&(t.Q6J("nzGhost",!1),t.xp6(2),t.Q6J("formGroup",o.form),t.xp6(10),t.Q6J("ngForOf",o.getPermissionsCategories()),t.xp6(1),t.Q6J("disabled",o.form.invalid),t.xp6(1),t.Oqu(t.lcZ(15,5,"profile.submit")))},directives:[p.$O,F.bd,l._Y,l.JL,g.Lr,l.sg,l.Fj,l.JJ,l.u,Z.SK,g.Nx,Z.t3,g.iK,g.Fd,J.Zp,l.Q7,f.sg,C.ix,T.dQ,R.w,Q.Ie],pipes:[y.X$],encapsulation:2}),n})(),x=(()=>{class n{constructor(e){this.gql=e}resolve(e,o){return this.gql.fetch({id:e.params.id})}}return n.\u0275fac=function(e){return new(e||n)(t.LFG(c.WJJ))},n.\u0275prov=t.Yz7({token:n,factory:n.\u0275fac}),n})();var q=r(4004),M=r(9827),P=r(9997),m=r(7336);function $(n,i){if(1&n&&(t.TgZ(0,"tr"),t.TgZ(1,"td"),t._uU(2),t.qZA(),t.TgZ(3,"td"),t.TgZ(4,"a",7),t._uU(5),t.ALo(6,"translate"),t.qZA(),t.qZA(),t.qZA()),2&n){const e=i.$implicit;t.xp6(2),t.Oqu(e.title),t.xp6(2),t.Q6J("routerLink","view/"+e.id),t.xp6(1),t.Oqu(t.lcZ(6,3,"table.details"))}}const U=function(){return[]};function G(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"nz-table",4,5),t.NdJ("nzQueryParams",function(s){return t.CHM(e),t.oxw().tableService.onTableQueryParamsChange(s)}),t.TgZ(2,"thead"),t.TgZ(3,"tr"),t.TgZ(4,"th"),t._uU(5),t.ALo(6,"translate"),t.qZA(),t.TgZ(7,"th"),t._uU(8),t.ALo(9,"translate"),t.qZA(),t.qZA(),t.qZA(),t.TgZ(10,"tbody"),t.YNc(11,$,7,5,"tr",6),t.qZA(),t.qZA()}if(2&n){const e=i.ngIf,o=t.MAs(1);let s;t.Q6J("nzFrontPagination",!1)("nzData",null!==(s=e)&&void 0!==s?s:t.DdM(10,U))("nzTotal",e.length),t.xp6(5),t.hij(" ",t.lcZ(6,6,"profile.title")," "),t.xp6(3),t.Oqu(t.lcZ(9,8,"profile.actions")),t.xp6(3),t.Q6J("ngForOf",o.data)}}let V=(()=>{class n{constructor(e,o){this.route=e,this.tableService=o}ngOnInit(){this.query=this.route.data.pipe((0,q.U)(e=>e.roles))}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(u.gz),t.Y36(M.w))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-roles-list"]],decls:9,vars:7,consts:[["nzBackIcon","","nzTitle","User Roles","nzSubtitle","Role definitions for Admin panel users.",3,"nzGhost"],["nz-button","","nzType","primary","routerLink","new"],["nz-icon","","nzType","plus"],["nzShowSizeChanger","","nzBordered","",3,"nzFrontPagination","nzData","nzTotal","nzQueryParams",4,"ngIf"],["nzShowSizeChanger","","nzBordered","",3,"nzFrontPagination","nzData","nzTotal","nzQueryParams"],["table",""],[4,"ngFor","ngForOf"],[3,"routerLink"]],template:function(e,o){if(1&e&&(t.TgZ(0,"nz-page-header",0),t.TgZ(1,"nz-page-header-extra"),t.TgZ(2,"button",1),t._UZ(3,"i",2),t._uU(4),t.ALo(5,"translate"),t.qZA(),t.qZA(),t.TgZ(6,"nz-page-header-content"),t.YNc(7,G,12,11,"nz-table",3),t.ALo(8,"async"),t.qZA(),t.qZA()),2&e){let s;t.Q6J("nzGhost",!1),t.xp6(4),t.Oqu(t.lcZ(5,3,"profile.add")),t.xp6(3),t.Q6J("ngIf",null==(s=t.lcZ(8,5,o.query))||null==s.data?null:s.data.operatorRoles)}},directives:[p.$O,p.Jp,C.ix,T.dQ,R.w,u.rH,P.Ls,p.u5,f.O5,m.N8,m.Om,m.$Z,m.Uo,m._C,m.p0,f.sg,u.yS],pipes:[y.X$,f.Ov],encapsulation:2}),n})(),b=(()=>{class n{constructor(e){this.gql=e}resolve(e,o){return this.gql.fetch({})}}return n.\u0275fac=function(e){return new(e||n)(t.LFG(c.k8H))},n.\u0275prov=t.Yz7({token:n,factory:n.\u0275fac}),n})();const w=[{path:"",component:V,resolve:{roles:b},runGuardsAndResolvers:"paramsOrQueryParamsChange"},{path:"view/:id",component:A,resolve:{role:x}},{path:"new",component:A}];let N=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({providers:[b,x],imports:[[u.Bz.forChild(w)],u.Bz]}),n})(),Y=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[L.m,N]]}),n})()}}]);