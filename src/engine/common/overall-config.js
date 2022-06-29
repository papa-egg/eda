

export const layerConfig = (() => {
  const layerList = [
    {
      label: '顶层',
      value: 'L_1',
      color: '#ff0000',
    },
    {
      label: '底层',
      value: 'L_2',
      color: '#0000ff',
    },
    {
      label: '顶层丝印',
      value: 'L_3',
      color: '#FFCC00',
    },
    {
      label: '底层丝印',
      value: 'L_4',
      color: '#66CC33',
    },
    {
      label: '顶层助焊',
      value: 'L_5',
      color: '#808080',
    },
    {
      label: '底层助焊',
      value: 'L_6',
      color: '#800000',
    },
    {
      label: '顶层阻焊',
      value: 'L_7',
      color: '#800080',
    },
    {
      label: '底层阻焊',
      value: 'L_8',
      color: '#AA00FF',
    },
    {
      label: '飞线',
      value: 'L_9',
      color: '#6464FF',
    },
    {
      label: '边框',
      value: 'L_10',
      color: '#FF00FF',
    },
    {
      label: '多层',
      value: 'L_11',
      color: '#C0C0C0',
    },
    {
      label: '文档',
      value: 'L_12',
      color: '#ffffff',
    },
  ];

  return {
    getLayerColor (layId) {
      for (let layer of layerList) {
        if (layer.value === layId) {
          return layer.color;
        }
      }
    }
  }
})();
