var i = 0;

function deleteElement(e, id){
    document.getElementById(id).removeChild(e.parentNode);
}

function autoChangeSelect(id) {
    var len = document.getElementById(id).length;
    
    // if(i > len){
        //     i = 0;
        // }
        document.getElementById(id).options.selectedIndex = i
        var si = document.getElementById(id).options.selectedIndex;
        if(i < len - 1){
            i = si + 1;
        }
}
    
function addElement(parentId, html){
    const div = document.createElement('div');
    div.className = 'row';
    div.innerHTML = html;
    document.getElementById(parentId).appendChild(div);
}

    
// var id

// Adding contact elements
var cId = 0; 
function addContact(){
    cId++;
    const html = `
                    <button class="remove-btn" href="#" role="button" onClick="deleteElement(this,'phone-container')"> - </button>
                    <select class"lebel" name="contact-lebel" id=c${cId}>
                                <option value="Mobile"selected> Mobile </option>
                                <option value="Work"> Work </option>
                                <option value="Home"> Home </option>
                                <option value="Main"> Main </option>
                                <option value="Other"> Other </option>
                    </select>
                    <input class="ac-input" type="text" name="phone" placeholder="Number" />
                    
    `;
    addElement('phone-container', html);
    autoChangeSelect(`c${cId}`);
}

var eid = 0
function addEmail(){
    eid++;
    const html= `
                <button class="remove-btn" href="#" role="button" onClick="deleteElement(this, 'email-container')"> - </button>
                <select class"lebel" name="email-lebel" id=e${eid}>
                            <option value="Home" selected> Home </option>
                            <option value="Work"> Work </option>
                            <option value="Other"> Other </option>
                </select>
                <input class="ac-input" type="text" name="emial" placeholder="Email" />
                
    `;
    addElement('email-container', html);
    autoChangeSelect(`e${eid}`);
}

var did = 0;
function addDate(){
    did++;
    const html = `
                <button class="remove-btn" href="#" role="button" onClick="deleteElement(this, 'date-container')"> - </button>
                <select class"lebel" name="email-lebel" id=d${did}>
                            <option value="Birthday"> Birthday </option>
                            <option value="Anniversary"> Anniversary </option>
                            <option value="Other"> Other </option>
                </select>
                <input class="ac-input" type="date" name="date"  />
                
    `;
    addElement('date-container', html);
    autoChangeSelect(`d${did}`);
}

var aid = 0;
function addAddress(){
    aid++;
    const html = `
                <button class="remove-btn" href="#" role="button" onClick="deleteElement(this, 'address-container')"> - </button>
                <select class"lebel" name="email-lebel" id=a${aid}>
                            <option value="Home"> Home </option>
                            <option value="Work"> Work </option>
                            <option value="Other"> Other </option>
                </select>
                <textarea  class="ac-input"rows="4" cols="50" name="comment" form="usrform" placeholder="Address"></textarea>
                
    `;
    addElement('address-container', html);
    autoChangeSelect(`a${aid}`);
}

var wid = 0
function addWebsite(){
    wid++;
    const html = `
                <button class="remove-btn" href="#" role="button" onClick="deleteElement(this, 'website-container')"> - </button>
                <input class="ac-input" type="text" name="website" placeholder="Webiste">
                
    `;
    addElement('website-container', html);
    autoChangeSelect(`w${wid}`);
}