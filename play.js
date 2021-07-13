$(function() {
	function randomFun (arr) {
		return Math.floor(Math.random()* arr.length)
	}
	function initTable (maxnum) {
		var currleng = maxnum,
			maxleng = maxnum,
			// contentList = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
			contentList = ['icon-Building-','icon-Building-1','icon-Building-2','icon-Building-3','icon-Building-4','icon-Building-5','icon-Building-6','icon-Building-7','icon-Building-8','icon-Building-9','icon-Building-10','icon-Building-11','icon-Building-12','icon-Building-13','icon-Building-14','icon-Building-15','icon-Building-16','icon-Building-17','icon-Building-18','icon-Building-19'],
			currenyList = [],
			sumList = [],
			dHtml = ''; 
		function getList (tar, curr) {
			var indexVal = tar[randomFun(tar)];
			if (curr.indexOf(indexVal) == -1) {
				curr.push(indexVal)
			} else {
				maxleng++
			}
			return curr
		}
		for(var i = 0;i < maxleng; i++ ) { // 选出所有的连连元素
			getList(contentList,currenyList)
		}
		for (var i = 0;i < currleng; i++ ) { // 取双数,不然消到最后消不了
			sumList = sumList.concat(currenyList)
		}
		var num = 0,x = -1,y = 0;
		while (sumList.length > 0){
			var sumIndex = randomFun(sumList)
			if(sumList.length % currleng == 0) {
				x++;
				y = 0;
			} else {
				y++
			}
			dHtml += '<span class="iconfont '+sumList[sumIndex]+'" data-val="'+sumList[sumIndex]+'" data-num="'+num+'" data-x="'+y+'" data-y="'+x+'"></span>'
			sumList.splice(sumIndex,1)
			num++
		}
		$('.content').width(currleng* 40 +"px")
		$('.content').empty().append(dHtml);
	}
	initTable(6)
	$('.level_submit,.level_reset').on('click', function () {
		currleng = maxleng = $('#level').val();
		initTable(currleng);
		clearEle(null,null,false)
		bindClick()
	})
	$('.level_reset').on('click', function () {
		setPoint(0)
	})
	$('.level_next').on('click', function () {
		var flag = true
		$('.content span').each(function () {
			if ($(this).data().val) {
				flag = false
			}
		})
		if (true) {
			currleng = maxleng = $('#level').val();
			initTable(currleng);
			clearEle(null,null,false)
			bindClick()
		}
	})
	function isSelect (ele) {
		if (ele.data().val) {
			ele.addClass('is-select')
		}
	}
	function noSelect () {
		$('.content span').removeClass('is-select')
	}
	var clickNum = 1,point = 0,firstValue = null,secValue = null;
	function setPoint(point) {
		$('.point span').text(point)
	}
	function clearEle (o, t, flag) {
		firstValue = null,secValue = null;
		clickNum = 1;
		noSelect();
		if (flag) {
			o.removeClass(o.data().val).data('val', '');
			t.removeClass(t.data().val).data('val', '');
			point++;
			setPoint(point);
		}
	}
	function bindClick() {
		$('.content span').on('click', function () {
			isSelect($(this))
			if (clickNum == 1 && $(this).data().val) {
				firstValue = $(this);
				clickNum++
				return
			} else {
				secValue = $(this);
			}
			if (clickNum == 1) return;
			if ((firstValue.data().val == secValue.data().val) && (firstValue.data().num !== secValue.data().num)) {
				if(firstValue.data().x == secValue.data().x) { // 同一行
					var checkele = Math.abs(firstValue.data().y - secValue.data().y) -1,flag = true;
					if (!(firstValue.data().x == 0 || firstValue.data().x == $('#level').val() - 1)) { // x边界直接消除
						if (checkele != 0) {
							var num = firstValue.data().y > secValue.data().y ? secValue.data().y : firstValue.data().y;
							for(var i = 0;i < checkele;i++) {
								num++;
								var ele = '[data-x="'+ firstValue.data().x +'"][data-y="'+num+'"]'
								if($(ele).data().val != '') {
									flag = false
								}
							}
						}						
					}
				}
				if(firstValue.data().y == secValue.data().y) { // 同一列
					var checkele = Math.abs(firstValue.data().x - secValue.data().x) -1,flag = true;
					if (!(firstValue.data().y == 0 || secValue.data().y == $('#level').val() - 1)) {
						if (checkele != 0) {
							var num = firstValue.data().x > secValue.data().x ? secValue.data().x : firstValue.data().x;
							for(var i = 0;i < checkele;i++) {
								num++;
								var ele = '[data-y="'+ firstValue.data().y +'"][data-x="'+num+'"]'
								if($(ele).data().val != '') {
									flag = false
								}
							}
						}						
					}
				}
				var v_x = '[data-y="'+ firstValue.data().y +'"][data-x="'+secValue.data().x+'"]',v_y = '[data-y="'+ secValue.data().y +'"][data-x="'+firstValue.data().x+'"]'
				if (!(firstValue.data().y == secValue.data().y || firstValue.data().x == secValue.data().x)) {
					if ($(v_x).data().val == '') {
						// 判断x轴
						var checkele = Math.abs(firstValue.data().y - secValue.data().y) -1,flag = true;
						if (checkele != 0) {
							var num = firstValue.data().y > secValue.data().y ? secValue.data().y : firstValue.data().y;
							for(var i = 0;i < checkele;i++) {
								num++;
								var ele = '[data-x="'+ firstValue.data().x +'"][data-y="'+num+'"]'
								if($(ele).data().val != '') {
									flag = false
								}
							}
							// 判断y轴
							var checkele = Math.abs(firstValue.data().x - secValue.data().x) -1,flag = true;
							if (checkele != 0) {
								var num = firstValue.data().x > secValue.data().x ? secValue.data().x : firstValue.data().x;
								for(var i = 0;i < checkele;i++) {
									num++;
									var ele = '[data-y="'+ firstValue.data().y +'"][data-x="'+num+'"]'
									if($(ele).data().val != '') {
										flag = false
									}
								}
							}		
						} else {
							var checkele = Math.abs(firstValue.data().x - secValue.data().x) -1,flag = true;
							if (checkele != 0) {
								var num = firstValue.data().x > secValue.data().x ? secValue.data().x : firstValue.data().x;
								for(var i = 0;i < checkele;i++) {
									num++;
									var ele = '[data-y="'+ firstValue.data().y +'"][data-x="'+num+'"]'
									if($(ele).data().val != '') {
										flag = false
									}
								}
							}	
						}				
					}
					if ($(v_y).data().val == '') {
						var checkele = Math.abs(firstValue.data().x - secValue.data().x) -1,flag = true;
						if (checkele != 0) {
							var num = firstValue.data().x > secValue.data().x ? secValue.data().x : firstValue.data().x;
							for(var i = 0;i < checkele;i++) {
								num++;
								var ele = '[data-y="'+ firstValue.data().y +'"][data-x="'+num+'"]'
								if($(ele).data().val != '') {
									flag = false
								}
							}
							var checkele = Math.abs(firstValue.data().y - secValue.data().y) -1,flag = true;
							if (checkele != 0) {
								var num = firstValue.data().y > secValue.data().y ? secValue.data().y : firstValue.data().y;
								for(var i = 0;i < checkele;i++) {
									num++;
									var ele = '[data-x="'+ firstValue.data().x +'"][data-y="'+num+'"]'
									if($(ele).data().val != '') {
										flag = false
									}
								}
							}						
						} else {
							if(firstValue.data().x == secValue.data().x) { // 同一行
								var checkele = Math.abs(firstValue.data().y - secValue.data().y) -1,flag = true;
								if (checkele != 0) {
									var num = firstValue.data().y > secValue.data().y ? secValue.data().y : firstValue.data().y;
									for(var i = 0;i < checkele;i++) {
										num++;
										var ele = '[data-x="'+ firstValue.data().x +'"][data-y="'+num+'"]'
										if($(ele).data().val != '') {
											flag = false
										}
									}
								}						
							}
						}
					}
				}
				if (flag) {
					clearEle(firstValue, secValue, flag)
				} else {
					setTimeout(function () {
						clearEle(firstValue, secValue, flag)
					},500)
				}
				return
			} else {
				setTimeout(function () {
					clearEle(firstValue, secValue, false)
				},500)
			}
		})
	}
	bindClick()
})