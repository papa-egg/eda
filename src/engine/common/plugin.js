import UUID from 'uuidjs';

/**
 * 颜色转换，rgb转canvas画布颜色系
 * @param { String } color
 * @returns { Array }
 *
 * @example：
 * toVecColor('#1229A4') // [0.65, 0.67, 0.8, 1]
 */
export const toVecColor = (color) => {
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  const sColorChange = [];
  let sColor = color.toLowerCase();

  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sNewColor = '#';

      for (let i = 1; i < 4; i++) {

        sNewColor += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }

      sColor = sNewColor;
    }

    for (let i = 1; i < 7; i += 2) {
      sColorChange.push((parseInt('0x' + sColor.slice(i, i + 2)) / 255));
    }

    sColorChange.push(1.0);

    return sColorChange;
  } else {

    return sColor;
  }
};

/**
 * canvas连接到可用程序
 * @param { Object } gl
 * @returns { String } vShader
 * @returns { String } fShader
 *
 * @example：
 * const program = createProgram(gl, vsSource, fsSource);
 */
export const createProgram = (gl, vShader, fShader) => {

  // 创建着色器对象
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vShader);
  const framentSHader = createShader(gl, gl.FRAGMENT_SHADER, fShader);

  if (!vertexShader || !framentSHader) return null;

  // 创建编程对象
  const program = gl.createProgram();

  if (!program) return null;

  // 赋值着色器对象
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, framentSHader);

  // 连接编程对象
  gl.linkProgram(program);

  const linked = gl.getProgramParameter(program, gl.LINK_STATUS);

  // 检查结果状态
  if (!linked) {
    const error = gl.getProgramInfoLog(program);
    console.log('链接程序失败：' + error);
    gl.deleteProgram(program);
    gl.deleteShader(framentSHader);
    gl.deleteShader(vertexShader);

    return null;
  }

  // 编译着色器
  function createShader (gl, type, sourceCode) {
    const shader = gl.createShader(type);

    gl.shaderSource(shader, sourceCode);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const info = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);

      throw "Could not compile WebGL program. \n\n" + info;
    }

    return shader;
  }

  return program;
};

/**
 * 图片资源promise同步化
 * @param src
 * @returns img
 */
export const loadImage = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      resolve(img);
    };

    img.onerror = (err) => {
      throw new Error('image loading error:' + err);
    };
  })
};

/**
 * 滚轮缩放事件监听hark
 * @param event
 * @returns { number } 1 or -1
 */
export const getDelta = (event) => {
  let delta = 0;

  if (!event) event = window.event;

  if (event.wheelDelta) {
    delta = event.wheelDelta / 120;
    if (window.opera) delta = - delta;
  } else if (event.detail) {
    delta = -event.detail / 3;
  }

  if (delta) return delta;
};

/**
 * 鼠标窗口显示坐标系转显示坐标系
 * @param { Number } ax
 * @param { String } type: x or y
 * @returns { Number }
 */
export const toViewArea = (ax, type) => {
  const { vx, vy, zm } = window.$vue.$store.getters.getVMsg;

  if (type === 'x') {
    return Math.round(ax / zm + vx);
  } else {
    return Math.round(ax / zm + vy);
  }
};

/**
 * 鼠标窗口显示坐标系转显示坐标系---（吸附）
 * @param { Number } ax
 * @param { String } type: x or y
 * @returns { Number }
 */
export const toADViewArea = (ax, type) => {
  const { vx, vy, zm } = window.$vue.$store.getters.getVMsg;
  const CH = window.$vue.$store.getters.getCH;
  let cellGrid = 10;

  if (CH && CH.msg.attrs['cell-adsorb'] == 1) {
    if (CH.mouse.altPress) {
      cellGrid = CH.msg.attrs['alt-cell-size'];
    } else {
      cellGrid = CH.msg.attrs['cell-size'];
    }

  } else {
    return toViewArea(ax, type);
  }

  if (type === 'x') {
    return Math.round(Math.round(ax / zm + vx) / cellGrid) * cellGrid;
  } else {
    return Math.round(Math.round(ax / zm + vy) / cellGrid) * cellGrid;
  }
};

/**
 * 显示坐标系转鼠标窗口显示坐标
 * @param { Number } ax
 * @param { String } type: x or y
 * @returns { Number }
 */
