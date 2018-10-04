label = document.querySelector("#todo #add");
count = document.querySelector("#todo #count");
price = document.querySelector("#todo #price");
filter = document.querySelector("#filter");
queryTodoLabels = "#todo table tbody tr label";
queryTodoList = "#todo table";
queryTodoInputs = "#todo table tbody tr input";
filter.onkeyup = function () {
    var self = this;
    document.querySelectorAll(queryTodoLabels).forEach(function (ele) {
        if (ele.textContent.indexOf(self.value) === -1) {
            if (ele.parentElement.classList.contains("hide") === false)
                ele.parentElement.classList.add("hide");
        }
        else
            ele.parentElement.classList.remove("hide");
    })
};
label.onkeydown = function (e) {
    if (e.key === "Enter") {
        if (count.value === "")
            count.value = "0";
        if (price.value === "")
            count.value = "0";
        document.querySelector(queryTodoList).insertAdjacentHTML('beforeEnd',
            `<tr><td><input type='checkbox'><label> ${label.value} </label></td>
            <td><span>${count.value}</span></td>
            <td><span>${price.value}</span></td>
            <td><span>${price.value * count.value}</span></td></tr>`);
        label.value = "";
        count.value = "0";
        price.value = "0";
        eventCheckElement();
        syncLocalStorage();
    }
};
count.onkeydown = label.onkeydown;
price.onkeydown = label.onkeydown;

function eventCheckElement() {
    document.querySelectorAll(queryTodoInputs).forEach(function (ele) {
        ele.onchange = function () {
            if (this.checked) {
                this.parentElement.classList.add("checked");
                this.setAttribute("checked", true);
            } else {
                this.parentElement.classList.remove("checked");
                this.removeAttribute("checked");
            }
            syncLocalStorage();
        };
    });
}

function syncLocalStorage() {
    localStorage.html = document.querySelector(queryTodoList).innerHTML;
}

function jsonData() {
    var obj = [];
    document.querySelectorAll(queryTodoList).forEach(function (ele) {
        obj.push({label: ele.querySelector("label").textContent, checked: ele.querySelector("input").checked});
    });
    return obj;
}

function onLoad() {
    document.querySelector(queryTodoList).innerHTML = localStorage.html;
    eventCheckElement();
}

onLoad();