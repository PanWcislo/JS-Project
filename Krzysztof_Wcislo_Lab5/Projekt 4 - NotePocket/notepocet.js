let notes = []

window.addEventListener('load',(e)=>{

    if(typeof(Storage) !== undefined){

        if(localStorage.getItem("NotePocket") === null){
            notes = JSON.parse(localStorage.getItem("NotePocket"))
        }

        document.querySelector("#clean").addEventListener('click',(e)=>{

            notes = []
            localStorage.setItem('NotePocket', JSON.stringify(this.notes))
            showNotes()
        })

        document.querySelector("#create").addEventListener('click',(e)=>{
            
            let title = document.querySelector("#title").value
            let content = document.querySelector("#content").value
            let color = document.querySelector("#color").value
            let attached = document.querySelector("#attached").checked

            AddNote(title,content,color,attached)
        })

        if(notes.length > 0){
            showNotes()
        }
    }
    else
    {
        console.log("Error!")
    }
})

function AddNote(title,content,color,attached){
    notes.push(
        new Note(title,content,color,attached)
    )

    notes.sort(sortNotes)
    showNotes()

    let notesJSON = JSON.stringify(notes)
    localStorage.setItem("NotePocket",notesJSON)
}

function showNotes(){
    let list = document.querySelector(".row2-notes")
    list.innerHTML=""

    notes.forEach((elem)=>{
        let card = document.createElement("div")
        card.className="note1";

        let attached1 = document.createElement('div')
        attached1.className = "note_attached"
        attached1.textContent = "Attached"

        let content1 = document.createElement("div")
        content1.className = "note_title"

        let header = document.createElement("div")
        header.className="header"
        header.textContent = elem.title
        header.style.color = elem.color

        content1.appendChild(header)

        let content2 = document.createElement("div")
        content2.className="content"

        let feed = document.createElement("div")
        feed.className="note_text"
        feed.textContent = elem.content
        feed.style.color = elem.color

        content2.appendChild(feed)

        let date = document.createElement("div")
        date.className="note_footer"
        date.textContent += new Date(elem.creationDate).toLocaleString()
        
        card.appendChild(content1)
        card.appendChild(content2)
        card.appendChild(date)
        list.appendChild(card)
    })
}

function sortNotes(n1,n2){


    if(n1.attached == true && n2.attached == false)
            return -1

        if(n1.attached == false && n2.attached == true)
            return 1

        if( new Date(n1.createdTime).getTime() > new Date(n2.createdTime).getTime() )
            return -1
        if( new Date(n1.createdTime).getTime() < new Date(n2.createdTime).getTime() )
            return 1

        return 0
}

class Note{
    constructor(_title,_content,_color,_priority){
        this.title = _title
        this.content= _content
        this.color = _color
        this.priority = _priority;
        this.creationDate = new Date()
    }

}