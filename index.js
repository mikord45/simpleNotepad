let main = {
    tabOfAll: [],
    deleteOne: function (id) {
        console.log("wykonuje sie", id)
        this.tabOfAll.splice(id, 1)
        console.log(this.tabOfAll)
        this.updateList()
    },
    updateList: function () {
        document.getElementById("notes").innerHTML = ""
        for (let i = 0; i < this.tabOfAll.length; i++) {
            if (this.tabOfAll[i].important == true) {
                let now = document.createElement("div")
                now.setAttribute("class", "oneNote")
                let title = document.createElement("h2")
                title.innerText = this.tabOfAll[i].title
                now.appendChild(title)
                let content = document.createElement("p")
                content.innerText = this.tabOfAll[i].content
                now.appendChild(content)
                let date = document.createElement("p")
                date.innerText = this.tabOfAll[i].creationTime + " Przypięte"
                let del = document.createElement("button")
                del.addEventListener("click", () => {
                    this.deleteOne(i)
                })
                del.innerText = "USUŃ"
                now.appendChild(del)
                now.appendChild(date)
                let pin = document.createElement("button")
                pin.innerText = "Przypnij/odepnij"
                pin.addEventListener("click", () => {
                    this.tabOfAll[i].important = false
                    this.updateList()
                })
                now.appendChild(pin)
                now.style.color = this.tabOfAll[i].color
                now.style.backgroundColor = "#f7b733"
                document.getElementById("notes").appendChild(now)
            }
        }
        for (let i = 0; i < this.tabOfAll.length; i++) {
            if (this.tabOfAll[i].important == false) {
                let now = document.createElement("div")
                now.setAttribute("class", "oneNote")
                let title = document.createElement("h2")
                title.innerText = this.tabOfAll[i].title
                now.appendChild(title)
                let content = document.createElement("p")
                content.innerText = this.tabOfAll[i].content
                now.appendChild(content)
                let date = document.createElement("p")
                date.innerText = this.tabOfAll[i].creationTime + " Nie Przypięte"
                let del = document.createElement("button")
                del.addEventListener("click", () => {
                    this.deleteOne(i)
                })
                del.innerText = "USUŃ"
                now.appendChild(del)
                now.appendChild(date)
                let pin = document.createElement("button")
                pin.innerText = "Przypnij/odepnij"
                pin.addEventListener("click", () => {
                    this.tabOfAll[i].important = true
                    this.updateList()
                })
                now.appendChild(pin)
                now.style.color = this.tabOfAll[i].color
                now.style.backgroundColor = "#f7b733"
                document.getElementById("notes").appendChild(now)
            }
        }
        localStorage.setItem("tab", JSON.stringify(this))
    }
}

document.getElementById("add").addEventListener("click", function (event) {
    event.preventDefault()
    let n = Date.now()
    let current = {
        title: document.getElementById("title").value,
        content: document.getElementById("contentText").value,
        color: document.getElementById("color").value,
        important: document.getElementById("important").checked,
        creationTime: new Date(n).toDateString()
    }
    document.getElementById("title").value = ""
    document.getElementById("contentText").value = ""
    document.getElementById("color").value = ""
    document.getElementById("important").checked = false
    if (current.title != "" && current.content != "") {
        document.querySelector("#error h3").innerText = ""
        main.tabOfAll.push(current)
        main.updateList()
    }
    else {
        document.querySelector("#error h3").innerText = "Brak tytułu lub treści"
    }
})
console.log(localStorage.getItem("tab"))
if (localStorage.getItem("tab") != undefined) {
    main.tabOfAll = JSON.parse(localStorage.getItem("tab")).tabOfAll
    main.updateList()
}


