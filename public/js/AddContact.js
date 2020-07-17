var i = 0;

function deleteElement(e, id){
    document.getElementById(id).removeChild(e.parentNode);
}

function autoChangeSelect(id) {
    var len = document.getElementById(id).length;

    // if(i > len){
    //     i = 0;
    // }
    console.log(id);
    document.getElementById(id).options.selectedIndex = i
    var si = document.getElementById(id).options.selectedIndex;
    if(i < len - 1){
        i = si + 1;
    }
}



// var id

// Adding contact elements
var cId = 0; 
function addContact(){
    cId++;
    const html = `
                    <a id="deleteElement" href="#" role="button" onClick="deleteElement(this,'phone-container')">Remove </a>
                    <select name="contact-lebel" id=c${cId}>
                                <option value="Mobile"selected> Mobile </option>
                                <option value="Work"> Work </option>
                                <option value="Home"> Home </option>
                                <option value="Main"> Main </option>
                                <option value="Other"> Other </option>
                    </select>
                    <input type="text" name="phone" placeholder="Number" />
    `;
    addElement('phone-container', html);
    autoChangeSelect(`c${cId}`);
}

var eid = 0
function addEmail(){
    eid++;
    const html= `
    <a id="deleteElement" href="#" role="button" onClick="deleteElement(this, 'email-container')">Remove </a>
    <select name="email-lebel" id=e${eid}>
                <option value="Home"> Home </option>
                <option value="Work"> Work </option>
                <option value="Other"> Other </option>
    </select>
    <input type="text" name="phone" placeholder="Email" />
    `;
    addElement('email-container', html);
    autoChangeSelect(`e${eid}`);
}

function addElement(parentId, html){
    const div = document.createElement('div');
    div.className = 'row';
    div.innerHTML = html;
    document.getElementById(parentId).appendChild(div);
}