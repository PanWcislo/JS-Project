class Note {
    constructor(_title, _description, _color, _attached) {
        this.id = parseInt(Date.now() + Math.random() * 1000)
        this.title = _title
        this.description = _description
        this.color = _color
        this.attached = _attached
        this.createdTime = new Date()
    }
}

class NotePocket {
    constructor()
    {
        if(localStorage.getItem('NotePocket') === null)
        {
            this.Notes = [new Note('Hello programmer!', 'It is your first note.', '#ccc', true)]
            return;
        }

        try
        {
            this.Notes = JSON.parse(localStorage.getItem('NotePocket'))
        }
        catch(ex)
        {
            this.Notes = []
        }
    }

    add(note)
    {
        this.Notes.push(note)
        this.sortNotes()
        this.updateStorage()
    }

    remove(id)
    {
        this.Notes = this.Notes.filter(note => note.id !== id)
        this.updateStorage()
    }

    clean()
    {
        this.Notes = []
        this.updateStorage()
    }

    sortNotes()
    {
        this.Notes = this.Notes.sort((n1, n2) => this.compareMethod(n1, n2))
    }

    compareMethod(n1, n2)
    {
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

    updateStorage()
    {
        localStorage.setItem('NotePocket', JSON.stringify(this.Notes))
    }
}

function init()
{
    // deklaracja instancji notatnika
    let pocket = new NotePocket()
    
    // deklaracja odwołań do przycisków
    let cleanNotesButton = document.querySelector(".clean")
    let addNoteButton = document.querySelector(".create")

    // deklaracja odwołań do pól formularza dodawania
    let titleField = document.querySelector("#title")
    let descriptionField = document.querySelector("#content")
    let colorField = document.querySelector("#color")
    let attachedField = document.querySelector("#attached")

    // deklaracja kontenera pól formularza dodawania
    let notesContainer = document.querySelector("#row2-notes")

    // funkcja czyszcząca pola formularza
    function cleanFields()
    {
        titleField.value = null
        descriptionField.value = null
        colorField.value = null
        attachedField.checked = false
    }

    function removeNote(id) 
    {
        pocket.remove(id)
        reloadNotes()
    }

    // funkcja przeładowująca kontener notatek
    function reloadNotes()
    {
        notesContainer.innerHTML = "";

        pocket.Notes.forEach(function(note){
            notesContainer.innerHTML += renderNote(note)
        })

        let removeButtons = document.querySelectorAll(".note-remove")
        removeButtons.forEach(function(e){
            id = parseInt(e.dataset.noteid)
            e.addEventListener('click', () => removeNote(id))
        })

    }

    // funkcja generująca kod notatki
    function renderNote(note)
    {
        return `<div class="note">
            <div class="note-title">${note.title} <span style="background-color:${note.color};" class="dot"></span></div>
            <div class="note-createdtime">${new Date(note.createdTime).toLocaleString()}</div>
            <div class="note-description">${note.content}</div>
            <div class="note-footer">
                ${note.attached ? ' <div class="note-attached">Attached</div>' : ''}
                <button data-noteid="${note.id}" class="btn note-remove">Remove</button>
            </div>
        </div>`
    }

    // deklaracje zdarzeń dla przycisków

    cleanNotesButton.addEventListener('click', function() {
        pocket.clean()
        reloadNotes()
    });

    addNoteButton.addEventListener('click', function() {
        let note = new Note(titleField.value, descriptionField.value, colorField.value, attachedField.checked)
        pocket.add(note)
        cleanFields()
        hideAddNoteContainer()
        reloadNotes()
    });

    reloadNotes()
}

document.addEventListener('DOMContentLoaded', init)