export const toMouseArea = (ax, type) => {
  const { vx, vy, zm } = window.$vue.$store.getters.getVMsg;

  if (type === 'x') {
    return (ax - vx) * zm;
  } else {
    return (ax - vy) * zm;
  }
};

/**
 * 获取不重随机数串
 * @param { Number } length
 * @returns { String }
 */
export const getUUID = () => {

  return UUID.generate();
};

/**
 * 获取短链对象
 * @returns { Object }
 */
export const getBriefObj = (attrs) => {
  const obj = Object.create(null);

  for (let attr in attrs && attrs.hasOwnProperty(attr)) {
    obj[attr] = attrs[attr];
  }

  return obj;
};

/**
 * 监测元素是否存在该class
 * @param { Dom } element
 * @param { String } cName
 * @returns { Boolean }
 */
export const hasClass = (element, cName) => {

  return !!element.className.match(new RegExp('(\\s|^)'+cName+'(\\s|$)'));
};

/**
 * 添加class
 * @param { Dom } element
 * @param { String } cName
 */
export const addClass = (element, cName) => {

  if(!hasClass(element, cName)){
    element.className +=' '+cName;
  }
};

/**
 * 移除class
 * @param { Dom } element
 * @param { String } cName
 */
export const removeClass = (element, cName) => {

  if(hasClass(element, cName)){
    element.className = element.className.replace(new RegExp('(\\s|^)'+cName+'(\\s|$)'),' ');
  }
};

/**
 * 监测svg元素是否存在该class
 * @param { Dom } element
 * @param { String } cName
 * @returns { Boolean }
 */
export const hasSvgClass = (element, cName) => {
  return !!element.className.baseVal.match(new RegExp('(\\s|^)'+cName+'(\\s|$)'));
};

/**
 * 添加svg class
 * @param { Dom } element
 * @param { String } cName
 */
export const addSvgClass = (element, cName) => {

  if(!hasSvgClass(element, cName)){
    element.className.baseVal +=' '+cName;
  }
};

/**
 * 移除svg class
 * @param { Dom } element
 * @param { String } cName
 */
export const removeSvgClass = (element, cName) => {

  if(hasSvgClass(element, cName)){
    element.className.baseVal = element.className.baseVal.replace(new RegExp('(\\s|^)'+cName+'(\\s|$)'),' ');
  }
};

/**
 * 通过点和点，计算该条直线所对应坐标系的角度值
 * @param { Array } start
 * @param { Array } end
 * @returns { Number }
 */
export const getAngle = (start, end) => {
  const diff_x = end[0] - start[0];
  const diff_y = end[1] - start[1];

  return Math.atan2(diff_y, diff_x) * 180 / Math.PI;
};

/**
 * 求出绕原点旋转n度所得点坐标
 * @param { Number } r
 * @param { Number } angle
 * @param { Array } pt
 * @returns { Array }
 */
export const getJoinPoint = (r = 5, angle, pt) => {
  const majorR = r;
  const minorR = r;
  const centrifugal = Math.atan2(majorR*Math.sin(angle * Math.PI / 180), minorR*Math.cos(angle * Math.PI / 180));

  return [Number(majorR*Math.cos(centrifugal)) + Number(pt[0]), Number(minorR*Math.sin(centrifugal)) + Number(pt[1])];
};

/**
 * 求出绕原点旋转n度所得点坐标
 * @param { Number } r
 * @param { Number } angle
 * @param { Array } pt
 * @returns { Array }
 */
export const getJoinPoint2 = (r1 = 5, r2 = 5, angle, pt) => {
  const majorR = r1;
  const minorR = r2;
  const centrifugal = Math.atan2(majorR*Math.sin(angle * Math.PI / 180), minorR*Math.cos(angle * Math.PI / 180));

  return [Number(majorR*Math.cos(centrifugal)) + Number(pt[0]), Number(minorR*Math.sin(centrifugal)) + Number(pt[1])];
};

/**
 * 获取两点之间直线距离
 * @param { Array } start
 * @param { Array } end
 * @returns { Number }
 */
export const getStraightDistance = (start, end) => {
  const diff_x = end[0] - start[0];
  const diff_y = end[1] - start[1];

  return Math.sqrt(diff_x * diff_x + diff_y * diff_y);
};

/**
 * 获取当前编辑器
 * @returns {null|*}
 */
export const editor = () => {
  const CH = window.$vue.$store.getters.getCH;

  if (CH) {
    return CH;
  } else {
    return null;
  }
};
