/**
 *	数据验证（表单验证）
 */
module.exports = {
	error:'',
	check : function (data, rule){
		for(var i = 0; i < rule.length; i++){
			if (!rule[i].checkType){return true;}
			if (!rule[i].name) {return true;}
			if (!rule[i].errorMsg) {return true;}
			if (!data[rule[i].name]) {this.error = rule[i].errorMsg; return false;}
			switch (rule[i].checkType){
				/**
				 *  string
				 *	功能 : 字符串及长度检查
				 *	规则 : 最小长度,最大长度 如 1,3 或 2, 2,代表只检查最短
				 */
				case 'string':
					var reg = new RegExp('^.{' + rule[i].checkRule + '}$');
					if(!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg; return false;}
				break;
				/**
				 *  number
				 *	功能 : 匹配非负整数
				 *	规则 : 
				 */
				case 'number':
					var reg = new RegExp('^[1-9]\d*|0$');
					if(!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg; return false;}
				break;
				/**
				 *  int
				 *	功能 : 整数及长度检查
				 *	规则 : 最小长度,最大长度 如 1,3
				 */
				case 'int':
					var reg = '^(-[1-9]|[1-9])[0-9]';
					if(rule[i].hasOwnProperty('checkRule')){
						reg += '{' + rule[i].checkRule + '}'
					}
					reg += '$'
					reg = new RegExp(reg)
					// if(typeof data[rule[i].name] == 'string'){
					// 	data[rule[i].name] = JSON.parse(data[rule[i].name])
					// }
					if(!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg; return false;}
				break;
				/**
				 *  between
				 *	功能 : 数值区间检查
				 *	规则 : 最小值,最大值 如 1,3 或 2.5,1000
				 */
				case 'between':
					if (!this.isNumber(data[rule[i].name])){
						this.error = rule[i].errorMsg;
						return false;
					}
					var minMax = rule[i].checkRule.split(',');
					minMax[0] = Number(minMax[0]);
					minMax[1] = Number(minMax[1]);
					if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
						this.error = rule[i].errorMsg;
						return false;
					}
				break;
				/**
				 *  betweenD
				 *	功能 : 数值区间检查【整数】
				 *	规则 : 最小值,最大值 如 1,3 或 2,1000
				 */
				case 'betweenD':
					var reg = /^-?[1-9][0-9]?$/;
					if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false; }
					var minMax = rule[i].checkRule.split(',');
					minMax[0] = Number(minMax[0]);
					minMax[1] = Number(minMax[1]);
					if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
						this.error = rule[i].errorMsg;
						return false;
					}
				break;
				/**
				 *  betweenF
				 *	功能 : 数值区间检查【小数】
				 *	规则 : 最小值,最大值 如 1.1,3.2 或 2.2,10.5
				 */
				case 'betweenF': 
					var reg = /^-?[0-9][0-9]?.+[0-9]+$/;
					if (!reg.test(data[rule[i].name])){this.error = rule[i].errorMsg; return false;}
					var minMax = rule[i].checkRule.split(',');
					minMax[0] = Number(minMax[0]);
					minMax[1] = Number(minMax[1]);
					if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
						this.error = rule[i].errorMsg;
						return false;
					}
				break;
				/**
				 *  same
				 *	功能 : 等值检查
				 *	规则 : 对应的值
				 */
				case 'same':
					if (data[rule[i].name] != rule[i].checkRule) { this.error = rule[i].errorMsg; return false;}
				break;
				/**
				 *  notsame
				 *	功能 : 不等值检查
				 *	规则 : 对应的值
				 */
				case 'notsame':
					if (data[rule[i].name] == rule[i].checkRule) { this.error = rule[i].errorMsg; return false; }
				break;
				/**
				 *  email
				 *	功能 : 邮箱检查
				 *	规则 : 无需设置
				 */
				case 'email':
					var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
					if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false; }
				break;
				/**
				 *  phoneno
				 *	功能 : 11位手机号检查
				 *	规则 : 无需设置
				 */
				case 'phoneno':
					var reg = /^1[0-9]{10,10}$/;
					if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false; }
				break;
				/**
				 * tel
				 * 功能 : 固定电话检查,11位手机号检查
				 * 规则 : 无需设置
				 */
				case 'tel':
					var reg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
					if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false; }
				break;
				/**
				 *  zipcode
				 *	功能 : 6位邮编检查
				 *	规则 : 无需设置
				 */
				case 'zipcode':
					var reg = /^[0-9]{6}$/;
					if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false; }
				break;
				/**
				 *  reg
				 *	功能 : 正则表达式检查
				 *	规则 : 正则表达式内容 如 "^[0-9]{1,2}$"
				 */
				case 'reg':
					var reg = new RegExp(rule[i].checkRule);
					if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false; }
				break;
				/**
				 *  in
				 *	功能 : 包含某个字符串的检查
				 *	规则 : 字符串集，如："北京,上海"
				 */
				case 'in':
					if(rule[i].checkRule.indexOf(data[rule[i].name]) == -1){
						this.error = rule[i].errorMsg; return false;
					}
				break;
				/**
				 *  notnull
				 *	功能 : 不为空检查【null 或者 空数组】
				 *	规则 : 无需设置
				 */
				case 'notnull':
					if(data[rule[i].name] == null || data[rule[i].name].length < 1){this.error = rule[i].errorMsg; return false;}
				break;
			}
		}
		return true;
	},
	isNumber : function (checkVal){
		checkVal = Number(checkVal);
		if(checkVal == NaN){return false;}
		return true;
	}
}