
const style = document.createElement('style');
style.textContent = `
.notification-wrapper {
    position: relative;
    display: inline-block;
}
.notification-button {
    background: none;
    border: none;
    color: #6366f1;
    font-size: 20px;
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
    position: relative;
}
.notification-count {
    position: absolute;
    top: -6px;
    right: -6px;
    background: #6366f1;
    color: white;
    font-size: 12px;
    font-weight: bold;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.notification-popup {
    position: absolute;
    top: 45px;
    right: 0;
    width: 90vw;
    max-width: 350px;
    background: white;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    border-radius: 8px;
    display: none;
    flex-direction: column;
    z-index: 100;
    transition: max-height 0.3s ease, padding 0.3s ease;
    overflow: hidden;
}
.notification-popup.show {
    display: flex;
    max-height: 600px;
    padding: 10px 0;
}
.notification-popup ul {
    list-style: none;
    padding: 0;
    margin: 0;
}
.notification-popup li {
    padding: 10px 40px 10px 20px;
    border-bottom: 1px solid #eee;
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease;
    word-break: break-word;
}
.notification-popup li.expanded {
    white-space: normal;
    background: #f9f9ff;
}
.notification-popup li .unread-dot {
    width: 10px;
    height: 10px;
    background: #6366f1;
    border-radius: 50%;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
}
.show-all-btn {
    display: block;
    text-align: center;
    padding: 10px;
    background: #6366f1;
    color: white;
    text-decoration: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0 0 8px 8px;
    margin: 0;
}
.show-all-btn:hover { background: #4f46e5; }

/* Responsive */
@media (max-width: 400px) {
    .notification-popup {
        width: 95vw;
        right: 2.5vw;
    }
    .notification-button {
        font-size: 18px;
        padding: 8px;
    }
}


body.dark-theme .notification-popup{
    background-color:rgb(15, 23, 42);
    color:#f8fafc;
}
`;
document.head.appendChild(style);

const icon = document.getElementById('notification-button');

const wrapper = document.createElement('div');
wrapper.className = 'notification-wrapper';
icon.parentNode.insertBefore(wrapper, icon);
wrapper.appendChild(icon);

icon.classList.add('notification-button');

const countEl = document.createElement('span');
countEl.className = 'notification-count';
wrapper.appendChild(countEl);

const popup = document.createElement('div');
popup.className = 'notification-popup';
const ul = document.createElement('ul');

const messages = [
    { text: "No Notification System yet tho :P", unread: true },
];

messages.slice(0,5).forEach((msg, i) => {
    const li = document.createElement('li');
    li.textContent = msg.text;
    li.dataset.index = i;
    if(msg.unread){
        const dot = document.createElement('span');
        dot.className = 'unread-dot';
        li.appendChild(dot); 
    }
    ul.appendChild(li);
});
popup.appendChild(ul);


const showAllBtn = document.createElement('a');
showAllBtn.className = 'show-all-btn';
showAllBtn.textContent = 'Show all Notifications';
showAllBtn.href = '#'; 
popup.appendChild(showAllBtn);

wrapper.appendChild(popup);

function updateCount() {
    const unread = messages.filter(m => m.unread).length;
    if(unread === 0){
        countEl.style.display = 'none';
    } else {
        countEl.style.display = 'flex';
        countEl.innerText = unread;
    }
}
updateCount();

icon.addEventListener('click', () => popup.classList.toggle('show'));

ul.addEventListener('click', e => {
    const li = e.target.closest('li');
    if(!li) return;
    const idx = li.dataset.index;
    if(messages[idx].unread){
        messages[idx].unread = false;
        const dot = li.querySelector('.unread-dot');
        if(dot) dot.remove();
        updateCount();
    }
    //li.classList.toggle('expanded');
});
