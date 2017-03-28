import Scrollbar from './scrollbar';
import ajax from './ajax';

document.querySelector('.book').addEventListener('click', () => {
    ajax({
        url: '../about.html',
        loadType: 'html',
        success: (data) => {
            document.querySelector('.book').innerHTML = data;
        }
    });
});

let scroller = new Scrollbar({
    element: '.book'
});
