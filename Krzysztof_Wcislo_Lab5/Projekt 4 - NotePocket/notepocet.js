let notes = []

window.addEventListener('load',(e)=>{

    if(typeof(Storage) !== undefined){

        if(localStorage.getItem("NotePocket") === null){
            this.Notes = [new Note('Hello programmer!', 'It is your first note.', '#ccc', true)]
            return
        }
        try
        {
            notes = JSON.parse(localStorage.getItem('NotePocket'))
        }
        catch(ex)
        {
            notes = []
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
    notes.push(new Note(title.value,content.value,color.valie,attached.checked))

    notes.sort(function(n1,n2){
        if(n1.attached == true && n2.attached == false)
            return -1

        if(n1.attached == false && n2.attached == true)
            return 1

        if( new Date(n1.createdTime).getTime() > new Date(n2.createdTime).getTime() )
            return -1
        if( new Date(n1.createdTime).getTime() < new Date(n2.createdTime).getTime() )
            return 1

        return 0
    })
    localStorage.setItem('NotePocket', JSON.stringify(notes))
    showNotes()

    let notesJSON = JSON.stringify(notes)
    localStorage.setItem("NotePocket",notesJSON)
}

function showNotes(){
    let list = document.querySelector(".row2-notes")
    list.innerHTML=""

        notes.forEach(function(note){
            list.innerHTML += renderNote(note)
        })

}

function renderNote(note){

    return `<div class="note">
            <div class="note_title">${note.title} <span style="background-color:${note.color};" class="dot"></span></div>
            <div class="note_createdtime">${new Date(note.createdTime).toLocaleString()}</div>
            <div class="note_content">${note.content}</div>
            <div class="note_footer">
                ${note.attached ? ' <div class="note_attached">Attached</div>' : ''}
                <button data-noteid="${note.id}" class="note_remove">Remove</button>
            </div>
        </div>`
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