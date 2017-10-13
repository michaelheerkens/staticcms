
function compile() {
    var _body = document.body.innerHTML
    document.body.innerHTML = ''
    var app = document.createElement('body')
    app.innerHTML = _body
    listChildren(app)
    app.innerHTML = app.innerHTML.replace(/<!--[\s\S]*?-->/g, '').replace(/{{\s*([^\:\/\{\}]*)\s*}}/g, function (a, b) { return eval(b) })
    document.body = app
}

function listChildren(root, parent, itm) {
    if (root && root.children && root.children.length) {
        return Object.keys(root.children).map(function (c) {
            var el = root.children[c]
            if (el.hasAttributes()) {
                handleIf(el);
                handleLoop(el, parent, itm)
            } else {
                return listChildren(el, parent, itm)
            }
        })
    } else {
        return root
    }
}

function handleIf(el) {
    var possibleIf = el.getAttribute('if')
    if (possibleIf) {
        var iff = /{{\s*(.*)?\s*}}/g.exec(possibleIf)[1]
        try{

            if (!eval(iff)) el.style.display = 'none';
            el.removeAttribute('if');
        }catch(err){
            
        }
    }
}

function getAttrText(el) {
    return Object.keys(el.attributes).reduce(function (a, b) { return a + el.attributes[b].name + ' ' }, '')
}

function handleLoop(el, p, itm) {
    var parent = el.parentElement
    var possibleLoop = el.getAttribute('repeat')

    if (possibleLoop) {
        var item = /{{\s*(\w+)\s+in\s+([\w\.\[\]]+)\s*}}/g.exec(possibleLoop)[1]
        var items = /{{\s*(\w+)\s+in\s+([\w\.\[\]]+)\s*}}/g.exec(possibleLoop)[2]
        el.removeAttribute('repeat')
        let pr = new RegExp('{{(if:)?(' + item + ')\\b.*?}}', 'gi')
        if (p) {
            items = items.replace(itm, p)
        }
        for (var i = 0; i < eval(items).length; i++) {
            var dupNode = el.cloneNode(true);
            dupNode.innerHTML = dupNode.innerHTML.replace(pr, function (a, b, c) { return a.replace(c, items + '[' + i + ']') })
            parent.appendChild(dupNode)
            Object.keys(dupNode.attributes).map(function (a) {
                var V = dupNode.attributes[a].value.replace(pr, function (a, b, c) { return a.replace(c, items + '[' + i + ']') })
                dupNode.setAttribute(dupNode.attributes[a].name, V)
            })
            handleIf(dupNode)
            listChildren(dupNode, items + '[' + i + ']', item)
        }
        parent.removeChild(el)
    }
}