export default {
	/**
	 * 给定时间戳，计算据当前时间剩余的天、时、分、秒返回在一个对象中
	 */
	getTimeDiffObj(timestamp){
		let endTime = timestamp
		let nowTime = new Date().getTime()
		let diffTime = endTime - nowTime
		if(diffTime>0){
			//计算剩余天数
			let day = Math.floor(diffTime / (24 * 3600 * 1000))
			//计算剩余小时数
			let leave1 = diffTime % (24 * 3600 * 1000)
			let hour = Math.floor(leave1 / (3600 * 1000))
			//计算剩余分钟数
			let leave2 = leave1 % (3600 * 1000);
			let minute = Math.floor(leave2 / (60 * 1000));
			//计算剩余秒数
			let leave3 = leave2 % (60 * 1000);
			let second = Math.round(leave3 / 1000);
			return{
				day,
				hour,
				minute,
				second
			}	
		}else{
			return false
		}
	},

	/**
	 * 判断时间是否结束,结束时间未给则默认到当前时间
	 * start,end都需要传入时间戳格式
	 */
	isTimeout(start,end){
		start = new Date(start).getTime()
		end = end?new Date(end).getTime():new Date().getTime()
		return (start - end) < 0
	},

	/**
	 * 获取给定时间之间的秒数差,结束时间未给则默认到当前时间
	 * start,end都需要传入时间戳格式
	 */
	getSecondsDiff(start,end=new Date().getTime()){
		start = new Date(start).getTime()
		end = end?new Date(end).getTime():new Date().getTime()
		return parseInt((start - end) / 1000)
	},

	/**
	 * JS获取距当前时间差
	 * 
	 * @param time[number]  时间戳格式
	 *
	 */
	getTimeDiff(time) {
		console.log("getTimeDiff", time)
		var diff = '';
		var time_diff = new Date().getTime() - time; //时间差的毫秒数 

		//计算出相差天数 
		var days = Math.floor(time_diff / (24 * 3600 * 1000));
		if (days > 0) {
			if (days < 7) {
				diff = days + '天前';
			} else {
				diff = this.getFormatDate(time)
			}
			return diff
		}
		//计算出小时数 
		var leave1 = time_diff % (24 * 3600 * 1000);
		var hours = Math.floor(leave1 / (3600 * 1000));
		if (hours > 0) {
			diff = hours + '小时前';
			console.log("hours", hours)
			return diff
		}
		//计算相差分钟数 
		var leave2 = leave1 % (3600 * 1000);
		var minutes = Math.floor(leave2 / (60 * 1000));
		if (minutes > 0) {
			diff = minutes + '分钟前';
			console.log("minutes", minutes)
			return diff
		}
		//计算相差秒数 
		var leave3 = leave2 % (60 * 1000);
		var seconds = Math.round(leave3 / 1000);
		if (seconds > 0) {
			diff = seconds + '秒前';
			console.log("seconds", seconds)
			return diff
		}
		return "刚刚"
	},

	/**
	 * 格式化秒
	 * @param value[number] 总秒数
	 * @param has_day[boolean] 总秒数
	 * @return string result 格式化后的字符串
	 */
	formatSeconds(value, has_day = false) {
		var theTime = parseInt(value); // 需要转换的时间秒 
		var theTime1 = 0; // 分 
		var theTime2 = 0; // 小时 
		var theTime3 = 0; // 天
		if (theTime > 60) {
			theTime1 = parseInt(theTime / 60);
			theTime = parseInt(theTime % 60);
			if (theTime1 > 60) {
				theTime2 = parseInt(theTime1 / 60);
				theTime1 = parseInt(theTime1 % 60);
				if (theTime2 > 24) {
					//大于24小时
					theTime3 = parseInt(theTime2 / 24);
					theTime2 = parseInt(theTime2 % 24);
				}
			}
		}
		var result = '';
		if (theTime >= 0) {
			result = "" + parseInt(theTime) + (has_day ? "秒" : "");
		}
		if (theTime1 >= 0) {
			if (!(theTime1 == 0 && theTime2 == 0 && theTime3 == 0)) {
				result = "" + parseInt(theTime1) + (has_day ? "分" : ":") + result;
			}
		}
		if (theTime2 >= 0) {
			if (!(theTime2 == 0 && theTime3 == 0)) {
				result = "" + parseInt(theTime2) + (has_day ? "小时" : ":") + result;
			}
		}
		if (theTime3 > 0 && has_day) {
			result = "" + parseInt(theTime3) + (has_day ? "天" : ":") + result;
		}
		return result;
	},

	//格式化日期格式
	getFormatDate({
		date = new Date(),
		unit = "year",
		split = "-"
	}) {
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var currentDate = ""
		if(unit === "year"){
			currentDate = date.getFullYear() + split + month + split + strDate
		}else if(unit === 'month'){
			currentDate = month + split + strDate
		}else if(unit === 'day'){
			currentDate = strDate
		}
		return currentDate;
	},

	//格式化日期和时间格式
	getFormatDateAndTime(date) {
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var currentDate = date.getFullYear() + "-" + month + "-" + strDate +
			" " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
		return currentDate;
	},

	//字符串格式日期转Date类型
	formatStringToDate(s) {
		var d = new Date();
		d.setYear(parseInt(s.substring(0, 4), 10));
		d.setMonth(parseInt(s.substring(5, 7) - 1, 10));
		d.setDate(parseInt(s.substring(8, 10), 10));
		d.setHours(parseInt(s.substring(11, 13), 10));
		d.setMinutes(parseInt(s.substring(14, 16), 10));
		d.setSeconds(parseInt(s.substring(17, 19), 10));
		return d;
	},

	toSystemTime(strTime) {
	    if (!strTime) {
	        return '';
	    }
	    let myDate = new Date(strTime + '+0800');
	    if (myDate == 'Invalid Date') {
	        strTime = strTime.replace(/T/g, ' '); //去掉T
	        strTime = strTime.replace(/-/g, '/');
	        strTime = strTime.replace(/\.\d+/, ' ');//去掉毫秒
	        myDate = new Date(strTime + '+0800');       
	    }    
	    return myDate;
	},
}
