
let util = class util{
    //将路径转换为base64
    /**
     * 将网络图片路径转换为base64
     * @param imgUrl
     * @returns {Promise<unknown>}
     */
    static async toBase64(imgUrl) {
        // 一定要设置为let，不然图片不显示
        const image = new Image();
        // 解决跨域问题
        image.setAttribute('crossOrigin', 'anonymous');
        image.src = imgUrl
        // image.onload为异步加载
        return await new Promise((resolve,e)=>{
            image.onload = () => {
                var canvas = document.createElement('canvas');
                canvas.width = image.width;
                canvas.height = image.height;
                var context = canvas.getContext('2d');
                context.drawImage(image, 0, 0, image.width, image.height);
                var quality = 0.8;
                // 这里的dataurl就是base64类型
                // 使用toDataUrl将图片转换成jpeg的格式,不要把图片压缩成png，因为压缩成png后base64的字符串可能比不转换前的长！
                const dataurl = canvas.toDataURL('image/png', quality);
                resolve(dataurl);
                console.log(e);
            }
        })

    }

    static responseStatus(status){
        if(!this.isEmpty(status) && status !== 201 && status !== 200 && status !== 204){
            throw new Error(`请求错误${status}`)
        }
        if(status === 'Error: Network Error'){
            throw new Error('请求错误')
        }
    }

    /**
     * 对象数组去重
     * @param objarr
     * @returns {[]}
     */
    static deduplicationObj(objarr) {
        var uniques = [];
        var stringify = {};
        for (var i = 0; i < objarr.length; i++) {
            var keys = Object.keys(objarr[i]);
            keys.sort(function(a, b) {
                return (Number(a) - Number(b));
            });
            var str = '';
            for (var j = 0; j < keys.length; j++) {
                str += JSON.stringify(keys[j]);
                str += JSON.stringify(objarr[i][keys[j]]);
            }
            // eslint-disable-next-line no-prototype-builtins
            if (!stringify.hasOwnProperty(str)) {
                uniques.push(objarr[i]);
                stringify[str] = true;
            }
        }
        // eslint-disable-next-line no-self-assign
        uniques = uniques;
        return uniques;
    }
    /**
     * 匹配正确的身份证
     * @param {Object} val 待匹配的身份证号
     */
    static checkCode(val) {
        var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
        var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
        var code = val.substring(17);
        if(p.test(val)) {
            var sum = 0;
            for(var i=0;i<17;i++) {
                sum += val[i]*factor[i];
            }
            if(parity[sum % 11] == code.toUpperCase()) {
                return true;
            }
        }
        return false;
    }

    /**
     * form-data方式请求接口
     * @param data
     */
    static formDataParams(data){
        if(this.isEmpty(data)) throw new Error('数据为空！');
        let formData = new FormData();
        Object.keys(data).forEach(item => {
            formData.append(item,data[item]);
        })
        let config = {
            headers:{
                'Content-Type': 'multipart/form-data;'
            }
        }
        return {data:formData,config}
    }

    /**
     * 循环array 找到obj里面对应的属性返回
     * @param obj
     * @param array
     * @returns void
     */
    static objFindExistingAttributes(obj,array){
        if(!Array.isArray(array)) return console.error('参数：'+JSON.stringify(array)+'不为数组')
        let data = {};
        array.forEach(item=>{
            Object.keys(obj).forEach(key=>{
                if(item === key){
                    data[item] = obj[item];
                }
            })
        })
        return  data;
    }

    /**
     * 判断为空
     * @param data
     * @param msgText
     * @returns {ElMessageComponent|boolean} 为空true 有值为false 别判断boolean值
     */
    static isEmpty(data){
        if(Object.prototype.toString.call(data) === '[object Object]'){
            return Object.keys(data).length === 0
        }
        return  data === null || data === '' || data === undefined
    }
    static showMessage(vue,msgText = '欢迎欢迎，热烈欢迎！',type = 'warning'){
        vue.$message[type](msgText)
        return false
    }
    static showLoading(vue,text = '请稍等',spinner = 'el-icon-loading',background = 'rgba(0, 0, 0, 0.7)'){
        return vue.$loading({
            lock: true,
            text,
            spinner,
            background
        });
    }
    static confirmMessage(vue,fun1,msgText = '该操作会将其永久删除，是否继续',type = 'warning'){
        vue.$confirm(msgText,'系统提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type
        }).then(()=>{
            fun1();
        }).catch(()=>{})
    }

    /**
     * 是数字返回true
     * @param num
     * @returns {boolean}
     */
    static isNumber(num){
        return /^[0-9]+\.?[0-9]*$/.test(num)
    }
    static isPhone(phone){
        return /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(phone)
    }


    /**
     * 修改数据赋值 将传到修改页面的对象找到和原页面对象相同的字段赋值
     * @param originalObject 原始对象 修改页面的对象
     * @param transferObjects 传输对象 传过去的对象
     */
    static modifyDataConversion(originalObject,transferObjects){
        if(this.isEmpty(originalObject)){
            console.error('传入对象为空')
            return
        }else if(this.isEmpty(transferObjects)){
            console.error('传入对象为空')
            return
        }else if(Object.keys(transferObjects).length <= Object.keys(originalObject).length){
            console.error('传输对象长度不能转换')
            return
        }
        let data = {};
        Object.keys(transferObjects).forEach(item=>{
            Object.keys(originalObject).forEach(key => {
                if(key !== item) return
                if(key === item){
                    data[key] = transferObjects[key];
                }
            })
        })
        return data
    }

    /**
     * 在传输过来的数组中找到相同的属性赋值到原属性
     * @param vue
     * @param originalObject 原始对象
     * @param transferObjects 传输对象
     */
    static sameAttributeAssignment(vue,originalObject,transferObjects){
        if(this.isEmpty(vue,originalObject)) return
        if(this.isEmpty(vue,transferObjects)) return
        Object.keys(originalObject).forEach(item=>{
            Object.keys(transferObjects).forEach(key=>{
                if(item === key){
                    originalObject[item] = transferObjects[item];
                }
            })

        })
        return originalObject

    }
    /**
     * 去除对象中为空的属性
     * @param data
     */
    static handleValue(data){
        for (const dataKey in data) {
            if(data[dataKey] === '' || data[dataKey] ===undefined){
                delete data[dataKey]
            }
        }
    }

    /**
     * 对象属性置空
     */
    static objAttributesBlanking(obj){
        Object.keys(obj).forEach(item=>{
            if(/^[0-9]+\.?[0-9]*$/.test(obj[item])){
                obj[item] = 0
            }else if(Array.isArray(obj[item])){
                obj[item] = [];
            }else{
                obj[item] = ''
            }

        })
        return obj;
    }

    /**
     * 压缩图片方法
     * @param {file} file 文件
     * @param {Number} quality 图片质量(取值0-1之间默认0.92)
     */
    static compressImg(file, quality) {
        var qualitys = 0.52
        console.log(parseInt((file.size / 1024).toFixed(2)))
        if (parseInt((file.size / 1024).toFixed(2)) < 1024) {
            qualitys = 0.85
        }
        if (5 * 1024 < parseInt((file.size / 1024).toFixed(2))) {
            qualitys = 0.92
        }
        if (quality) {
            qualitys = quality
        }
        if (file[0]) {
            return Promise.all(Array.from(file).map(e => this.compressImg(e,
                qualitys))) // 如果是 file 数组返回 Promise 数组
        } else {
            return new Promise((resolve) => {
                console.log(file)
                if ((file.size / 1024).toFixed(2) < 300) {
                    resolve({
                        file: file
                    })
                } else {
                    const reader = new FileReader() // 创建 FileReader
                    reader.onload = ({
                                         target: {
                                             result: src
                                         }
                                     }) => {
                        const image = new Image() // 创建 img 元素
                        image.onload = async() => {
                            const canvas = document.createElement('canvas') // 创建 canvas 元素
                            const context = canvas.getContext('2d')
                            var targetWidth = image.width
                            var targetHeight = image.height
                            var originWidth = image.width
                            var originHeight = image.height
                            if (1 * 1024 <= parseInt((file.size / 1024).toFixed(2)) && parseInt((file.size / 1024).toFixed(2)) <= 10 * 1024) {
                                var maxWidth = 1600
                                var maxHeight = 1600
                                targetWidth = originWidth
                                targetHeight = originHeight
                                // 图片尺寸超过的限制
                                if (originWidth > maxWidth || originHeight > maxHeight) {
                                    if (originWidth / originHeight > maxWidth / maxHeight) {
                                        // 更宽，按照宽度限定尺寸
                                        targetWidth = maxWidth
                                        targetHeight = Math.round(maxWidth * (originHeight / originWidth))
                                    } else {
                                        targetHeight = maxHeight
                                        targetWidth = Math.round(maxHeight * (originWidth / originHeight))
                                    }
                                }
                            }
                            if (10 * 1024 <= parseInt((file.size / 1024).toFixed(2)) && parseInt((file.size / 1024).toFixed(2)) <= 20 * 1024) {
                                maxWidth = 1400
                                maxHeight = 1400
                                targetWidth = originWidth
                                targetHeight = originHeight
                                // 图片尺寸超过的限制
                                if (originWidth > maxWidth || originHeight > maxHeight) {
                                    if (originWidth / originHeight > maxWidth / maxHeight) {
                                        // 更宽，按照宽度限定尺寸
                                        targetWidth = maxWidth
                                        targetHeight = Math.round(maxWidth * (originHeight / originWidth))
                                    } else {
                                        targetHeight = maxHeight
                                        targetWidth = Math.round(maxHeight * (originWidth / originHeight))
                                    }
                                }
                            }
                            canvas.width = targetWidth
                            canvas.height = targetHeight
                            context.clearRect(0, 0, targetWidth, targetHeight)
                            context.drawImage(image, 0, 0, targetWidth, targetHeight) // 绘制 canvas
                            const canvasURL = canvas.toDataURL('image/jpeg', qualitys)
                            const buffer = atob(canvasURL.split(',')[1])
                            let length = buffer.length
                            const bufferArray = new Uint8Array(new ArrayBuffer(length))
                            while (length--) {
                                bufferArray[length] = buffer.charCodeAt(length)
                            }
                            const miniFile = new File([bufferArray], file.name, {
                                type: 'image/jpeg'
                            })
                            console.log({
                                file: miniFile,
                                origin: file,
                                beforeSrc: src,
                                afterSrc: canvasURL,
                                beforeKB: Number((file.size / 1024).toFixed(2)),
                                afterKB: Number((miniFile.size / 1024).toFixed(2)),
                                qualitys: qualitys
                            })
                            resolve({
                                file: miniFile,
                                origin: file,
                                beforeSrc: src,
                                afterSrc: canvasURL,
                                beforeKB: Number((file.size / 1024).toFixed(2)),
                                afterKB: Number((miniFile.size / 1024).toFixed(2))
                            })
                        }
                        image.src = src
                    }
                    reader.readAsDataURL(file)
                }
            })
        }
    }

    /**
     * 对象数组去重
     * @param vue
     * @param objArr
     * @param str
     * @returns {[]|void}
     */
    static objSet(vue,objArr,str){
        if(this.isEmpty(vue,objArr)) return console.error('对象为空');
        if(this.isEmpty(vue,str)) return console.error('请传入对象属性名');
        if(objArr.length <= 0) return console.error('数组长度为0');
        let temp = '';
        let results = [];
        for (let i = 0; i < objArr.length; i++) {
            if(!temp[objArr[i][str]]){
                results.push(objArr[i][str]);
                temp[objArr[i][str]] = true;
            }
        }
        return results;
    }

    /**
     * 时间戳转换详细时间的方法
     */
    static  formatDate(date) {
        if(date === '' || date===null || date===undefined){
            return ''
        }
        const time = new Date(date);
        let year = time.getFullYear();
        let mouth = time.getMonth() + 1;
        let day = time.getDate();
        let hours = time.getHours() + 1;
        let minutes = time.getMinutes() + 1;
        let seconds = time.getSeconds();
        if (mouth < 10) {
            mouth = "0" + mouth
        }
        if (day < 10) {
            day = "0" + day
        }
        if (hours < 10) {
            hours = "0" + hours
        }
        if (minutes < 10) {
            minutes = "0" + minutes
        }
        if (seconds < 10) {
            seconds = "0" + seconds
        }
        return `${year}-${mouth}-${day} ${hours}:${minutes}:${seconds}`
    }

    /**
     * 判断对象中是否有空值的属性 有则返回false
     * @param params
     * @returns {boolean}
     */
    static objParamsValidate = function (obj) {
        let flag = true;
        for(const key in obj){
            if(obj[key] != '0' && !obj[key]){
                return false;
            }
        }
        return flag;
    }


    /**
     * 金额的千分位逗号分隔符  1400.50 => 1,400.50
     * @param vue
     * @param price 传进来的字符串
     * @returns {string|*}
     */
    static formatPrice(vue,price){
        if(this.isEmpty(vue,price) || price == 0){
            return price;
        }
        price = price.toString();
        var chararr = [] //用来存储金额字符串中的每一个字符
        var rlength = price.indexOf('.')>0 ? price.indexOf('.') : price.length //如果有小数点，则只考虑小数点之前的数字进行处理
        for (let i = 0; i < price.length; i++) {
            if (rlength-i > 0 & (rlength - i) % 3 == 0 & (i != 0)){  //长度减索引表示实际要处理字符串倒序的序号，如果能整除3则在前加逗号
                chararr.push(',')
            }
            chararr.push(price.charAt(i));
        }
        console.log(chararr.join(''))
        return chararr.join('')
    }




}
export {util}
