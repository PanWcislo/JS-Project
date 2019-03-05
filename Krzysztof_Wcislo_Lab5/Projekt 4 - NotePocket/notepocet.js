class Note{ // klasa reprezentująca notatkę i jej zmienne
    constructor(_title,_content,_color,_attached){
        this.id = parseInt(Date.now() + Math.random() * 1000)
        this.title = _title
        this.content= _content
        this.color = _color
        this.attached = _attached;
        this.creationDate = new Date()
    }

}

window.addEventListener('load',(e)=>{

    if(typeof(Storage) !== undefined){

        if(localStorage.getItem("NotePocket") === null){ // jesli wartosc jest równa null to wypisz to w notatce
            notes = [new Note('Hello!', 'It is your first note.', '#ccc', true)]
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

        document.querySelector("#clean").addEventListener('click',(e)=>{ //deklaracja eventu przycisku clean

            notes = []
            localStorage.setItem('NotePocket', JSON.stringify(notes))
            showNotes()
        })

        document.querySelector("#create").addEventListener('click',(e)=>{ //deklaracja eventu przycisku create
            
            let title = document.querySelector("#title").value // odwołanie do pola z formularza
            let content = document.querySelector("#content").value // odwołanie do pola z formularza
            let color = document.querySelector("#color").value // odwołanie do pola z formularza
            let attached = document.querySelector("#attached").checked // odwołanie do pola z formularza

            AddNote(title,content,color,attached) // dodanie notatni
        })

        if(notes.length > 0){ // wyswietl notatki
            showNotes()
        }
    }
    else
    {
        console.log("Error!")  // jesli błąd wyswietl komunikat z błędem
    }
})

function AddNote(title,content,color,attached){ // funkcja dodająca notatni
    notes.push(new Note(title,content,color,attached))

    notes.sort(function(n1,n2){ // sortowanie notatnek wzdgędem tych wazniejszych(attached) oraz czasu(Date)
        if(n1.attached == true && n2.attached == false)
            return -1

        if(n1.attached == false && n2.attached == true)
            return 1

        if( new Date(n1.creationDate).getTime() > new Date(n2.creationDate).getTime() )
            return -1
        if( new Date(n1.creationDate).getTime() < new Date(n2.creationDate).getTime() )
            return 1

        return 0
    })
    showNotes()

    localStorage.setItem("NotePocket",JSON.stringify(notes))
}

function showNotes(){ // pokaż notatni
    let list = document.querySelector(".row2-notes") // rubryka do której będą dodawane notatki
    list.innerHTML=""

        notes.forEach(function(note){
            list.innerHTML += renderNote(note)
        })

    let removeButtons = document.querySelectorAll(".note_remove") // usuń notatkę
        removeButtons.forEach(function(e){
            id = parseInt(e.dataset.noteid)
            e.addEventListener('click', () => removeNote(id))
        })

}

function removeNote(id) // usuń notatkę po id
    {
        notes = notes.filter(note => note.id !== id)
        localStorage.setItem('NotePocket', JSON.stringify(notes))
        showNotes()
    }

function renderNote(note){ // dodanie notatki względem kodu wypisanego ponizej(return)

    return `<div class="note">
            <div class="note_title" style="color:${note.color};">${note.title}</div>
            <div class="note_createdtime">${new Date(note.creationDate).toLocaleString()}</div>
            <div class="note_content" style="color:${note.color};">${note.content}</div>
            <div class="note_footer">
                ${note.attached ? ' <div class="note_attached">Attached</div>' : ''}
                <button data-noteid="${note.id}" class="note_remove">Remove</button>
            </div>
        </div>`
}
