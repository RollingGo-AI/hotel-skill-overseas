const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const dict = {
  'rgh': 'rgg',
  '@rollinggo/hotel': '@rollinggo/hotel-global',
  'RollingGo-AI/hotel-skill': 'RollingGo-AI/hotel-skill-overseas',
  'oauth-hotel-cli': 'oauth-hotel-cli-overseas',
  'RollingGo 酒店搜索与预订助手': 'RollingGo Hotel Search & Booking Assistant',
  '通过调用 RollingGo 酒店服务接口实现酒店查询全流程': 'Implements the full hotel booking workflow by calling RollingGo hotel APIs',
  '支持场景': 'Supported scenarios',
  '按城市/景点/地铁站/机场等地点搜索酒店': 'Search hotels by city, attraction, metro, airport, etc.',
  '按星级、预算、标签（泳池/含早/亲子/宠物友好等）筛选': 'Filter by star rating, budget, tags (pool, breakfast, family, pet-friendly)',
  '查询指定酒店的实时房型与价格': 'Query real-time room types and prices for specific hotels',
  '对比多家酒店': 'Compare multiple hotels',
  '引导用户完成预订': 'Guide users to complete booking',
  '触发词': 'Triggers',
  '找酒店、订酒店、搜酒店、酒店推荐、酒店查询、附近酒店、五星酒店、民宿、度假村、查房价、看房型、入住、住哪、住宿、rollinggo、旅游住宿、出差住宿、亲子酒店、带泳池的酒店、含早餐酒店': 'find hotel, book hotel, search hotel, hotel recommendation, hotel query, nearby hotel, 5 star hotel, resort, check price, room type, check-in, accommodation, business trip, family hotel, hotel with pool, hotel with breakfast',
  '安装方式': 'Installation',
  '通过 npm 安装（推荐）': 'Via npm (Recommended)',
  '方式一': 'Method 1',
  '方式二': 'Method 2',
  '方式三': 'Method 3',
  '如果环境中有 Node.js 和 npm，请执行': 'If Node.js and npm are available, run',
  '通过 Python 自动脚本安装（免 Node.js 环境）': 'Via Python auto-script (No Node.js needed)',
  '手动下载独立可执行文件（免 Node/Python 环境）': 'Manual download standalone executable (No Node/Python needed)',
  '输出规范': 'Output Specifications',
  '严禁向用户展示任何技术细节': 'DO NOT show any technical details to users',
  '只展示用户关心的信息': 'ONLY show information users care about',
  '结果必须格式化展示': 'Results MUST be formatted properly',
  '安全门控': 'Security Gates',
  '工作流程': 'Workflow',
  '登录授权检查': 'Login Auth Check',
  '已登录': 'Logged in',
  '未登录': 'Not logged in',
  '信息收集': 'Information Collection',
  '获取标签字典': 'Get Tag Dictionary',
  '搜索酒店': 'Search Hotels',
  '查询房型与实时价格': 'Query Room Types & Real-time Prices',
  '价格确认与下单': 'Price Confirmation & Booking',
  '查询订单': 'Query Orders'
};

walkDir('.', function(filePath) {
  if (filePath.endsWith('.md') || filePath.endsWith('.py') || filePath.endsWith('.json') || filePath.endsWith('.txt')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let original = content;
    
    // Specifically handle the bin replacements with word boundaries to avoid double replacement if run multiple times
    content = content.replace(/\brgh\b/g, 'rgg');
    content = content.replace(/@rollinggo\/hotel(?!-global)/g, '@rollinggo/hotel-global');
    content = content.replace(/RollingGo-AI\/hotel-skill(?!-overseas)/g, 'RollingGo-AI/hotel-skill-overseas');
    content = content.replace(/oauth-hotel-cli(?!-overseas)/g, 'oauth-hotel-cli-overseas');
    
    for (const [zh, en] of Object.entries(dict)) {
      if (zh === 'rgh' || zh.includes('rollinggo')) continue;
      content = content.split(zh).join(en);
    }
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log('Updated:', filePath);
    }
  }
});
