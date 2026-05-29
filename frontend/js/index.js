// 配置API基础URL
const API_BASE_URL = 'http://127.0.0.1:5000/api';

// 当页面DOM加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    fetchAttractions();
});
// js的事件监听器，当页面加载完成后，执行fetchAttractions函数
// .addEventListener()方法，用于给指定元素绑定事件。这里给 document（html文档对象） 绑定了一个事件
// 'DOMContentLoaded'事件名称，当浏览器解析完 HTML 结构（DOM 树构建完成），但可能还没加载完图片、样式表等外部资源时触发。
// 箭头函数，当 DOMContentLoaded 事件发生时，就会调用这个函数，函数内部调用了 fetchAttractions()。
/**
 * 获取景点列表数据
 */
function fetchAttractions() {
    const container = document.getElementById('attractions-list');
    // 代表整个html页面，是浏览器提供的全局对象
    /*.getElementById()方法，通过元素id获取元素，attractions-list要查找的元素的id，
    获取到指定id后，存储在container中
    */
    // 显示加载状态
    container.innerHTML = '<div class="loading-spinner">正在加载景点数据</div>';
    /*.innerHtml用来获取或者设置元素内部的内容 */

    // 发起fetch请求，向后端发起请求，获取景点列表数据
    fetch(`${API_BASE_URL}/attractions`)
        .then(response => {
            // 检查响应状态
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();  // 解析JSON
        })
        /*fetch是浏览器内置的api（端口，让一个程序可以请求另一个程序的数据和功能）
        参数是请求的 URL：${API_BASE_URL}/attractions，实际为 http://127.0.0.1:5000/api/attractions，
        fetch（）返回一个promise对象，代表异步（请求不会阻塞后面的代码）
        then 方法注册一个回调函数，当fetch收到服务器响应时，方法会被执行
        （回调函数是作为参数传递给另一个函数的函数
        response.ok是一个布尔值，当http状态码在200-299之间为true，否则为false
        http为2xx时，结合逻辑非运算符，返回false，不进入if块，并调用response.json方法，当http是404未找到或者500服务器错误时，返回true，进入if块，抛出错误
        */
        .then(data => {
            // 成功获取数据
            if (data && data.length > 0) {
                renderAttractions(data);
                //renderAttractions：这是一个在 index.js 中定义的函数，它的作用是 将景点数据渲染成页面上的卡片。
            } else {
                container.innerHTML = '<div class="error-message">暂无景点数据，请稍后再试。</div>';
            }
        })
        /*fetch获取数据后，第二个then块，用于处理已经解析的json块
        data是上一个then解析出来的json数据，在这个项目中，后端返回的json是一个景点数组，data就是这个数组
        */
        .catch(error => {
            console.error('获取数据出错:', error);
            // 显示用户友好的错误信息
            container.innerHTML = `
                <div class="error-message">
                    加载失败，请检查后端服务是否启动。错误详情：${error.message}
                </div>
            `;
        });
    /*请求链中的错误处理部分，捕获整个过程抛出的异常
    当网络请求失败，比如后端服务器未打开，电脑无网络，以及上一个then抛出异常或者json解析失败会进入catch
    当错误发生时，JavaScript 会自动创建一个 Error 对象，并作为参数传给 catch 的回调函数。
    console.error(...)
在浏览器控制台中输出错误信息，便于开发者调试。

与 console.log 类似，但样式上通常标记为红色，表示错误级别。

 */
}

/**
 * 渲染景点卡片到页面
 * @param {Array} attractions 景点数组
 */
function renderAttractions(attractions) {
    const container = document.getElementById('attractions-list');
    container.innerHTML = '';  // 清空容器

    attractions.forEach(attraction => {
        // 创建卡片元素
        const card = document.createElement('div');
        card.className = 'attraction-card';
        // class 是 JavaScript 的保留关键字，所以在 DOM 操作中，
        // 元素的类名属性叫 className。效果等同于 HTML 中的 <div class="attraction-card">。

        // 处理图片URL，如果没有则使用默认图
        const imageUrl = attraction.image_url || 'images/default.jpg';

        // 构建卡片内部HTML
        card.innerHTML = `
            <img src="${imageUrl}" alt="${attraction.name}">
            <div class="card-content">
                <h3>${escapeHtml(attraction.name)}</h3>
                
                <p class="location"><i class="fas fa-map-marker-alt"></i> ${escapeHtml(attraction.location)}</p>
                <p class="description">${escapeHtml(attraction.description) || '暂无简介，等待你的探索...'}</p>
                <a href="detail.html?id=${attraction.id}" class="btn">查看详情与费用 <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        container.appendChild(card);
    });
}
/**escapeHtml() 是一个自定义函数，用于将特殊字符（如 <, >, &）转义 */
/**
 * 简单的HTML转义，防止XSS攻击
 * @param {string} str 原始字符串
 * @returns {string} 转义后的字符串
 */
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}