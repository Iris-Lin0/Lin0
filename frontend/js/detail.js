const API_BASE_URL = 'http://127.0.0.1:5000/api';

document.addEventListener('DOMContentLoaded', () => {
    // 获取URL中的id参数
    const urlParams = new URLSearchParams(window.location.search);
    const attractionId = urlParams.get('id');

    if (!attractionId) {
        showError('无效的景点ID，请从首页选择景点。');
        return;
    }

    fetchAttractionDetail(attractionId);
});

/**
 * 获取景点详情
 * @param {number|string} id 景点ID
 */
function fetchAttractionDetail(id) {
    const container = document.getElementById('detail-content');
    container.innerHTML = '<div class="loading-spinner">正在加载详情</div>';

    fetch(`${API_BASE_URL}/attractions/${id}`)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('景点不存在');
                }
                throw new Error(`HTTP ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            renderDetail(data);
        })
        .catch(error => {
            console.error('获取详情出错:', error);
            showError('加载详情失败，请稍后重试。错误：' + error.message);
        });
}

/**
 * 渲染详情页面
 * @param {Object} attraction 景点对象
 */
function renderDetail(attraction) {
    const container = document.getElementById('detail-content');

    // 处理图片URL
    const imageUrl = attraction.image_url || '../images/default.jpg';

    // 处理费用字段，如果为null则显示'待补充'
    const transport = attraction.transport_cost != null ? `¥${attraction.transport_cost}` : '待补充';
    const accommodation = attraction.accommodation_cost != null ? `¥${attraction.accommodation_cost}` : '待补充';
    const food = attraction.food_cost != null ? `¥${attraction.food_cost}` : '待补充';
    const entertainment = attraction.entertainment_cost != null ? `¥${attraction.entertainment_cost}` : '待补充';
    //用反引号包裹的字符串，可以嵌入变量 ${...}。

    //这里 `¥${attraction.transport_cost}` 会把景点的交通费用（如 50.00）嵌入到字符串中，得到 ¥50.00
    // 计算总费用（仅当所有费用都有值时显示，否则显示'待补充'）
    let totalDisplay = '';
    // if (attraction.transport_cost != null && attraction.accommodation_cost != null &&
    //     attraction.food_cost != null && attraction.entertainment_cost != null) {
    //     const total = attraction.transport_cost + attraction.accommodation_cost +
    //         attraction.food_cost + attraction.entertainment_cost;
    //     totalDisplay = `<div class="total-cost">合计：¥${total.toFixed(2)}</div>`;
    // } else {
    //     totalDisplay = '<div class="total-cost">合计：部分费用待补充</div>';
    // }
    // 将费用字段转换为数字（如果为 null/undefined 则转为 NaN）
    const transportNum = parseFloat(attraction.transport_cost);
    //parseFloat(string)

    //作用：解析字符串中的数字，返回浮点数。如果字符串的第一个字符不能转换为数字，则返回 NaN。
    const accommodationNum = parseFloat(attraction.accommodation_cost);
    const foodNum = parseFloat(attraction.food_cost);
    const entertainmentNum = parseFloat(attraction.entertainment_cost);

    // 检查所有字段都不为 null 且转换后都是有效数字
    if (attraction.transport_cost != null && attraction.accommodation_cost != null &&
        attraction.food_cost != null && attraction.entertainment_cost != null &&
        !isNaN(transportNum) && !isNaN(accommodationNum) && !isNaN(foodNum) && !isNaN(entertainmentNum)) {
        const total = transportNum + accommodationNum + foodNum + entertainmentNum;
        totalDisplay = `<div class="total-cost">合计：¥${total.toFixed(2)}</div>`;
    } else {
        totalDisplay = '<div class="total-cost">合计：部分费用待补充</div>';
    }

    const html = `
        <img src="${imageUrl}" alt="${escapeHtml(attraction.name)}">
        <h2>${escapeHtml(attraction.name)}</h2>
        <p class="location"><i class="fas fa-map-marker-alt"></i> ${escapeHtml(attraction.location)}</p>
        <div class="description">
            <p>${escapeHtml(attraction.description) || '暂无详细描述，欢迎亲自探索！'}</p>
        </div>
        <div class="cost-section">
            <h3><i class="fas fa-coins"></i> 费用预算参考（每人/每天估算）</h3>
            <div class="cost-item">
                <span class="label"><i class="fas fa-bus"></i> 当地交通：</span>
                <span class="price">${transport}</span>
            </div>
            <div class="cost-item">
                <span class="label"><i class="fas fa-hotel"></i> 住宿：</span>
                <span class="price">${accommodation}</span>
            </div>
            <div class="cost-item">
                <span class="label"><i class="fas fa-utensils"></i> 餐饮：</span>
                <span class="price">${food}</span>
            </div>
            <div class="cost-item">
                <span class="label"><i class="fas fa-ticket-alt"></i> 景点门票/娱乐：</span>
                <span class="price">${entertainment}</span>
            </div>
            ${totalDisplay}
        </div>
        <div style="margin-top: 2rem; text-align: center;">
            <a href="index.html" class="btn"><i class="fas fa-home"></i> 返回首页</a>
        </div>
    `;

    container.innerHTML = html;
}

/**
 * 显示错误信息
 * @param {string} message 错误消息
 */
function showError(message) {
    const container = document.getElementById('detail-content');
    container.innerHTML = `<div class="error-message">${escapeHtml(message)}</div>`;
}

/**
 * HTML转义函数（与index.js中相同，可以抽离成公共模块，但为了简单重复定义）
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