function removeClassFromElements(elements, cl) {
    for (var i = 0; i < elements.length; ++i) {
        var elm = elements[i];
        var classList = elm.className.split(" ");
        var newClassList = classList.reduce(function (acc, el) {
            if (el !== cl) {
                acc.push(el);
            }
            return acc;
        }, []);

        elm.className = newClassList.join(" ");
    }
}

function addClassToElement(element, cl) {
    var update = true;
    var classList = element.className.split(" ");
    for (var i = 0; i < classList.length; ++i) {
        if (classList[i] === cl) {
            update = false;
            break;
        }
    }

    if (update) {
        classList.push(cl);
    }

    element.className = classList.join(" ");
}

function prepareClickListeners() {
    var mediaButtons = document.getElementsByClassName("media-button");
    var mediaContainers = document.getElementsByClassName("media-container");

    for (var i = 0; i < mediaButtons.length; ++i) {
        var btn = mediaButtons[i];
        btn.addEventListener("click", function(evt) {
            var ref = evt.currentTarget.getAttribute("ref");
            var refContainer = document.getElementById(ref);

            removeClassFromElements(mediaButtons, "active");
            addClassToElement(evt.currentTarget, "active");

            removeClassFromElements(mediaContainers, "active");
            addClassToElement(refContainer, "active");
        });
    }
}


window.addEventListener("load", function(event) {
    prepareClickListeners();
});
