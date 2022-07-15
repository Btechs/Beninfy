"use strict";(self.webpackChunkadmin_panel=self.webpackChunkadmin_panel||[]).push([[206],{9534:(V,h,t)=>{t.r(h),t.d(h,{CMSModule:()=>G});var d=t(9808),g=t(9826);class A{constructor(){this.complaints=0,this.paymentRequests=0,this.driversPending=0,this.availableDrivers=0,this.requests=0,this.todayIncome=0}}var s=t(1777);const z=(0,s.X$)("mainPageSwitchTransition",[(0,s.eR)(":enter",(0,s.IO)("nz-layout.app-layout",[(0,s.oB)({opacity:0,transform:"scale3d(0.95, 0.95, 0)"}),(0,s.jt)("200ms 200ms")])),(0,s.eR)(":leave",[(0,s.IO)("nz-layout.app-layout",[(0,s.jt)("200ms",(0,s.oB)({opacity:0,transform:"scale3d(0.95, 0.95, 0)"}))])])]);var C=t(7228),r=t(4130),n=t(5e3),f=t(3889),T=t(1062),u=t(743),p=t(863),v=t(7036),q=t(9997),Z=t(1740),m=t(285),L=t(8466),M=t(4259),x=t(7477),S=t(9095),U=t(7948),y=t(4251);function O(e,l){1&e&&(n.TgZ(0,"span"),n._uU(1),n.ALo(2,"translate"),n.qZA()),2&e&&(n.xp6(1),n.Oqu(n.lcZ(2,1,"menu.riders")))}function k(e,l){1&e&&(n.TgZ(0,"span"),n._uU(1),n.ALo(2,"translate"),n.qZA()),2&e&&(n.xp6(1),n.Oqu(n.lcZ(2,1,"menu.requests")))}function P(e,l){1&e&&(n.TgZ(0,"span"),n._uU(1),n.ALo(2,"translate"),n.qZA()),2&e&&(n.xp6(1),n.Oqu(n.lcZ(2,1,"menu.complaints")))}const J=function(){return["/complaints"]};function N(e,l){if(1&e&&(n.TgZ(0,"div"),n._UZ(1,"nz-avatar",52),n.TgZ(2,"span",53),n.TgZ(3,"b"),n._uU(4),n.qZA(),n._uU(5),n.ALo(6,"translate"),n.qZA(),n.qZA()),2&e){const o=n.oxw(2);n.xp6(1),n.Q6J("routerLink",n.DdM(5,J)),n.xp6(3),n.Oqu(o.stats.complaints),n.xp6(1),n.hij(" ",n.lcZ(6,3,"notification.complaints.suffix"),"")}}function I(e,l){1&e&&n._UZ(0,"nz-divider")}const D=function(){return["/drivers/pending"]},Q=function(){return{status:"pending approval"}};function R(e,l){if(1&e&&(n.TgZ(0,"div"),n._UZ(1,"nz-avatar",54),n.TgZ(2,"span",53),n.TgZ(3,"b"),n._uU(4),n.qZA(),n._uU(5),n.ALo(6,"translate"),n.qZA(),n.qZA()),2&e){const o=n.oxw(2);n.xp6(1),n.Q6J("routerLink",n.DdM(6,D))("queryParams",n.DdM(7,Q)),n.xp6(3),n.Oqu(o.stats.driversPending),n.xp6(1),n.hij(" ",n.lcZ(6,4,"notification.pendingDrivers.suffix"),"")}}function b(e,l){1&e&&n._UZ(0,"nz-divider")}const Y=function(){return["/drivers/payment-requests"]},B=function(){return{status:"Pending"}};function j(e,l){if(1&e&&(n.TgZ(0,"div"),n._UZ(1,"nz-avatar",55),n.TgZ(2,"span",53),n.TgZ(3,"b"),n._uU(4),n.qZA(),n._uU(5),n.ALo(6,"translate"),n.qZA(),n.qZA()),2&e){const o=n.oxw(2);n.xp6(1),n.Q6J("routerLink",n.DdM(6,Y))("queryParams",n.DdM(7,B)),n.xp6(3),n.Oqu(o.stats.paymentRequests),n.xp6(1),n.hij(" ",n.lcZ(6,4,"notification.paymentRequests.suffix"),"")}}function E(e,l){if(1&e&&(n.TgZ(0,"nz-row"),n.YNc(1,N,7,6,"div",23),n.qZA(),n.TgZ(2,"nz-row"),n.YNc(3,I,1,0,"nz-divider",23),n.YNc(4,R,7,8,"div",23),n.qZA(),n.TgZ(5,"nz-row"),n.YNc(6,b,1,0,"nz-divider",23),n.YNc(7,j,7,8,"div",23),n.qZA()),2&e){const o=n.oxw();n.xp6(1),n.Q6J("ngIf",0!==o.stats.complaints),n.xp6(2),n.Q6J("ngIf",0!==o.stats.driversPending&&0!==o.stats.complaints),n.xp6(1),n.Q6J("ngIf",0!==o.stats.driversPending),n.xp6(2),n.Q6J("ngIf",0!==o.stats.paymentRequests&&(0!==o.stats.complaints||0!==o.stats.driversPending)),n.xp6(1),n.Q6J("ngIf",0!==o.stats.paymentRequests)}}const F=function(){return{filter:"status|in|PendingApproval"}},_=[{path:"",component:(()=>{class e{constructor(o,a,i,c,K){this.router=o,this.route=a,this.notification=i,this.translate=c,this.i18n=K,this.state="activated",this.isCollapsed=!0,this.stats=new A,this.isDarkMode=!1}ngOnInit(){window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches&&this.changeTheme()}logout(){localStorage.removeItem("beninfy_admin_token"),this.router.navigate(["login"],{relativeTo:this.route.root}),window.location.reload()}changeTheme(){}changeLanguage(o){switch(this.translate.use(o),localStorage.setItem("lang",o),o){case"en":this.i18n.setLocale(r.iF);break;case"es":this.i18n.setLocale(r.f_),(0,d.qS)(C.Z);break;case"fr":this.i18n.setLocale(r.fp);break;case"de":this.i18n.setLocale(r.a1);break;case"ar":this.i18n.setLocale(r.A7);break;case"hy":this.i18n.setLocale(r.R9);break;case"ko":this.i18n.setLocale(r.sf);break;case"ru":this.i18n.setLocale(r.bo);break;case"zh":this.i18n.setLocale(r.bF);break;case"ja":this.i18n.setLocale(r.Vc);break;case"pt":this.i18n.setLocale(r.bf)}}}return e.\u0275fac=function(o){return new(o||e)(n.Y36(g.F0),n.Y36(g.gz),n.Y36(f.zb),n.Y36(T.sK),n.Y36(r.wi))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-cms"]],hostVars:1,hostBindings:function(o,a){2&o&&n.d8E("@mainPageSwitchTransition",a.state)},decls:171,vars:106,consts:[[1,"app-layout"],["nzCollapsible","","nzWidth","256px","nzBreakpoint","md",2,"background-color","white",3,"nzCollapsed","nzTrigger","nzCollapsedChange"],[1,"sidebar-logo"],["target","_blank",3,"href"],["src","../../assets/logo.png","alt","logo"],["nz-menu","","nzMode","inline",3,"nzInlineCollapsed"],["nz-submenu","","nzIcon","dashboard",3,"nzTitle"],["nz-menu-item","","nzMatchRouter",""],["routerLink","/home/overview"],["routerLink","/home/dispatcher"],["nz-submenu","","nzIcon","car",3,"nzTitle"],["routerLink","/drivers","routerLinkActive","router-link-active",3,"queryParams"],["routerLink","/drivers"],["nz-submenu","","nzIcon","fund",3,"nzTitle"],["routerLink","/marketing/coupons"],["routerLink","/marketing/announcements"],["nz-submenu","","nzIcon","bank",3,"nzTitle"],["routerLink","/financials/provider"],["routerLink","/financials/fleet"],["routerLink","/financials/driver"],["routerLink","/financials/rider"],["routerLink","/riders"],["nz-icon","","nzType","user"],[4,"ngIf"],["routerLink","/requests"],["nz-icon","","nzType","container"],["routerLink","/complaints"],["nz-icon","","nzType","customer-service"],["nz-submenu","","nzIcon","control",3,"nzTitle"],["routerLink","/management/regions"],["routerLink","/management/services"],["routerLink","/management/fleets"],["routerLink","/management/cars"],["routerLink","/management/user-roles"],["routerLink","/management/users"],["routerLink","/management/payment-gateways"],[3,"nzGhost"],[1,"header-trigger",3,"click"],["nz-icon","",1,"trigger",3,"nzType"],[1,"header-trigger",2,"margin-right","15px"],["nz-dropdown","",3,"nzDropdownMenu"],["nz-icon","","nzType","global",1,"trigger",3,"nz-tooltip"],["menu","nzDropdownMenu"],["nz-menu","","nzSelectable",""],["nz-menu-item","",3,"click"],[2,"margin-right","15px",3,"nzDot"],["nz-popover","","nzPopoverPlacement","bottomRight",1,"header-trigger",3,"nzPopoverTitle","nzPopoverContent"],["nz-icon","","nzType","notification",1,"trigger"],["notificationTemplate",""],["nz-icon","","nzType","logout",1,"trigger",3,"nz-tooltip"],[1,"inner-content"],[3,"href"],["nzSize","large","nzShape","square","nzIcon","customer-service",1,"not-avatar",2,"background-color","#b7eb8f",3,"routerLink"],[1,"not-desc"],["nzSize","large","nzShape","square","nzIcon","car",1,"not-avatar",2,"background-color","#87e8de",3,"routerLink","queryParams"],["nzSize","large","nzShape","square","nzIcon","bank",1,"not-avatar",2,"background-color","#d3adf7",3,"routerLink","queryParams"]],template:function(o,a){if(1&o&&(n.TgZ(0,"nz-layout",0),n.TgZ(1,"nz-sider",1),n.NdJ("nzCollapsedChange",function(c){return a.isCollapsed=c}),n.TgZ(2,"div",2),n.TgZ(3,"a",3),n.ALo(4,"translate"),n._UZ(5,"img",4),n.TgZ(6,"h1"),n._uU(7),n.ALo(8,"translate"),n.qZA(),n.qZA(),n.qZA(),n.TgZ(9,"ul",5),n.TgZ(10,"li",6),n.ALo(11,"translate"),n.TgZ(12,"ul"),n.TgZ(13,"li",7),n.TgZ(14,"a",8),n._uU(15),n.ALo(16,"translate"),n.qZA(),n.qZA(),n.TgZ(17,"li",7),n.TgZ(18,"a",9),n._uU(19),n.ALo(20,"translate"),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.TgZ(21,"li",10),n.ALo(22,"translate"),n.TgZ(23,"ul"),n.TgZ(24,"li",7),n.TgZ(25,"a",11),n._uU(26),n.ALo(27,"translate"),n.qZA(),n.qZA(),n.TgZ(28,"li",7),n.TgZ(29,"a",12),n._uU(30),n.ALo(31,"translate"),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.TgZ(32,"li",13),n.ALo(33,"translate"),n.TgZ(34,"ul"),n.TgZ(35,"li",7),n.TgZ(36,"a",14),n._uU(37),n.ALo(38,"translate"),n.qZA(),n.qZA(),n.TgZ(39,"li",7),n.TgZ(40,"a",15),n._uU(41),n.ALo(42,"translate"),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.TgZ(43,"li",16),n.ALo(44,"translate"),n.TgZ(45,"ul"),n.TgZ(46,"li",7),n.TgZ(47,"a",17),n._uU(48),n.ALo(49,"translate"),n.qZA(),n.qZA(),n.TgZ(50,"li",7),n.TgZ(51,"a",18),n._uU(52),n.ALo(53,"translate"),n.qZA(),n.qZA(),n.TgZ(54,"li",7),n.TgZ(55,"a",19),n._uU(56),n.ALo(57,"translate"),n.qZA(),n.qZA(),n.TgZ(58,"li",7),n.TgZ(59,"a",20),n._uU(60),n.ALo(61,"translate"),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.TgZ(62,"li",7),n.TgZ(63,"a",21),n._UZ(64,"i",22),n.YNc(65,O,3,3,"span",23),n.qZA(),n.qZA(),n.TgZ(66,"li",7),n.TgZ(67,"a",24),n._UZ(68,"i",25),n.YNc(69,k,3,3,"span",23),n.qZA(),n.qZA(),n.TgZ(70,"li",7),n.TgZ(71,"a",26),n._UZ(72,"i",27),n.YNc(73,P,3,3,"span",23),n.qZA(),n.qZA(),n.TgZ(74,"li",28),n.ALo(75,"translate"),n.TgZ(76,"ul"),n.TgZ(77,"li",7),n.TgZ(78,"a",29),n._uU(79),n.ALo(80,"translate"),n.qZA(),n.qZA(),n.TgZ(81,"li",7),n.TgZ(82,"a",30),n._uU(83),n.ALo(84,"translate"),n.qZA(),n.qZA(),n.TgZ(85,"li",7),n.TgZ(86,"a",31),n._uU(87),n.ALo(88,"translate"),n.qZA(),n.qZA(),n.TgZ(89,"li",7),n.TgZ(90,"a",32),n._uU(91),n.ALo(92,"translate"),n.qZA(),n.qZA(),n.TgZ(93,"li",7),n.TgZ(94,"a",33),n._uU(95),n.ALo(96,"translate"),n.qZA(),n.qZA(),n.TgZ(97,"li",7),n.TgZ(98,"a",34),n._uU(99),n.ALo(100,"translate"),n.qZA(),n.qZA(),n.TgZ(101,"li",7),n.TgZ(102,"a",35),n._uU(103),n.ALo(104,"translate"),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.TgZ(105,"nz-layout"),n.TgZ(106,"nz-header"),n.TgZ(107,"nz-page-header",36),n.TgZ(108,"nz-page-header-title"),n.TgZ(109,"span",37),n.NdJ("click",function(){return a.isCollapsed=!a.isCollapsed}),n._UZ(110,"i",38),n.qZA(),n.qZA(),n.TgZ(111,"nz-page-header-extra"),n.TgZ(112,"span",39),n.TgZ(113,"a",40),n._UZ(114,"i",41),n.ALo(115,"translate"),n.qZA(),n.TgZ(116,"nz-dropdown-menu",null,42),n.TgZ(118,"ul",43),n.TgZ(119,"li",44),n.NdJ("click",function(){return a.changeLanguage("en")}),n._uU(120,"English"),n.qZA(),n.TgZ(121,"li",44),n.NdJ("click",function(){return a.changeLanguage("es")}),n._uU(122,"Espa\xf1ol"),n.qZA(),n.TgZ(123,"li",44),n.NdJ("click",function(){return a.changeLanguage("fr")}),n._uU(124,"fran\xe7ais"),n.qZA(),n.TgZ(125,"li",44),n.NdJ("click",function(){return a.changeLanguage("de")}),n._uU(126,"Deutsch"),n.qZA(),n.TgZ(127,"li",44),n.NdJ("click",function(){return a.changeLanguage("pt")}),n._uU(128,"Portugu\xeas"),n.qZA(),n.TgZ(129,"li",44),n.NdJ("click",function(){return a.changeLanguage("hy")}),n._uU(130,"\u0540\u0561\u0575\u0565\u0580\u0565\u0576"),n.qZA(),n.TgZ(131,"li",44),n.NdJ("click",function(){return a.changeLanguage("ja")}),n._uU(132,"\u65e5\u672c\u8a9e"),n.qZA(),n.TgZ(133,"li",44),n.NdJ("click",function(){return a.changeLanguage("zh")}),n._uU(134,"\u4e2d\u6587"),n.qZA(),n.TgZ(135,"li",44),n.NdJ("click",function(){return a.changeLanguage("ru")}),n._uU(136,"\u0440\u0443\u0441\u0441\u043a\u0438\u0439"),n.qZA(),n.TgZ(137,"li",44),n.NdJ("click",function(){return a.changeLanguage("ur")}),n._uU(138,"\u0627\u0631\u062f\u0648"),n.qZA(),n.TgZ(139,"li",44),n.NdJ("click",function(){return a.changeLanguage("hi")}),n._uU(140,"\u0939\u093f\u0928\u094d\u0926\u0940"),n.qZA(),n.TgZ(141,"li",44),n.NdJ("click",function(){return a.changeLanguage("bn")}),n._uU(142,"\u09ac\u09be\u0982\u09b2\u09be"),n.qZA(),n.TgZ(143,"li",44),n.NdJ("click",function(){return a.changeLanguage("ko")}),n._uU(144,"\ud55c\uad6d\uc5b4"),n.qZA(),n.TgZ(145,"li",44),n.NdJ("click",function(){return a.changeLanguage("id")}),n._uU(146,"Indonesian"),n.qZA(),n.TgZ(147,"li",44),n.NdJ("click",function(){return a.changeLanguage("ar")}),n._uU(148,"\u0627\u0644\u0639\u0631\u0628\u064a\u0629"),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.TgZ(149,"nz-badge",45),n.TgZ(150,"span",46),n.ALo(151,"translate"),n._UZ(152,"i",47),n.qZA(),n.qZA(),n.YNc(153,E,8,5,"ng-template",null,48,n.W1O),n.TgZ(155,"span",37),n.NdJ("click",function(){return a.logout()}),n._UZ(156,"i",49),n.ALo(157,"translate"),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.TgZ(158,"nz-content"),n.TgZ(159,"div",50),n._UZ(160,"router-outlet"),n.qZA(),n.qZA(),n.TgZ(161,"nz-footer"),n.TgZ(162,"span"),n._uU(163),n.ALo(164,"translate"),n.TgZ(165,"a",51),n.ALo(166,"translate"),n._uU(167),n.ALo(168,"translate"),n.qZA(),n._uU(169),n.ALo(170,"translate"),n.qZA(),n.qZA(),n.qZA(),n.qZA()),2&o){const i=n.MAs(117),c=n.MAs(154);n.xp6(1),n.Q6J("nzCollapsed",a.isCollapsed)("nzTrigger",null),n.xp6(2),n.s9C("href",n.lcZ(4,43,"branding.footer.address"),n.LSH),n.xp6(4),n.Oqu(n.lcZ(8,45,"branding.menu.header")),n.xp6(2),n.Q6J("nzInlineCollapsed",a.isCollapsed),n.xp6(1),n.s9C("nzTitle",n.lcZ(11,47,"menu.home.header")),n.xp6(5),n.Oqu(n.lcZ(16,49,"menu.home.overview")),n.xp6(4),n.Oqu(n.lcZ(20,51,"menu.home.dispatcher")),n.xp6(2),n.Q6J("nzTitle",n.lcZ(22,53,"menu.driver.header")),n.xp6(4),n.Q6J("queryParams",n.DdM(105,F)),n.xp6(1),n.Oqu(n.lcZ(27,55,"menu.driver.pendingVerification")),n.xp6(4),n.Oqu(n.lcZ(31,57,"menu.driver.all")),n.xp6(2),n.Q6J("nzTitle",n.lcZ(33,59,"menu.marketing.header")),n.xp6(5),n.Oqu(n.lcZ(38,61,"menu.marketing.coupons")),n.xp6(4),n.Oqu(n.lcZ(42,63,"menu.marketing.announcements")),n.xp6(2),n.Q6J("nzTitle",n.lcZ(44,65,"menu.accounting.header")),n.xp6(5),n.Oqu(n.lcZ(49,67,"menu.accounting.admin")),n.xp6(4),n.Oqu(n.lcZ(53,69,"menu.accounting.fleets")),n.xp6(4),n.Oqu(n.lcZ(57,71,"menu.accounting.drivers")),n.xp6(4),n.Oqu(n.lcZ(61,73,"menu.accounting.riders")),n.xp6(5),n.Q6J("ngIf",!a.isCollapsed),n.xp6(4),n.Q6J("ngIf",!a.isCollapsed),n.xp6(4),n.Q6J("ngIf",!a.isCollapsed),n.xp6(1),n.Q6J("nzTitle",n.lcZ(75,75,"menu.management.header")),n.xp6(5),n.Oqu(n.lcZ(80,77,"menu.management.regions")),n.xp6(4),n.Oqu(n.lcZ(84,79,"menu.management.services")),n.xp6(4),n.Oqu(n.lcZ(88,81,"menu.management.fleets")),n.xp6(4),n.Oqu(n.lcZ(92,83,"menu.management.cars")),n.xp6(4),n.Oqu(n.lcZ(96,85,"menu.management.userRoles")),n.xp6(4),n.Oqu(n.lcZ(100,87,"menu.management.users")),n.xp6(4),n.Oqu(n.lcZ(104,89,"menu.management.paymentGateways")),n.xp6(4),n.Q6J("nzGhost",!1),n.xp6(3),n.Q6J("nzType",a.isCollapsed?"menu-unfold":"menu-fold"),n.xp6(3),n.Q6J("nzDropdownMenu",i),n.xp6(1),n.s9C("nz-tooltip",n.lcZ(115,91,"overview.switch.language")),n.xp6(35),n.Q6J("nzDot",0!==a.stats.complaints||0!==a.stats.driversPending||0!==a.stats.paymentRequests),n.xp6(1),n.s9C("nzPopoverTitle",n.lcZ(151,93,"overview.notification.title")),n.Q6J("nzPopoverContent",c),n.xp6(6),n.s9C("nz-tooltip",n.lcZ(157,95,"overview.logout")),n.xp6(7),n.hij("",n.lcZ(164,97,"branding.footer.prefix")," "),n.xp6(2),n.s9C("href",n.lcZ(166,99,"branding.footer.address"),n.LSH),n.xp6(2),n.Oqu(n.lcZ(168,101,"branding.footer.title")),n.xp6(2),n.hij(" ",n.lcZ(170,103,"branding.footer.suffix"),"")}},directives:[u.hw,u.t7,p.wO,p.rY,v.w,p.r9,g.yS,g.Od,q.Ls,d.O5,u.E8,Z.$O,Z.u9,Z.Jp,m.Ws,m.cm,L.SY,m.RR,M.x7,x.lU,u.OK,g.lC,u.nX,S.SK,U.Dz,g.rH,y.g],pipes:[T.X$],styles:["[_nghost-%COMP%]{display:flex;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;min-height:100vh}.menu-sidebar[_ngcontent-%COMP%]{position:relative;z-index:10;min-height:100vh;box-shadow:2px 0 6px #00152959}.header-trigger[_ngcontent-%COMP%]{height:64px;padding:20px 0;font-size:20px;cursor:pointer;transition:all .3s,padding 0s}.trigger[_ngcontent-%COMP%]:hover{transition:linear .3s;color:#009688}.sidebar-logo[_ngcontent-%COMP%]{position:relative;height:64px;padding-left:24px;overflow:hidden;line-height:64px;transition:all .3s}.sidebar-logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{display:inline-block;height:32px;width:32px;vertical-align:middle}.sidebar-logo[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{display:inline-block;margin:0 0 0 20px;font-weight:600;font-size:14px;vertical-align:middle}nz-header[_ngcontent-%COMP%]{padding:0;width:100%;z-index:2}.app-header[_ngcontent-%COMP%]{position:relative;height:64px;padding:0;background:#fff;box-shadow:0 1px 4px #00152914}nz-content[_ngcontent-%COMP%]{margin-top:24px;margin-left:24px;margin-right:24px}.inner-content[_ngcontent-%COMP%]{padding-left:16px;padding-right:16px}nz-footer[_ngcontent-%COMP%]{text-align:center}.not-desc[_ngcontent-%COMP%]{margin-left:10px}.not-avatar[_ngcontent-%COMP%]{margin:5px;cursor:pointer}.not-avatar[_ngcontent-%COMP%]:hover{transition:linear .2s;opacity:.7}nz-divider[_ngcontent-%COMP%]{margin-top:7px;margin-bottom:7px}"],data:{animation:[z]}}),e})(),children:[{path:"",pathMatch:"full",redirectTo:"home"},{path:"home",children:[{path:"",redirectTo:"overview"},{path:"overview",loadChildren:()=>Promise.all([t.e(592),t.e(533)]).then(t.bind(t,6533)).then(e=>e.OverviewModule)},{path:"dispatcher",loadChildren:()=>Promise.all([t.e(592),t.e(899)]).then(t.bind(t,6899)).then(e=>e.DispatcherModule)}]},{path:"drivers",loadChildren:()=>Promise.all([t.e(592),t.e(266)]).then(t.bind(t,7266)).then(e=>e.DriversModule)},{path:"riders",loadChildren:()=>Promise.all([t.e(592),t.e(802)]).then(t.bind(t,4802)).then(e=>e.RidersModule)},{path:"marketing",loadChildren:()=>t.e(688).then(t.bind(t,7688)).then(e=>e.MarketingModule)},{path:"financials",loadChildren:()=>t.e(56).then(t.bind(t,3056)).then(e=>e.FinancialsModule)},{path:"requests",loadChildren:()=>Promise.all([t.e(592),t.e(432)]).then(t.bind(t,1432)).then(e=>e.RequestsModule)},{path:"complaints",loadChildren:()=>Promise.all([t.e(592),t.e(388)]).then(t.bind(t,1388)).then(e=>e.ComplaintsModule)},{path:"management",loadChildren:()=>t.e(42).then(t.bind(t,5042)).then(e=>e.ManagementModule)}]}];let H=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[[g.Bz.forChild(_)],g.Bz]}),e})();var X=t(4534);let G=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[[d.ez,H,X.m]]}),e})()}}]);