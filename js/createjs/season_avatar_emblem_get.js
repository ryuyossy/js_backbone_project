define(function(){var e={lib:{},initialize:function(e,t,n){(function(e,n,r){var i;(e.season_avatar_emblem_get=function(n,i,s){s==null&&(s=!1),this.initialize(n,i,s,{checkTarget:61,checkTarget:62,fromEmblemFadeOut:63,targetEmblemFadeIn:64,checkNextEmblem:65,checkAvatarGet:66,avatarGetPika:67,avatarGetText:87,checkStone:111,stone:112,endframe:113},!0),this.frame_0=function(){var n={before_emblems:[{emblem_id:"21003",emblem_name:"無気力のエンブレム",avatar_id:"21003",avatar_header_name:"【五月病】",avatar_name:"ランサー（女）",current_num:4,max_num:4,won_flg:!0},{emblem_id:"13003",emblem_name:"鯉のエンブレム",avatar_id:"13003",avatar_header_name:"【鯉のぼり】",avatar_name:"サムライ（男）",current_num:3,max_num:4,won_flg:!1},{emblem_id:"31003",emblem_name:"母のエンブレム",avatar_id:"31003",avatar_header_name:"【母の日】",avatar_name:"魔術師（女）",current_num:4,max_num:4,won_flg:!0}],current_emblems:[{emblem_id:"21003",emblem_name:"無気力のエンブレム",avatar_id:"21003",avatar_header_name:"【五月病】",avatar_name:"ランサー（女）",current_num:4,max_num:4,won_flg:!0},{emblem_id:"13003",emblem_name:"鯉のエンブレム",avatar_id:"13003",avatar_header_name:"【鯉のぼり】",avatar_name:"サムライ（男）",current_num:4,max_num:4,won_flg:!0},{emblem_id:"31003",emblem_name:"母のエンブレム",avatar_id:"31003",avatar_header_name:"【母の日】",avatar_name:"魔術師（女）",current_num:4,max_num:4,won_flg:!0}],win_emblem_ids:["21003"],win_avatars:[],surplus_emblem_flg:!0};typeof t=="undefined"?this.json=n:this.json=t;var r=this;r.emblem_ids=r.json.current_emblems.map(function(e){return e.emblem_id}),r.getRowByEmblemId=function(e){var t=r.emblem_ids.indexOf(e);return t==-1?!1:t},r.getRowByAvatarId=r.getRowByEmblemId,r.win_emblem_pointer=0,r.json.win_emblem_ids.forEach(function(t,n){var i=r["win_emblem_"+n];i.win_emblem=new e.win_emblem,i.addChild(i.win_emblem);var s=r.getRowByEmblemId(t),o=i.win_emblem.emb_box;o.emb=new e["emb"+s],o.addChild(o.emb)}),r.json.before_emblems.forEach(function(t,n){var i=r.getRowByEmblemId(t.emblem_id);for(var s=0;s<t.current_num;s++){var o=r["total_emblem_"+n+"_"+s];o.total_emblem=new e.total_emblem,o.addChild(o.total_emblem);var u=o.total_emblem.emb_box_2;u.emb=new e["emb"+i],u.addChild(u.emb)}})},this.frame_39=function(){var e=this;e.json.win_emblem_ids.forEach(function(t,n){var r=e["win_emblem_"+n];r.win_emblem.gotoAndPlay("pika")})},this.frame_50=function(){var e=this;e.json.win_emblem_ids.forEach(function(t){var n=e.getRowByEmblemId(t),r=e.json.before_emblems[n],i=e.json.current_emblems[n];if(r.current_num<i.current_num)for(var s=r.current_num;s<i.current_num;s++){var o=e["total_emblem_"+n+"_"+s];o.gotoAndPlay("pika")}})},this.frame_61=function(){var e=this;e.stones=[]},this.frame_62=function(){var e=this;do{e.from_emblem=e["win_emblem_"+e.win_emblem_pointer].win_emblem;var t=e.getRowByEmblemId(e.json.win_emblem_ids[e.win_emblem_pointer]),n=e.json.before_emblems[t];if(n.current_num<n.max_num)break;e.stones.push(e.from_emblem),e.win_emblem_pointer++}while(e.win_emblem_pointer<e.json.win_emblem_ids.length);e.stones.length==e.json.win_emblem_ids.length||e.win_emblem_pointer>=e.json.win_emblem_ids.length?e.gotoAndPlay("stone"):(e.target_emblem=e["total_emblem_"+t+"_"+n.current_num],e.row=t,n.current_num++,e.gotoAndPlay("fromEmblemFadeOut"))},this.frame_63=function(){var e=this;e.from_emblem.gotoAndPlay("fadeOut"),this.stop()},this.frame_64=function(){var t=this,n=t.target_emblem.emb_box_2;n.emb=new e["emb"+t.row],n.addChild(n.emb),t.target_emblem.gotoAndPlay("fadeIn"),this.stop()},this.frame_65=function(){var e=this;e.win_emblem_pointer++,e.json.win_emblem_ids[e.win_emblem_pointer]&&e.gotoAndPlay("checkTarget")},this.frame_66=function(){var e=this;if(!e.json.win_avatars||e.json.win_avatars.length==0)e.stones.length>0?e.gotoAndPlay("stone"):this.gotoAndPlay("endframe")},this.frame_67=function(){var e=this;e.json.win_avatars.forEach(function(t,n){var r=t.avatar_id,i=e.getRowByAvatarId(r);for(var n=0;n<e.json.before_emblems[i].max_num;n++){var s=e["total_emblem_"+i+"_"+n];s.gotoAndPlay("avatarPika")}})},this.frame_87=function(){var t=this;t.json.win_avatars.forEach(function(n,r){var i=n.avatar_id,s=new e.avatar_get_mc;t.avatar_get_box.addChild(s),s.y=72*t.getRowByAvatarId(i)-7,t.avatar_get_box["avatar_get_"+r]=s})},this.frame_111=function(){var e=this;e.stones.length>0?e.gotoAndPlay("stone"):this.gotoAndPlay("endframe")},this.frame_112=function(){var e=this;for(var t=0;t<e.stones.length;t++){var n=e.stones[t];n.gotoAndPlay("stone")}this.gotoAndPlay("endframe")},this.frame_113=function(){var e=this},this.timeline.addTween(r.Tween.get(this).call(this.frame_0).wait(39).call(this.frame_39).wait(11).call(this.frame_50).wait(11).call(this.frame_61).wait(1).call(this.frame_62).wait(1).call(this.frame_63).wait(1).call(this.frame_64).wait(1).call(this.frame_65).wait(1).call(this.frame_66).wait(1).call(this.frame_67).wait(20).call(this.frame_87).wait(24).call(this.frame_111).wait(1).call(this.frame_112).wait(1).call(this.frame_113).wait(10));var o=new r.Shape;o._off=!0,o.graphics.p("AZA4/MAAAAx/Mgx/AAAMAAAgx/MAx/AAA").cp(),o.setTransform(160,160),this.instance=new e.avatar_get_mc,this.instance.setTransform(-149.8,-42.5,1,1,0,0,0,-152.9,129.4),this.instance_1=new e.win_emblem,this.instance_1.setTransform(35.4,-36.5,1,1,0,0,0,26.5,26),this.instance.mask=this.instance_1.mask=o,this.timeline.addTween(r.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(124)),this.avatar_get_box=new e.avatar_get_box,this.avatar_get_box.setTransform(.5,.5,1,1,0,0,0,.5,.5),this.avatar_get_box.mask=o,this.timeline.addTween(r.Tween.get({}).to({state:[{t:this.avatar_get_box}]}).wait(124)),this.instance_2=new e.embGET_1,this.instance_2.setTransform(-151.3,57,1,1,0,0,0,159.5,30.5),this.instance_2._off=!0,this.instance_2.mask=o,this.timeline.addTween(r.Tween.get(this.instance_2).wait(13).to({_off:!1},0).to({x:161.7},3).to({_off:!0},23).wait(85)),this.shape=new r.Shape,this.shape.graphics.f("rgba(0,0,0,0.502)").s().p("AbkgDIgSgBIDrgFIlEgPIlygFIEMARImigSIGTgOIpCAAIgWACIgEACIixAGQjCgPizAZIjUgBIGlAYIkwgGIhGAHIBnACIgmAFIGlgBIh8AFIHfAiIhBgJIKrAFIn9ggIDVgJICEAPIHcgFIldgMIB5gBAMkgeID/AUIhcAEQhSgPhRgJIAAAAAqKAPIHdgFIldgMIB4gBIgRgBIDqgFIlDgPIlygFIEMARImigSIGSgOIpCAAIgVACIgFACIixAGQjBgPi0AZIjTgBIGkAYIkwgGIhFAHIBnACIgmAFIGkgBIh7AFIHeAiIhAgJIKqAFIn9ggIDVgJICEAPAxTgKIhbAEQhTgPhQgJID+AU").cp(),this.shape.setTransform(178.3,58.6),this.shape_1=new r.Shape,this.shape_1.graphics.f("rgba(0,0,0,0.502)").s().p("AQngPIF4gPIoGguIpTgRIGuA1Iqeg6IKGgrIueAAIgiAFIgIAGIkbAVQk3gykfBTIlUgHIKiBOInngWIhvAYIClAKIg9ARIKjgFIjHATIMABoIhogdIRFAVIswhnIFVgfIDVAwIL7gQIovgoIDBgFIgcgCAi4gUQiZg4iSgbIG9BFIiSAO").cp(),this.shape_1.setTransform(147.7,58.6),this.shape_2=new r.Shape,this.shape_2.graphics.f("rgba(0,0,0,0.502)").s().p("AbWDeMg2rAAAIAAm7MA2rAAAIAAG7").cp(),this.shape_2.setTransform(164.1,58.6),this.shape.mask=this.shape_1.mask=this.shape_2.mask=o,this.timeline.addTween(r.Tween.get({}).to({state:[]}).to({state:[{t:this.shape}]},14).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[]},23).wait(85)),this.win_emblem_4=new e.win_emblem_box,this.win_emblem_4.setTransform(270.5,57.7,1,1,0,0,0,26.5,26),this.win_emblem_3=new e.win_emblem_box,this.win_emblem_3.setTransform(215.5,58,1,1,0,0,0,26.5,26),this.win_emblem_2=new e.win_emblem_box,this.win_emblem_2.setTransform(160.5,58,1,1,0,0,0,26.5,26),this.win_emblem_1=new e.win_emblem_box,this.win_emblem_1.setTransform(104.5,58,1,1,0,0,0,26.5,26),this.win_emblem_0=new e.win_emblem_box,this.win_emblem_0.setTransform(48.5,58,1,1,0,0,0,26.5,26),this.win_emblem_4.mask=this.win_emblem_3.mask=this.win_emblem_2.mask=this.win_emblem_1.mask=this.win_emblem_0.mask=o,this.timeline.addTween(r.Tween.get({}).to({state:[{t:this.win_emblem_0},{t:this.win_emblem_1},{t:this.win_emblem_2},{t:this.win_emblem_3},{t:this.win_emblem_4}]}).wait(124)),this.total_emblem_0_0=new e.total_emblem,this.total_emblem_0_0.setTransform(123.5,128,1,1,0,0,0,26.5,26),this.total_emblem_0_3=new e.total_emblem,this.total_emblem_0_3.setTransform(268.5,128,1,1,0,0,0,26.5,26),this.total_emblem_0_2=new e.total_emblem,this.total_emblem_0_2.setTransform(220.5,128,1,1,0,0,0,26.5,26),this.total_emblem_0_1=new e.total_emblem,this.total_emblem_0_1.setTransform(172.5,128,1,1,0,0,0,26.5,26),this.total_emblem_1_3=new e.total_emblem,this.total_emblem_1_3.setTransform(268.5,203,1,1,0,0,0,26.5,26),this.total_emblem_2_3=new e.total_emblem,this.total_emblem_2_3.setTransform(268.5,276,1,1,0,0,0,26.5,26),this.total_emblem_1_2=new e.total_emblem,this.total_emblem_1_2.setTransform(220.5,203,1,1,0,0,0,26.5,26),this.total_emblem_2_2=new e.total_emblem,this.total_emblem_2_2.setTransform(220.5,276,1,1,0,0,0,26.5,26),this.total_emblem_1_1=new e.total_emblem,this.total_emblem_1_1.setTransform(172.5,203,1,1,0,0,0,26.5,26),this.total_emblem_2_1=new e.total_emblem,this.total_emblem_2_1.setTransform(172.5,276,1,1,0,0,0,26.5,26),this.total_emblem_1_0=new e.total_emblem,this.total_emblem_1_0.setTransform(123.5,203,1,1,0,0,0,26.5,26),this.total_emblem_2_0=new e.total_emblem,this.total_emblem_2_0.setTransform(123.5,276,1,1,0,0,0,26.5,26),this.total_emblem_0_0.mask=this.total_emblem_0_3.mask=this.total_emblem_0_2.mask=this.total_emblem_0_1.mask=this.total_emblem_1_3.mask=this.total_emblem_2_3.mask=this.total_emblem_1_2.mask=this.total_emblem_2_2.mask=this.total_emblem_1_1.mask=this.total_emblem_2_1.mask=this.total_emblem_1_0.mask=this.total_emblem_2_0.mask=o,this.timeline.addTween(r.Tween.get({}).to({state:[{t:this.total_emblem_2_0},{t:this.total_emblem_1_0},{t:this.total_emblem_2_1},{t:this.total_emblem_1_1},{t:this.total_emblem_2_2},{t:this.total_emblem_1_2},{t:this.total_emblem_2_3},{t:this.total_emblem_1_3},{t:this.total_emblem_0_1},{t:this.total_emblem_0_2},{t:this.total_emblem_0_3},{t:this.total_emblem_0_0}]}).wait(124)),this.instance_3=new e.BS,this.instance_3.setTransform(161,139,1,1,0,0,0,160,137),this.instance_3.mask=o,this.timeline.addTween(r.Tween.get({}).to({state:[{t:this.instance_3}]}).wait(124)),this.shape_3=new r.Shape,this.shape_3.graphics.f("#544123").s().p("A4/ZAMAAAgx/MAx/AAAMAAAAx/Mgx/AAA").cp(),this.shape_3.setTransform(160.4,160),this.shape_3.mask=o,this.timeline.addTween(r.Tween.get({}).to({state:[{t:this.shape_3}]}).wait(124))}).prototype=i=new r.MovieClip,i.nominalBounds=new r.Rectangle(-309.4,-67.6,651.7,389.7),(e.abaGET=function(){this.initialize(n.abaGET)}).prototype=new r.Bitmap,i.nominalBounds=new r.Rectangle(0,0,319,49),(e.emb_efe=function(){this.initialize(n.emb_efe)}).prototype=new r.Bitmap,i.nominalBounds=new r.Rectangle(0,0,53,52),(e.emb0=function(){this.initialize(n.emb0)}).prototype=new r.Bitmap,i.nominalBounds=new r.Rectangle(0,0,53,52),(e.emb1=function(){this.initialize(n.emb1)}).prototype=new r.Bitmap,i.nominalBounds=new r.Rectangle(0,0,53,52),(e.emb2=function(){this.initialize(n.emb2)}).prototype=new r.Bitmap,i.nominalBounds=new r.Rectangle(0,0,53,52),(e.embGET=function(){this.initialize(n.embGET)}).prototype=new r.Bitmap,i.nominalBounds=new r.Rectangle(0,0,319,55),(e.items_15_stone1=function(){this.initialize(n.items_15_stone1)}).prototype=new r.Bitmap,i.nominalBounds=new r.Rectangle(0,0,128,128),(e.zabu=function(){this.initialize(n.zabu)}).prototype=new r.Bitmap,i.nominalBounds=new r.Rectangle(0,0,320,320),(e.items_15_stone1_1=function(){this.initialize(),this.instance=new e.items_15_stone1,this.addChild(this.instance)}).prototype=i=new r.Container,i.nominalBounds=new r.Rectangle(0,0,128,128),(e.embGET_1=function(){this.initialize(),this.instance_1=new e.embGET,this.instance_1.setTransform(20.2,8.9,.874,.874),this.addChild(this.instance_1)}).prototype=i=new r.Container,i.nominalBounds=new r.Rectangle(20.2,8.9,278.8,48.1),(e.emb_efe_1=function(){this.initialize(),this.instance_2=new e.emb_efe,this.addChild(this.instance_2)}).prototype=i=new r.Container,i.nominalBounds=new r.Rectangle(0,0,53,52),(e.BS=function(){this.initialize(),this.instance_3=new e.zabu,this.addChild(this.instance_3)}).prototype=i=new r.Container,i.nominalBounds=new r.Rectangle(0,0,320,320),(e.avatarGET=function(){this.initialize(),this.instance_4=new e.abaGET,this.instance_4.setTransform(-1.5,6.5),this.addChild(this.instance_4)}).prototype=i=new r.Container,i.nominalBounds=new r.Rectangle(-1.5,6.5,319,49),(e.win_emblem_box=function(){this.initialize(),this.shape=new r.Shape,this.shape.graphics.f("rgba(255,255,255,0.008)").s().p("AiKhtIEWAAIAADbIkWAAIAAjb").cp(),this.shape.setTransform(.5,.5,.036,.045),this.addChild(this.shape)}).prototype=i=new r.Container,i.nominalBounds=new r.Rectangle(0,0,1,1),(e.emb_box=function(){this.initialize(),this.shape_1=new r.Shape,this.shape_1.graphics.f("rgba(255,255,255,0.008)").s().p("AC+BuIl7AAIAAjbIF7AAIAADb").cp(),this.shape_1.setTransform(.5,.5,.026,.045),this.addChild(this.shape_1)}).prototype=i=new r.Container,i.nominalBounds=new r.Rectangle(0,0,1,1),(e.avatar_get_box=function(){this.initialize(),this.shape_2=new r.Shape,this.shape_2.graphics.f("rgba(255,255,255,0.008)").s().p("AhjiBIDHAAIAAEDIjHAAIAAkD").cp(),this.shape_2.setTransform(.5,.5,.05,.038),this.addChild(this.shape_2)}).prototype=i=new r.Container,i.nominalBounds=new r.Rectangle(0,0,1,1),(e.pukapika=function(t,n,i){i==null&&(i=!1),this.initialize(t,n,i,{},!0),this.instance_5=new e.emb_efe_1,this.instance_5.setTransform(26.5,26,1,1,0,0,0,26.5,26),this.timeline.addTween(r.Tween.get(this.instance_5).to({alpha:0},2).to({_off:!0},1).wait(1).to({alpha:1,_off:!1},0).to({alpha:0},2).to({_off:!0},1).wait(1))}).prototype=i=new r.MovieClip,i.nominalBounds=new r.Rectangle(0,0,53,52),(e.win_emblem=function(t,n,i){this.initialize(t,n,i,{pika:1,fadeOut:20,stone:29},!0),this.frame_0=function(){this.stop()},this.frame_19=function(){this.stop()},this.frame_28=function(){this.parent.parent.gotoAndPlay("targetEmblemFadeIn"),this.stop()},this.frame_39=function(){this.stop()},this.timeline.addTween(r.Tween.get(this).call(this.frame_0).wait(19).call(this.frame_19).wait(9).call(this.frame_28).wait(11).call(this.frame_39)),this.shape_3=new r.Shape,this.shape_3.graphics.f("#CCCCCC").s().p("AgVgmIABAAQACABADABQACABADABQAEADADAFIgCAJQgBABABABIABAAQABAAAAAAQABAAAAgBIACgJIAEgEQAHABADADQADACgBABIAAABIgBAAQgHABgEAFQgEAEAAAHQAAABAAAAQAAABABAAQAAAAAAgBQABAAAAgBQAAgFAFgFQADgDAHAAIAJACQACAAADAEIgFAHQAAABAAAAIAAABQAAAAAAABIAAABQABACAAAEQgBAFgDAEQgBACgDAAQgGACgGAAQgBAAgBAAQAAABAAABQAAABAAAAQABABABAAQAHABAGgDQAEgCACgCQAEgFABgGQAAgFgBgCQAAgBAAAAIgBgBIAFgHQAAgBAAAAIAAgBQgDgHgFAAIgHgBQACgDgEgEQgDgEgJgBQAAgCABgCQABgFACgDQADgFAFgCQAFgCAEAAQAHAAAFACQAIACAFAFQADAJgCAFQgCAGgEAFQgCAAAAAAQAAABAAAAIAAABQAFADABAFIAAgBQADAFABAFQACAFgCAHQgBAGgDAFQgBADgCACQgBABgEABIgJgGQAAAAgBAAQgBAAAAAAQAAABAAAAQgBADgCADQAAADgCADQgCAEgFAFQgEAEgEABQgEACgFAAQgDABgGAAQgGAAgFgDQgEgEgDgFQgDgEgBgFQAAgCAAgDQAAgDABgDIAFAAIgFAEQgBABAAABQAAAAABABIACAAIAJgHIAAgBQAAgBAAgBQAAAAgBAAQAAAAAAAAIgLAAQgBAAgBAAQgBAAAAAAIgBAAQgEADgEAAQgEACgDgCQgDAAgCgDQgBgEACgEQABgDADgBQADgCACgBQAEgCAEgBQABAAAAAAQAAgBAAAAIAAAAQAAAAgBAAQgEgBgDgCQgCgCgBgBQgBgCgBgBQgCgGACgGQACgGAEgEQACgCACgCQAFgDAHAAQACAAACAAIAAAA").cp(),this.shape_3.setTransform(26.1,24.8),this.shape_4=new r.Shape,this.shape_4.graphics.f("#999999").s().p("AAShaIABAAQABAAAAgBQAVgSAVAMIAAAJQAAABAAAAIAJAJQAAAAABAAIAcACIgDAEIAAABIAAAHQAAABAAABIAXAKIAAAHIgIAGQAAAAAAABQgBAAABAAQAAABAAABIAPAMQAAABAAAAIAJAAIgMAGIgBAAIAAAAIgDAJQAAABAAAAQABABAAAAIAIADIABABQAAABABAAIACABIABAAIAAAAIAFACIgDAEIgwAAIgGgEIgCAAQgBAAAAABIAAABQAAABABAAIAHAFQAAAAAAAAIAmAAIAAATQAAAAAAABIAPAUIgXADIAAAAIgEAFIAAAIQAAABABAAIADAEIgDAAQgBAAgBgBQgKgIgOAAIgWgPQAAAAgBAAQAAAAgBABQgBABABAAIABABIAVAPIgEALQAAABAAAAQAAABAAAAIAPAHIgLAAQAAAAAAAAIgJAGIgVgGQgBAAAAAAIgBAAIgNAKIgBAAIAAAKQgBgBgBAAQAAAAgBAAIgvAKIgDgHQgBAAAAgBIAAAAIgUgDQgBAAAAABIgMAJIAAgcIgBAAIgHgLQAAAAgCAAIgRgDIgGgVIAAAAQAAgBgBAAIgBAAIAAgJIgMgRQAAAAAAAAQAAgBgBAAIgGAAIgEgFQgBAAAAAAIghAAIADgPIAYgBQACAAAAAAIAGgCQAAAAAAgBIAAgKIgDgDQAAgBgCAAIgTgDIgDgCIAPgKIAAAAQAAgBAAgBIgDgaQAAgBAAAAQAAgBgBAAIgOgDIgBgMIAJAJIABAAIAbgDIABAAQAAgBAAAAIADgGIAAABQAAABAAAAQABABABAAQABAAAAgBQAAAAAAAAQAEgLAPgDIAEABQAKAEADAJIABABIAEAAQAAAAABAAQAAgBAAAAQAAgBgBAAQgIgLAKgJQACgCABABQABABACAFQAAABAAAAQABABABgBQABAAAAAAQAMgUAIgCQAMgDANAGIAMASQAAAAAAABIAAAAAAkhCIgBALIgHAIQgBABAAAAIAAANIgEAAIgCgQQgBAAAAgCQAAAAgBAAIgdgBIAAgCQAAAAgCAAIgJgBIgEgJQAAgBAAgBIgCAAQAAAAAAABIgBABIAAAJIgTARIgbgDIgEgFIAAgFIgGgIQgBgBAAAAQgBAAAAAAQgBABAAABQAAAAAAAAIAFAJIAAADQAAABABAAIAFAHQAAAAAAAAIABAAIAXADIAVAXIAAAaIgTAGQgBABgBABQAAAAAAABQAAAAABABIAkATIgEAAQAAAAAAABQgBAAAAABIgPAWQAAABAAAAQAAABABAAIAEAAIAGgEIAYAAIACAGQAAABABAAIADACIAAAHQAAAAAAABQABAAABAAIAAAAQABAAABAAIAQgSIAUABQABAAABAAIAAAAIABgCQAAAAgBgBIgCgEIAAAAQAAAAAAAAIgGgCIgCgOIAKgLIAQgCIABAAQAAgBAAAAQAAgBAAgBIAAAAIgIgEIAEgLIAEAAQABAAAAgBQAAAAAAgCIgQgOIAAgEIABAAQAAgBAAgBIABAAIAEgCQAAAAAAgBIAHgNQAAgBAAAAQAAgBAAAAQgBAAAAAAIgHAAIgMAJIgFAAIgFgEIAAgCQAAgBAAAAIgCAAIAAgFIAAgMIAHgIQAAgBAAAAIACgKIAGACQAAAAABgBQABAAAAgBIAAgBQgBgBgBAAIgIgBIgBAAQgBAAAAAAIAAABAgZg2QABAAAAAAIAAACIABAAQAAABABAAIAKAAIACACQAAAAAAAAIAcABIACAPQgBAAgBAAIgCACIgXgBQAAgBAAABQgCABAAAAIgBALIgTAGIgRgUIAAAAQABAAAAAAIAUgTIAAgBAB1AVQgTgEgTAAIgBAAQAAAAAAABQAAABAAABIABAAQATAAASAEQABABADABQABAAABAAQAAgBAAgBIAAgBQAAAAgBgBQgCAAgCgBIAAAA").cp(),this.shape_4.setTransform(26.5,23.6),this.shape_5=new r.Shape,this.shape_5.graphics.f("#CCCCCC").s().p("ACtiLIAAAqQAAAAABABQAAABABAAIAGAAIAIAGIAAAMQAAABABAAIAYACIABABIAAAKIgDACQgBAAAAABIAAALIgKAAIgFADIgGAAQgBAAAAABQAAABAAAAQAAABAAAAQAAABABAAIAIAAIAEgEIATAAIACARIgQAHIAAAAIgBACQgBABAAAAQABABAAAAQABAAAAAAIAUAAIAIAKIAAAuIgeAcIgjgBQgBAAAAAAQgBAAAAABIAAABIADANQAAABABAAIAOAMIgCAWIgBACIgUABQAAAAgBABQAAAAAAABIAAAEIgGAGIgdgEQAAAAgBAAQgBAAAAAAIgIAaIgIADQgBAAAAABQAAAAAAABIgBAEIgbAAIAAgBQAAAAAAAAQgCAAAAAAIgCAAIgFgGQgBAAgBAAQgBAAAAAAQgEAFgEAEQgDADgEACQgDAEgEACQgFAEgGAEIgxgEIAAgBQAAgBAAAAIgPgMIAAgBIgBgBQgBgBAAABIgFABQgBAAAAAAIgDAEIgmAGIgNgJIAAgBQAAgBAAgBQgBAAAAAAIglAAIgCgBQgBAAgBAAIgFAAIgMgJIgCgQQAAgBAAAAQgBgBAAAAQgIAAgHgDQgLgEgHgLQgDgDgBgDQgDgEgBgGIAAAAQAAgCgBAAIgdAAIgJgHIABgUIAMgHQABAAAAgBIAFgTIAJgHQAGAFAJABQABAAABAAQABAAABgBQAAgBAAgBQAAAAgBgBQgBAAAAAAQgBAAgBAAQgIAAgGgFQAAgCgBAAQgCgCgBgBQAAgBgBgBQgBgBgBAAQAAgBAAgCQAAAAAAgBQAAgCgCAAIAAAAQAAgBAAgBQAAgBAAAAQAAgBgBAAIgPABIAAgDIAAAAQAAgBgCAAIgDgCIAPgvIABAAQABAAABgBQAAAAAAgBIAAgoIAWgTIAcABQABAAAAAAIABgBQAAAAAAgBIgDgNIgBAAQAAgBAAAAIgEgBIAAgGQADgCACgEQADgEADgDQADgCAEAAQAGgBABgCQAAgBABAAQADAAAFgDQAFgDAEAAQAFAAAGABIABAAIAAgBQABAAAAgBIAAgHQAGgCAFAAQAEAAAEgBQACgBAEABQAFAAACABQADAAACACQACACACACIAAAFQAAABABAAIAAABQACAAAAgBIAGgDQABgBABgBIACgFIAIgGIAAgBIAAgCIACAAQAAAAAAAAQAAgBAAgBIACgHQAUgRAVAMQABAAABAAQAHAAAAAKQAAABABAAQABABAAAAQABAAAAAAQAYgSAYARIABADQAAAAABABIAEADIABAAQAAAAACAAIALgLQAdgMAfAOIABARQAAABAAAAIABAAIAfADIAJAHACNACIgGgCIgBgBIAAAAIgBAAIgCgBIAAgCQgBAAgBAAIgGgDIABgGIATgIIABgBIAAgBQAAAAgBgBQAAAAgBAAIgPAAIgNgMIAIgEQAAgBAAAAIAAgKQAAgBAAAAQAAgBgBAAIgXgKIAAgFIAEgEQAAgBAAAAIAAgDIAJgHIARAAQABAAAAgBQABgBAAAAQAAgBgBAAQAAgBgBAAIgRABQgBAAAAABIgNAIIgagCIgIgIIAAgKQAAAAAAgBIAAAAQgWgNgXASIgKgRQgBAAgBAAQgNgHgOAEQgIABgMASQgCgDgBgBQgDgDgFAFQgHAHAAAHQgDgFgHgCIAAAAIgDgBIgCAAQgMACgGAHIAAgBIAAAAQgCgBAAABQgBAAAAAAIgGAKIgZAEIgLgLQAAgBgBAAQAAAAAAAAQgBAAAAABQgBAAAAABIABARQAAABABAAIAAAAIAPAEIACAZIgPAJIAAABQgBAAAAABQABABAAAAIAEAFIABABIAUACIADADIAAAHIgFABIgaABQgBAAAAABIgDARIAAACIgcAMQgBAAAAABIAAABQAAABABAAQAAAAAAAAIAegNQAAgBAAAAIAhAAIAEAFIAAABIAHAAIAKAQIAAAIQAAAAAAABIABABIACAAIAFAVQAAAAAAABQABAAABAAIASADIAHAJIAAAqIgMAAQgBAAgBAAIgKAMQgBABAAAAQAAABABAAQAAABABAAQABAAAAgBIALgLIANAAQABAAAAAAQAAgBAAAAIAAgNIAPgKIARACIAEAIIABAAQABAAAAAAIAugJIAJAdQAAABAAABQAAAAABAAIAHAAIADACQABAAABAAIADAAQABAAABAAIAAgBQAAgBAAAAQgBgBgBAAIgDAAIgEgCQAAAAAAAAIgGAAIgGgXIAAAAQAAAAAAgBIABgPIALgJIAXAHQABAAAAAAIABgBIAIgGIATAAIAAgBQABAAAAgBQAAgBgBAAQAAAAAAgBIgWgIIAFgLQALAAAJAHQACACABAAIALAAQAAAAAAgBQAAgBAAAAIgGgHIAAgGIACgDIAXgDQABAAABgBQAAAAAAgBQAAgBAAAAIgQgWIAAgSIAIAAQABAAABAAQAAAAAAgCIAEgGIAAgBQAAgBAAAAIAAAA").cp(),this.shape_5.setTransform(26.7,23.4),this.shape_6=new r.Shape,this.shape_6.graphics.f("#666666").s().p("AAFgSIABgBIALABIACANIgJAIIgKAJIgBAAIgBAHIgJABIgHgKIADgKIAPgMIAEAFQAAABABAAIABAAQABAAAAgBQAAAAAAgBIgCgK").cp(),this.shape_6.setTransform(17.3,16),this.shape_7=new r.Shape,this.shape_7.graphics.f("#E8E8E8").s().p("AjdjyIARgNQAMgGALgFICDAJQABAAABACIABAAIgFAQQAAAAAAABIAKAaIgLAKIgSgNQgBAAgBAAQAAAAgBAAQAAABAAABQAAAAABABQAOALgBAFQgCAFgVgCIAAAAIgUgEQAAAAgBAAQAAAAAAABQgBAAABABQAAABAAAAQAHAEACAEQABABABABQABACgBABQgCAGgPADIgZgBIgBAAQgBABAAAAQAAABAAABQABAAABAAQANAEAAAFQAAADgNAFQgBAAgBABQgCgFgEgCQgJgFgSAHQgBAAgBABQAAABAAAAQABAMgLADQgLAEgZgEIgMgIIgHgQIAAAAIgUgNIAAgjIASgdQAAAAAAgBIASAAQAAAAAAAAIAAAAAFKhNQAEAEAEAGQACAIAAANQAAAPgRAHQgEADgMADQgHACgFACQgFgBgDABQgJAAgFAEIgJAAQAFgIAdgLIAAAAQABgBAAAAIAAgHQAAgBgBgBIAAAAQgEgEgDgFQAAgCABgCQAAgDACgDQABgEADgCIADgCQABAAAAgBQAJgPAJAAQADAAAFADQABABABABIAAAAAFiABQADACAAAHQgBACgBACQgCAEAAACQAAAEAFAIQAEAHAAAJQAAAIgBADQAAACgDACQgBAAAAAAIgBABQACARABATQAAAEAAACQAAACgBABQgFgBgJgJQgJgJgFgDQgEgDgBABQgDAAAAADQAAAFABAKQAAAIgBAEQgEAEgIABQgFgBgMgEQgNgDgPAAIAAAAQgRABgJAAQgGAAgDgBQgGgDAAgFQAAgCACgDQABgCADgDQAIgKAAgNIgBgFQAFgBAEgBIABAAQAMgDAKACIAAgBQACgBAAAAQADgSANgTQAHgLAFgNQACgBADgCIAAAAQABAAACgBQADgBAHAAQAGAAADADQAGACAGABQAIABAIgBIAAAAAEBiLQACgBABAAQAIgCADAAQABAEAAAJQAAAHgBADQgCABgDABQgEABgBADQgBACgBACQgEABgJAMQgIALgFABQAAgBgKgIQgMgJgGgDQgDgJAEgHQAFgHAPgFQAHgDARgDQADAAAEAAIAAAAACoCaIAAABQAVAJAPAAQAKABARgBQADABACABIAAAAQAHABAAAGQAAAKAGAJQAGAIAAAIQAAAHgNAQQgOAQgKAAQgMAAgFgCQgJgCAAgIQAEgVAAgEQAAgFgCgDQgBgBgEgBQgCgBgBgDQgBgDgBgDQAAgBgBgBQgBAAAAAAQgBAAAAABQgBABAAAAQABACAAABQgGgDgCgJQgBgRgDgIQgBgBAAAAQAAAAgBAAQgHAAgOgIQgCgCgBAAQAJACAMAHQACAAACAAIAAAAAj0gbIAOAHIAQAAIAaAGIABAMIgBAAQAAAAgBABQAAAAAAAAIAAABIADAJIgXALQgBAAAAABQAAABAAAAIABABIAlAAIAPANQAAADAAACIgcACIAAAAQgBAAAAABIgCALIgOAKQgBAAAAABIAAAbIABABQACABACACQAAAAABAAIAFAMQAAABAAAAQAAABABAAIAGACQAAAEAGABIAAAVQgKACgIAEQgSAKgBAPQgFALgFAGQgCADgGAEQgCABgBACIAAAAQgGgBgBgBQgGgCAAgJQAAgBAEgFQAEgGAAgGQAFgCAGgCQABAAAAgBIAAAAQAAgFgCgDQgBgBgEgEQgFgEACgLQABgNgHgDQgDgCgNgCIAAgKQAAgBgBAAQAAgBgBAAIgSAAIAAgBQAAgDAAgEIASAAQABAAAAAAQABgCAAAAQAAgBgBAAQAAAAgBAAIgXAAIgNgMIgBgYIAagQQAAAAAAgBIAHgYIAAAAIABgBIAAgBQgBgBAAAAIgdgWIgBgCIgBAAIgKgGIABgOIAbACQAAAAABAAQABgBAAAAQAAgBAAAAQgBgBgBAAIgdgCQgBgBAAABQAAAAAAAAIgBAAIgBAPIgBgBQAAAAgBAAIgSADIgPgGIgNgJIACgVIALgPIAAAGQAAABACAAQAAABABAAQAAAAABgBQAAAAAAgBIAAgZIAIgYIAegGIAZABIAAAYQAAABAAAAIATAUIAAAAIATAMIABAWIgFAMIgBAAIAAABIABAAIABgBIAAABIABABIAAABIABAAIAAgCAkPgnIgCgBIAAADIABAAIAAgBIABAAIAAgBAjVCqQABgNARgJQAIgEAKgCQABAAAAAAQgCAFgEADQgDAEgBAAIgBAAQgCAEAAAFQAAAIAFADQACACAJADQAHACADAEQAEAFAAALQAAAPgHAIQgHAIgPAAQgBgBgCAAQgBAAgCAAQAAAAgBAAQgBAAgBgBQgDAAgDgBQgNgCgMAAQgBAAgBgBQgJgEAAgEQAAgKACgGQABgBAAgBQACgBADgCQAFgEADgDQAFgHAFgMIAAgBAAGC5IAHAKIAAABQAAAAABAAIANABQgBABAAABIgJAUIAAABQABABAAAAQADADACAIQABAGAAAEQAAAFAAAHQAAADAAACQAAABgBACQgEAFgNgBQAAgPgDgGQgDgPgVAAQgMAAgFgEQgEgCgCgFQAAgBAAgBQgDgJgBgDQgBgFgCgDQgCgCgHgFQACAAACAAQAGAAADgEIAEAGQAAABAAAAQAYAPAWgMQAAAAAAgBQABAAAAAAIABgRIABAGQAAAAAAABIAAAA").cp(),this.shape_7.setTransform(29.3,24),this.shape_8=new r.Shape,this.shape_8.graphics.f("#999999").s().p("ADmjQQgQADgJACQgPAFgFAIQgGAIAEAMQABABABAAQAEACAMAKQAMAJABAAQAGAAAJgMQAIgLADAAQAAgBAAABQAFABAFAOQAFAOAAAGQgKAFgHAGIAAAAQgJAJgEAEQgBABAAABQAAAAABABQAAAAAAAAQABAAABAAQAFgEAIgJIAAAAQAHgGAKgGQACAAABgBQACAGAEAKQACADAAADQAAAAABABQADAFAFAEIAAAFQgiANgDALIAAAAQAAABACAAIABAAIAMAAQAAAAAAAAQAGgEAHAAQAEgBAEABQADAAAFAAQABAAABAAQAAABABAAQgBACAAABQgBAAgBAAIAAABIgBAAQgEACgCAFIAAAAQgFANgHAKQgNATgEARQgJAAgMACQgHABgFABQgFABgDAAQgJAAgJgGIAAAAQgCAAAAABQgBAAAAABQAAABABAAQAIAFAMAAQADAAAEgBIABAFQAAAMgGAIQgEAEgBACQgCADAAAEQAAAHAIAEQAEABAGAAQAJAAAPgBQgBAJgDAGQgFAHgIgCQgCgGgCgDQgDgCgNgGIAAAAQgCAAgBgBQAAAAgCAAIAAABQAAABAAAAQAAABAAABQACAAABABQANAFACACQADACABAGQAAACAAADQAAAFgCAEQgBACgEAIQgCgBgDAAQgRABgKgBQgPAAgUgJQgBgBgCAAQgYgLgNgCQgBAAAAAAQgBAAAAABQAAABAAABQAAAAABAAQADABANAIQAPAJAHAAQADAIAAAPQADAMALAFQABADADABQAEAQgJAEQgEACgHABQgHABgFAAQAAgVgIgHQgIgIgJgDQgIgEgMAAQAYgTgBgGQAAgCgDgBQgCgBgEACQgFABgJADQAAAAAAgCIAAgXIAAgBQgDgCAAgDQgCgDACgFIAcABQAVATAXgMQABAAAAgBIAAAAIgEgcIAHgIQABgCADAAQABAAAAgDIAAgWIAigeIAAAAQAAgBAAAAQAAgHgFgEQAAgBAAAAQgBAAgBAAQgCgBgDgCQAAAAAAAAIAMgRIAAgBIACgPQAAgBgBAAQAAAAAAgBIgKAAIghgjQADgPgXgKQgBAAAAgBIgUgVIAAgTIAIgHIAAgBIADgHIAOgOIAIgDIACABIAKAAQAOgNADgBQADgCADgBQAIgEAMAAQAEAAALAHQAKAJABAEQAAAEgBACQgDAAgEABIAAAAAirjgQAFAAACACQABAAACABIAEAKQAAACAAADQgCAAACAAQAAABAAAAIASAPIAAAHIg0AAIgIgHQgBAAgBAAQAAAAAAAAQAAABAAAAIAAAQIAGAKIAAAVIgiADQgBAAgBAAIAAABQAAABAAAAIAGAOQAAABAAAAQAAAAABAAQAEAAADABIAVAgIABAJQAAAAAAABQAAABABAAIAOABIABAAIAAAAIANgKIAKAAIgQAHIAAAAIgEAGIgGAEIgUACIgCgOIAAgBQAAAAgBAAIgfgIQAAAAAAgBQAAAAAAAAIgWgNIgBgZQgBAAAAgBIAAAAIgTgMIgHgIIAHgEQAAgBABgBIAAAAIgCgTIAMAAIAEADIABAAQABAAAAAAQABgBAAgCQgBAAAAAAIgUgQIACgkIALgGIAKAGIAGAPQAAABABAAIANAJQABAAAAAAQAbAEALgEQANgFgBgNQAGgBAGgBQACgBADAAIAAAAAipC1QANgIAdAAQAAAAABgBQABAAAAgBIAAgGQAOAPAZACQALABABgaQAAgHgBgLQgBgGAAgDQACACAAABQACACABAEQACAEACAIQAAABABACQACAGAFACQAFAFAOAAQASAAAFANQACAHAAAOQAAAGAAAGIAAABQhFArhGgrQAAgCAAAAQABgFgBgDQAAgDgFgCQgDgEgBgBQgDgEgCgHQAAAAgBgBIAAgB").cp(),this.shape_8.setTransform(31.2,30.7),this.shape_9=new r.Shape,this.shape_9.graphics.f("#CCCCCC").s().p("AAojxQAFADABAJQgGANgBABQAAABAAAAQAAABABAAQAAABACAAQAAgBAAgBQABgBAGgOQAAAAAAAAQAEgJAEgEQAEABAXAFQAdAFAHAAQARAAALgDQAKgEAMgKIAfgUQgXAhAFAFQAEAEANAAQAHACAPAAQALAAAPAGQAPAIAKAQQAEAKABAEQACACAAABQgBABgBAAQgMAYgOAEIgJADQgBAAAAABIgKALIgwAAIgCgFQAAgBgBAAIgHgDQgBAAAAAAIgZADIgLgJQgDgJgHgEQgCgBgBAAQgBAAAAABIgGAFIgHAAQAAAAgBAAQgBACgBADIgkADIgFgEQAAgBgBAAQgBAAAAABIgqAcIgYgMIADgPIAEgDQAAgBAAgBIACgNIAFgFQAAAAAAgBIAAgBQgBgBgBAAQgBAAAAABIgFAGIAAABIgCAMIgCAFIAAAAIgJAaIgbAOIgFAAIAAgKIgQgaQAOgEAAgGQAAgEgGgEIAQACQARgFADgHQAAgGgGgHIAKADIACAAQAVACADgHQABgDgCgCIADABQABAAABAAIAAgBIAPgKQAAgCAAAAQAAgBAAAAIgLgaIADgJQABAAABAAQAHAAADADIAAAAADSCjQAAAEgaAVQgGAAgDADQgDABgEAGQgEAHgBABQgFAGgFADQgFACgJACQgGABgDAEQgDAEgEAEIAAAAQgEAEAAAGQAAACAAACQAAAJAEADQABACAEACQACABADABQgDAAgCACQgFADgFAAQgGAAgDgCQgCgDgEgBQABgCAAgDQAAgHAAgFQAAgEgCgHQgCgIgDgDIAIgUIASgKIAWgCQAAAAAAAAQABAAAAgBIACgRQAFAGAIAAQAJAAAOgKQAOgFAHgBQADgCABABIABAAADRDCQAJADAHAHQAIAIAAAVQAAAAAAACQAAARgQAJQgOAIgUAAQgNAAgFgCQgCAAgEgDQgGgFgQgBQgEAAgEABQgCgBgCgBIgBAAQgBgDAAgIQAAgCAAgCQAAgFACgDQAFgEADgEQABgCAGgCQAJgCAFgCQAHgEAEgFQABgCAEgHQADgFAEgBQACgCAFgBIABAAQACAAABAAQAMAAAJADIAAAAAgKg2IgRAFQAAAAgBAAIgFAJIgIgEIgBgHIABgJIALgJIAAAAIARgSIAHgBIADAQIgGADQgBAAAAAAQAAACAAAAIAAANAirgYIAFgMIAAACIAAABIABAAIAVAOIAAAAQAAAAABACIAFABIgQAAIgOgHIgCgBIgBAAAghg2IAAAAIAAAAIAAAAAjKAoIgcAQIgMgNIgBgBQAAgBgBAAQAAgBgBAAIgWAGIgMgUIABgQIAIgbIAMAFIABAAIASgDIAPAIIAdAYIgHAXAisB7QAGAEgCAKQgCAMAHAGQADADACABQAAACABADQgGABgEACQgCgBgFgBQgHAAgNABQgbACgFALQgCAEgCACQgBAAgBAAQgDgDgCgFQgEgGgCgCQgDgEgFAAIAAggQAFgGAEgEQAFgGAFgBQAGgBAJgCQAGAAADgFIASAAIAAALIABABQAAABABAAQANABADABIAAAAAh0DvIAAAAQADAAABAAQAQAAAIgJQAJgIAAgRQAAgMgFgGQgEgFgIgCIAAAAQgIgDgCgBQgEgDAAgGQAAgDABgDQACgCADgCQAHgFAAgJQAAAAAAgBQAAAAAAAAIgBAAQgBAAgBAAIAAgBIALAAIADAXIAAABQABAAABAAQAJgBAHAGIAAAAIAdAAIANAJQABAAAAAAIALAAIABgBIAGgIIAUgCIAIAGQACACACAEQAAAAAAAAIAAAGQgCAFgFAAQgGAAgLgGIgBAAQAAAAAAABQAAAAAAABIAAABQAJAGAFAEQAAACAAAJQABALAAAIQAAAUgIABQgXgCgOgRQgDgFgDgDQAAAAgBAAQgBAAAAAAQgBABAAABQAAABABAAQACACACAEIAAAJQgdAAgOALIgBAAQgBABgGAGQgDADgDAAQgBAAgBgBQgBAAAAAAIAAgJIgBgCQgBAAAAAAQgIAAgJgHQAAgBgCgCQgBAAAAAAIAAAAACCB/IADAEIgCAGQAAABAAABQAAAAABAAIABABIAAABQAAAAAAABQAAAAABAAQABABABgBIADgBQAAAAABgBIACgFIADgCIAJAAQABAAAAgBQAAgBgBAAQAAgBgBAAIAAAAIAAgFQAAgBAAgBQgBAAAAAAQgCAAgBAAQAAABAAABIgGgCIAAgCIAAgEIADgBIAIACIADABIABAHQAAABABAAIAEAEIAAAEIABAAIAGADIAAAEIgHAGIAAAAIgEADIgMAAIgEgFQAAAAAAgBQAAAAAAAAIgHABIgHAGIgLAAIgEgGIAEgJIAFgGIAHgE").cp(),this.shape_9.setTransform(21.7,23.7),this.timeline.addTween(r.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_3}]},36).to({state:[{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6}]},1).to({state:[]},1).wait(1)),this.instance_6=new e.items_15_stone1_1,this.instance_6.setTransform(27.6,26.2,.326,.326,0,0,0,64.1,64.1),this.instance_6._off=!0,this.timeline.addTween(r.Tween.get(this.instance_6).wait(37).to({_off:!1},0).wait(3)),this.instance_7=new e.pukapika,this.instance_7.setTransform(27.1,27,1,1,0,0,0,26.5,26),this.instance_7._off=!0,this.timeline.addTween(r.Tween.get(this.instance_7).wait(1).to({_off:!1},0).to({_off:!0},19).wait(1)),this.emb_box=new e.emb_box,this.emb_box.setTransform(26.5,26,1,1,0,0,0,26.5,26),this.timeline.addTween(r.Tween.get(this.emb_box).wait(20).to({x:26.4},0).to({scaleX:1.27,scaleY:1.27,x:26,y:24.5},2).to({scaleX:.77,scaleY:.77},2).to({scaleX:1.46,scaleY:1.46,alpha:0},3).to({_off:!0},1).wait(1).to({scaleX:1,scaleY:1,x:26.4,y:26,alpha:1,_off:!1},0).to({scaleX:1.27,scaleY:1.27,x:26,y:24.5},2).to({scaleX:.77,scaleY:.77},2).to({scaleX:1.46,scaleY:1.46,alpha:0},3).to({_off:!0},1).wait(1))}).prototype=i=new r.MovieClip,i.nominalBounds=new r.Rectangle(0,0,1,1),(e.total_emblem=function(t,n,i){i==null&&(i=!1),this.initialize(t,n,i,{pika:1,fadeIn:9,avatarPika:17},!0),this.frame_0=function(){this.stop()},this.frame_8=function(){this.stop()},this.frame_16=function(){this.parent.gotoAndPlay("checkNextEmblem"),this.stop()},this.frame_28=function(){this.stop()},this.timeline.addTween(r.Tween.get(this).call(this.frame_0).wait(8).call(this.frame_8).wait(8).call(this.frame_16).wait(12).call(this.frame_28)),this.instance_8=new e.emb_efe_1,this.instance_8.setTransform(26.5,26,1,1,0,0,0,26.5,26),this.instance_8._off=!0,this.timeline.addTween(r.Tween.get(this.instance_8).wait(17).to({_off:!1},0).to({alpha:0},2).to({_off:!0},1).wait(1).to({alpha:1,_off:!1},0).to({alpha:0},2).to({_off:!0},1).wait(1).to({alpha:1,_off:!1},0).to({alpha:0},2).to({_off:!0},1).wait(1)),this.instance_9=new e.pukapika,this.instance_9.setTransform(26.5,26,1,1,0,0,0,26.5,26),this.instance_9._off=!0,this.timeline.addTween(r.Tween.get(this.instance_9).wait(1).to({_off:!1},0).to({_off:!0},7).wait(21)),this.emb_box_2=new e.emb_box,this.emb_box_2.setTransform(26.5,26,1,1,0,0,0,26.5,26),this.timeline.addTween(r.Tween.get(this.emb_box_2).wait(1).to({visible:!1},0).wait(8).to({scaleX:1.46,scaleY:1.46,alpha:0,visible:!0},0).to({scaleX:.77,scaleY:.77,alpha:1},3).to({scaleX:1.27,scaleY:1.27},2).to({scaleX:1,scaleY:1},2).wait(13))}).prototype=i=new r.MovieClip,i.nominalBounds=new r.Rectangle(0,0,1,1),(e.avatar_get_mc=function(t,n,i){this.initialize(t,n,i,{},!0),this.frame_21=function(){this.stop()},this.timeline.addTween(r.Tween.get(this).wait(21).call(this.frame_21)),this.instance_10=new e.avatarGET,this.instance_10.setTransform(-151.3,129,1,1,0,0,0,159.5,30.5),this.timeline.addTween(r.Tween.get(this.instance_10).to({x:161.7},3).wait(19)),this.shape_10=new r.Shape,this.shape_10.graphics.f("rgba(0,0,0,0.502)").s().p("AbkgDIgSgBIDrgFIlEgPIlygFIEMARImigSIGTgOIpCAAIgWACIgEACIixAGQjCgPizAZIjUgBIGlAYIkwgGIhGAHIBnACIgmAGIGlgCIh8AGIHfAhIhBgKIKrAHIn9ghIDVgJICEAPIHcgFIldgLIB5gCAMkgdID/ATIhcAFQhSgQhRgIIAAAAAyugFQhTgQhQgIID+ATIhbAFAzOgoIixAGQjBgPi0AZIjTgBIGkAYIkwgGIhFAHIBnACIgmAGIGkgCIh7AGIHeAhIhAgKIKqAHIn9ghIDVgJICEAPIHdgFIldgLIB4gCIgRgBIDqgFIlDgPIlygFIEMARImigSIGSgOIpCAAIgVACIgFAC").cp(),this.shape_10.setTransform(178.3,126.6),this.shape_11=new r.Shape,this.shape_11.graphics.f("rgba(0,0,0,0.502)").s().p("AFGhdIGuA1Iqeg6IKGgrIueAAIgiAFIgIAGIkbAVQk3gykfBTIlUgHIKiBOInngWIhvAYIClAKIg9ARIKjgFIjHATIMABoIhogdIRFAVIswhnIFVgfIDVAwIL7gQIovgoIDBgFIgcgCIF4gPIoGguIpTgRAi4gUQiZg4iSgbIG9BFIiSAO").cp(),this.shape_11.setTransform(147.7,126.6),this.shape_12=new r.Shape,this.shape_12.graphics.f("rgba(0,0,0,0.502)").s().p("AbWDeMg2rAAAIAAm7MA2rAAAIAAG7").cp(),this.shape_12.setTransform(164.1,126.6),this.timeline.addTween(r.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).wait(19)),this.shape_13=new r.Shape,this.shape_13.graphics.f("rgba(0,0,0,0.502)").s().p("AbWDeMg2rAAAIAAm7MA2rAAAIAAG7").cp(),this.shape_13.setTransform(164.1,126.6),this.timeline.addTween(r.Tween.get({}).to({state:[{t:this.shape_13}]}).wait(22))}).prototype=i=new r.MovieClip,i.nominalBounds=new r.Rectangle(-312.4,104.4,651.7,49.6)})(r=r||{},e=e||{},n=n||{});var r,e,n;this.lib=r}};return e});