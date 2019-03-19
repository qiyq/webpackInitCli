import _ from 'lodash';
import 'normalize.css';
import './assets/style/style.less';

function component() {
    var element = document.createElement('div');

    // lodash 是由当前 script 脚本 import 导入进来的
    element.innerHTML = _.join(['Hel大声道lwoddd防守打法asdadsa从自行车自行车wbczcxzcxczxbbwweqweqeww', 'webpack'], ' ');
    element.classList.add('hello');

    return element;
}

document.body.appendChild(component());
