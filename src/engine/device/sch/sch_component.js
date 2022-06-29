import Group from '../basic/group';

export default class SchComponent extends Group {
  constructor (type, attrs, params) {
    super(type, attrs, params);

    this.attrs = Object.assign({}, this.attrs);

    this.sign = Object.assign(this.sign, {
      name: params.name,
      number: params.number,
    });

    this.bindChilds();
    this.bindNature();
    this.bindSign();
  }

  bindChilds () {
    const { px, py, content, name } = this.sign;
    /*this.childs = this.alterChilds(params.childs);*/
  }

  bindNature () {
    const self = this;

    this.nature = [
      {
        title: '元件属性',
        list: [
          {
            type: 'text',
            name: '名称',
            get model () {
              return self.sign.name || '';
            },
            set model (value) {
              if (value) {
                self.sign.name = value;
              } else {
                self.sign.name = '';
              }
            },
          },
          {
            type: 'text',
            name: '编号',
            get model () {
              return self.sign.number || '';
            },
            set model (value) {
              if (value) {
                self.sign.number = value;
              } else {
                self.sign.number = '';
              }
            },
          },
          /*{
            type: 'select',
            name: '显示名称',
            get model () {
              if (!self.childs[3].attrs['display']) {
                return 1;
              } else {
                if (self.childs[3].attrs['display'] === 'block') {
                  return 1;
                } else {
                  return 0;
                }
              }
            },
            set model (value) {
              if (value === 1) {
                self.childs[3].attrs['display'] = 'block';
              } else {
                self.childs[3].attrs['display'] = 'none';
              }
            },
            options: [
              {
                value: 1,
                label: '是',
              },
              {
                value: 0,
                label: '否',
              },
            ]
          },
          {
            type: 'select',
            name: '显示编号',
            get model () {
              if (!self.childs[2].attrs['display']) {
                return 1;
              } else {
                if (self.childs[2].attrs['display'] === 'block') {
                  return 1;
                } else {
                  return 0;
                }
              }
            },
            set model (value) {
              if (value === 1) {
                self.childs[2].attrs['display'] = 'block';
              } else {
                self.childs[2].attrs['display'] = 'none';
              }
            },
            options: [
              {
                value: 1,
                label: '是',
              },
              {
                value: 0,
                label: '否',
              },
            ]
          },*/
          {
            type: 'select',
            name: '锁定',
            get model () {
              return self.sign.fixed;
            },
            set model (value) {
              self.sign.fixed = value;
            },
            options: [
              {
                value: 1,
                label: '是',
              },
              {
                value: 0,
                label: '否',
              },
            ]
          }
        ]
      }
    ]
  }
}


