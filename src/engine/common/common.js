
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

